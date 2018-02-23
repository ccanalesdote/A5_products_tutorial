import { Component } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product'

//const swal = require('sweetalert');
import swal from 'sweetalert2';

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
        this.getProducts();
    }

    getProducts() {
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
        swal({
            title: '¿Estas seguro de eliminar el registro?',
            text: "¡Esta acción no se podrá revertir!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Borrar',
            cancelButtonText: 'Cancel',
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            buttonsStyling: false,
            reverseButtons: false
        }).then((result) => {
            if (result.value) {
                this._productService.deleteProduct(id).subscribe(
                    response => {
                        this.getProducts();
                    },
                    error => {
                        console.log(<any>error);
                    }
                );
                swal(
                    'Eliminado',
                    'El registro fue eliminado correctamente.',
                    'success'
                )
            } else if (
                // Read more about handling dismissals
                result.dismiss === swal.DismissReason.cancel
            ) {
                swal(
                    'Cancelado',
                    'No se ha eliminado el registro :)',
                    'error'
                )
            }
        })
    }
}