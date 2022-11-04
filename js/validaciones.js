export function valida(input){
    const tipoDeInput = input.dataset.tipo;
    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input);
    }

    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    }else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajesError(tipoDeInput, input);
    }
}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
];    

const mensajesError = {
    nombre:{
        valueMissing: "El campo Nombre no puede quedar vacio",
    },
    email:{
        valueMissing: "El campo Email no puede quedar vacio",
        typeMismatch: "El correo no es valido"
    },
    password:{
        valueMissing: "El campo Contrasenia no puede quedar vacio",
        patternMismatch: "Minimo seis caracteres, maximo 12, al menos una mayuscula, una minuscula y un numero: "
    },
    nacimiento: {
        valueMissing: "El campo Fecha de Nacimiento no puede quedar vacio",
        customError: "Debes tener al menos 18 anos de edad"
    },
    numero: {
        valueMissing: "El campo Numero Telefonico no puede estar vacio",
        patternMismatch: "El formato requerido es 11XXXXXXXX (10 Numeros)."
    },
    direccion: {
        valueMissing: "El campo Direccion no puede estar vacio",
        patternMismatch: "La direccion debe contener entre 10 a 40 caracteres." 
    },
    ciudad: {
        valueMissing: "El campo Ciudad no puede estar vacio",
        patternMismatch: "La ciudad debe contener entre 4 a 30 caracteres."
    },
    estado:{
        valueMissing: "El campo Estado no puede estar vacio",
        patternMismatch: "El Estado debe contener entre 4 a 30 caracteres."
    },
};

const validadores = {
    nacimiento: input => validarNacimiento(input),

};

function mostrarMensajesError(tipoDeInput, input){
    let mensaje = "";
    tipoDeErrores.forEach((error) => {
        if(input.validity[error]){
            console.log(tipoDeInput, error);
            console.log(input.validity[error]);
            console.log(mensajesError[tipoDeInput][error]);
            mensaje = mensajesError[tipoDeInput][error];
        }
    });
    return mensaje;
};

/*const inputNacimiento = document.querySelector("#birth");

inputNacimiento.addEventListener('blur', (evento) => {
    validarNacimiento(evento.target)
});*/

function validarNacimiento(input){
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if(mayorEdad(fechaCliente)){
    }else{
        mensaje = "Debes tener al menos 18 de edad";
    };

    input.setCustomValidity(mensaje);
};

function mayorEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate());
    return diferenciaFechas <= fechaActual;
}