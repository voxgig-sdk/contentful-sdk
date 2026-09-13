package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Contentful",
			"slug": "contentful",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://api.contentful.com",
			"auth": map[string]any{
				"prefix": "Bearer",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"entry": map[string]any{},
			},
		},
		"entity": map[string]any{
			"entry": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "contentType",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "createdAt",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "fields",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "updatedAt",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "entry",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "environment_id",
											"orig": "environment_id",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "space_id",
											"orig": "space_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/spaces/{space_id}/environments/{environment_id}/entries",
								"segments": []any{
									map[string]any{
										"lit": "spaces",
									},
									map[string]any{
										"var": "space_id",
									},
									map[string]any{
										"lit": "environments",
									},
									map[string]any{
										"var": "environment_id",
									},
									map[string]any{
										"lit": "entries",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"environment_id",
										"space_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.fields`",
								},
								"parts": []any{
									"spaces",
									"{space_id}",
									"environments",
									"{environment_id}",
									"entries",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "environment_id",
											"orig": "environment_id",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "space_id",
											"orig": "space_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "content_type",
											"orig": "content_type",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/spaces/{space_id}/environments/{environment_id}/entries",
								"segments": []any{
									map[string]any{
										"lit": "spaces",
									},
									map[string]any{
										"var": "space_id",
									},
									map[string]any{
										"lit": "environments",
									},
									map[string]any{
										"var": "environment_id",
									},
									map[string]any{
										"lit": "entries",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"content_type",
										"environment_id",
										"limit",
										"space_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.items`",
								},
								"parts": []any{
									"spaces",
									"{space_id}",
									"environments",
									"{environment_id}",
									"entries",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "environment_id",
											"orig": "environment_id",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "entry_id",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "space_id",
											"orig": "space_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/spaces/{space_id}/environments/{environment_id}/entries/{entry_id}",
								"rename": map[string]any{
									"param": map[string]any{
										"entry_id": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "spaces",
									},
									map[string]any{
										"var": "space_id",
									},
									map[string]any{
										"lit": "environments",
									},
									map[string]any{
										"var": "environment_id",
									},
									map[string]any{
										"lit": "entries",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"environment_id",
										"id",
										"space_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.fields`",
								},
								"parts": []any{
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
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "environment_id",
											"orig": "environment_id",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "entry_id",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "space_id",
											"orig": "space_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "DELETE",
								"orig": "/spaces/{space_id}/environments/{environment_id}/entries/{entry_id}",
								"rename": map[string]any{
									"param": map[string]any{
										"entry_id": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "spaces",
									},
									map[string]any{
										"var": "space_id",
									},
									map[string]any{
										"lit": "environments",
									},
									map[string]any{
										"var": "environment_id",
									},
									map[string]any{
										"lit": "entries",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"environment_id",
										"id",
										"space_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
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
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "environment_id",
											"orig": "environment_id",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "entry_id",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "space_id",
											"orig": "space_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "PUT",
								"orig": "/spaces/{space_id}/environments/{environment_id}/entries/{entry_id}",
								"rename": map[string]any{
									"param": map[string]any{
										"entry_id": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "spaces",
									},
									map[string]any{
										"var": "space_id",
									},
									map[string]any{
										"lit": "environments",
									},
									map[string]any{
										"var": "environment_id",
									},
									map[string]any{
										"lit": "entries",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"environment_id",
										"id",
										"space_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.fields`",
								},
								"parts": []any{
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
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"space",
							"environment",
						},
					},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
