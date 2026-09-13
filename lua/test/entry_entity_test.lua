-- Entry entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("contentful_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

describe("EntryEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:Entry(nil)
    assert.is_not_nil(ent)
  end)

  -- Feature #4: the entity stream(action, ...) method runs the op pipeline and
  -- returns an iterator over result items. With the streaming feature active it
  -- yields the feature's incremental output; otherwise it falls back to the
  -- materialised list so stream always yields.
  it("should stream", function()
    local seed = {
      entity = {
        ["entry"] = {
          s1 = { id = "s1" },
          s2 = { id = "s2" },
          s3 = { id = "s3" },
        },
      },
    }

    -- Fallback: streaming inactive -> yields the materialised list items.
    local base = sdk.test(seed, nil)
    local seen = {}
    for item in base:Entry(nil):stream("list", nil, nil) do
      table.insert(seen, item)
    end
    assert.are.equal(3, #seen)

    -- Inbound: streaming active -> yields each item from the feature.
    local config = require("config_shared")()
    if type(config.feature) == "table" and config.feature.streaming ~= nil then
      local streamsdk = sdk.test(seed, { feature = { streaming = { active = true } } })
      local got = {}
      for item in streamsdk:Entry(nil):stream("list", nil, nil) do
        if vs.islist(item) then
          for _, sub in ipairs(item) do
            table.insert(got, sub)
          end
        else
          table.insert(got, item)
        end
      end
      assert.are.equal(3, #got)
    end
  end)

  it("should run basic flow", function()
    local setup = entry_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"create", "list", "update", "load", "remove"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "entry." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    -- The basic flow consumes synthetic IDs from the fixture. In live mode
    -- without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup.synthetic_only then
      pending("live entity test uses synthetic IDs from fixture — set CONTENTFUL_TEST_ENTRY_ENTID JSON to run live")
      return
    end
    local client = setup.client

    -- CREATE
    local entry_ref01_ent = client:Entry(nil)
    local entry_ref01_data = helpers.to_map(vs.getprop(
      vs.getpath(setup.data, "new.entry"), "entry_ref01"))
    entry_ref01_data["environment_id"] = setup.idmap["environment01"]
    entry_ref01_data["space_id"] = setup.idmap["space01"]

    local entry_ref01_data_result, err = entry_ref01_ent:create(entry_ref01_data, nil)
    assert.is_nil(err)
    entry_ref01_data = helpers.to_map(type(entry_ref01_data_result) == 'table' and entry_ref01_data_result.data_get and entry_ref01_data_result:data_get() or entry_ref01_data_result)
    assert.is_not_nil(entry_ref01_data)
    assert.is_not_nil(entry_ref01_data["id"])

    -- LIST
    local entry_ref01_match = {
      ["environment_id"] = setup.idmap["environment01"],
      ["space_id"] = setup.idmap["space01"],
    }

    local entry_ref01_list_result, err = entry_ref01_ent:list(entry_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(entry_ref01_list_result)

    local found_item = vs.select(
      runner.entity_list_to_data(entry_ref01_list_result),
      { id = entry_ref01_data["id"] })
    assert.is_false(vs.isempty(found_item))

    -- UPDATE
    local entry_ref01_data_up0_up = {
      id = entry_ref01_data["id"],
      ["environment_id"] = setup.idmap["environment_id"],
      ["space_id"] = setup.idmap["space_id"],
    }

    local entry_ref01_markdef_up0_name = "contentType"
    local entry_ref01_markdef_up0_value = "Mark01-entry_ref01_" .. tostring(setup.now)
    entry_ref01_data_up0_up[entry_ref01_markdef_up0_name] = entry_ref01_markdef_up0_value

    local entry_ref01_resdata_up0_result, err = entry_ref01_ent:update(entry_ref01_data_up0_up, nil)
    assert.is_nil(err)
    local entry_ref01_resdata_up0 = helpers.to_map(type(entry_ref01_resdata_up0_result) == 'table' and entry_ref01_resdata_up0_result.data_get and entry_ref01_resdata_up0_result:data_get() or entry_ref01_resdata_up0_result)
    assert.is_not_nil(entry_ref01_resdata_up0)
    assert.are.equal(entry_ref01_resdata_up0["id"], entry_ref01_data_up0_up["id"])
    assert.are.equal(entry_ref01_resdata_up0[entry_ref01_markdef_up0_name], entry_ref01_markdef_up0_value)

    -- LOAD
    local entry_ref01_match_dt0 = {
      id = entry_ref01_data["id"],
    }
    local entry_ref01_data_dt0_loaded, err = entry_ref01_ent:load(entry_ref01_match_dt0, nil)
    assert.is_nil(err)
    local entry_ref01_data_dt0_load_result = helpers.to_map(type(entry_ref01_data_dt0_loaded) == 'table' and entry_ref01_data_dt0_loaded.data_get and entry_ref01_data_dt0_loaded:data_get() or entry_ref01_data_dt0_loaded)
    assert.is_not_nil(entry_ref01_data_dt0_load_result)
    assert.are.equal(entry_ref01_data_dt0_load_result["id"], entry_ref01_data["id"])

    -- REMOVE
    local entry_ref01_match_rm0 = {
      id = entry_ref01_data["id"],
    }
    local _, err = entry_ref01_ent:remove(entry_ref01_match_rm0, nil)
    assert.is_nil(err)

    -- LIST
    local entry_ref01_match_rt0 = {
      ["environment_id"] = setup.idmap["environment01"],
      ["space_id"] = setup.idmap["space01"],
    }

    local entry_ref01_list_rt0_result, err = entry_ref01_ent:list(entry_ref01_match_rt0, nil)
    assert.is_nil(err)
    assert.is_table(entry_ref01_list_rt0_result)

    local not_found_item = vs.select(
      runner.entity_list_to_data(entry_ref01_list_rt0_result),
      { id = entry_ref01_data["id"] })
    assert.is_true(vs.isempty(not_found_item))

  end)
end)

function entry_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/entry/EntryTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read entry test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "entry01", "entry02", "entry03", "space01", "space02", "space03", "environment01", "environment02", "environment03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Detect ENTID env override before envOverride consumes it. When live
  -- mode is on without a real override, the basic test runs against synthetic
  -- IDs from the fixture and 4xx's. Surface this so the test can skip.
  local entid_env_raw = os.getenv("CONTENTFUL_TEST_ENTRY_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["CONTENTFUL_TEST_ENTRY_ENTID"] = idmap,
    ["CONTENTFUL_TEST_LIVE"] = "FALSE",
    ["CONTENTFUL_TEST_EXPLAIN"] = "FALSE",
    ["CONTENTFUL_APIKEY"] = "",
  })

  local idmap_resolved = helpers.to_map(
    env["CONTENTFUL_TEST_ENTRY_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end
  if idmap_resolved["environment_id"] == nil then
    idmap_resolved["environment_id"] = idmap_resolved["environment01"]
  end
  if idmap_resolved["space_id"] == nil then
    idmap_resolved["space_id"] = idmap_resolved["space01"]
  end

  if env["CONTENTFUL_TEST_LIVE"] == "TRUE" then
    local merged_opts = vs.merge({
      -- FIRST, so the generated fields below win: sdk-test-control.json's
      -- test.client.options adds to the live client, it does not redirect it.
      runner.live_client_options(),
      {
        apikey = env["CONTENTFUL_APIKEY"],
      },
      extra or {},
    })
    client = sdk.new(helpers.to_map(merged_opts))
  end

  local live = env["CONTENTFUL_TEST_LIVE"] == "TRUE"
  return {
    client = client,
    data = entity_data,
    idmap = idmap_resolved,
    env = env,
    explain = env["CONTENTFUL_TEST_EXPLAIN"] == "TRUE",
    live = live,
    synthetic_only = live and not idmap_overridden,
    now = os.time() * 1000,
  }
end
