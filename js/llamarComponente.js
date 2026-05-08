async function loadComponents() {
    const elements = document.querySelectorAll("[data-include]");
    for (const el of elements) {
        const file = `/componentes/${el.getAttribute("data-include")}.html`;
        try {
            const response = await fetch(file);
            if (!response.ok) throw new Error(`No se pudo cargar ${file}`);
            const html = await response.text();
            el.insertAdjacentHTML('afterbegin', html);
        } catch (err) {
            console.error(err);
            el.innerHTML = `<p style="color:red">Error al cargar ${file}</p>`;
        }
    }
}

loadComponents().then(() => {
    document.dispatchEvent(new Event('componentsLoaded'));

    // Ocultar el botón "¡Contáctame!" si estamos en la página de contacto
    if (window.location.pathname.includes('contacto')) {
        const botonContacto = document.querySelector('.caja-portada .botón');
        if (botonContacto) {
            botonContacto.style.display = 'none';
        }
    }
});