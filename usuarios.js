$(function () {
    $('#tbUsuarios').DataTable({
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
            url: "http://localhost:3002/usuarios/v1/usuario/",
            dataSrc: function (datos) {
                return datos.users;
            }
        },
        columns: [
            {
                data: "name"
            },
            {
                data: "email"
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
    //var name = document.getElementById("txtNombre").value;
    var name = $('#txtNombre').val();
    //$$('#txtNombre').val('Mi nombre');
    var email = $('#txtEmail').val();
    var password = $('#txtPassword').val();

    console.log(name);
    console.log(email);
    console.log(password);

    //alert(name);

    $.ajax(
        {
            url: "http://localhost:3002/usuarios/v1/usuario",
            type: "POST",
            data: {
                name: name,
                email: email,
                password: password
            }
        }
    )
        .done(
            function (data) {
                alert(JSON.stringify(data));

                $('#txtNombre').val('');
                $('#txtEmail').val('');
                $('#txtPassword').val('');

                $('#tbUsuarios').DataTable().api().ajax.reaload();
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
        url: "http://localhost:3002/usuarios/v1/usuario/" + id,
        type: "delete"
    })
        .done(
            function(data){
                alert(data.msg);
            $('#tbUsuarios').dataTable().api().ajax.reload();
            }
        )
        .fail(
            function(err){
                alert(err);
            }
        )
}