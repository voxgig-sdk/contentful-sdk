# Contentful SDK configuration


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
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
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
                "parts": [
                  "spaces",
                  "{space_id}",
                  "environments",
                  "{environment_id}",
                  "entries",
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
                "parts": [
                  "spaces",
                  "{space_id}",
                  "environments",
                  "{environment_id}",
                  "entries",
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
                "parts": [
                  "spaces",
                  "{space_id}",
                  "environments",
                  "{environment_id}",
                  "entries",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "entry_id": "id",
                  },
                },
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
                "parts": [
                  "spaces",
                  "{space_id}",
                  "environments",
                  "{environment_id}",
                  "entries",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "entry_id": "id",
                  },
                },
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
                "parts": [
                  "spaces",
                  "{space_id}",
                  "environments",
                  "{environment_id}",
                  "entries",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "entry_id": "id",
                  },
                },
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
