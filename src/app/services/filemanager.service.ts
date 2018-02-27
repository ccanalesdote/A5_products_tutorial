import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { Item } from '../models/item';

@Injectable()
export class FilemanagerService {
	itemsCollection: AngularFirestoreCollection<Item>;
	items: Observable<Item[]>;

	constructor(public afs: AngularFirestore) {		
	}

	getItems() {
		this.items = this.afs.collection('items').snapshotChanges().map(items => {
			return items.map(a => {
				const data = a.payload.doc.data() as Item;
				data.id = a.payload.doc.id;
				return data;
			});
		});
		return this.items;
	}

}