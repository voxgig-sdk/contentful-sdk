"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const TestFeature_1 = require("./feature/test/TestFeature");
const FEATURE_CLASS = {
    test: TestFeature_1.TestFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'Contentful',
        slug: "contentful",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        test: {
            "options": {
                "active": false
            },
            "transport": "base"
        },
    };
    options = {
        base: "https://api.contentful.com",
        auth: {
            prefix: 'Bearer',
        },
        headers: {
            "content-type": "application/json"
        },
        entity: {
            entry: {},
        }
    };
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
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map