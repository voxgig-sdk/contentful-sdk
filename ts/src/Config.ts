
import { BaseFeature } from './feature/base/BaseFeature'
import { DebugFeature } from './feature/debug/DebugFeature'
import { IdempotencyFeature } from './feature/idempotency/IdempotencyFeature'
import { MetricsFeature } from './feature/metrics/MetricsFeature'
import { PagingFeature } from './feature/paging/PagingFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   debug: DebugFeature,
 idempotency: IdempotencyFeature,
 metrics: MetricsFeature,
 paging: PagingFeature,
 ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'Contentful',
        slug: "contentful",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     debug:     {
      "options": {
        "active": false,
        "max": 100,
        "redact": [
          "authorization",
          "cookie",
          "set-cookie",
          "api-key",
          "apikey",
          "x-api-key",
          "idempotency-key"
        ]
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "onEntry": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "none"
    },
 idempotency:     {
      "options": {
        "active": false,
        "header": "Idempotency-Key",
        "methods": [
          "POST",
          "PUT",
          "PATCH",
          "DELETE"
        ],
        "ops": [
          "create",
          "update",
          "remove"
        ]
      },
      "optspec": {
        "keygen": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "none"
    },
 metrics:     {
      "options": {
        "active": false
      },
      "optspec": {
        "now": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "none"
    },
 paging:     {
      "options": {
        "active": false,
        "afterVar": "after",
        "cursorParam": "cursor",
        "firstVar": "first",
        "limitParam": "limit",
        "pageParam": "page",
        "startPage": 1
      },
      "optspec": {
        "limit": "`$NUMBER`",
        "ops": "`$LIST`"
      },
      "strict": false,
      "transport": "none"
    },
 ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
        "factor": 2,
        "maxDelay": 2000,
        "minDelay": 50,
        "retries": 2,
        "statuses": [
          408,
          425,
          429,
          500,
          502,
          503,
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },

  }


  options = {
    base: "https://api.contentful.com",

    auth: {
      prefix: 'Bearer',
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      entry: {
      },

    }
  }


  entity = {
    "entry": {
      "fields": [
        {
          "name": "contentType",
          "type": "`$STRING`"
        },
        {
          "name": "createdAt",
          "type": "`$STRING`"
        },
        {
          "name": "fields",
          "type": "`$OBJECT`"
        },
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "type",
          "type": "`$STRING`"
        },
        {
          "name": "updatedAt",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "entry",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "environment_id",
                    "orig": "environment_id",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "param",
                    "name": "space_id",
                    "orig": "space_id",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "POST",
              "orig": "/spaces/{space_id}/environments/{environment_id}/entries",
              "segments": [
                {
                  "lit": "spaces"
                },
                {
                  "var": "space_id"
                },
                {
                  "lit": "environments"
                },
                {
                  "var": "environment_id"
                },
                {
                  "lit": "entries"
                }
              ],
              "select": {
                "exist": [
                  "environment_id",
                  "space_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.fields`"
              },
              "parts": [
                "spaces",
                "{space_id}",
                "environments",
                "{environment_id}",
                "entries"
              ]
            }
          ]
        },
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "environment_id",
                    "orig": "environment_id",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "param",
                    "name": "space_id",
                    "orig": "space_id",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "content_type",
                    "orig": "content_type",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/spaces/{space_id}/environments/{environment_id}/entries",
              "segments": [
                {
                  "lit": "spaces"
                },
                {
                  "var": "space_id"
                },
                {
                  "lit": "environments"
                },
                {
                  "var": "environment_id"
                },
                {
                  "lit": "entries"
                }
              ],
              "select": {
                "exist": [
                  "content_type",
                  "environment_id",
                  "limit",
                  "space_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.items`"
              },
              "parts": [
                "spaces",
                "{space_id}",
                "environments",
                "{environment_id}",
                "entries"
              ]
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "environment_id",
                    "orig": "environment_id",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "entry_id",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "param",
                    "name": "space_id",
                    "orig": "space_id",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/spaces/{space_id}/environments/{environment_id}/entries/{entry_id}",
              "rename": {
                "param": {
                  "entry_id": "id"
                }
              },
              "segments": [
                {
                  "lit": "spaces"
                },
                {
                  "var": "space_id"
                },
                {
                  "lit": "environments"
                },
                {
                  "var": "environment_id"
                },
                {
                  "lit": "entries"
                },
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "environment_id",
                  "id",
                  "space_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.fields`"
              },
              "parts": [
                "spaces",
                "{space_id}",
                "environments",
                "{environment_id}",
                "entries",
                "{id}"
              ]
            }
          ]
        },
        "remove": {
          "input": "data",
          "name": "remove",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "environment_id",
                    "orig": "environment_id",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "entry_id",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "param",
                    "name": "space_id",
                    "orig": "space_id",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "DELETE",
              "orig": "/spaces/{space_id}/environments/{environment_id}/entries/{entry_id}",
              "rename": {
                "param": {
                  "entry_id": "id"
                }
              },
              "segments": [
                {
                  "lit": "spaces"
                },
                {
                  "var": "space_id"
                },
                {
                  "lit": "environments"
                },
                {
                  "var": "environment_id"
                },
                {
                  "lit": "entries"
                },
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "environment_id",
                  "id",
                  "space_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "spaces",
                "{space_id}",
                "environments",
                "{environment_id}",
                "entries",
                "{id}"
              ]
            }
          ]
        },
        "update": {
          "input": "data",
          "name": "update",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "environment_id",
                    "orig": "environment_id",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "entry_id",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "param",
                    "name": "space_id",
                    "orig": "space_id",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "PUT",
              "orig": "/spaces/{space_id}/environments/{environment_id}/entries/{entry_id}",
              "rename": {
                "param": {
                  "entry_id": "id"
                }
              },
              "segments": [
                {
                  "lit": "spaces"
                },
                {
                  "var": "space_id"
                },
                {
                  "lit": "environments"
                },
                {
                  "var": "environment_id"
                },
                {
                  "lit": "entries"
                },
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "environment_id",
                  "id",
                  "space_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.fields`"
              },
              "parts": [
                "spaces",
                "{space_id}",
                "environments",
                "{environment_id}",
                "entries",
                "{id}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "space",
            "environment"
          ]
        ]
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

