/**
 * onecx-workspace-bff
 * OneCX Workspace BFF
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { Assignment } from './assignment';


export interface AssignmentPageResult { 
    /**
     * The total elements in the resource.
     */
    totalElements?: number;
    number?: number;
    size?: number;
    totalPages?: number;
    stream?: Array<Assignment>;
}

