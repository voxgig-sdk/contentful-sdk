
const envlocal = __dirname + '/../../../.env.local'
require('../../utility').loadEnvLocal(envlocal)

const Path = require('node:path')
const Fs = require('node:fs')

const { test, describe, afterEach } = require('node:test')
const assert = require('node:assert')
const { createLiveTransport } = require('../../live-runner')
const { runLiveEntity } = require('../../live-entity')


const { ContentfulSDK, BaseFeature, stdutil, config } = require('../../..')

const {
  envOverride,
  liveClientOptions,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
} = require('../../utility')


describe('EntryEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CONTENTFUL_TEST_LIVE=TRUE.
  afterEach(liveDelay('CONTENTFUL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ContentfulSDK.test()
    const ent = testsdk.Entry()
    assert(null != ent)
  })


  test('basic', async (t) => {

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"contentType","req":false,"type":"`$STRING`","index$":0},{"active":true,"name":"createdAt","req":false,"type":"`$STRING`","index$":1},{"active":true,"name":"fields","req":false,"type":"`$OBJECT`","index$":2},{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":3},{"active":true,"name":"type","req":false,"type":"`$STRING`","index$":4},{"active":true,"name":"updatedAt","req":false,"type":"`$STRING`","index$":5}],"id":{"field":"id","name":"id"},"name":"entry","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"environment_id","orig":"environment_id","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"kind":"param","name":"space_id","orig":"space_id","reqd":true,"type":"`$STRING`","index$":1}]},"contract":{"id":"POST /spaces/{space_id}/environments/{environment_id}/entries","json":"{\"operationId\":\"createEntry\",\"parameters\":[{\"in\":\"path\",\"name\":\"space_id\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"in\":\"path\",\"name\":\"environment_id\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/vnd.contentful.management.v1+json\":{\"schema\":{\"properties\":{\"fields\":{\"type\":\"object\"}},\"required\":[\"fields\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"201\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"contentType\":{\"type\":\"string\"},\"createdAt\":{\"type\":\"string\"},\"fields\":{\"type\":\"object\"},\"id\":{\"type\":\"string\"},\"type\":{\"type\":\"string\"},\"updatedAt\":{\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"The created entry\"}},\"security\":[{\"bearerAuth\":[]}],\"securitySchemes\":{\"bearerAuth\":{\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/spaces/{space_id}/environments/{environment_id}/entries","segments":[{"lit":"spaces"},{"var":"space_id"},{"lit":"environments"},{"var":"environment_id"},{"lit":"entries"}],"select":{"exist":["environment_id","space_id"]},"transform":{"req":"`reqdata`","res":"`body.fields`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"environment_id","orig":"environment_id","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"kind":"param","name":"space_id","orig":"space_id","reqd":true,"type":"`$STRING`","index$":1}],"query":[{"active":true,"kind":"query","name":"content_type","orig":"content_type","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"limit","orig":"limit","reqd":false,"type":"`$INTEGER`","index$":1}]},"contract":{"id":"GET /spaces/{space_id}/environments/{environment_id}/entries","json":"{\"operationId\":\"listEntries\",\"parameters\":[{\"in\":\"path\",\"name\":\"space_id\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"in\":\"path\",\"name\":\"environment_id\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"in\":\"query\",\"name\":\"content_type\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"in\":\"query\",\"name\":\"limit\",\"required\":false,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"items\":{\"items\":{\"properties\":{\"contentType\":{\"type\":\"string\"},\"createdAt\":{\"type\":\"string\"},\"fields\":{\"type\":\"object\"},\"id\":{\"type\":\"string\"},\"type\":{\"type\":\"string\"},\"updatedAt\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"A page of entries\"}},\"security\":[{\"bearerAuth\":[]}],\"securitySchemes\":{\"bearerAuth\":{\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/spaces/{space_id}/environments/{environment_id}/entries","segments":[{"lit":"spaces"},{"var":"space_id"},{"lit":"environments"},{"var":"environment_id"},{"lit":"entries"}],"select":{"exist":["content_type","environment_id","limit","space_id"]},"transform":{"req":"`reqdata`","res":"`body.items`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"environment_id","orig":"environment_id","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"kind":"param","name":"id","orig":"entry_id","reqd":true,"type":"`$STRING`","index$":1},{"active":true,"kind":"param","name":"space_id","orig":"space_id","reqd":true,"type":"`$STRING`","index$":2}]},"contract":{"id":"GET /spaces/{space_id}/environments/{environment_id}/entries/{entry_id}","json":"{\"operationId\":\"getEntry\",\"parameters\":[{\"in\":\"path\",\"name\":\"space_id\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"in\":\"path\",\"name\":\"environment_id\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"in\":\"path\",\"name\":\"entry_id\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"contentType\":{\"type\":\"string\"},\"createdAt\":{\"type\":\"string\"},\"fields\":{\"type\":\"object\"},\"id\":{\"type\":\"string\"},\"type\":{\"type\":\"string\"},\"updatedAt\":{\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"The requested entry\"}},\"security\":[{\"bearerAuth\":[]}],\"securitySchemes\":{\"bearerAuth\":{\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/spaces/{space_id}/environments/{environment_id}/entries/{entry_id}","rename":{"param":{"entry_id":"id"}},"segments":[{"lit":"spaces"},{"var":"space_id"},{"lit":"environments"},{"var":"environment_id"},{"lit":"entries"},{"var":"id"}],"select":{"exist":["environment_id","id","space_id"]},"transform":{"req":"`reqdata`","res":"`body.fields`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"environment_id","orig":"environment_id","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"kind":"param","name":"id","orig":"entry_id","reqd":true,"type":"`$STRING`","index$":1},{"active":true,"kind":"param","name":"space_id","orig":"space_id","reqd":true,"type":"`$STRING`","index$":2}]},"contract":{"id":"DELETE /spaces/{space_id}/environments/{environment_id}/entries/{entry_id}","json":"{\"operationId\":\"deleteEntry\",\"parameters\":[{\"in\":\"path\",\"name\":\"space_id\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"in\":\"path\",\"name\":\"environment_id\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"in\":\"path\",\"name\":\"entry_id\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"204\":{\"description\":\"Deleted\"}},\"security\":[{\"bearerAuth\":[]}],\"securitySchemes\":{\"bearerAuth\":{\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"DELETE","orig":"/spaces/{space_id}/environments/{environment_id}/entries/{entry_id}","rename":{"param":{"entry_id":"id"}},"segments":[{"lit":"spaces"},{"var":"space_id"},{"lit":"environments"},{"var":"environment_id"},{"lit":"entries"},{"var":"id"}],"select":{"exist":["environment_id","id","space_id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"environment_id","orig":"environment_id","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"kind":"param","name":"id","orig":"entry_id","reqd":true,"type":"`$STRING`","index$":1},{"active":true,"kind":"param","name":"space_id","orig":"space_id","reqd":true,"type":"`$STRING`","index$":2}]},"contract":{"id":"PUT /spaces/{space_id}/environments/{environment_id}/entries/{entry_id}","json":"{\"operationId\":\"updateEntry\",\"parameters\":[{\"in\":\"path\",\"name\":\"space_id\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"in\":\"path\",\"name\":\"environment_id\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"in\":\"path\",\"name\":\"entry_id\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/vnd.contentful.management.v1+json\":{\"schema\":{\"properties\":{\"fields\":{\"type\":\"object\"}},\"required\":[\"fields\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"contentType\":{\"type\":\"string\"},\"createdAt\":{\"type\":\"string\"},\"fields\":{\"type\":\"object\"},\"id\":{\"type\":\"string\"},\"type\":{\"type\":\"string\"},\"updatedAt\":{\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"The updated entry\"}},\"security\":[{\"bearerAuth\":[]}],\"securitySchemes\":{\"bearerAuth\":{\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"PUT","orig":"/spaces/{space_id}/environments/{environment_id}/entries/{entry_id}","rename":{"param":{"entry_id":"id"}},"segments":[{"lit":"spaces"},{"var":"space_id"},{"lit":"environments"},{"var":"environment_id"},{"lit":"entries"},{"var":"id"}],"select":{"exist":["environment_id","id","space_id"]},"transform":{"req":"`reqdata`","res":"`body.fields`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["space","environment"]]},"key$":"entry","name__orig":"entry","Name":"Entry","name_":"entry","name-":"entry","NAME":"ENTRY","index$":0}, {"active":true,"entity":"entry","key$":"BasicEntryFlow","kind":"basic","name":"BasicEntryFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"entry_ref01"},"match":{"environment_id":"environment01","space_id":"space01"},"op":"create","spec":[],"valid":[],"index$":0},{"active":true,"data":{},"input":{},"match":{"environment_id":"environment01","space_id":"space01"},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"entry_ref01"}}],"index$":1},{"active":true,"data":{"environment_id":"environment01","space_id":"space01"},"input":{"ref":"entry_ref01","srcdatavar":"entry_ref01_data","suffix":"_up0","textfield":"contentType"},"match":{},"op":"update","spec":[{"apply":"TextFieldMark","def":{"mark":"Mark01-entry_ref01"}}],"valid":[],"index$":2},{"active":true,"data":{},"input":{"ref":"entry_ref01","srcdatavar":"entry_ref01_data","suffix":"_dt0"},"match":{"environment_id":"environment01","id":"entry01","space_id":"space01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-entry_ref01"}}],"index$":3},{"active":true,"data":{},"input":{"ref":"entry_ref01","suffix":"_rm0"},"match":{"environment_id":"environment01","id":"entry01","space_id":"space01"},"op":"remove","spec":[],"valid":[],"index$":4},{"active":true,"data":{},"input":{"suffix":"_rt0"},"match":{"environment_id":"environment01","space_id":"space01"},"op":"list","spec":[],"valid":[{"apply":"ItemNotExists","def":{"ref":"entry_ref01"}}],"index$":5}]}, 'Entry')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const entry_ref01_ent = client.Entry()
    let entry_ref01_data = setup.data.new.entry['entry_ref01']
    entry_ref01_data['environment_id'] = setup.idmap['environment01']
    entry_ref01_data['space_id'] = setup.idmap['space01']

    entry_ref01_data = (await entry_ref01_ent.create(entry_ref01_data)).data()
    assert(null != entry_ref01_data.id)


    // LIST
    const entry_ref01_match = {}
    entry_ref01_match['environment_id'] = setup.idmap['environment01']
    entry_ref01_match['space_id'] = setup.idmap['space01']

    const entry_ref01_list = (await entry_ref01_ent.list(entry_ref01_match)).map((e) => e.data())

    assert(!isempty(select(entry_ref01_list, { id: entry_ref01_data.id })))


    // UPDATE
    const entry_ref01_data_up0 = {}
    entry_ref01_data_up0.id = entry_ref01_data.id
    entry_ref01_data_up0 ['environment_id'] = setup.idmap['environment_id']
    entry_ref01_data_up0 ['space_id'] = setup.idmap['space_id']

    const entry_ref01_markdef_up0 = { name: 'contentType', value: 'Mark01-entry_ref01_' + setup.now }
    entry_ref01_data_up0 [entry_ref01_markdef_up0.name] = entry_ref01_markdef_up0.value

    const entry_ref01_resdata_up0 = (await entry_ref01_ent.update(entry_ref01_data_up0)).data()
    assert(entry_ref01_resdata_up0.id === entry_ref01_data_up0.id)

    assert(entry_ref01_resdata_up0[entry_ref01_markdef_up0.name] === entry_ref01_markdef_up0.value)


    // LOAD
    const entry_ref01_match_dt0 = {}
    entry_ref01_match_dt0.id = entry_ref01_data.id
    const entry_ref01_data_dt0 = (await entry_ref01_ent.load(entry_ref01_match_dt0)).data()
    assert(entry_ref01_data_dt0.id === entry_ref01_data.id)


    // REMOVE
    const entry_ref01_match_rm0 = {}
    entry_ref01_match_rm0.id = entry_ref01_data.id
    await entry_ref01_ent.remove(entry_ref01_match_rm0)
  

    // LIST
    const entry_ref01_match_rt0 = {}
    entry_ref01_match_rt0['environment_id'] = setup.idmap['environment01']
    entry_ref01_match_rt0['space_id'] = setup.idmap['space01']

    const entry_ref01_list_rt0 = (await entry_ref01_ent.list(entry_ref01_match_rt0)).map((e) => e.data())

    assert(isempty(select(entry_ref01_list_rt0, { id: entry_ref01_data.id })))


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/entry/EntryTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = ContentfulSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['entry01','entry02','entry03','space01','space02','space03','environment01','environment02','environment03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CONTENTFUL_TEST_ENTRY_ENTID': idmap,
    'CONTENTFUL_TEST_LIVE': 'FALSE',
    'CONTENTFUL_TEST_EXPLAIN': 'FALSE',
    'CONTENTFUL_APIKEY': '',
  })

  idmap = env['CONTENTFUL_TEST_ENTRY_ENTID']

  const live = 'TRUE' === env.CONTENTFUL_TEST_LIVE
  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CONTENTFUL_TEST_ENTRY_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new ContentfulSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.CONTENTFUL_APIKEY,
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when
      // the last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey and
      // server values above and handed the SDK undefined.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
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
    transport,
    now: Date.now(),
  }

  return setup
}
  
