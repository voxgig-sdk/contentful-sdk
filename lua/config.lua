-- Contentful SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "Contentful",
      slug = "contentful",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["transport"] = "base",
      },
    },
    options = {
      base = "https://api.contentful.com",
      auth = {
        prefix = "Bearer",
      },
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["entry"] = {},
      },
    },
    entity = {
      ["entry"] = {
        ["fields"] = {
          {
            ["name"] = "contentType",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "createdAt",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "fields",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "type",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "updatedAt",
            ["type"] = "`$STRING`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "entry",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "environment_id",
                      ["orig"] = "environment_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "param",
                      ["name"] = "space_id",
                      ["orig"] = "space_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/spaces/{space_id}/environments/{environment_id}/entries",
                ["segments"] = {
                  {
                    ["lit"] = "spaces",
                  },
                  {
                    ["var"] = "space_id",
                  },
                  {
                    ["lit"] = "environments",
                  },
                  {
                    ["var"] = "environment_id",
                  },
                  {
                    ["lit"] = "entries",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "environment_id",
                    "space_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.fields`",
                },
                ["parts"] = {
                  "spaces",
                  "{space_id}",
                  "environments",
                  "{environment_id}",
                  "entries",
                },
              },
            },
          },
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "environment_id",
                      ["orig"] = "environment_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "param",
                      ["name"] = "space_id",
                      ["orig"] = "space_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "content_type",
                      ["orig"] = "content_type",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/spaces/{space_id}/environments/{environment_id}/entries",
                ["segments"] = {
                  {
                    ["lit"] = "spaces",
                  },
                  {
                    ["var"] = "space_id",
                  },
                  {
                    ["lit"] = "environments",
                  },
                  {
                    ["var"] = "environment_id",
                  },
                  {
                    ["lit"] = "entries",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "content_type",
                    "environment_id",
                    "limit",
                    "space_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.items`",
                },
                ["parts"] = {
                  "spaces",
                  "{space_id}",
                  "environments",
                  "{environment_id}",
                  "entries",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "environment_id",
                      ["orig"] = "environment_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "entry_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "param",
                      ["name"] = "space_id",
                      ["orig"] = "space_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/spaces/{space_id}/environments/{environment_id}/entries/{entry_id}",
                ["rename"] = {
                  ["param"] = {
                    ["entry_id"] = "id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "spaces",
                  },
                  {
                    ["var"] = "space_id",
                  },
                  {
                    ["lit"] = "environments",
                  },
                  {
                    ["var"] = "environment_id",
                  },
                  {
                    ["lit"] = "entries",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "environment_id",
                    "id",
                    "space_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.fields`",
                },
                ["parts"] = {
                  "spaces",
                  "{space_id}",
                  "environments",
                  "{environment_id}",
                  "entries",
                  "{id}",
                },
              },
            },
          },
          ["remove"] = {
            ["input"] = "data",
            ["name"] = "remove",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "environment_id",
                      ["orig"] = "environment_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "entry_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "param",
                      ["name"] = "space_id",
                      ["orig"] = "space_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "DELETE",
                ["orig"] = "/spaces/{space_id}/environments/{environment_id}/entries/{entry_id}",
                ["rename"] = {
                  ["param"] = {
                    ["entry_id"] = "id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "spaces",
                  },
                  {
                    ["var"] = "space_id",
                  },
                  {
                    ["lit"] = "environments",
                  },
                  {
                    ["var"] = "environment_id",
                  },
                  {
                    ["lit"] = "entries",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "environment_id",
                    "id",
                    "space_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "spaces",
                  "{space_id}",
                  "environments",
                  "{environment_id}",
                  "entries",
                  "{id}",
                },
              },
            },
          },
          ["update"] = {
            ["input"] = "data",
            ["name"] = "update",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "environment_id",
                      ["orig"] = "environment_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "entry_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "param",
                      ["name"] = "space_id",
                      ["orig"] = "space_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "PUT",
                ["orig"] = "/spaces/{space_id}/environments/{environment_id}/entries/{entry_id}",
                ["rename"] = {
                  ["param"] = {
                    ["entry_id"] = "id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "spaces",
                  },
                  {
                    ["var"] = "space_id",
                  },
                  {
                    ["lit"] = "environments",
                  },
                  {
                    ["var"] = "environment_id",
                  },
                  {
                    ["lit"] = "entries",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "environment_id",
                    "id",
                    "space_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.fields`",
                },
                ["parts"] = {
                  "spaces",
                  "{space_id}",
                  "environments",
                  "{environment_id}",
                  "entries",
                  "{id}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "space",
              "environment",
            },
          },
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
