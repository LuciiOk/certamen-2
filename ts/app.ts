import jquery from 'jquery';
const $:JQueryStatic = jquery;
import { listaRegion, Region } from './region'
import { Clientes } from './clientes'


// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'
    let habilidades:string[] = [];
    let indice = 1;

    listaRegion.forEach((region:Region) => { // llenado de select region
        $('#region').append(`<option value="${region.nombre}">${region.nombre}</option>`)
    })

    $('#region').on('change', () => { // evento en el select region, cada vez que se cambia una region se modifican las comunas de forma dinamica
        $('#comuna').empty()
        $('#comuna').append(`<option value="">Selecciona una comuna</option>`)
        listaRegion.forEach((element:Region) => {
            if (element.nombre == $('#region option:selected').val()?.toString()) {
                element.comuna.forEach((element:Region) => {
                    $('#comuna').append(`<option value="${element.nombre}">${element.nombre}</option>`)
                });
            }
        });

    })

    const imprimirCliente = (cliente:Clientes) => {
        let imgGenero:string = ''
        if (cliente.genero == 'hombre')
            imgGenero = 'hombre'
        if (cliente.genero == 'mujer')
            imgGenero = 'mujer'
        
        $('#tablaClientes tbody').append(`
            <tr>
                <th><img id="genero" src="./img/${imgGenero}.svg"/></th>
                <th>${indice + 1}</th>
                <td>${cliente.nombreCompleto}</td>
                <td>${cliente.region}</td>
                <td>${cliente.comuna}</td>
                <td>${cliente.habilidades}</td>
                <td><button id="eliminar"><span class="material-icons">delete</span></button></td>
            </tr>
        `)

        $('#vista-habilidades > ul').empty()

        habilidades = []
    } 

    // se muestra el formulario para agregar una nueva habilidad
    $('#agregarHab').click(() => {
        $('#form-habilidad').removeClass('d-none')
    })

    $('#addSkill1').click(() => {
        if ($('#hab').val() != '') {
            habilidades.push($('#hab').val()?.toString() || '')

            $('#vista-habilidades > ul').append(`<li id='skill'><input id="vl" type="button" value="${$('#hab').val()?.toString()}"></li>`)
            $('#hab').val('')
            $('#hab').removeClass('is-invalid')
            $('#form-habilidad').addClass('d-none')
        }
        $('#hab').addClass('is-invalid')
    })

    $("#vista-habilidades > ul").on("click", "#skill", function() {
        let a = habilidades.filter(habilidad => {
            return $(this).find('#vl').val()?.toString() !== habilidad
        })

        habilidades = a
        console.log(habilidades)
        $(this).closest("li").remove();
     });
    
    //se eliminan los clientes 
    $("#tablaClientes").on("click", "#eliminar", function() {
        $(this).closest("tr").remove();
     });
     
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event:any) {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }
            else {
                let cliente:Clientes = {
                    nombreCompleto: $('#nombre').val()?.toString() || '',
                    rut: $('#rut').val()?.toString() || '',
                    edad: parseInt($('#edad').val()?.toString() || ''),
                    fechanac: new Date(),
                    genero: $('input:radio[name=genero]:checked').val()?.toString() || '',
                    region: $('#region').val()?.toString() || '',
                    comuna: $('#comuna').val()?.toString() || '',
                    direccion: $('#direccion').val()?.toString() || '',
                    telefono: parseInt($('#telefono').val()?.toString() || ''),
                    observaciones: $('#observacion').val()?.toString() || '',
                    habilidades: habilidades
                }

                imprimirCliente(cliente);

 

                event.preventDefault()
            }
            form.classList.add('was-validated')
        }, false)
      })
    
  })()
