$(function () {
    $('#tbNoticias').DataTable({
        language: {
            //url:"http://cdn.datatables.net/plug-ins/1.10.12/i18n/Spanish.json"
            "decimal": "",
            "emptyTable": "No hay información",
            "info": "Mostrando _START_ to _END_ of _TOTAL_ entries",
            "infoEmpty": "No hay datos",
            "infoFiltered": "(filtered from _MAX_ total entries)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar  _MENU_ ",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "No matching records found",
            "paginate": {
                "first": "First",
                "last": "Last",
                "next": "Next",
                "previous": "Previous"
            },
            "aria": {
                "sortAscending": ": activate to sort column ascending",
                "sortDescending": ": activate to sort column descending"
            }
        },
        responsive: true,
        ajax: {
            url: "http://localhost:3002/usuarios/v1/noticia/",
            dataSrc: function (datos) {
                return datos.noticias;
            }
        },
        columns: [
            {
                data: "titulo"
            },
            {
                data: "autor"
            },
            {
                data: "nota"
            },
            {
                data: "fecha"
            },
            {
                data: "activo"
            },
            {
                data: "foto",
                "render":function(data){
                    return '<img src="' + data + '"width=100%" />';
                }
            },    
            {
                data: "user.name"
            },
            {
                data: function (row) {
                    var res = `<button id="btnBorrar"
                         class="btn btn-danger btn-xs"
                         onClick="borrar('${row._id}')">
                         Eliminar
                         </button>`;

                    return res;
                }
            }
        ]
    });
});

function guardar() {
    var titulo = $('#txtTitulo').val();
    var autor = $('#txtAutor').val();
    var nota = $('#txtNota').val();
    var fecha = $('#txtFecha').val();
    var activo = $('#txtActivo').val();
    var foto = $('#txtFoto').val();
    var user = $('#txtUsuario').val();


    console.log(titulo);
    console.log(autor);
    console.log(nota);
    console.log(fecha);
    console.log(activo);
    console.log(foto);
    console.log(user);

    //alert(name);

    $.ajax(
        {
            url: "http://localhost:3002/usuarios/v1/noticia",
            type: "POST",
            data: {
                titulo: titulo,
                autor: autor,
                nota: nota,
                fecha: fecha,
                activo: activo,
                foto: foto,
                user:user
                

            }
        }
    )
        .done(
            function (data) {
                alert(JSON.stringify(data));

                $('#txtTitulo').val('');
                $('#txtAutor').val('');
                $('#txtNota').val('');
                $('#txtFecha').val('');
                $('#txtActivo').val('');
                $('#txtFoto').val('');
                $('#txtUsuario').val('');

                $('#tbNoticias').dataTable().api().ajax.reaload();
            }
        )
        .fail(
            function (err) {
                alert(err);
            }
        );
}

function borrar(id) {
    $.ajax({
        url: "http://localhost:3002/usuarios/v1/noticia/" + id,
        type: "delete"
    })
        .done(
            function(data){
                alert(data.msg);
            $('#tbNoticias').dataTable().api().ajax.reload();
            }
        )
        .fail(
            function(err){
                alert(err);
            }
        )
}