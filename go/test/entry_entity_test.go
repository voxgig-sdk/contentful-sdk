package sdktest

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/contentful-sdk/go"
	"github.com/voxgig-sdk/contentful-sdk/go/core"

	vs "github.com/voxgig-sdk/contentful-sdk/go/utility/struct"
)

func TestEntryEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Entry(nil)
		if ent == nil {
			t.Fatal("expected non-nil EntryEntity")
		}
	})

	// Feature #4: the entity Stream(action, ...) method runs the op pipeline and
	// returns a channel over result items. With the streaming feature active it
	// yields the feature's incremental output; otherwise it falls back to the
	// materialised list so Stream always yields.
	t.Run("stream", func(t *testing.T) {
		seed := map[string]any{
			"entity": map[string]any{
				"entry": map[string]any{
					"s1": map[string]any{"id": "s1"},
					"s2": map[string]any{"id": "s2"},
					"s3": map[string]any{"id": "s3"},
				},
			},
		}

		// Fallback: streaming inactive -> yields the materialised list items.
		base := sdk.TestSDK(seed, nil)
		var seen []any
		for item := range base.Entry(nil).Stream("list", nil, nil) {
			seen = append(seen, item)
		}
		if len(seen) != 3 {
			t.Fatalf("expected 3 streamed items, got %d", len(seen))
		}

		// Inbound: streaming active -> yields each item from the feature iterator.
		hasStreaming := false
		if fm, ok := core.SharedConfig()["feature"].(map[string]any); ok {
			_, hasStreaming = fm["streaming"]
		}
		if hasStreaming {
			streamSdk := sdk.TestSDK(seed, map[string]any{
				"feature": map[string]any{"streaming": map[string]any{"active": true}},
			})
			var got []any
			for item := range streamSdk.Entry(nil).Stream("list", nil, nil) {
				if sub, ok := item.([]any); ok {
					got = append(got, sub...)
				} else {
					got = append(got, item)
				}
			}
			if len(got) != 3 {
				t.Fatalf("expected 3 items via streaming feature, got %d", len(got))
			}
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := entryBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "entry." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set CONTENTFUL_TEST_ENTRY_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		entryRef01Ent := client.Entry(nil)
		entryRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "entry"}), "entry_ref01"))
		entryRef01Data["environment_id"] = setup.idmap["environment01"]
		entryRef01Data["space_id"] = setup.idmap["space01"]

		entryRef01DataResult, err := entryRef01Ent.Create(entryRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		entryRef01Data = core.ToMapAny(entityData(entryRef01DataResult))
		if entryRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if entryRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// LIST
		entryRef01Match := map[string]any{
			"environment_id": setup.idmap["environment01"],
			"space_id": setup.idmap["space01"],
		}

		entryRef01ListResult, err := entryRef01Ent.List(entryRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		entryRef01List, entryRef01ListOk := entryRef01ListResult.([]any)
		if !entryRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", entryRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(entryRef01List), map[string]any{"id": entryRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		// UPDATE
		entryRef01DataUp0Up := map[string]any{
			"id": entryRef01Data["id"],
			"environment_id": setup.idmap["environment_id"],
			"space_id": setup.idmap["space_id"],
		}

		entryRef01MarkdefUp0Name := "contentType"
		entryRef01MarkdefUp0Value := fmt.Sprintf("Mark01-entry_ref01_%d", setup.now)
		entryRef01DataUp0Up[entryRef01MarkdefUp0Name] = entryRef01MarkdefUp0Value

		entryRef01ResdataUp0Result, err := entryRef01Ent.Update(entryRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		entryRef01ResdataUp0 := core.ToMapAny(entityData(entryRef01ResdataUp0Result))
		if entryRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if entryRef01ResdataUp0["id"] != entryRef01DataUp0Up["id"] {
			t.Fatal("expected update result id to match")
		}
		if entryRef01ResdataUp0[entryRef01MarkdefUp0Name] != entryRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", entryRef01MarkdefUp0Name, entryRef01ResdataUp0[entryRef01MarkdefUp0Name])
		}

		// LOAD
		entryRef01MatchDt0 := map[string]any{
			"id": entryRef01Data["id"],
		}
		entryRef01DataDt0Loaded, err := entryRef01Ent.Load(entryRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		entryRef01DataDt0LoadResult := core.ToMapAny(entityData(entryRef01DataDt0Loaded))
		if entryRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if entryRef01DataDt0LoadResult["id"] != entryRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

		// REMOVE
		entryRef01MatchRm0 := map[string]any{
			"id": entryRef01Data["id"],
		}
		_, err = entryRef01Ent.Remove(entryRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		// LIST
		entryRef01MatchRt0 := map[string]any{
			"environment_id": setup.idmap["environment01"],
			"space_id": setup.idmap["space01"],
		}

		entryRef01ListRt0Result, err := entryRef01Ent.List(entryRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		entryRef01ListRt0, entryRef01ListRt0Ok := entryRef01ListRt0Result.([]any)
		if !entryRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", entryRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(entryRef01ListRt0), map[string]any{"id": entryRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func entryBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "entry", "EntryTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read entry test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse entry test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"entry01", "entry02", "entry03", "space01", "space02", "space03", "environment01", "environment02", "environment03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("CONTENTFUL_TEST_ENTRY_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"CONTENTFUL_TEST_ENTRY_ENTID": idmap,
		"CONTENTFUL_TEST_LIVE":      "FALSE",
		"CONTENTFUL_TEST_EXPLAIN":   "FALSE",
		"CONTENTFUL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["CONTENTFUL_TEST_ENTRY_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}
	// Add environment_id alias for update test.
	if idmapResolved["environment_id"] == nil {
		idmapResolved["environment_id"] = idmapResolved["environment01"]
	}
	// Add space_id alias for update test.
	if idmapResolved["space_id"] == nil {
		idmapResolved["space_id"] = idmapResolved["space01"]
	}

	if env["CONTENTFUL_TEST_LIVE"] == "TRUE" {
		// An empty map, not a nil one: Merge returns nil when its last entry
		// is nil, and BasicSetup is normally called with no extras - so a
		// bare nil silently discarded the apikey and server values below.
		extraOpts := extra
		if extraOpts == nil {
			extraOpts = map[string]any{}
		}

		mergedOpts := vs.Merge([]any{
			// liveClientOptions() FIRST, so the generated fields below win:
			// sdk-test-control.json's test.client.options adds to the live
			// client, it does not redirect it.
			liveClientOptions(),
			map[string]any{
				"apikey": env["CONTENTFUL_APIKEY"],
			},
			extraOpts,
		})
		client = sdk.NewContentfulSDK(core.ToMapAny(mergedOpts))
	}

	live := env["CONTENTFUL_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["CONTENTFUL_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
