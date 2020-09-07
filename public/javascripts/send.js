$(document).ready(function(){
    $("#send").on('click', function(){
        console.log("click");
        $.ajax({
            type: 'post',
            url: '/api',
            data: {uid: '0000', std_id: '00000'},
        }).done(function(data) {
            var objResponse = JSON.parse(data);
            console.log(objResponse);
        }).fail(function(jqXHR, textStatus, errorThrown) { 
            Swal.fire({
                title: 'Error!',
                text: 'Error connecting API!',
                icon: 'error'
            })
        });
    });
});