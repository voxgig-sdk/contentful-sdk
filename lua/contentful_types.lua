-- Typed models for the Contentful SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Entry
---@field contentType? string
---@field createdAt? string
---@field fields? table
---@field id? string
---@field type? string
---@field updatedAt? string

---@class EntryLoadMatch
---@field environment_id string
---@field id string
---@field space_id string

---@class EntryListMatch
---@field environment_id string
---@field space_id string
---@field content_type? string
---@field limit? number

---@class EntryCreateData
---@field environment_id string
---@field space_id string
---@field contentType? string
---@field createdAt? string
---@field fields? table
---@field id? string
---@field type? string
---@field updatedAt? string

---@class EntryUpdateData
---@field environment_id string
---@field id string
---@field space_id string
---@field contentType? string
---@field createdAt? string
---@field fields? table
---@field type? string
---@field updatedAt? string

---@class EntryRemoveMatch
---@field environment_id string
---@field id string
---@field space_id string

local M = {}

return M
