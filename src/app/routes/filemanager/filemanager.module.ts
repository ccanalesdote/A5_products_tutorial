import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FileListComponent } from './file-list/file-list.component';
import { CommonModule } from '@angular/common';

import { FilemanagerService } from './../../services/filemanager.service';

const routes: Routes = [
    { path: 'list', component: FileListComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule
    ],
    declarations: [FileListComponent],
    providers: [FilemanagerService],
    exports: [
        RouterModule
    ]
})
export class FileManagerModule { }