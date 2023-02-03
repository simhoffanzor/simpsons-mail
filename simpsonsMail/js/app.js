const email = {
    email: '',
    cc: '',
    asunto: '',
    mensaje: '',
}
const inputEmail = document.querySelector('.input-email');
const inputAsunto = document.querySelector('.input-asunto');
const inputMensaje = document.querySelector('.input-mensaje');
const inputCc = document.querySelector('.input-cc');
const formulario = document.querySelector('#formulario');
const btnEnviar = document.querySelector('.btn-enviar');
const btnResetear = document.querySelector('.btn-resetear');
const spinner = document.querySelector('.contenedor-spinner');

inputEmail.addEventListener('blur', validar);
inputAsunto.addEventListener('blur', validar);
inputMensaje.addEventListener('blur', validar);
inputCc.addEventListener('blur', validar);
formulario.addEventListener('submit', enviarEmail);
btnResetear.addEventListener('click', (e)=>{
    e.preventDefault();
    
    email.email = '';
    email.cc = '';
    email.asunto = '';
    email.mensaje = '';

    formulario.reset();

    comprobarEmail();
});

function validar (e){
    if (!e.target.classList.contains('input-cc')){
        if (e.target.value.trim() === ""){
            mostrarAlerta('El campo "' + e.target.id + '" es obligatorio.', e.target.parentElement);
            email[e.target.id] = '';
            comprobarEmail();
            return;
        }
    }
    
    if((e.target.id === "email" || e.target.id === "cc") && !validarEmail(e.target.value) && e.target.value!==''){
        mostrarAlerta('El correo electrónico ingresado no es válido.', e.target.parentElement);
        email[e.target.id] = '';
        comprobarEmail();
        return;
    }

    borrarAlerta(e.target.parentElement);

    email[e.target.id] = e.target.value.trim().toLowerCase();
    
    comprobarEmail();
}

function mostrarAlerta(mensajeError, referencia){
    borrarAlerta(referencia);

    const error = document.createElement('P');
    error.classList.add('msj-alerta-error');
    error.textContent = mensajeError;

    referencia.appendChild(error);
    
}

function borrarAlerta(referencia){
    const alerta = referencia.querySelector('.msj-alerta-error');

    if (alerta){
        alerta.remove();
    }
}

function validarEmail(email){
    const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
    const resultado = regex.test(email);
    return resultado;
}

function comprobarEmail(){
    if (email.email !== '' && email.asunto !== '' && email.mensaje !== ''){
        btnEnviar.disabled = false;
    }else{
        btnEnviar.disabled = true;
    }
}

function enviarEmail(e){
    e.preventDefault();
    
    spinner.classList.remove('d-none');

    setTimeout(()=>{
        spinner.classList.add('d-none');
        email.email = '';
        email.cc = '';
        email.asunto = '';
        email.mensaje = '';

        formulario.reset();

        comprobarEmail();

        mostrarAlertaEnviado();
    }, 3000);
}

function mostrarAlertaEnviado(){
    const mensajeEnviado = document.createElement('P');
    mensajeEnviado.classList.add('msj-enviado');
    mensajeEnviado.textContent = "¡El correo fue enviado exitosamente!"
    formulario.appendChild(mensajeEnviado);

    setTimeout(()=>{
        mensajeEnviado.classList.add('d-none');
    },3000);
}
