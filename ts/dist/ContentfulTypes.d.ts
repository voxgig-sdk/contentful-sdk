export interface Entry {
    contentType?: string;
    createdAt?: string;
    fields?: Record<string, any>;
    id?: string;
    type?: string;
    updatedAt?: string;
}
export interface EntryLoadMatch {
    environment_id: string;
    id: string;
    space_id: string;
}
export interface EntryListMatch {
    environment_id: string;
    space_id: string;
    content_type?: string;
    limit?: number;
}
export interface EntryCreateData {
    environment_id: string;
    space_id: string;
    contentType?: string;
    createdAt?: string;
    fields?: Record<string, any>;
    id?: string;
    type?: string;
    updatedAt?: string;
}
export interface EntryUpdateData {
    environment_id: string;
    id: string;
    space_id: string;
    contentType?: string;
    createdAt?: string;
    fields?: Record<string, any>;
    type?: string;
    updatedAt?: string;
}
export interface EntryRemoveMatch {
    environment_id: string;
    id: string;
    space_id: string;
}
