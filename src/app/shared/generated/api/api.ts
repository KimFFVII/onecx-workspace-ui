export * from './imagesInternal.service';
import { ImagesInternalAPIService } from './imagesInternal.service';
export * from './menuItem.service';
import { MenuItemAPIService } from './menuItem.service';
export * from './product.service';
import { ProductAPIService } from './product.service';
export * from './workspace.service';
import { WorkspaceAPIService } from './workspace.service';
export const APIS = [ImagesInternalAPIService, MenuItemAPIService, ProductAPIService, WorkspaceAPIService];
