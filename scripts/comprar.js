let caja = new Caja('', 0, '');
function menuCompra(){
    main.innerHTML = '';
    cargarCatalogo();
    let titulo = document.createElement('h3');
    titulo.textContent = 'Menu de compras';
    main.appendChild(titulo)
    let contenedorEtapas = document.createElement('div');
    contenedorEtapas.classList.add('etapas');
    main.appendChild(contenedorEtapas);
    let btnAnterior = document.createElement('button');
    let btnSiguiente = document.createElement('button');
    btnAnterior.classList.add('btnAnterior');
    btnSiguiente.classList.add('btnSiguiente');
    btnAnterior.setAttribute('type', 'button');
    btnSiguiente.setAttribute('type', 'button');
    btnAnterior.textContent = 'Atras';
    btnSiguiente.textContent = 'Siguiente';
    let contenedorBotones = document.createElement('div');
    contenedorBotones.classList.add('contenedorBotones');
    main.appendChild(contenedorBotones);
    btnAnterior.addEventListener('click', etapaAnterior);   
    btnSiguiente.addEventListener('click', siguienteEtapa);   
    contenedorBotones.appendChild(btnAnterior);
    contenedorBotones.appendChild(btnSiguiente);
    siguienteEtapa();
}   
function siguienteEtapa(){
    if(document.querySelector('.tarjeta') !== null){
        if(document.querySelector('.tarjeta').checked){
            caja.medioDePago = 'tarjeta';
        } else {
            caja.medioDePago = 'efectivo';
        }
    }
    if(document.querySelector('.cuotas') !== null){
        caja.cuotas = parseInt(document.querySelector('.cuotas').value);
    }
    if(document.querySelector('.conEnvio') !== null){
        if(document.querySelector('.conEnvio').checked === true){
            caja.envio = true;
            console.log(caja.envio);
        } else {
            caja.envio = false;
            console.log(caja.envio);
        }
    }
    document.querySelector('.btnAnterior').textContent = 'Volver a la tienda';
    let etapas = document.querySelector('.etapas');
    if(etapas.firstElementChild === null){ 
        let titulo = document.createElement('h3');
        titulo.textContent = 'Items';
        etapas.appendChild(titulo);
        let contenedor = document.createElement('div');
        etapas.appendChild(contenedor);
        let lista = document.createElement('ul');
        contenedor.appendChild(lista);
        actualizarCarrito();
        for(articulo of carrito){
            let elemento = document.createElement('li');
            elemento.textContent = `${articulo[0]}: ${articulo[2]}`;
            contenedor.appendChild(elemento);
        } 
        let btnCarrito = document.createElement('button');
        btnCarrito.setAttribute('type', 'button');
        btnCarrito.textContent = 'Ir al carrito';
        contenedor.appendChild(btnCarrito);
    } else if(etapas.firstElementChild.textContent === 'Items'){
        etapas.firstElementChild.textContent = 'Medio de pago';
        etapas.removeChild(etapas.lastElementChild);
        let contenedor = document.createElement('div');
        etapas.appendChild(contenedor);   
        contenedor.innerHTML=`<form action="">
            <fieldset>
                <label>Tarjeta de crédito/débito</label>
                <input type="checkbox" class="tarjeta" checked>
            </fieldset>
            <fieldset>
                <label>Efectivo</label>
                <input type="checkbox" class="efectivo">    
            </fieldset>
        </form>`;
        let tarjeta = document.querySelector('.tarjeta');
        let efectivo = document.querySelector('.efectivo');
        tarjeta.addEventListener('click', (e)=>{
            if(e.target.checked === true){
                if(efectivo.checked === true){
                    efectivo.checked = false;
                }
            } else {
                if(efectivo.checked === false){
                    efectivo.checked = true;
                }
            }
        });
        efectivo.addEventListener('click', (e)=>{
            if(e.target.checked === true){
                if(tarjeta.checked === true){
                    tarjeta.checked = false;
                }
            } else {
                if(tarjeta.checked === false){
                    tarjeta.checked = true;
                }
            }
        });
    } else if(etapas.firstElementChild.textContent === 'Medio de pago' && caja.medioDePago === 'tarjeta'){
        etapas.firstElementChild.textContent = 'Cuotas';
        etapas.removeChild(etapas.lastElementChild);
        let contenedor = document.createElement('div');
        etapas.appendChild(contenedor);
        let info = document.createElement('label');
        info.texteContent = 'Ingrese la cantidad de cuotas con la que desea realizar el pago. Tiene hasta doce cuotas sin interes';
        contenedor.appendChild(info);
        let cts = document.createElement('select');
        cts.classList.add('cuotas');
        contenedor.appendChild(cts);
        for(let i = 1; i < 25; i++){
            let op = document.createElement('option');
            op.textContent = i;
            cts.appendChild(op);
        }
    } else if (etapas.firstElementChild.textContent === 'Cuotas' || caja.medioDePago === 'efectivo'){
        etapas.firstElementChild.textContent = 'Envio';
        etapas.removeChild(etapas.lastElementChild);
        let contenedor = document.createElement('div');
        etapas.appendChild(contenedor);
        contenedor.innerHTML=`<form action="">
            <fieldset>
                <label>Retiro en el local(sin envio).</label>
                <input type="checkbox" class="sinEnvio" checked>
            </fieldset>
            <fieldset>
                <label>Con envio al domiciolio</label>
                <input type="checkbox" class="conEnvio">    
            </fieldset>
        </form>`;
        let conEnvio = document.querySelector('.conEnvio');
        let sinEnvio = document.querySelector('.sinEnvio');
        conEnvio.addEventListener('click', (e)=>{
            if(e.target.checked === true){
                if(sinEnvio.checked === true){
                    sinEnvio.checked = false;
                }
            } else {
                if(sinEnvio.checked === false){
                    sinEnvio.checked = true;
                }
            }
        });
        sinEnvio.addEventListener('click', (e)=>{
            if(e.target.checked === true){
                if(conEnvio.checked === true){
                    conEnvio.checked = false;
                }
            } else {
                if(conEnvio.checked === false){
                    conEnvio.checked = true;
                }
            }
        });
    } else if (etapas.firstElementChild.textContent === 'Envio'){
        etapas.firstElementChild.textContent = 'Resumen de compra';
        etapas.removeChild(etapas.lastElementChild);
        let contenedor = document.createElement('div');
        etapas.appendChild(contenedor);
        actualizarCarrito();
        contenedor.innerHTML = `<h3>Articulos</h3>
            <ul class="lista">
            </ul>
            <h4>Precio final: ${carrito.reduce((x,y)=>{x+y[1]+y[2]}, x=0)}</h4>
        `;
        let lista = document.querySelector('.lista');
        lista.classList.add('listaProductos')
        for(item of carrito){
            let li = document.createElement('li');
            li.textContent = `${item[0]}: ${item[1]}`;
            lista.appendChild(li);
        }
        document.querySelector('.btnSiguiente').textContent = 'Comprar';
    } else if(etapas.firstElementChild.textContent === 'Resumen de compra') {
        actualizarCarrito();
        etapas.firstElementChild.textContent = 'Ha comprado en la Disqueria!';
        etapas.removeChild(etapas.lastElementChild);
        let contenedor = document.createElement('div');
        etapas.appendChild(contenedor);
        contenedor.innerHTML = `<h3>Ticket de compra</h3>
            <ul class="lista">
            </ul>
            <h4>Precio base = $${carrito.reduce((x,y)=>{return x+y[1]*y[2]}, x=0)}</h4>
            <h4>iva = $${carrito.reduce((x,y)=>{return x+y[1]*y[2]}, x=0)*caja.iva}</h4>
            <h4>Intereses = $${carrito.reduce((x,y)=>{return x+y[1]*y[2]}, x=0)*caja.iva*caja.interes}</h4>
            <h4>Envio = $${caja.calcularEnvio(JSON.parse(sessionStorage.getItem('usuarioActual')))}</h4>
            <h4>Precio final = $${carrito.reduce((x,y)=>{return x+y[1]*y[2]}, x=0)+(carrito.reduce((x,y)=>{return x+y[1]*y[2]}, x=0)*caja.iva)+(carrito.reduce((x,y)=>{return x+y[1]*y[2]}, x=0)*caja.iva*caja.interes)}</h4>
            <h4>En ${caja.cuotas} de $${carrito.reduce((x,y)=>{return x+y[1]*y[2]}, x=0)/caja.cuotas}</h4>
            <h4>Fecha: ${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()}<h4>`;
        document.querySelector('.btnAnterior').textContent = 'Volver a la tienda';
        document.querySelector('.btnSiguiente').textContent = 'Imprimir';
        for(articulo of carrito){
            let li = document.createElement('li');
            li.textContent = `${articulo[2]} ${articulo[0]}($${articulo[1]}c/u).`;
            document.querySelector('.lista').appendChild(li);
        }
        for(art of carrito){
            carrito.pop();
        }
        sessionStorage.setItem('carrito', JSON.stringify(carrito));
    } else {
        window.alert('Has impreso el ticket.');
        main.innerHTML = '';
        cargarCatalogo();
    }
}
function etapaAnterior(){
    let etapas = document.querySelector('.etapas');
    if(etapas.firstElementChild.textContent === 'Items'){
        main.innerHTML='';
        cargarCatalogo();
    } else if(etapas.firstElementChild.textContent === 'Medio de pago'){
        etapas.removeChild(etapas.lastElementChild);
        document.querySelector('.btnAnterior').textContent = 'Volver a la tienda'; 
        etapas.firstElementChild.textContent = 'Items';
        let contenedor = document.createElement('div');
        etapas.appendChild(contenedor);
        let lista = document.createElement('ul');
        contenedor.appendChild(lista);
        actualizarCarrito();
        for(articulo of carrito){
            let elemento = document.createElement('li');
            elemento.textContent = `${articulo[0]}: ${articulo[2]}`;
            contenedor.appendChild(elemento);
        } 
        let btnCarrito = document.createElement('button');
        btnCarrito.setAttribute('type', 'button');
        btnCarrito.textContent = 'Ir al carrito';
        contenedor.appendChild(btnCarrito);
    } else if(etapas.firstElementChild.textContent === 'Cuotas'){
        etapas.firstElementChild.textContent = 'Medio de pago';
        etapas.removeChild(etapas.lastElementChild);
        let contenedor = document.createElement('div');
        etapas.appendChild(contenedor);   
        contenedor.innerHTML=`<form action="">
            <fieldset>
                <label>Tarjeta de crédito/débito</label>
                <input type="checkbox" class="tarjeta" checked>
            </fieldset>
            <fieldset>
                <label>Efectivo</label>
                <input type="checkbox" class="efectivo">    
            </fieldset>
        </form>`;
        let tarjeta = document.querySelector('.tarjeta');
        let efectivo = document.querySelector('.efectivo');
        tarjeta.addEventListener('click', (e)=>{
            if(e.target.checked === true){
                if(efectivo.checked === true){
                    efectivo.checked = false;
                }
            } else {
                if(efectivo.checked === false){
                    efectivo.checked = true;
                }
            }
        });
        efectivo.addEventListener('click', (e)=>{
            if(e.target.checked === true){
                if(tarjeta.checked === true){
                    tarjeta.checked = false;
                }
            } else {
                if(tarjeta.checked === false){
                    tarjeta.checked = true;
                }
            }
        });
    } else if(etapas.firstElementChild.textContent === 'Envio'){
        etapas.firstElementChild.textContent = 'Cuotas';
        etapas.removeChild(etapas.lastElementChild);
        let contenedor = document.createElement('div');
        etapas.appendChild(contenedor);
        let info = document.createElement('label');
        info.texteContent = 'Ingrese la cantidad de cuotas con la que desea realizar el pago. Tiene hasta doce cuotas sin interes';
        contenedor.appendChild(info);
        let cts = document.createElement('select');
        contenedor.appendChild(cts);
        for(let i = 1; i < 25; i++){
            let op = document.createElement('li');
            op.textContent = i;
            cts.appendChild(op);
        }
    } else if(etapas.firstElementChild.textContent === 'Resumen de compra'){
        etapas.firstElementChild.textContent = 'Envio';
        etapas.removeChild(etapas.lastElementChild);
        let contenedor = document.createElement('div');
        etapas.appendChild(contenedor);
        contenedor.innerHTML=`<form action="">
            <fieldset>
                <label>Retiro en el local(sin envio).</label>
                <input type="checkbox" class="sinEnvio" checked>
            </fieldset>
            <fieldset>
                <label>Con envio al domiciolio</label>
                <input type="checkbox" class="conEnvio">    
            </fieldset>
        </form>`;
        let conEnvio = document.querySelector('.conEnvio');
        let sinEnvio = document.querySelector('.sinEnvio');
        conEnvio.addEventListener('click', (e)=>{
            if(e.target.checked === true){
                if(sinEnvio.checked === true){
                    sinEnvio.checked = false;
                }
            } else {
                if(sinEnvio.checked === false){
                    sinEnvio.checked = true;
                }
            }
        });
        sinEnvio.addEventListener('click', (e)=>{
            if(e.target.checked === true){
                if(conEnvio.checked === true){
                    conEnvio.checked = false;
                }
            } else {
                if(conEnvio.checked === false){
                    conEnvio.checked = true;
                }
            }
        });
    } else if(etapas.firstElementChild.textContent === 'Ha comprado en la Disqueria!'){
        main.innerHTML = '';
        cargarCatalogo();
    }
}