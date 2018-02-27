import { Component, OnInit } from '@angular/core';

import { FilemanagerService } from '../../../services/filemanager.service';
import { Item } from '../../../models/item';

@Component({
	selector: 'app-file-list',
	templateUrl: './file-list.component.html',
	styleUrls: ['./file-list.component.scss']
})
export class FileListComponent implements OnInit {
	public items: Item[];

	constructor(public itemService: FilemanagerService) { }

	ngOnInit() {
		this.itemService.getItems().subscribe(items => {			
			this.items = items;
			console.log(this.items);		
		});
	}

}
