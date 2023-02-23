// PROYECTO JQUERY Antonio Jiménez Cortés


// APARTADO 1

// Valida cada campo con su expresión regular correspondiente
$.validator.addMethod("letras", function (value, element) {
    var pattern = /^[A-Z]{1}[A-Za-z áéúíó ñ]{2,20}$/;
    return this.optional(element) || pattern.test(value);
  },"El nombre debe empezar por mayúscula y debe estar compuesto por letras");

  $.validator.addMethod("ape", function (value, element) {
   var pattern = /^([a-zA-Z]|\s)*$/;
   return this.optional(element) || pattern.test(value);
 },"El apellido debe estar compuesto por letras");

 $.validator.addMethod("telef", function (value, element) {
   var pattern = /^[679]{1}[0-9]{8}$/;
   return this.optional(element) || pattern.test(value);
 },"El téledono debe empezar por 6,7 ó 9, y su longitud será de 9 dígitos");

 $.validator.addMethod("ident", function (value, element) {
    var pattern = /^(\d{8}([A-Z]|[a-z]))$/;
    return this.optional(element) || pattern.test(value);
  },"El DNI debe estar compuesto por 8 números y una letra");


 


$(document).ready(function(){
    $("#productos").hide();
    $('#boton_scroll').hide();


    // APARTADO 1
    $("input").prop('disabled', true);
    $('#nombre').prop('disabled', false); 
    
    // Función validaora de los campos del formulario
     $('#formulario').validate({
        rules: {
           nombre: {
              required: true,
             letras: true
             
 
           },
           apellidos: {
             required: true,
             minlength: 3,
             ape: true
          },
          telefono: {
             required: true,
             telef: true
          },
          dni: {
             required: true,
             ident: true
          },
          fecha: {
             required: true
            
          },
          validator: true
 
        },
        messages: {           
           nombre: {
              required: "Por favor ingresa tu nombre",
           },
           apellidos: {
             required: "Por favor ingresa tus apellidos",
             minlength: "Tus apellidos deben tener al menos 3 caracteres"
          },
          telefono: {
             required: "Por favor ingresa el número de teléfono"
          },
          dni: {
             required: "Por favor ingresa tu dni",
          },
          fecha: {
             required: "Por favor ingresa la fecha"
          }
 
        }
 
     });
 

    // Vamos comprobando campo a campo si es correcto o no
    // Si el campo es correcto de desbloquea el siguiente campo y así sucesivamente
     $('#nombre').keyup(function() {
       
 
       if ($('#nombre').val().match(/^[A-Z]{1}[A-Za-z áéúíó ñ]{2,14}$/)) {
           $('#apellidos').prop('disabled', false); 
           
           
       } else {
           $('#apellidos').prop('disabled', true);
             
       }
 
       
 
     });
 
     $('#apellidos').keyup(function(){
       if ($('#apellidos').val().match(/^([a-zA-Z]|\s)*$/)) {
          $('#telefono').prop('disabled', false); 
           
      } else {
          $('#telefono').prop('disabled', true);
          
      }
     }); 

     $('#telefono').keyup(function(){
        if ($('#telefono').val().match(/^[679]{1}[0-9]{8}$/)) {
           $('#dni').prop('disabled', false); 
            
       } else {
           $('#dni').prop('disabled', true);
           
       }
      }); 

      $('#dni').keyup(function(){
        if ($('#dni').val().match(/^(\d{8}([A-Z]|[a-z]))$/)) {
           $('#fecha').prop('disabled', false);
           $('#datos').prop('disabled', false);
            
       } else {
           $('#fecha').prop('disabled', true);

       }
      }); 
      
     
     
     
     // FIN APARTADO 1

    
    // Al entrar en la  página inicializamos las siguientes variables
    listaproductos();
    listatestimonios();

    // APARTADO 9
    var intervalo = setInterval(listatestimonios,10000);
    var intervaloTabla;
   
    // Inicia intervalo testimonios estándar
    function iniciarIntervalo() {
        intervalo = setInterval(listatestimonios, 10000);
    }
    // Detiene intervalo testimonios estándar
    function stopIntervalo() {
        clearInterval(intervalo);
    }

    // Inicia intervalo testimonios tabla
    function iniciarIntervaloTabla() {
        intervaloTabla = setInterval(listatestimoniosTabla, 10000);
    }
    // Detiene intervalo testimonios tabla
    function stopIntervaloTabla() {
        clearInterval(intervaloTabla);
    }
    

    // APARTADO 5
    // Cuando pulsamos en el botón de Formato estándar

    $('#boton_estandar').click(function(){
        stopIntervaloTabla();
        listatestimonios();
        iniciarIntervalo();
    });


    // Cuando pulsamos en el botón de Formato tabla

    $('#boton_tabla').click(function(){
        stopIntervalo();
        listatestimoniosTabla();
        iniciarIntervaloTabla();
    });

    // APARTADO 7
   // Cuando pulsamos botón de subir, sube hasta el principio de página
    $('#boton_scroll').click(function(){
        $('html, body').animate({
            scrollTop: 0
        },1000);
        //$("#productos").hide();
        $("body").fadeOut(700);
        $("body").fadeIn(700);
        
    });

    // El botón de subir no aparece hasta que bajas 200 px
    $(window).scroll(function(){
        if($(this).scrollTop() > 200){
            $('#boton_scroll').fadeIn();
        } else {
            $('#boton_scroll').fadeOut();
        }
    })

    // Llamada  a la función de localización
    var geo = navigator.geolocation;
    var latitud, longitud;
    geo.getCurrentPosition(localiza, error);
    
});



