import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Product } from '../models/product';
import { GLOBAL } from './global';

@Injectable()

export class ProductService {
    public url: string;

    constructor(
        public _http: Http
    ) {
        this.url = GLOBAL.url;
    }

    getProducts() {
        return this._http.get(this.url + 'get_productos').map(res => res.json());
    }

    getProduct(id) {
        return this._http.get(this.url + 'get_producto/' + id).map(res => res.json());
    }

    addProduct(product: Product) {
        let json = JSON.stringify(product);
        let params = 'json=' + json;
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

        return this._http.post(this.url + 'productos', params, { headers: headers })
            .map(res => res.json());
    }

    editProduct(product: Product) {
        let json = JSON.stringify(product);
        let params = 'json=' + json;
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

        return this._http.post(this.url + 'productos', params, { headers: headers })
            .map(res => res.json());
    }

    deleteProduct(id) {
        return this._http.get(this.url + 'delete_producto/' + id).map(res => res.json());
    }

    makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
        return new Promise((resolve, reject) => {
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();

            for (var i = 0; i < files.length; i++) {
                formData.append('uploads[]', files[i], files[i].name);
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            };

            xhr.open("POST", url, true);
            xhr.send(formData);
        })
    }

}