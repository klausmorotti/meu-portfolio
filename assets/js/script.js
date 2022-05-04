// EFEITO SUAVE AO ABRIR A PÁGINA
let smoothEffect = () => {
    document.querySelector('body').style.display = 'block';
    setTimeout(() => {
        document.querySelector('body').style.opacity = 1;
    }, 200);
}

// CANCELANDO EVENTO DOS BOTÕES AINDA NÃO UTILIZÁVEIS 
document.querySelector('#contact .button').addEventListener('click', (e) => {
    e.preventDefault();
})


// Direcionando a página ou mostrando modal de projeto em construção
let ctaProjects = document.querySelectorAll('#portfolio .button');
ctaProjects.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        let link = btn.getAttribute('href');

        if( link == '') {
            e.preventDefault();

            let modal = document.querySelector('.modalProjects');
            modal.style.opacity = 1;
            modal.style.zIndex = 99;
            document.documentElement.style.overflow = 'hidden';

            let btnModal = document.querySelector('.modalProjects a');
            btnModal.addEventListener('click', (e) => {
                e.preventDefault();
                modal.style.opacity = 0;
                modal.style.zIndex = -1;
                document.documentElement.style.overflow = 'auto';
            })
        }

    });
})


// FUNÇÃO MENU MOBILE
let menuNavigation = document.querySelector('header nav');
let menuMobile = document.querySelector('header .menu-hamb');

let buttons = document.querySelectorAll('header .menu-hamb, header nav li:first-child');
buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
        if( menuNavigation.classList.contains('menuOpened') ) {
            menuNavigation.classList.remove('menuOpened');
        } else {
            menuNavigation.classList.add('menuOpened');
        }
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