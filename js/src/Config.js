
const { BaseFeature } = require('./feature/base/BaseFeature')
const { TestFeature } = require('./feature/test/TestFeature')



const FEATURE_CLASS = {
   test: TestFeature,

}


class Config {

  makeFeature(fn) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(fn) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'Contentful',
        slug: "contentful",
    version: "0.0.1",
    target: "js",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
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
              "parts": [
                "spaces",
                "{space_id}",
                "environments",
                "{environment_id}",
                "entries"
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
              }
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
              "parts": [
                "spaces",
                "{space_id}",
                "environments",
                "{environment_id}",
                "entries"
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
              }
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
              "parts": [
                "spaces",
                "{space_id}",
                "environments",
                "{environment_id}",
                "entries",
                "{id}"
              ],
              "rename": {
                "param": {
                  "entry_id": "id"
                }
              },
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
              }
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
              "parts": [
                "spaces",
                "{space_id}",
                "environments",
                "{environment_id}",
                "entries",
                "{id}"
              ],
              "rename": {
                "param": {
                  "entry_id": "id"
                }
              },
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
              }
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
              "parts": [
                "spaces",
                "{space_id}",
                "environments",
                "{environment_id}",
                "entries",
                "{id}"
              ],
              "rename": {
                "param": {
                  "entry_id": "id"
                }
              },
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
              }
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

module.exports = {
  config
}

