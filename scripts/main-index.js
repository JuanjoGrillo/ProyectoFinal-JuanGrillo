

function cargarFormulario(){
    main.classList.remove('tienda');
    main.classList.add('index');
    let form = document.createElement('form');
    if(main.lastElementChild.classList.contains('form2')) {
        main.removeChild(main.lastElementChild);
        form.classList.add('form1');
        form.innerHTML = form1;
        main.appendChild(form);
        document.querySelector('.enviar').addEventListener('click', iniciarSesion);
        document.querySelector('.siguienteFormulario').addEventListener('click', cargarFormulario);
    } else if(main.lastElementChild.classList.contains('form1')){
        main.removeChild(main.lastElementChild);
        form.classList.add('form2');
        form.innerHTML = form2;
        main.appendChild(form);
        document.querySelector('.enviar').addEventListener('click', crearCuenta);
        document.querySelector('.campoLocalidadSi').addEventListener('click', (e)=>{
            if(e.target.checked === true){
                if(document.querySelector('.campoLocalidadNo').checked === true){
                    document.querySelector('.campoLocalidadNo').checked = false;
                }
            } else {
                if(document.querySelector('.campoLocalidadNo').checked === false){
                    document.querySelector('.campoLocalidadNo').checked = true;
                }
            }
        });
        document.querySelector('.campoLocalidadNo').addEventListener('click', (e)=>{
            if(e.target.checked === true){
                if(document.querySelector('.campoLocalidadSi').checked === true){
                    document.querySelector('.campoLocalidadSi').checked = false;
                }
            } else {
                if(document.querySelector('.campoLocalidadSi').checked === false){
                    document.querySelector('.campoLocalidadSi').checked = true;
                }
            }
        });
        document.querySelector('.siguienteFormulario').addEventListener('click', cargarFormulario);
    } else {
        main.innerHTML = '';
        let hero = document.createElement('div');
        hero.classList.add('hero');
        hero.innerHTML = `<p>Bienvenido a la Disquería.</p>`
        main.appendChild(hero);
        form.classList.add('form1');
        form.innerHTML = form1;
        main.appendChild(form);
        document.querySelector('.enviar').addEventListener('click', iniciarSesion);
        document.querySelector('.siguienteFormulario').addEventListener('click', cargarFormulario);
    }
}
const form1 = `<h3>Inicia sesión</h3>
<fieldset>
    <label>Usuario</label>
    <input class="campoUsuario" type="text">
</fieldset>
<fieldset>
    <label>Contraseña</label>
    <input class="campoContraseña" type="text">
</fieldset>
<button type="button" class="enviar">Enviar</button>
<button type="button" class="siguienteFormulario">Crear cuenta</button>`
const form2 = `<h3>Crea una cuenta</h3>
<fieldset>
    <label>Usuario</label>
    <input class="campoUsuario" type="text">
</fieldset>
<fieldset>
    <label>Contraseña</label>
    <input class="campoContraseña" type="text">
</fieldset>
<fieldset>
    <label>Repetir contraseña</label>
    <input class="campoRepetirContraseña" type="text">
</fieldset>
<fieldset>
    <label>Correo</label>
    <input class="campoCorreo" type="text">
</fieldset>
<fieldset>
    <h4>Reside en la Provincia de Buenos Aires</h4>
    <label>Si</label>
    <input class="campoLocalidadSi" type="checkbox" checked>
    <label>No</label>
    <input class="campoLocalidadNo" type="checkbox" >
</fieldset>
<button type="button" class="enviar">Enviar</button>
<button type="button" class="siguienteFormulario">IniciarSesion</button>`;
function iniciarSesion(){
    let campoUsuario = document.querySelector('.campoUsuario');
    let campoContraseña = document.querySelector('.campoContraseña');       
    let condiciones = ['A','B','C','D','E','F','G','H','I','I','J','K','L','M','N','Ñ','O','P','Q','R','S','T','U','V','W','X','Y','Z','.',',','*','-','_','1','2','3','4','5','6','7','8','9','0'];
    if((campoContraseña.value.length <= 30 && campoContraseña.value.length >= 8 && condiciones.some((condicion) => {return campoContraseña.value.includes(condicion)}))&&(campoUsuario.value.length <= 30 && campoUsuario.value.length >= 8)){
        let usuarios = JSON.parse(localStorage.getItem('usuarios'));
        if (usuarios.filter((elemento)=>{return elemento.nombre === campoUsuario.value && elemento.contraseña === campoContraseña.value}).length !== 0){
            let usuario = usuarios.filter((elemento)=>{return elemento.nombre === campoUsuario.value});
            console.log(usuario);
            window.alert('Ingresaste correctamente!');
            sessionStorage.setItem('usuarioActual', JSON.stringify([usuario[0].nombre, usuario[0].contraseña, usuario[0].correo, usuario[0].localidad]));
            usuarioEnHeader();
        } else {
            window.alert('Usuario no existente');
        }
    } else {
        window.alert('Datos incorrectos.');
    }
}
function crearCuenta(){
    let campoLocalidadSi = document.querySelector('.campoLocalidadSi');
    let campoCorreo = document.querySelector('.campoCorreo');
    let correo = false;
    let localidad = false;
    if(campoLocalidadSi.checked === true){
        localidad = true;
    } 
    if(campoCorreo.value.includes('@outlook.com')){
        if(campoCorreo.value.indexOf('@outlook.com') === campoCorreo.value.length - 12){
            correo = true;
        }
    } else if(campoCorreo.value.includes('@gmail.com')){
        if(campoCorreo.value.indexOf('@gmail.com') === campoCorreo.value.length - 10){
            correo = true;
        }
    } else if(campoCorreo.value.includes('@hotmail.com')){
        if(campoCorreo.value.indexOf('@hotmail.com') === campoCorreo.value.length - 12){
            correo = true;
        }
    }
    let campoUsuario = document.querySelector('.campoUsuario');
    let campoContraseña = document.querySelector('.campoContraseña');       
    let campoRepetirContraseña = document.querySelector('.campoRepetirContraseña');
    let condiciones = ['A','B','C','D','E','F','G','H','I','I','J','K','L','M','N','Ñ','O','P','Q','R','S','T','U','V','W','X','Y','Z','.',',','*','-','_','1','2','3','4','5','6','7','8','9','0'];
    if((campoRepetirContraseña.value === campoContraseña.value)&&(campoContraseña.value.length <= 30 && campoContraseña.value.length >= 8 && condiciones.some((condicion) => {return campoContraseña.value.includes(condicion)}))&&(campoUsuario.value.length <= 30 && campoUsuario.value.length >= 8)&&(correo===true)){
        window.alert('Has creado una cuenta con nosotros!');
        let usuarios = JSON.parse(localStorage.getItem('usuarios'));
        usuarios.push(new Usuario(campoUsuario.value, campoContraseña.value, campoCorreo.value, localidad));
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    } else {
        window.alert('Datos incorrectos.');
    }
}
cargarFormulario();
localStorage.setItem('usuarios', JSON.stringify([]));