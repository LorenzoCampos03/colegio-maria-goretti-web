document.addEventListener("DOMContentLoaded", () => {
    const carruseles = document.querySelectorAll(".container-carousel");

    carruseles.forEach(carrusel => {
        const btnLeft = carrusel.querySelector(".btn-left"),
              btnRight = carrusel.querySelector(".btn-right"),
              slider = carrusel.querySelector(".carruseles"),
              sliderSections = carrusel.querySelectorAll(".slider-section");

        let counter = 0,
            widthImg = 100 / sliderSections.length;

        btnLeft.addEventListener("click", () => moveToLeft(carrusel));
        btnRight.addEventListener("click", () => moveToRight(carrusel));

        setInterval(() => {
            moveToRight(carrusel);
        }, 3000);

        function moveToRight(carrusel) {
            if (counter >= sliderSections.length - 1) {
                counter = 0;
                let operacion = counter * widthImg;
                slider.style.transform = `translate(-${operacion}%)`;
                slider.style.transition = "none";
                return;
            }
            counter++;
            let operacion = counter * widthImg;
            slider.style.transform = `translate(-${operacion}%)`;
            slider.style.transition = "all ease .6s";
        }

        function moveToLeft(carrusel) {
            if (counter <= 0) {
                counter = sliderSections.length - 1;
                let operacion = counter * widthImg;
                slider.style.transform = `translate(-${operacion}%)`;
                slider.style.transition = "none";
                return;
            }
            counter--;
            let operacion = counter * widthImg;
            slider.style.transform = `translate(-${operacion}%)`;
            slider.style.transition = "all ease .6s";
        }
    });
});