import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FileListComponent } from './file-list/file-list.component';
import { CommonModule } from '@angular/common';
import { NgMathPipesModule } from 'angular-pipes';

import { SharedModule } from '../../shared/shared.module';

import { FilemanagerService } from './../../services/filemanager.service';
import { ProductService } from './../../services/product.service';

const routes: Routes = [
    { path: 'list', component: FileListComponent },
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        CommonModule,
        NgMathPipesModule
    ],
    declarations: [FileListComponent],
    providers: [
        FilemanagerService,
        ProductService
    ],
    exports: [
        RouterModule
    ]
})
export class FileManagerModule { }