import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';

import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product';
import { GLOBAL } from '../../../services/global';

@Component({
    selector: 'product-add',
    templateUrl: 'product-add.component.html',
    styleUrls: ['product-add.component.scss'],
    providers: [ProductService]
})

export class ProductAddComponent {
    public titulo: string;
    public producto: Product;
    public filesToUpload;
    public resultUpload;
    public is_edit: boolean;
    public imagen_seleccionada: string;
    public url: string;
    data1: any;
    cropperSettings: CropperSettings;

    @ViewChild('cropper', undefined) cropper: ImageCropperComponent;

    constructor(
        private _productoService: ProductService,
        private _route: ActivatedRoute,
        private _router: Router
    ) {
        this.titulo = 'Creación de Producto.';
        this.imagen_seleccionada = 'noimage.png';
        this.producto = new Product(0, '', '', 0, '');
        this.filesToUpload = [];
        this.is_edit = false;
        this.cropperSettings = new CropperSettings();
        this.url = GLOBAL.source;

        this.cropperSettings.noFileInput = true;

        this.cropperSettings.width = 200;
        this.cropperSettings.height = 200;

        this.cropperSettings.croppedWidth = 200;
        this.cropperSettings.croppedHeight = 200;

        this.cropperSettings.canvasWidth = 460;
        this.cropperSettings.canvasHeight = 400;

        this.cropperSettings.minWidth = 100;
        this.cropperSettings.minHeight = 100;

        this.cropperSettings.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
        this.cropperSettings.cropperDrawSettings.strokeWidth = 2;

        this.cropperSettings.rounded = false;

        this.data1 = {};
    }

    setRoundedMethod(value: boolean) {
        this.cropperSettings.rounded = value;
    }

    cropped(bounds: Bounds) {
        console.log(bounds);
    }

    fileChangeListener($event) {
        let image: any = new Image();
        let file: File = $event.target.files[0];
        let myReader: FileReader = new FileReader();
        let that = this;
        myReader.onloadend = function (loadEvent: any) {
            image.src = loadEvent.target.result;
            that.cropper.setImage(image);
        };

        myReader.readAsDataURL(file);
    }

    ngOnInit() {
        console.log('Se ha cargado el componente <ProductAddComponent>');
        this.getProducto();
    }

    /* onSubmit() {
        if (this.filesToUpload.length > 0) {
            this._productoService.makeFileRequest(GLOBAL.url + 'upload', [], this.filesToUpload).then((result) => {
                this.producto.imagen = result['filename'];
                this.saveProducto();
            }, (error) => {
                console.log(error);
            });
        } else {
            this.saveProducto();
        }
    } */

    onSubmit() {
        console.log(this.producto);
        if (this.producto.id == 0) {
            this._productoService.addProduct(this.producto).subscribe(
                response => {
                    this._router.navigate(['/products/list']);
                },
                error => {
                    console.log(<any>error);
                }
            );
        } else {
            this._productoService.editProduct(this.producto).subscribe(
                response => {
                    this._router.navigate(['/products/list']);
                },
                error => {
                    console.log(<any>error);
                }
            );
        }
        
    }

    fileChangeEvent(fileInput: any) {
        this.filesToUpload = <Array<File>>fileInput.target.files;
        this._productoService.makeFileRequest(GLOBAL.url + 'upload', [], this.filesToUpload).then((result) => {
            this.producto.imagen = result['filename'];
            this.imagen_seleccionada = this.producto.imagen;
        }, (error) => {
            console.log(error);
        });
    }

    getProducto() {
        this._route.params.forEach((params: Params) => {
            let id = params['id'];

            if (id) {
                this.titulo = 'Edición de Producto';
                this.is_edit = true;                
                this._productoService.getProduct(id).subscribe(
                    response => {
                        this.producto = response[0];
                        if (this.producto.imagen) {
                            this.imagen_seleccionada = this.producto.imagen;
                        } else {
                            this.imagen_seleccionada = 'noimage.png';
                        }
                    },
                    error => {
                        console.log(<any>error);
                    }
                )
            }
        })
    }    
}