// Productos obtenidos a través de un archivo json.
// Se maquetan en formato tabla

// APARTADO 2
const listaproductos = () => {
    $.ajax({
        type: 'GET',
        url: 'productos.json',
        dataType: 'json',
        async: true,
        success: function(data){
            $('#res').empty();
            $.each(data,function(indice, producto){
                let fila = $('<tr>');
                fila.append($(`<td><img src="./media/${producto.imagen}" width="200px" ></img></td>`));
                fila.append($(`<td><b>${producto.titulo}</b></td>`));
                fila.append($(`<td>${producto.precio}</td>`));
                fila.append($(`<td>${producto.texto}</td>`));
                fila.append($(`<td><a href="${producto.link}" target="_blank">Link</td></tr>`));
    
                $('#res').append(fila);
            });
            // Apartado 8 productos
            $("#productos").hide();
            $("#productos").fadeIn(1000);
            // Apartado 6 productos
        }, error: function(){
            $("#productos").hide();
            $("#errorP").html("<span>No se han encontrado productos</span>");
        }

    })
}

// Testimonios obtenidos a través de un archivo json.
// Se maquetan en formato de una lista


// APARTADO 3 y 4

const listatestimonios = () => {
    $.ajax({
        type: 'GET',
        url: 'testimonios.json',
        dataType: 'json',
        async: true,
        success: function(data){
            let copiaDatos = [...data];  // Hacemos una copia con los datos de los testimonios

           // Baraja el array copia
            for (i = copiaDatos.length - 1; i > 0; i--) {
               const j = Math.floor(Math.random() * (i + 1));
               
               [copiaDatos[i], copiaDatos[j]] = [copiaDatos[j], copiaDatos[i]];
            }
 
            // Obtener los tres primeros elementos del array barajado
            const datosFinal = copiaDatos.slice(0, 3);

            $('#tes').empty();
            $("#testimonios_tabla").hide();
            $.each(datosFinal,function(indice, testimonio){
                let linea = $('<li class="list-group-item list-group-item-secondary">');
                linea.append($(`
                    <div class="ms-2 me-auto">
                    <div class="fw-bold text-black">${testimonio.articulo} - ${testimonio.nombre}</div>
                    <div class="text-black">
                    ${testimonio.texto}<br>
                    ${testimonio.fecha}
                    </div>
                    </li>
                  `
                ));


                $('#tes').append(linea);
            });
            
            // Apartado 8 testimonios
            $("#testimonios_estandar").hide();
            $("#testimonios_estandar").fadeIn(1000);
            
            // Apartado 6 testimonios
        }, error: function(){
            $("#testimonios_tabla").hide();
            $("#boton_estandar").hide();
            $("#boton_tabla").hide();
            $("#testimonios_estandar").hide();
            $("#errorT").html("<span>No se han encontrado testimonios</span>");
        }

    })
}

    // APARTADO 5

// Testimonios obtenidos a través de un archivo json.
// Se maquetan en formato de tabla 

const listatestimoniosTabla = () => {
    $.ajax({
        type: 'GET',
        url: 'testimonios.json',
        dataType: 'json',
        async: true,
        success: function(data){
            let copiaDatos = [...data];  // Hacemos una copia con los datos de los testimonios

           // Baraja el array copia
            for (i = copiaDatos.length - 1; i > 0; i--) {
               const j = Math.floor(Math.random() * (i + 1));
               
               [copiaDatos[i], copiaDatos[j]] = [copiaDatos[j], copiaDatos[i]];
            }
 
            // Obtener los tres primeros elementos del array barajado
            const datosFinal = copiaDatos.slice(0, 3);

            $('#tesT').empty();
            $("#testimonios_estandar").hide();
            $.each(datosFinal,function(indice, testimonio){
                let fila = $('<tr>');
                fila.append($(`<td><b>${testimonio.articulo}</b></td>`));
                fila.append($(`<td>${testimonio.nombre}</td>`));
                fila.append($(`<td>${testimonio.texto}</td>`));
                fila.append($(`<td>${testimonio.fecha}</td></tr>`));
    
                $('#tesT').append(fila);


                
            });
            
            // Apartado 8 testimonios
            $("#testimonios_tabla").hide();
            $("#testimonios_tabla").fadeIn(1000);
            // Apartado 6 testimonios
        }, error: function(){
            $("#boton_estandar").hide();
            $("#boton_tabla").hide();
            $("#testimonios_estandar").hide();
            $("#testimonios_tabla").hide();
            $("#errorT").html("<span>No se han encontrado testimonios</span>");
        }

    })
}



        //APARTADO 10
        // Función a partir de unas coordenadas te imprime por consola tu ubicación mediante localidad       
        function localiza(pos) {
          latitud = pos.coords.latitude;
          longitud = pos.coords.longitude;

          var platform = new H.service.Platform({
            // Initialize the platform object
            apikey: "KYg5EMf0Dkan5KGZ_k2zgov2fLeNRuJq_J5H8LApJuc",
          });
          var service = platform.getSearchService();

          service.reverseGeocode(
            {
              at: latitud + "," + longitud,
            },
            (result) => {
              result.items.forEach((item) => {
                console.log(item.address.label);
              });
            }
          );
        }

        function error() {
            console.log("No es posible localizar tu posición");
            
        }

            





