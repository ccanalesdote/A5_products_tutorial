import { Component } from '@angular/core';

@Component({
    selector: 'component-hijo',
    templateUrl: './hijo.component.html'
})

export class ComponentHijo {
    public titulo : string;

    constructor(){
        this.titulo = 'Componente Hijo';
    }

}