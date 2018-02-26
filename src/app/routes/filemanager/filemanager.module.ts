import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FileListComponent } from './file-list/file-list.component';

const routes: Routes = [
    { path: 'list', component: FileListComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    declarations: [FileListComponent],
    exports: [
        RouterModule
    ]
})
export class FileManagerModule { }