# Entry entity test

import json
import os
import time

import pytest

from contentful_sdk.utility.voxgig_struct import voxgig_struct as vs
from contentful_sdk import ContentfulSDK
from contentful_sdk.core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestEntryEntity:

    def test_should_create_instance(self):
        testsdk = ContentfulSDK.test(None, None)
        ent = testsdk.Entry(None)
        assert ent is not None

    def test_should_stream(self):
        # Feature #4: the entity stream(action, ...) method runs the op
        # pipeline and yields result items. With the streaming feature active
        # it yields the feature's incremental output; otherwise it falls back
        # to the materialised list so stream always yields.
        seed = {
            "entity": {
                "entry": {
                    "s1": {"id": "s1"},
                    "s2": {"id": "s2"},
                    "s3": {"id": "s3"},
                }
            }
        }

        # Fallback: streaming inactive -> yields the materialised list items.
        base = ContentfulSDK.test(seed, None)
        seen = list(base.Entry(None).stream("list", None, None))
        assert len(seen) == 3

        # Inbound: streaming active -> yields each item from the feature.
        from contentful_sdk.config import shared_config
        cfg = shared_config()
        if isinstance(cfg.get("feature"), dict) and "streaming" in cfg["feature"]:
            sdk = ContentfulSDK.test(
                seed, {"feature": {"streaming": {"active": True}}})
            got = []
            for item in sdk.Entry(None).stream("list", None, None):
                if isinstance(item, list):
                    got.extend(item)
                else:
                    got.append(item)
            assert len(got) == 3

    def test_should_run_basic_flow(self):
        setup = _entry_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create", "list", "update", "load", "remove"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "entry." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set CONTENTFUL_TEST_ENTRY_ENTID JSON to run live")
        client = setup["client"]

        # CREATE
        entry_ref01_ent = client.Entry(None)
        entry_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.entry"), "entry_ref01"))
        entry_ref01_data["environment_id"] = setup["idmap"]["environment01"]
        entry_ref01_data["space_id"] = setup["idmap"]["space01"]

        entry_ref01_data = helpers.to_map(runner.entity_data(entry_ref01_ent.create(entry_ref01_data, None)))
        assert entry_ref01_data is not None
        assert entry_ref01_data["id"] is not None

        # LIST
        entry_ref01_match = {
            "environment_id": setup["idmap"]["environment01"],
            "space_id": setup["idmap"]["space01"],
        }

        entry_ref01_list_result = entry_ref01_ent.list(entry_ref01_match, None)
        assert isinstance(entry_ref01_list_result, list)

        found_item = vs.select(
            runner.entity_list_to_data(entry_ref01_list_result),
            {"id": entry_ref01_data["id"]})
        assert not vs.isempty(found_item)

        # UPDATE
        entry_ref01_data_up0_up = {
            "id": entry_ref01_data["id"],
            "environment_id": setup["idmap"]["environment_id"],
            "space_id": setup["idmap"]["space_id"],
        }

        entry_ref01_markdef_up0_name = "contentType"
        entry_ref01_markdef_up0_value = "Mark01-entry_ref01_" + str(setup["now"])
        entry_ref01_data_up0_up[entry_ref01_markdef_up0_name] = entry_ref01_markdef_up0_value

        entry_ref01_resdata_up0 = helpers.to_map(runner.entity_data(entry_ref01_ent.update(entry_ref01_data_up0_up, None)))
        assert entry_ref01_resdata_up0 is not None
        assert entry_ref01_resdata_up0["id"] == entry_ref01_data_up0_up["id"]
        assert entry_ref01_resdata_up0[entry_ref01_markdef_up0_name] == entry_ref01_markdef_up0_value

        # LOAD
        entry_ref01_match_dt0 = {
            "id": entry_ref01_data["id"],
        }
        entry_ref01_data_dt0_loaded = entry_ref01_ent.load(entry_ref01_match_dt0, None)
        entry_ref01_data_dt0_load_result = helpers.to_map(runner.entity_data(entry_ref01_data_dt0_loaded))
        assert entry_ref01_data_dt0_load_result is not None
        assert entry_ref01_data_dt0_load_result["id"] == entry_ref01_data["id"]

        # REMOVE
        entry_ref01_match_rm0 = {
            "id": entry_ref01_data["id"],
        }
        entry_ref01_ent.remove(entry_ref01_match_rm0, None)

        # LIST
        entry_ref01_match_rt0 = {
            "environment_id": setup["idmap"]["environment01"],
            "space_id": setup["idmap"]["space01"],
        }

        entry_ref01_list_rt0_result = entry_ref01_ent.list(entry_ref01_match_rt0, None)
        assert isinstance(entry_ref01_list_rt0_result, list)

        not_found_item = vs.select(
            runner.entity_list_to_data(entry_ref01_list_rt0_result),
            {"id": entry_ref01_data["id"]})
        assert vs.isempty(not_found_item)



def _entry_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/entry/EntryTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = ContentfulSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["entry01", "entry02", "entry03", "space01", "space02", "space03", "environment01", "environment02", "environment03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Detect ENTID env override before envOverride consumes it. When live
    # mode is on without a real override, the basic test runs against synthetic
    # IDs from the fixture and 4xx's. We surface this so the test can skip.
    _entid_env_raw = os.environ.get(
        "CONTENTFUL_TEST_ENTRY_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "CONTENTFUL_TEST_ENTRY_ENTID": idmap,
        "CONTENTFUL_TEST_LIVE": "FALSE",
        "CONTENTFUL_TEST_EXPLAIN": "FALSE",
        "CONTENTFUL_APIKEY": "",
    })

    idmap_resolved = helpers.to_map(
        env.get("CONTENTFUL_TEST_ENTRY_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)
    if idmap_resolved.get("environment_id") is None:
        idmap_resolved["environment_id"] = idmap_resolved.get("environment01")
    if idmap_resolved.get("space_id") is None:
        idmap_resolved["space_id"] = idmap_resolved.get("space01")

    if env.get("CONTENTFUL_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            # FIRST, so the generated fields below win: sdk-test-control.json's
            # test.client.options adds to the live client, it does not
            # redirect it.
            runner.live_client_options(),
            {
                "apikey": env.get("CONTENTFUL_APIKEY"),
            },
            extra or {},
        ])
        client = ContentfulSDK(helpers.to_map(merged_opts))

    _live = env.get("CONTENTFUL_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("CONTENTFUL_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
