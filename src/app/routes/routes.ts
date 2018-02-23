import { LayoutComponent } from '../layout/layout.component';

export const routes = [

    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', loadChildren: './home/home.module#HomeModule' },
            { path: 'inicio', loadChildren: './inicio/inicio.module#InicioModule' },
            { path: 'products', loadChildren: './products/products.module#ProductsModule' },
            { path: 'error', loadChildren: './extras/extras.module#ExtrasModule' }
        ]
    },

    // Not found
    { path: '**', redirectTo: 'error' }

];
