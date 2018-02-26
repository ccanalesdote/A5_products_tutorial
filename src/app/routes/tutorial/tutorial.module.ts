import { NgModule } from '@angular/core';
import { ComponentHijo } from './hijo/hijo.component'
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: 'hijo', component: ComponentHijo }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    declarations: [
        ComponentHijo
    ],
    exports: [
        RouterModule
    ]
})

export class TutorialModule { }