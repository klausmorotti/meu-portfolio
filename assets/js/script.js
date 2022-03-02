// EFEITO SUAVE AO ABRIR A PÁGINA
let smoothEffect = () => {
    document.querySelector('body').style.display = 'block';
    setTimeout(() => {
        document.querySelector('body').style.opacity = 1;
    }, 200);
}

// CANCELANDO EVENTO DOS BOTÕES 
document.querySelectorAll('#portfolio .button, #contact .button').forEach((item) => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
    })
})
