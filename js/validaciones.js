export function valida(input){
    const tipoDeInput = input.dataset.tipo;
    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input)
    }

    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
    }else{
        input.parentElement.classList.add("input-container--invalid");
    }
}

const mensajesError = {
    nombre:{
        valueMissing: "Este campo no puede estar vacio",
    },
    email:{
        valueMissing: "Este campo no puede estar vacio",
        typeMismatch: "El correo no es valido"
    },
    password:{
        valueMissing: "Este campo no puede estar vacio",
        paternMismatch: "Minimo seis caracteres, maximo 12, al menos una mayuscula, una minuscula y un numero: "
    },
    nacimiento: {
        valueMissing: "Este campo no puede estar vacio",
        customError: "Debes tener al menos 18 anos de edad"
    }
}

const validadores = {
    nacimiento: input => validarNacimiento(input),

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