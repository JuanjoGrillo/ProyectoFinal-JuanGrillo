function cargarCatalogo(){
    main.classList.remove('index');
    main.classList.add('tienda');
    if(header.lastElementChild.classList.contains('usuarioHeader')){
        main.innerHTML = `<ul class="barraCatalogo">
                <li class="barraCatalogo__discos">discos</li>
                <li class="barraCatalogo__revistas">revistas</li>
                <li class="barraCatalogo__tocadiscos">tocadiscos</li>
            </ul>
            <ul class="barraCompras">
                <li class="vistaCompras">comprar</li>
                <li class="vistaCarrito">carrito</li>
            </ul>`;
        document.querySelector('.vistaCarrito').addEventListener('click', desplegarCarrito);
        document.querySelector('.vistaCompras').addEventListener('click', menuCompra);
    } else {
        main.innerHTML = `<ul class="barraCatalogo">
        <li class="barraCatalogo__discos">discos</li>
        <li class="barraCatalogo__revistas">revistas</li>
        <li class="barraCatalogo__tocadiscos">tocadiscos</li>
        </ul>`;
    }
    document.querySelector('.barraCatalogo__discos').addEventListener('click', mostrarDiscos);
    document.querySelector('.barraCatalogo__revistas').addEventListener('click', mostrarRevistas);
    document.querySelector('.barraCatalogo__tocadiscos').addEventListener('click', mostrarTocadiscos);
}
async function mostrarDiscos(){
    main.innerHTML='';
    cargarCatalogo();
    await fetch('data.json').then(catalogo => catalogo.json()).then(catalogo => crearArticulos(catalogo.discos));
    function crearArticulos(lista){
        lista.forEach(element => {
            let cardContenedor = document.createElement('div');
            cardContenedor.classList.add('card');
            main.appendChild(cardContenedor);
            cardContenedor.setAttribute('id', `${element.nombre}`);
            cardContenedor.dataset.tipo = "disco";
            cardContenedor.innerHTML = `<h3>${element.nombre}</h3>
            <img src="imgs/disco-${lista.indexOf(element)+1}.jpg" width="200px" height="200px" alt="imagen de disco">
            <ul>
            <li>Artista:${element.artista}</li>
            <li>Año:${element.año}</li>
            <li>Precio: $${element.precio}</li>
            <li>Cantidad en stock: ${element.cantidad}</li>
            </ul>`;
            actualizarCarrito();
            if(document.querySelector('.usuarioHeader') !== null){
                if(carrito.filter((item)=> {return item[0] === element.nombre}).length === 0){
                    let botonera = document.createElement('div');
                    botonera.classList.add('botoneraCarrito');
                    botonera.innerHTML = `<h3 data-nombre="${element.nombre}" data-precio="${element.precio}" data-cantidad="${element.cantidad}" class="cantidad">0</h3>
                        <button type="button" class="btnSumar">+</button>
                        <button type="button" class="btnRestar">-</button>
                    </div>
                    <button class="${element.nombre.split('').filter((el)=>{return el !== ' '}).join('')}" type="button">Añadir al carrito</button>`;
                    cardContenedor.appendChild(botonera);
                    document.querySelector(`.${element.nombre.split('').filter((el)=>{return el !== ' '}).join('')}`).addEventListener('click', aniadirAlCarrito);
                } else {
                    let btnQuitar = document.createElement('button');
                    btnQuitar.setAttribute('type', 'button');
                    btnQuitar.classList.add(`${element.nombre.split('').filter((el)=>{return el !== ' '}).join('')}`);
                    btnQuitar.textContent = 'Quitar del carrito';
                    cardContenedor.appendChild(btnQuitar);
                    btnQuitar.addEventListener('click', quitarDelCarrito);
                }
            }
        });
        for(btn of document.querySelectorAll('.btnSumar')){
            btn.addEventListener('click', sumarCantidad);
        }
        for(btn of document.querySelectorAll('.btnRestar')){
            btn.addEventListener('click', restarCantidad);
        }
    }
}
function mostrarRevistas(){
    main.innerHTML='';
    cargarCatalogo();
    fetch('data.json').then(catalogo => catalogo.json()).then(catalogo => crearArticulos(catalogo.revistas));
    function crearArticulos(lista){
        lista.forEach(element => {
            let cardContenedor = document.createElement('div');
            cardContenedor.classList.add('card');
            main.appendChild(cardContenedor);
            cardContenedor.setAttribute('id', `${element.nombre}`);
            cardContenedor.dataset.tipo = "revista";
            cardContenedor.innerHTML = `<h3>${element.nombre}</h3>
            <img src="imgs/revista-${lista.indexOf(element)+1}.jpg" width="200px" height="200px" alt="imagen de revista">
            <ul>
            <li>Edicion:${element.edicion}</li>
            <li>Precio: $${element.precio}</li>
            <li>Cantidad en stock: ${element.cantidad}</li>
            </ul>`;
            actualizarCarrito();
            if(document.querySelector('.usuarioHeader') !== null){
                if(carrito.filter((item)=> {return item[0] === element.nombre}).length === 0){
                    let botonera = document.createElement('div');
                    botonera.classList.add('botoneraCarrito');
                    botonera.innerHTML = `<h3 data-nombre="${element.nombre}" data-precio="${element.precio}" data-cantidad="${element.cantidad}" class="cantidad">0</h3>
                        <button type="button" class="btnSumar">+</button>
                        <button type="button" class="btnRestar">-</button>
                    </div>
                    <button class="${element.nombre.split('').filter((el)=>{return el !== ' '}).join('')}" type="button">Añadir al carrito</button>`;
                    cardContenedor.appendChild(botonera);
                    document.querySelector(`.${element.nombre.split('').filter((el)=>{return el !== ' '}).join('')}`).addEventListener('click', aniadirAlCarrito);
                } else {
                    let btnQuitar = document.createElement('button');
                    btnQuitar.setAttribute('type', 'button');
                    btnQuitar.classList.add(`${element.nombre.split('').filter((el)=>{return el !== ' '}).join('')}`);
                    btnQuitar.textContent = 'Quitar del carrito';
                    cardContenedor.appendChild(btnQuitar);
                    btnQuitar.addEventListener('click', quitarDelCarrito);
                }
            }
        });
        for(btn of document.querySelectorAll('.btnSumar')){
            btn.addEventListener('click', sumarCantidad);
        }
        for(btn of document.querySelectorAll('.btnRestar')){
            btn.addEventListener('click', restarCantidad);
        }
    }
}
function mostrarTocadiscos(){
    main.innerHTML='';
    cargarCatalogo();
    fetch('data.json').then(catalogo => catalogo.json()).then(catalogo => crearArticulos(catalogo.tocadiscos));
    function crearArticulos(lista){
        lista.forEach(element => {
            let cardContenedor = document.createElement('div');
            cardContenedor.classList.add('card');
            main.appendChild(cardContenedor);
            cardContenedor.setAttribute('id', `${element.nombre}`);
            cardContenedor.dataset.tipo = "tocadisco";
            cardContenedor.innerHTML = `<h3>${element.nombre}</h3>
            <img src="imgs/tocadiscos-${lista.indexOf(element)+1}.jpg" width="200px" height="200px" alt="imagen de tocadisco">
            <ul>
            <li>Precio: $${element.precio}</li>
            <li>Cantidad en stock: ${element.cantidad}</li>
            </ul>`;
            actualizarCarrito();
            if(document.querySelector('.usuarioHeader') !== null){
                if(carrito.filter((item)=> {return item[0] === element.nombre}).length === 0){
                    let botonera = document.createElement('div');
                    botonera.classList.add('botoneraCarrito');
                    botonera.innerHTML = `<h3 data-nombre="${element.nombre}" data-precio="${element.precio}" data-cantidad="${element.cantidad}" class="cantidad">0</h3>
                        <button type="button" class="btnSumar">+</button>
                        <button type="button" class="btnRestar">-</button>
                    </div>
                    <button class="${element.nombre.split('').filter((el)=>{return el !== ' '}).join('')}" type="button">Añadir al carrito</button>`;
                    cardContenedor.appendChild(botonera);
                    document.querySelector(`.${element.nombre.split('').filter((el)=>{return el !== ' '}).join('')}`).addEventListener('click', aniadirAlCarrito);
                } else {
                    let btnQuitar = document.createElement('button');
                    btnQuitar.setAttribute('type', 'button');
                    btnQuitar.classList.add(`${element.nombre.split('').filter((el)=>{return el !== ' '}).join('')}`);
                    btnQuitar.textContent = 'Quitar del carrito';
                    cardContenedor.appendChild(btnQuitar);
                    btnQuitar.addEventListener('click', quitarDelCarrito);
                }
            }
        });
        for(btn of document.querySelectorAll('.btnSumar')){
            btn.addEventListener('click', sumarCantidad);
        }
        for(btn of document.querySelectorAll('.btnRestar')){
            btn.addEventListener('click', restarCantidad);
        }
    }
}