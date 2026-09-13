<?php
declare(strict_types=1);

// Typed models for the Contentful SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Entry entity data model. */
class Entry
{
    public ?string $contentType = null;
    public ?string $createdAt = null;
    public ?array $fields = null;
    public ?string $id = null;
    public ?string $type = null;
    public ?string $updatedAt = null;
}

/** Request payload for Entry#load. */
class EntryLoadMatch
{
    public string $environment_id;
    public string $id;
    public string $space_id;
}

/** Request payload for Entry#list. */
class EntryListMatch
{
    public string $environment_id;
    public string $space_id;
    public ?string $content_type = null;
    public ?int $limit = null;
}

/** Request payload for Entry#create. */
class EntryCreateData
{
    public string $environment_id;
    public string $space_id;
    public ?string $contentType = null;
    public ?string $createdAt = null;
    public ?array $fields = null;
    public ?string $id = null;
    public ?string $type = null;
    public ?string $updatedAt = null;
}

/** Request payload for Entry#update. */
class EntryUpdateData
{
    public string $environment_id;
    public string $id;
    public string $space_id;
    public ?string $contentType = null;
    public ?string $createdAt = null;
    public ?array $fields = null;
    public ?string $type = null;
    public ?string $updatedAt = null;
}

/** Request payload for Entry#remove. */
class EntryRemoveMatch
{
    public string $environment_id;
    public string $id;
    public string $space_id;
}

