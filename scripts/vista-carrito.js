function desplegarCarrito(){
    main.innerHTML= '';
    cargarCatalogo();
    let container = document.createElement('div');
    let lista = document.createElement('ul');
    main.appendChild(container);
    container.appendChild(lista);
    actualizarCarrito();
    carrito.forEach((articulo)=>{
        let item = document.createElement('li');
        let itemNombre = document.createElement('h3');
        let btnBorrar = document.createElement('button');
        itemNombre.textContent = `${articulo[0]}: ${articulo[2]}`;
        btnBorrar.textContent = 'Eliminar articulo';
        item.appendChild(itemNombre);
        item.appendChild(btnBorrar);
        lista.appendChild(item);
        btnBorrar.addEventListener('click', (e)=>{
            carrito.splice(carrito.indexOf(carrito.filter((ele)=>{return ele[0] === e.target.parentElement.firstElementChild.textContent})),1);
            sessionStorage.setItem('carrito', JSON.stringify(carrito));
            lista.removeChild(e.target.parentElement);
            actualizarCarrito();
        });
    });
}
