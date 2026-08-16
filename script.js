/* ==================================================
   MENU MOBILE
================================================== */

const menuButton = document.getElementById("menuButton");
const nav = document.getElementById("nav");

if (menuButton && nav) {

    menuButton.addEventListener("click", () => {
        nav.classList.toggle("open");
    });

    nav.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {
            nav.classList.remove("open");
        });

    });

}



/* ==================================================
   CURSOR
================================================== */

const cursor = document.querySelector(".cursor");
const follower = document.querySelector(".cursor-follower");

if (cursor && follower && window.innerWidth > 900) {

    document.addEventListener("mousemove", event => {

        cursor.style.left = `${event.clientX}px`;
        cursor.style.top = `${event.clientY}px`;

        follower.animate(
            {
                left: `${event.clientX}px`,
                top: `${event.clientY}px`
            },
            {
                duration: 300,
                fill: "forwards"
            }
        );

    });

}



/* ==================================================
   REVEAL
================================================== */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                revealObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.08
    }
);

revealElements.forEach(element => {
    revealObserver.observe(element);
});



/* ==================================================
   GALERIA
================================================== */

const gallery = document.getElementById("gallery");

const galleryItems = Array.from(
    document.querySelectorAll(".gallery-item")
);

const mainFilters = document.querySelectorAll(".filter");

const sportFiltersContainer =
    document.getElementById("sportFilters");

const sportFilters =
    document.querySelectorAll(".sport-filter");

const ensaioFiltersContainer =
    document.getElementById("ensaioFilters");

const ensaioFilters =
    document.querySelectorAll(".ensaio-filter");


let currentCategory = "all";
let currentSport = "all";
let currentEnsaio = "all";



/* ==================================================
   EMBARALHAR FOTOS
   SOMENTE NA VISÃO "TODOS"
================================================== */

function shuffleArray(array) {

    const shuffled = [...array];

    for (
        let i = shuffled.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(Math.random() * (i + 1));

        [
            shuffled[i],
            shuffled[j]
        ] =
        [
            shuffled[j],
            shuffled[i]
        ];
    }

    return shuffled;
}



/* ==================================================
   ORDEM ALEATÓRIA DA GALERIA
================================================== */

function randomizeGallery() {

    if (!gallery) return;

    const shuffled =
        shuffleArray(galleryItems);

    shuffled.forEach(item => {
        gallery.appendChild(item);
    });

}



/* ==================================================
   MOSTRAR / ESCONDER SUBFILTROS
================================================== */

function updateSubFilters() {

    if (sportFiltersContainer) {

        if (currentCategory === "esporte") {
            sportFiltersContainer.classList.add("show");
        } else {
            sportFiltersContainer.classList.remove("show");
        }

    }


    if (ensaioFiltersContainer) {

        if (currentCategory === "ensaio") {
            ensaioFiltersContainer.classList.add("show");
        } else {
            ensaioFiltersContainer.classList.remove("show");
        }

    }

}



/* ==================================================
   FILTRAR GALERIA
================================================== */

function filterGallery() {

    galleryItems.forEach(item => {

        const category =
            item.dataset.category;

        const sport =
            item.dataset.sport;

        const ensaioType =
            item.dataset.ensaio;


        let show = true;


        /* Categoria principal */

        if (
            currentCategory !== "all" &&
            category !== currentCategory
        ) {
            show = false;
        }


        /* Esporte */

        if (
            currentCategory === "esporte" &&
            currentSport !== "all" &&
            sport !== currentSport
        ) {
            show = false;
        }


        /* Ensaio */

        if (
            currentCategory === "ensaio" &&
            currentEnsaio !== "all" &&
            ensaioType !== currentEnsaio
        ) {
            show = false;
        }


        if (show) {

            item.style.display = "";

        } else {

            item.style.display = "none";

        }

    });

}



/* ==================================================
   FILTROS PRINCIPAIS
================================================== */

