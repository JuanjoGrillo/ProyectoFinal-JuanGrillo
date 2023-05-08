const header = document.getElementById('header');
const main = document.getElementById('main');
const headerHtml = `<ul class="barraDeNavegacion">
<li class="barraDeNavegacion__indexLink">Página principal</li>
<li class="barraDeNavegacion__tiendaLink">Tienda</li>
</ul>`; 
document.querySelector('.barraDeNavegacion__indexLink').addEventListener('click', ()=>{
    cargarFormulario();
});
document.querySelector('.barraDeNavegacion__tiendaLink').addEventListener('click', ()=>{
    cargarCatalogo();
});
function usuarioEnHeader(){
    if(document.querySelector('.usuarioHeader') !== null){
        let usuarioHeader = document.querySelector('.usuarioHeader');
        header.removeChild(usuarioHeader);
    }
    let usuario = document.createElement('ul');
    usuario.classList.add('usuarioHeader');
    let nombre = document.createElement('li'); 
    nombre.textContent = `${JSON.parse(sessionStorage.getItem('usuarioActual'))[0]}`;
    let salir = document.createElement('li'); 
    salir.textContent = 'cerrarSesion';
    salir.addEventListener('click', ()=>{
        header.removeChild(document.querySelector('.usuarioHeader'));
        if(document.querySelector('.barraCompras') !== null){
            main.removeChild(document.querySelector('.barraCompras'));
        }
        sessionStorage.removeItem('usuarioActual');
        sessionStorage.setItem('carrito', JSON.stringify([]));
    });
    usuario.appendChild(nombre);
    usuario.appendChild(salir);    
    header.appendChild(usuario);
}