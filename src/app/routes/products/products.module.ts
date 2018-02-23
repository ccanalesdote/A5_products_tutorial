import { NgModule } from '@angular/core';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ng2-img-cropper';

const routes: Routes = [
    { path: 'list', component: ProductsListComponent },
    { path: 'edit', component: ProductAddComponent },
    { path: 'edit/:id', component: ProductAddComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        FormsModule,
        ImageCropperModule
    ],
    declarations: [
        ProductsListComponent,
        ProductAddComponent
    ],
    exports: [
        RouterModule
    ]
})

export class ProductsModule { }