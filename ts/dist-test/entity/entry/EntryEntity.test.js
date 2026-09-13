"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('EntryEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when CONTENTFUL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('CONTENTFUL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ContentfulSDK.test();
        const ent = testsdk.Entry();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.CONTENTFUL_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'load', 'remove']) {
            if ((0, utility_1.maybeSkipControl)(t, 'entityOp', 'entry.' + op, live))
                return;
        }
        const setup = basicSetup();
        // The basic flow consumes synthetic IDs and field values from the
        // fixture (entity TestData.json). Those don't exist on the live API.
        // Skip live runs unless the user provided a real ENTID env override.
        if (setup.syntheticOnly) {
            t.skip('live entity test uses synthetic IDs from fixture — set CONTENTFUL_TEST_ENTRY_ENTID JSON to run live');
            return;
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const entry_ref01_ent = client.Entry();
        let entry_ref01_data = setup.data.new.entry['entry_ref01'];
        entry_ref01_data['environment_id'] = setup.idmap['environment01'];
        entry_ref01_data['space_id'] = setup.idmap['space01'];
        entry_ref01_data = (await entry_ref01_ent.create(entry_ref01_data)).data();
        (0, node_assert_1.default)(null != entry_ref01_data.id);
        // LIST
        const entry_ref01_match = {};
        entry_ref01_match['environment_id'] = setup.idmap['environment01'];
        entry_ref01_match['space_id'] = setup.idmap['space01'];
        const entry_ref01_list = (await entry_ref01_ent.list(entry_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(entry_ref01_list, { id: entry_ref01_data.id })));
        // UPDATE
        const entry_ref01_data_up0 = {};
        entry_ref01_data_up0.id = entry_ref01_data.id;
        entry_ref01_data_up0['environment_id'] = setup.idmap['environment_id'];
        entry_ref01_data_up0['space_id'] = setup.idmap['space_id'];
        const entry_ref01_markdef_up0 = { name: 'contentType', value: 'Mark01-entry_ref01_' + setup.now };
        entry_ref01_data_up0[entry_ref01_markdef_up0.name] = entry_ref01_markdef_up0.value;
        const entry_ref01_resdata_up0 = (await entry_ref01_ent.update(entry_ref01_data_up0)).data();
        (0, node_assert_1.default)(entry_ref01_resdata_up0.id === entry_ref01_data_up0.id);
        (0, node_assert_1.default)(entry_ref01_resdata_up0[entry_ref01_markdef_up0.name] === entry_ref01_markdef_up0.value);
        // LOAD
        const entry_ref01_match_dt0 = {};
        entry_ref01_match_dt0.id = entry_ref01_data.id;
        const entry_ref01_data_dt0 = (await entry_ref01_ent.load(entry_ref01_match_dt0)).data();
        (0, node_assert_1.default)(entry_ref01_data_dt0.id === entry_ref01_data.id);
        // REMOVE
        const entry_ref01_match_rm0 = { id: entry_ref01_data.id };
        await entry_ref01_ent.remove(entry_ref01_match_rm0);
        // LIST
        const entry_ref01_match_rt0 = {};
        entry_ref01_match_rt0['environment_id'] = setup.idmap['environment01'];
        entry_ref01_match_rt0['space_id'] = setup.idmap['space01'];
        const entry_ref01_list_rt0 = (await entry_ref01_ent.list(entry_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(entry_ref01_list_rt0, { id: entry_ref01_data.id })));
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/entry/EntryTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ContentfulSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['entry01', 'entry02', 'entry03', 'space01', 'space02', 'space03', 'environment01', 'environment02', 'environment03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    // Detect whether the user provided a real ENTID JSON via env var. The
    // basic flow consumes synthetic IDs from the fixture file; without an
    // override those synthetic IDs reach the live API and 4xx. Surface this
    // to the test so it can skip rather than fail.
    const idmapEnvVal = process.env['CONTENTFUL_TEST_ENTRY_ENTID'];
    const idmapOverridden = null != idmapEnvVal && idmapEnvVal.trim().startsWith('{');
    const env = (0, utility_1.envOverride)({
        'CONTENTFUL_TEST_ENTRY_ENTID': idmap,
        'CONTENTFUL_TEST_LIVE': 'FALSE',
        'CONTENTFUL_TEST_EXPLAIN': 'FALSE',
        'CONTENTFUL_APIKEY': '',
    });
    idmap = env['CONTENTFUL_TEST_ENTRY_ENTID'];
    const live = 'TRUE' === env.CONTENTFUL_TEST_LIVE;
    if (live) {
        client = new __1.ContentfulSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.CONTENTFUL_APIKEY,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {}
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.CONTENTFUL_TEST_EXPLAIN,
        live,
        syntheticOnly: live && !idmapOverridden,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=EntryEntity.test.js.map