// Typed models for the Contentful SDK (JSDoc typedefs).
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
// edit by hand.

/**
 * @typedef {Object} Entry
 * @property {string} [contentType]
 * @property {string} [createdAt]
 * @property {Object} [fields]
 * @property {string} [id]
 * @property {string} [type]
 * @property {string} [updatedAt]
 */

/**
 * @typedef {Object} EntryLoadMatch
 * @property {string} environment_id
 * @property {string} id
 * @property {string} space_id
 */

/**
 * @typedef {Object} EntryListMatch
 * @property {string} environment_id
 * @property {string} space_id
 * @property {string} [content_type]
 * @property {number} [limit]
 */

/**
 * @typedef {Object} EntryCreateData
 * @property {string} environment_id
 * @property {string} space_id
 * @property {string} [contentType]
 * @property {string} [createdAt]
 * @property {Object} [fields]
 * @property {string} [id]
 * @property {string} [type]
 * @property {string} [updatedAt]
 */

/**
 * @typedef {Object} EntryUpdateData
 * @property {string} environment_id
 * @property {string} id
 * @property {string} space_id
 * @property {string} [contentType]
 * @property {string} [createdAt]
 * @property {Object} [fields]
 * @property {string} [type]
 * @property {string} [updatedAt]
 */

/**
 * @typedef {Object} EntryRemoveMatch
 * @property {string} environment_id
 * @property {string} id
 * @property {string} space_id
 */

