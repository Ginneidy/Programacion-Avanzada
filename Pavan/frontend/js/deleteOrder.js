const delete_user_order = () =>{
    codigo = localStorage.getItem('codUser')
    queryObj = {
        userCod: codigo,
    }
    path = "http://127.0.0.1:5000/deleteU_order"
    axios.post(path, queryObj).then(function (response) {
        alert("Pedido eliminado")
        location.reload()
    })
        .catch(function (error) {
            alert("Error")
            console.log(error);
        });

}