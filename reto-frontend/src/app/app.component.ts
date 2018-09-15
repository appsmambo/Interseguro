import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

const misDestinos = ['Lima', 'India', 'Estados Unidos', 'USA', 'Colombia'];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  //public model: any;
  title = 'Cotizador de seguro de viajes';
  destino = '';
  timerid = 0;
  slash = '/';
  dataDestinos = [];
  configServicios = {
    'destinos':'https://testsoat.interseguro.com.pe/talentfestapi/destinos',
    'destinosTemp':'https://my-json-server.typicode.com/appsmambo/dataInterseguro3/destinos/?pais=',
    'cotizacion':'https://testsoat.interseguro.com.pe/talentfestapi/cotizacion'
  };

  constructor(private httpClient:HttpClient){}

  onNameKeyUp(event:any) {
    var c = this;
    c.destino = event.target.value;
    if(event.target.dataset.last != c.destino){
      event.target.dataset.last = c.destino;
      clearTimeout(c.timerid);
      c.timerid = setTimeout(function() {
        //$('#buscarColegio').addClass('loading');
        c.httpClient.get(c.configServicios.destinosTemp + c.destino)
        .subscribe(
          (data:any[]) => {
            c.dataDestinos = data;
          }
        )
      },500);
    };
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      /*map(term => term.length < 2 ? []
        : this.dataDestinos.filter(v => v.pais.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))*/
      map(term => term.length < 2 ? []
        : misDestinos.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
  )

/*  formatter = (x: {
    pais: string
  }) => x.pais;*/

}
