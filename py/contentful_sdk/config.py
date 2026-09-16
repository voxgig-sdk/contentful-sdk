# Contentful SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "Contentful",
            "slug": "contentful",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "debug": {
        "options": {
          "active": False,
          "max": 100,
          "redact": [
            "authorization",
            "cookie",
            "set-cookie",
            "api-key",
            "apikey",
            "x-api-key",
            "idempotency-key",
          ],
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "onEntry": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "none",
      },
            "idempotency": {
        "options": {
          "active": False,
          "header": "Idempotency-Key",
          "methods": [
            "POST",
            "PUT",
            "PATCH",
            "DELETE",
          ],
          "ops": [
            "create",
            "update",
            "remove",
          ],
        },
        "optspec": {
          "keygen": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "none",
      },
            "metrics": {
        "options": {
          "active": False,
        },
        "optspec": {
          "now": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "none",
      },
            "paging": {
        "options": {
          "active": False,
          "afterVar": "after",
          "cursorParam": "cursor",
          "firstVar": "first",
          "limitParam": "limit",
          "pageParam": "page",
          "startPage": 1,
        },
        "optspec": {
          "limit": "`$NUMBER`",
          "ops": "`$LIST`",
        },
        "strict": False,
        "transport": "none",
      },
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
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
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://api.contentful.com",
            "auth": {
                "prefix": "Bearer",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "entry": {},
            },
        },
        "entity": {
      "entry": {
        "fields": [
          {
            "name": "contentType",
            "type": "`$STRING`",
          },
          {
            "name": "createdAt",
            "type": "`$STRING`",
          },
          {
            "name": "fields",
            "type": "`$OBJECT`",
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "type",
            "type": "`$STRING`",
          },
          {
            "name": "updatedAt",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
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
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "space_id",
                      "orig": "space_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "POST",
                "orig": "/spaces/{space_id}/environments/{environment_id}/entries",
                "segments": [
                  {
                    "lit": "spaces",
                  },
                  {
                    "var": "space_id",
                  },
                  {
                    "lit": "environments",
                  },
                  {
                    "var": "environment_id",
                  },
                  {
                    "lit": "entries",
                  },
                ],
                "select": {
                  "exist": [
                    "environment_id",
                    "space_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.fields`",
                },
                "parts": [
                  "spaces",
                  "{space_id}",
                  "environments",
                  "{environment_id}",
                  "entries",
                ],
              },
            ],
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
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "space_id",
                      "orig": "space_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "content_type",
                      "orig": "content_type",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/spaces/{space_id}/environments/{environment_id}/entries",
                "segments": [
                  {
                    "lit": "spaces",
                  },
                  {
                    "var": "space_id",
                  },
                  {
                    "lit": "environments",
                  },
                  {
                    "var": "environment_id",
                  },
                  {
                    "lit": "entries",
                  },
                ],
                "select": {
                  "exist": [
                    "content_type",
                    "environment_id",
                    "limit",
                    "space_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.items`",
                },
                "parts": [
                  "spaces",
                  "{space_id}",
                  "environments",
                  "{environment_id}",
                  "entries",
                ],
              },
            ],
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
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "entry_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "space_id",
                      "orig": "space_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/spaces/{space_id}/environments/{environment_id}/entries/{entry_id}",
                "rename": {
                  "param": {
                    "entry_id": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "spaces",
                  },
                  {
                    "var": "space_id",
                  },
                  {
                    "lit": "environments",
                  },
                  {
                    "var": "environment_id",
                  },
                  {
                    "lit": "entries",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "environment_id",
                    "id",
                    "space_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.fields`",
                },
                "parts": [
                  "spaces",
                  "{space_id}",
                  "environments",
                  "{environment_id}",
                  "entries",
                  "{id}",
                ],
              },
            ],
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
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "entry_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "space_id",
                      "orig": "space_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "DELETE",
                "orig": "/spaces/{space_id}/environments/{environment_id}/entries/{entry_id}",
                "rename": {
                  "param": {
                    "entry_id": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "spaces",
                  },
                  {
                    "var": "space_id",
                  },
                  {
                    "lit": "environments",
                  },
                  {
                    "var": "environment_id",
                  },
                  {
                    "lit": "entries",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "environment_id",
                    "id",
                    "space_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "spaces",
                  "{space_id}",
                  "environments",
                  "{environment_id}",
                  "entries",
                  "{id}",
                ],
              },
            ],
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
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "entry_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "space_id",
                      "orig": "space_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "PUT",
                "orig": "/spaces/{space_id}/environments/{environment_id}/entries/{entry_id}",
                "rename": {
                  "param": {
                    "entry_id": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "spaces",
                  },
                  {
                    "var": "space_id",
                  },
                  {
                    "lit": "environments",
                  },
                  {
                    "var": "environment_id",
                  },
                  {
                    "lit": "entries",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "environment_id",
                    "id",
                    "space_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.fields`",
                },
                "parts": [
                  "spaces",
                  "{space_id}",
                  "environments",
                  "{environment_id}",
                  "entries",
                  "{id}",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "space",
              "environment",
            ],
          ],
        },
      },
    },
    }
