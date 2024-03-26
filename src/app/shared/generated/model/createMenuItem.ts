/**
 * onecx-workspace-bff
 * OneCx workspace Bff
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { Scope } from './scope';


export interface CreateMenuItem { 
    workspaceId: string;
    key?: string;
    name?: string;
    description?: string;
    url?: string;
    disabled?: boolean;
    position?: number;
    badge?: string;
    scope?: Scope;
    external?: boolean;
    parentItemId?: string;
    i18n?: { [key: string]: string; };
}


