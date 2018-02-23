import { NgModule } from '@angular/core';
import { InicioComponent } from './inicio/inicio.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', component: InicioComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    declarations: [InicioComponent],
    exports: [
        RouterModule
    ]
})
export class InicioModule { }
