sessionStorage.setItem('carrito', JSON.stringify([]));
let carrito;
function actualizarCarrito(){
    carrito = JSON.parse(sessionStorage.getItem('carrito'));
};
function sumarCantidad(e){
    let padre = e.target.parentElement;
    if(parseInt(padre.firstElementChild.textContent) < parseInt(padre.firstElementChild.dataset.cantidad)){
        padre.firstElementChild.textContent = parseInt(padre.firstElementChild.textContent)+1;
    }
}
function restarCantidad(e){
    let padre = e.target.parentElement;
    if(parseInt(padre.firstElementChild.textContent) > 0){
        padre.firstElementChild.textContent = parseInt(padre.firstElementChild.textContent)-1;
    }
}
function aniadirAlCarrito(e){
    let padre = e.target.parentElement;
    actualizarCarrito();
    carrito.push([padre.firstElementChild.dataset.nombre,parseInt(padre.firstElementChild.dataset.precio),parseInt(padre.firstElementChild.textContent)]);
    sessionStorage.setItem('carrito', JSON.stringify(carrito));
    switch (padre.parentElement.dataset.tipo){
        case 'disco': 
            mostrarDiscos();
        break;
        case 'revista':
            mostrarRevistas();
        break;
        case 'tocadisco':
            mostrarTocadiscos();
        break;
    }
}
function quitarDelCarrito(e){
    let padre = e.target.parentElement;
    actualizarCarrito();
    carrito.splice(carrito.indexOf(carrito.filter((elem)=>{return elem[0]===padre.id})[0]),1);
    sessionStorage.setItem('carrito', JSON.stringify(carrito));
    switch (padre.dataset.tipo){
        case 'disco': 
            mostrarDiscos();
        break;
        case 'revista':
            mostrarRevistas();
        break;
        case 'tocadisco':
            mostrarTocadiscos();
        break;
    }
}