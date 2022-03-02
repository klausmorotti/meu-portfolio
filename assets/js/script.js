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




// FUNÇÃO MENU MOBILE
// Abrir menu mobile
document.querySelector('.menu-hamb').addEventListener('click', () => {
    document.querySelector('.menu-hamb').style.opacity = 0;
    setTimeout(() => {
        document.querySelector('.menu-hamb').style.display = 'none';
        document.querySelector('header nav').style.opacity = 1;
    }, 200)
    document.querySelector('header nav').style.display = 'block';
})
// Fechar menu mobile
document.querySelectorAll('nav a').forEach((item) => {
    item.addEventListener('click', () => {
        document.querySelector('header nav').style.opacity = 0;
        setTimeout(() => {
            document.querySelector('header nav').style.display = 'none';
            document.querySelector('.menu-hamb').style.display = 'block';
        }, 200)
        document.querySelector('.menu-hamb').style.opacity = 1;
    })
})


// SCROLL SUAVE
let menuItems = document.querySelectorAll('nav a, #about-me a[href^="#"]');
// Prevenindo clique de link
menuItems.forEach((item) => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        getAttributeElement(item);
    })
})
// Pegando atributo href pra saber a posição do topo desse elemento 
function getAttributeElement(item) {
    let href = item.getAttribute('href');
    let scrollPosition = document.querySelector(href).offsetTop;
    scrollArea(scrollPosition);
}
// Descendo pro topo do elemento desejado
function scrollArea(scrollPosition) {
    /*
    window.scroll({
        left:0,
        top:scrollPosition,
        behavior:'smooth'
    })
    */
    smoothScrollTo(0, scrollPosition, 1000);
}
/**
 * Smooth scroll animation
 * @param {int} endX: destination x coordinate
 * @param {int} endY: destination y coordinate
 * @param {int} duration: animation duration in ms
 */
function smoothScrollTo(endX, endY, duration) {
    const startX = window.scrollX || window.pageXOffset;
    const startY = window.scrollY || window.pageYOffset;
    const distanceX = endX - startX;
    const distanceY = endY - startY;
    const startTime = new Date().getTime();

    duration = typeof duration !== 'undefined' ? duration : 400;

    // Easing function
    const easeInOutQuart = (time, from, distance, duration) => {
        if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
        return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
    };

    const timer = setInterval(() => {
        const time = new Date().getTime() - startTime;
        const newX = easeInOutQuart(time, startX, distanceX, duration);
        const newY = easeInOutQuart(time, startY, distanceY, duration);
        if (time >= duration) {
            clearInterval(timer);
        }
        window.scroll(newX, newY);
    }, 1000 / 60); // 60 fps
};