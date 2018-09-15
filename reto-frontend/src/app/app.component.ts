import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Cotizador de seguro de viajes';
  destino = '';
  timerid = 0;
  slash = '/';
  configServicios = {
    'destinos':'https://testsoat.interseguro.com.pe/talentfestapi/destinos',
    'cotizacion':'https://testsoat.interseguro.com.pe/talentfestapi/cotizacion'
  };

  constructor(private httpClient:HttpClient){  }

  buscarDestinos() {
    console.log(this.destino);
    //return http.get(this.configServicios.destinos).suscribe(data => {data});
    /*return http({
      url: this.configServicios.destinos,
      method: 'GET',
      data: {"destino_input": d}
    }).then(function successCallback(response) {
      // this callback will be called asynchronously
      // when the response is available
      console.log(response.data);
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      console.log(response.statusText);
    });*/
  }

  onNameKeyUp(event:any) {
  this.destino = event.target.value;
  console.log(this.destino)
  this.httpClient.get(this.configServicios.destinos + this.slash + this.destino)
        .subscribe(
          (data:any[]) => {
            console.log(data)
          }
        )
    this.destino = event.target.value;
    if(event.target.dataset.last != this.destino){
      event.target.dataset.last = this.destino;
      clearTimeout(this.timerid);
      this.timerid = setTimeout(function() {
        //$('#buscarColegio').addClass('loading');
        /*httpClient.get(this.configServicios.destinos + this.slash + this.destino)
        .subscribe(
          (data:any[]) => {
            console.log(data)
          }
        )*/
      },500);
    };
  }
  

  
  //buscarDestinos('Lim');
}
