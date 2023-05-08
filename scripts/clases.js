class Usuario{
    constructor(nombre, contraseña, correo, localidad){
        this.nombre = nombre;
        this.contraseña = contraseña;
        this.correo = correo;
        this.localidad = localidad;
    }
}
class Caja{
    constructor(medioDePago, cuotas, envio){
        this.medioDePago = medioDePago;
        this.cuotas = cuotas;
        this.envio = envio;
    }
    dinero = 0;
    interes = 0.3;
    iva = 0.21;
    calcularEnvio(cliente){
        if(this.envio === true){
            console.log(this.envio);
            if(cliente[3] === true){
                console.log(cliente);
                console.log(cliente.localidad);
                return 1000;
            } else {
                console.log(cliente);
                console.log(cliente.localidad);
                return 3000;
            }
        } else{
            return 0;
        }
    }
}