mainFilters.forEach(button => {

    button.addEventListener("click", () => {

        mainFilters.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");


        currentCategory =
            button.dataset.filter;


        currentSport = "all";
        currentEnsaio = "all";


        sportFilters.forEach(btn => {
            btn.classList.remove("active");

            if (btn.dataset.sport === "all") {
                btn.classList.add("active");
            }
        });


        ensaioFilters.forEach(btn => {
            btn.classList.remove("active");

            if (btn.dataset.ensaio === "all") {
                btn.classList.add("active");
            }
        });


        updateSubFilters();


        /*
         * Quando clicar em TODOS,
         * embaralha novamente.
         */

        if (currentCategory === "all") {
            randomizeGallery();
        }


        filterGallery();

    });

});



/* ==================================================
   FILTROS DE ESPORTE
================================================== */

sportFilters.forEach(button => {

    button.addEventListener("click", () => {

        sportFilters.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        currentSport =
            button.dataset.sport;

        filterGallery();

    });

});



/* ==================================================
   FILTROS DE ENSAIO
================================================== */

ensaioFilters.forEach(button => {

    button.addEventListener("click", () => {

        ensaioFilters.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        currentEnsaio =
            button.dataset.ensaio;

        filterGallery();

    });

});



/* ==================================================
   INICIALIZAÇÃO
================================================== */

randomizeGallery();

updateSubFilters();

filterGallery();



/* ==================================================
   LIGHTBOX
================================================== */

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const lightboxClose =
    document.getElementById("lightboxClose");

const lightboxPrev =
    document.getElementById("lightboxPrev");

const lightboxNext =
    document.getElementById("lightboxNext");


let currentImageIndex = 0;

let visibleImages = [];



/* ==================================================
   ATUALIZAR IMAGENS VISÍVEIS
================================================== */

function updateVisibleImages() {

    visibleImages =
        galleryItems.filter(item => {

            return (
                item.style.display !== "none"
            );

        });

}



/* ==================================================
   ABRIR LIGHTBOX
================================================== */

function openLightbox(item) {

    updateVisibleImages();

    currentImageIndex =
        visibleImages.indexOf(item);


    if (currentImageIndex === -1) {
        return;
    }


    const image =
        item.querySelector("img");


    lightboxImage.src =
        image.src;

    lightboxImage.alt =
        image.alt;


    lightbox.classList.add("open");

    lightbox.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "no-scroll"
    );

}



/* ==================================================
   FECHAR LIGHTBOX
================================================== */

function closeLightbox() {

    lightbox.classList.remove("open");

    lightbox.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "no-scroll"
    );

}



/* ==================================================
   TROCAR IMAGEM
================================================== */

function showLightboxImage(index) {

    updateVisibleImages();

    if (!visibleImages.length) {
        return;
    }


    if (index < 0) {

        index =
            visibleImages.length - 1;

    }


    if (
        index >=
        visibleImages.length
    ) {

        index = 0;

    }


    currentImageIndex = index;


    const item =
        visibleImages[currentImageIndex];

    const image =
        item.querySelector("img");


    lightboxImage.src =
        image.src;

    lightboxImage.alt =
        image.alt;

}



/* ==================================================
   CLIQUE NAS FOTOS
================================================== */

galleryItems.forEach(item => {

    item.addEventListener("click", () => {

        openLightbox(item);

    });

});



/* ==================================================
   BOTÃO FECHAR
================================================== */

if (lightboxClose) {

    lightboxClose.addEventListener(
        "click",
        closeLightbox
    );

}



/* ==================================================
   ANTERIOR
================================================== */

if (lightboxPrev) {

    lightboxPrev.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            showLightboxImage(
                currentImageIndex - 1
            );

        }
    );

}



/* ==================================================
   PRÓXIMA
================================================== */

if (lightboxNext) {

    lightboxNext.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            showLightboxImage(
                currentImageIndex + 1
            );

        }
    );

}



/* ==================================================
   CLICAR FORA DA FOTO
================================================== */

lightbox.addEventListener(
    "click",
    event => {

        if (
            event.target === lightbox
        ) {

            closeLightbox();

        }

    }
);



/* ==================================================
   TECLADO
================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            !lightbox.classList.contains("open")
        ) {
            return;
        }


        if (event.key === "Escape") {

            closeLightbox();

        }


        if (event.key === "ArrowLeft") {

            showLightboxImage(
                currentImageIndex - 1
            );

        }


        if (event.key === "ArrowRight") {

            showLightboxImage(
                currentImageIndex + 1
            );

        }

    }
);