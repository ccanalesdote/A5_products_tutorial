import { NgModule } from '@angular/core';
import { ErrorComponent } from './error/error.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', component: ErrorComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    declarations: [ErrorComponent],
    exports: [
        RouterModule
    ]
})
export class ExtrasModule { }
