import { LayoutComponent } from '../layout/layout.component';

import { LoginComponent } from './pages/login/login.component';

export const routes = [

    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', loadChildren: './home/home.module#HomeModule' },
            { path: 'inicio', loadChildren: './inicio/inicio.module#InicioModule' },
            { path: 'products', loadChildren: './products/products.module#ProductsModule' },
            { path: 'tutorial', loadChildren: './tutorial/tutorial.module#TutorialModule' },
            { path: 'error', loadChildren: './extras/extras.module#ExtrasModule' },
            { path: 'file', loadChildren: './filemanager/filemanager.module#FileManagerModule' },
        ]
    },

    // 
    { path: 'login', component: LoginComponent },

    // Not found
    { path: '**', redirectTo: 'error' }    

];
