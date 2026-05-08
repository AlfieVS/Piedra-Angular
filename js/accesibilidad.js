document.addEventListener('componentsLoaded', function () {
    lePicaste();
    modoOscuro();
    resaltarSeccion();
});

function lePicaste() {
    const menuHamburguesa = document.querySelector('.menu-imagen');

    if (menuHamburguesa) {
        menuHamburguesa.addEventListener('click', () => {
            desplegarHamburguesa();
        });
    }
}

function desplegarHamburguesa() {
    const navegacion = document.querySelector('.barra-de-arriba');
    if (navegacion) {
        navegacion.classList.toggle('activo');
    }
}

function modoOscuro() {
    const prefiereModoOscuro = window.matchMedia('(prefers-color-scheme: dark)');
    const modoGuardado = localStorage.getItem('modo-oscuro');

    // Si el usuario ya eligió manualmente, respetar esa elección
    if (modoGuardado !== null) {
        if (modoGuardado === 'oscuro') {
            document.body.classList.add('modo-oscuro');
        } else {
            document.body.classList.remove('modo-oscuro');
        }
    } else {
        // Si no hay elección manual, usar la preferencia del sistema
        if (prefiereModoOscuro.matches) {
            document.body.classList.add('modo-oscuro');
        } else {
            document.body.classList.remove('modo-oscuro');
        }
    }

    // Si el sistema cambia y el usuario NO ha elegido manualmente, seguir al sistema
    prefiereModoOscuro.addEventListener('change', function () {
        if (localStorage.getItem('modo-oscuro') !== null) return;

        if (prefiereModoOscuro.matches) {
            document.body.classList.add('modo-oscuro');
        } else {
            document.body.classList.remove('modo-oscuro');
        }
    });

    const botonModoOscuro = document.querySelector('.boton-modo-oscuro');
    if (botonModoOscuro) {
        botonModoOscuro.addEventListener('click', function () {
            document.body.classList.toggle('modo-oscuro');

            // Guardar la elección manual del usuario
            const estaOscuro = document.body.classList.contains('modo-oscuro');
            localStorage.setItem('modo-oscuro', estaOscuro ? 'oscuro' : 'claro');
        });
    }
}

function resaltarSeccion() {
    const paginaActual = window.location.pathname.split('/').pop();
    const enlaces = document.querySelectorAll('.barra-de-arriba a');

    enlaces.forEach(enlace => {
        const href = enlace.getAttribute('href');
        // Si paginaActual está vacía (raíz del dominio), asumimos index.html
        if (paginaActual === href || (paginaActual === '' && href === 'index.html')) {
            enlace.classList.add('seccionActual');
        }
    });
}