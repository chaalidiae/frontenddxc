import {Routes} from '@angular/router';
import {IndexRoutes} from './main/index/index.router';
import {NoPageRoutes} from './main/no-page/no-page.routes';



export const routes: Routes = [...IndexRoutes, ...NoPageRoutes];

