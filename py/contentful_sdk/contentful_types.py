# Typed models for the Contentful SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Entry(TypedDict, total=False):
    contentType: str
    createdAt: str
    fields: dict
    id: str
    type: str
    updatedAt: str


class EntryLoadMatch(TypedDict):
    environment_id: str
    id: str
    space_id: str


class EntryListMatchRequired(TypedDict):
    environment_id: str
    space_id: str


class EntryListMatch(EntryListMatchRequired, total=False):
    content_type: str
    limit: int


class EntryCreateDataRequired(TypedDict):
    environment_id: str
    space_id: str


class EntryCreateData(EntryCreateDataRequired, total=False):
    contentType: str
    createdAt: str
    fields: dict
    id: str
    type: str
    updatedAt: str


class EntryUpdateDataRequired(TypedDict):
    environment_id: str
    id: str
    space_id: str


class EntryUpdateData(EntryUpdateDataRequired, total=False):
    contentType: str
    createdAt: str
    fields: dict
    type: str
    updatedAt: str


class EntryRemoveMatch(TypedDict):
    environment_id: str
    id: str
    space_id: str
