import { Component, OnInit } from '@angular/core';

import { FilemanagerService } from '../../../services/filemanager.service';
import { ProductService } from '../../../services/product.service';
import { GLOBAL } from '../../../services/global';
import { FileUpload } from '../../../models/file';

@Component({
	selector: 'app-file-list',
	templateUrl: './file-list.component.html',
	styleUrls: ['./file-list.component.scss']
})
export class FileListComponent implements OnInit {
	public items: FileUpload[];
	public filesToUpload;
	fileUpload: FileUpload = {
		name: '',
		size: 0,
		url: '',
		type: ''
	}

	constructor(
		private _itemService: FilemanagerService,
		private _productoService: ProductService,
	) {
		//this.fileUpload = new FileUpload('','','',0,null,'','');
		this.filesToUpload = [];
	}

	ngOnInit() {
		this._itemService.getItems().subscribe(items => {
			this.items = this.formatItems(items);			
			console.log(this.items);
		});
	}

	fileChangeListener($event) {
		//get data file
		let file: File = $event.target.files[0];
		this.fileUpload.name = file.name;
		this.fileUpload.size = file.size;
		this.fileUpload.type = file.type;
		this.fileUpload.date_last = file.lastModifiedDate;
		//upload file
		this.filesToUpload = <Array<File>>$event.target.files;
		this._productoService.makeFileRequest(GLOBAL.url + 'uploadFile', [], this.filesToUpload).then((result) => {
			this.fileUpload.url = result['filename'];
			this._itemService.addItem(this.fileUpload);
		}, (error) => {
			console.log(error);
		});
	}

	formatItems(items: Array<FileUpload>) {
		for (let item of items) {
			if(item.type.includes("image")) {
				item.type = 'file-image-o text-success';
			} else if(item.type.includes("video")) {
				item.type = 'file-movie-o text-danger';
			} else if(item.type.includes("application") || item.type.includes("text")) {
				item.type = 'file-code-o text-purple';			
			} else if(item.type.includes("audio")) {
				item.type = 'file-audio-o text-primary';
			} else {
				item.type = 'file-o text-warning';
			}
		}
		return items;
	}

}
