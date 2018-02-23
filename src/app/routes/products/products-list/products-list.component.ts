import { Component } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product'

@Component({
    selector: 'products-list',
    templateUrl: './products-list.component.html',
    providers: [ProductService]
})

export class ProductsListComponent {
    public titulo: string;
    public productos: Product[];
    public imagen_seleccionada: string;

    constructor(
        private _productService: ProductService
    ) {
        this.titulo = 'Listado de Productos';
        this.imagen_seleccionada = 'noimage.png';
    }

    ngOnInit() {
        console.log('Se ha cargado el componente <ProductsListComponent>');

        this._productService.getProducts().subscribe(
            result => {
                this.productos = result;
            },
            error => {
                console.log(<any>error);
            }
        );
    }

    changeImage(url: string) {
        if (url) {
            this.imagen_seleccionada = url;
        } else {
            this.imagen_seleccionada = 'noimage.png';
        }
    }

    delete(id) {
        console.log(id);
    }
}