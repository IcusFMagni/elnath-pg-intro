console.log('client js has been loaded')
$(document).ready(function (){
    console.log('jquery has been loaded')
    $('#submitButton').on('click', addJordan())
    $('body').on('click', '#deleteButton', deleteShoe())
    getTable();
}
)

function addJordan () {
    $.ajax ({
        method: 'POST',
        url: '/shoes',
        data: {
            name: 'Nike Air Jordan',
            cost: '110'
        },
        success: function(response) {
            console.log('response', response)
        }
    })
}

function deleteShoe () {

}
function getTable() {
$.ajax ({
    method: 'GET',
    url: '/shoes',
    success: function (response) {
        $('#shoesList').empty()
        for (let index = 0; index < response.length; index++) {
            $('#shoesList').append('<li>'+ response[index].name+' '+response[index].cost+'<button id="#deleteButton">Delete</button></li>')
            
        };
    }
})
}