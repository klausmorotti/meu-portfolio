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

        if (link == '') {
            e.preventDefault();

            let modal = document.querySelector('.modalProjects');
            modal.style.opacity = 1;
            modal.style.zIndex = 99;
            document.documentElement.style.overflow = 'hidden';

            let btnModal = document.querySelector('.modalProjects a');
            btnModal.addEventListener('click', (e) => {
                e.preventDefault();
                document.querySelector('.content').style.opacity = 0;
                document.querySelector('.content').style.zIndex = -1;
                let showCoffee = setInterval(() => {
                    document.querySelector('.areaCoffee').style.opacity = 1;
                    document.querySelector('.areaCoffee').style.zIndex = 99;
                }, 100)
                setTimeout(() => {
                    clearInterval(showCoffee);
                    modal.style.opacity = 0;
                    modal.style.zIndex = -1;
                    setTimeout(() => {
                        document.querySelector('.content').style.opacity = 1;
                        document.querySelector('.content').style.zIndex = 99;
                    }, 500)
                    document.querySelector('.areaCoffee').style.opacity = 0;
                    document.querySelector('.areaCoffee').style.zIndex = -1;
                }, 3000)
                document.documentElement.style.overflow = 'auto';
            })
        }

    });
})

// Botão voltar ao topo
let btnGoTop = document.querySelector('.goTop');
window.addEventListener('scroll', () => {
    if (window.scrollY === 0) {
        btnGoTop.style.display = 'none';
    } else {
        btnGoTop.style.display = 'flex';
    }
})

btnGoTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    })
})


// FUNÇÃO MENU MOBILE
let menuNavigation = document.querySelector('header nav');
let menuMobile = document.querySelector('header .menu-hamb');

let buttons = document.querySelectorAll('header .menu-hamb, header .closeMenu .x');
buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
        if (menuNavigation.classList.contains('menuOpened')) {
            menuNavigation.classList.remove('menuOpened');
        } else {
            menuNavigation.classList.add('menuOpened');
        }
    })
})

/*
TROCA DE TEMA
let themes = document.querySelector('.themes');
let ballTheme = document.querySelector('.themes .ballTheme');
themes.addEventListener('click', () => {
    if( window.document.body.classList.contains('dark') ) {
        window.document.body.classList.remove('dark');
        window.document.body.classList.add('light');
        document.querySelector('.ballTheme').style.transform = 'translate(34px)';
        ballTheme.style.backgroundColor = 'var(--bg-page)';
        themes.style.backgroundColor = 'var(--color-fonts)';
    } else {
        window.document.body.classList.remove('light');
        window.document.body.classList.add('dark');
        document.querySelector('.ballTheme').style.transform = 'translate(0)';
        ballTheme.style.backgroundColor = 'var(--color-fonts)';
        themes.style.backgroundColor = 'var(--bg-page)';
    }
})
*/




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
    menuNavigation.classList.remove('menuOpened');

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