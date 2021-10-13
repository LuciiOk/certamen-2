var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "jquery", "./region"], function (require, exports, jquery_1, region_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    jquery_1 = __importDefault(jquery_1);
    var $ = jquery_1.default;
    // Example starter JavaScript for disabling form submissions if there are invalid fields
    (function () {
        'use strict';
        var habilidades = [];
        var indice = 1;
        region_1.listaRegion.forEach(function (region) {
            $('#region').append("<option value=\"" + region.nombre + "\">" + region.nombre + "</option>");
        });
        $('#region').on('change', function () {
            $('#comuna').empty();
            $('#comuna').append("<option value=\"\">Selecciona una comuna</option>");
            region_1.listaRegion.forEach(function (element) {
                var _a;
                if (element.nombre == ((_a = $('#region option:selected').val()) === null || _a === void 0 ? void 0 : _a.toString())) {
                    element.comuna.forEach(function (element) {
                        $('#comuna').append("<option value=\"" + element.nombre + "\">" + element.nombre + "</option>");
                    });
                }
            });
        });
        var imprimirCliente = function (cliente) {
            var imgGenero = '';
            if (cliente.genero == 'hombre')
                imgGenero = 'hombre';
            if (cliente.genero == 'mujer')
                imgGenero = 'mujer';
            $('#tablaClientes tbody').append("\n            <tr>\n                <th><img id=\"genero\" src=\"./img/" + imgGenero + ".svg\"/></th>\n                <th>" + (indice + 1) + "</th>\n                <td>" + cliente.nombreCompleto + "</td>\n                <td>" + cliente.region + "</td>\n                <td>" + cliente.comuna + "</td>\n                <td>" + cliente.habilidades + "</td>\n                <td><button id=\"eliminar\"><span class=\"material-icons\">delete</span></button></td>\n            </tr>\n        ");
            $('#vista-habilidades > ul').empty();
            habilidades = [];
        };
        // se muestra el formulario para agregar una nueva habilidad
        $('#agregarHab').click(function () {
            $('#form-habilidad').removeClass('d-none');
        });
        $('#addSkill1').click(function () {
            var _a, _b;
            if ($('#hab').val() != '') {
                habilidades.push(((_a = $('#hab').val()) === null || _a === void 0 ? void 0 : _a.toString()) || '');
                $('#vista-habilidades > ul').append("<li id='skill'><input id=\"vl\" type=\"button\" value=\"" + ((_b = $('#hab').val()) === null || _b === void 0 ? void 0 : _b.toString()) + "\"></li>");
                $('#hab').val('');
                $('#hab').removeClass('is-invalid');
                $('#form-habilidad').addClass('d-none');
            }
            $('#hab').addClass('is-invalid');
        });
        $("#vista-habilidades > ul").on("click", "#skill", function () {
            var _this = this;
            var a = habilidades.filter(function (habilidad) {
                var _a;
                return ((_a = $(_this).find('#vl').val()) === null || _a === void 0 ? void 0 : _a.toString()) !== habilidad;
            });
            habilidades = a;
            console.log(habilidades);
            $(this).closest("li").remove();
        });
        //se eliminan los clientes 
        $("#tablaClientes").on("click", "#eliminar", function () {
            $(this).closest("tr").remove();
        });
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.querySelectorAll('.needs-validation');
        // Loop over them and prevent submission
        Array.prototype.slice.call(forms)
            .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j;
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                else {
                    var cliente = {
                        nombreCompleto: ((_a = $('#nombre').val()) === null || _a === void 0 ? void 0 : _a.toString()) || '',
                        rut: ((_b = $('#rut').val()) === null || _b === void 0 ? void 0 : _b.toString()) || '',
                        edad: parseInt(((_c = $('#edad').val()) === null || _c === void 0 ? void 0 : _c.toString()) || ''),
                        fechanac: new Date(),
                        genero: ((_d = $('input:radio[name=genero]:checked').val()) === null || _d === void 0 ? void 0 : _d.toString()) || '',
                        region: ((_e = $('#region').val()) === null || _e === void 0 ? void 0 : _e.toString()) || '',
                        comuna: ((_f = $('#comuna').val()) === null || _f === void 0 ? void 0 : _f.toString()) || '',
                        direccion: ((_g = $('#direccion').val()) === null || _g === void 0 ? void 0 : _g.toString()) || '',
                        telefono: parseInt(((_h = $('#telefono').val()) === null || _h === void 0 ? void 0 : _h.toString()) || ''),
                        observaciones: ((_j = $('#observacion').val()) === null || _j === void 0 ? void 0 : _j.toString()) || '',
                        habilidades: habilidades
                    };
                    imprimirCliente(cliente);
                    form.reset();
                    event.preventDefault();
                }
                form.classList.add('was-validated');
            }, false);
        });
    })();
});
