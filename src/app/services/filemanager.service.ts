import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { FileUpload } from '../models/file';

@Injectable()
export class FilemanagerService {
	itemsCollection: AngularFirestoreCollection<FileUpload>;
	items: Observable<FileUpload[]>;

	constructor(public afs: AngularFirestore) {	
		this.itemsCollection = this.afs.collection('items');		
	}

	getItems() {		
		this.items = this.itemsCollection.snapshotChanges().map(changes => {
			return changes.map(a => {
				const data = a.payload.doc.data() as FileUpload;
				data.id = a.payload.doc.id;
				return data;
			});
		});	
		return this.items;
	}

	addItem(item: FileUpload) {
		this.itemsCollection.add(item);
	}

}