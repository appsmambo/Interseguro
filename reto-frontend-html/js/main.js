const destinoUrl = 'https://testsoat.interseguro.com.pe/talentfestapi/destinos/';
const cotizarUrl = 'https://testsoat.interseguro.com.pe/talentfestapi/cotizacion';
function avanza() {
/*  $('.f1-progress-line').width('100%');
  $('.f1-step:first-child').toggleClass('active', 'activated');
  $('.f1-step:last-child').addClass('active');*/
}
function espera(m) {
  avanza();
  $.blockUI({
    message: '<h5>' + m + '</h5>',
    css: {
      border: 'none', 
      padding: '15px', 
      backgroundColor: '#000', 
      '-webkit-border-radius': '10px', 
      '-moz-border-radius': '10px', 
      opacity: .5, 
      color: '#fff' 
    }
  });
}
$(document).ready(function() {
  $('#destino').typeahead({
    minLength: 3,
    source: function(query, result) {
      $.ajax({
        url: destinoUrl + query,
        dataType: 'json',
        type: 'GET',
        success: function (data) {
          result($.map(data, function (item) {
            return item;
          }));
        }
      });
    }
  });
  $('#cotizar').click(function() {
    var destino = $('#destino').val();
    var fecha_partida = $('#fecha_partida').val();
    var fecha_retorno = $('#fecha_retorno').val();
    var cantidad_pasajeros = $('#cantidad_pasajeros').val();
    if (destino.length == 0 || fecha_partida.length == 0 || fecha_retorno.length == 0 || cantidad_pasajeros == 0) {
      $('#alerta').fadeIn('slow');
      return;
    }
    $.ajax({
      url: cotizarUrl,
      dataType: 'json',
      type: 'POST',
      data: {destino:destino, fecha_partida:fecha_partida, fecha_retorno:fecha_retorno, cantidad_pasajeros:cantidad_pasajeros},
      success: function (data) {
        var html = '';
        if (data.length > 0) {
          espera('Procesando sus datos...');
          $('#plan1').html('$ ' + data[0].precio_plan);
          $('#plan2').html('$ ' + data[1].precio_plan);
          for (i = 0; i <= 5; i++) {
            html += '<div class="row py-2">';
            html += '<div class="col">' + data[0].caracteristicas[i].caracteristica + '</div>';
            html += '<div class="col text-center">' + (data[0].caracteristicas[i].aplica ? '<i class="far fa-2x fa-check-square"></i>' : '') + '</div>';
            html += '<div class="col text-center">' + (data[1].caracteristicas[i].aplica ? '<i class="far fa-2x fa-check-square"></i>' : '') + '</div>';
            html += '</div>';
          };
          $('#coberturas').html(html);
          $('#paso1').fadeOut('slow');
          $('#paso2').fadeIn('slow');
          setTimeout($.unblockUI, 100);
        } else {
          espera('No se encontraron coincidencias.');
          setTimeout($.unblockUI, 2500);
        }
      }
    });
  });
});

