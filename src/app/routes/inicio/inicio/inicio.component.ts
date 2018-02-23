import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'inicio',
    templateUrl: './inicio.component.html'
})

export class InicioComponent {
    public titulo: string;

    constructor() {
        this.titulo = 'Pagina Principal';
    }

    ngOnInit(){
        console.log('Se ha cargado el componente <InicioComponent>');
    }
}