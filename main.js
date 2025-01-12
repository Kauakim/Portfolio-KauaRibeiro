document.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    if (window.scrollY > 10) { // Define o limite para aplicar a cor sólida
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});