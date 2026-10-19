// Datos de proyectos para el modal interactivo
const projectsData = [
    {
        title: "Pasarela colaboración Élite | Victoria Secret",
        category: "Escolares",
        description: "Diseño de lencería en encaje azul y bata fluida",
        images: [
            "images/Project_1.png",
            "images/Project_1_1.png"
        ],
        palette: ["#6085a6", "#ffffff"],
    },
    {
        title: "La Madrina",
        category: "Temática",
        description: "Vestido de gala negro con flores artesanales de cempasúchil",
        images: [
            "images/Project_2_1.png",
            "images/Project_2_2.png"
        ],
        palette: ["#0a0908", "#e07a10"],
    },
    {
        title: "Senzul",
        category: "Escolares",
        description: "Vestido azul",
        images: [
            "images/Project_3_1.png",
            "images/Project_3_2.png"
        ],
        palette: ["#9bb3d3", "#d8cbb9"],
    },
    {
        title: "Titlán",
        category: "Alta Costura • Cultura Mesoamericana",
        description: "Estructura corsetada y faldón escultórico tono verde olivo metálico",
        images: [
            "images/Project_4_1.png",
            "images/Project_4_2.png"
        ],
        palette: ["#555a36", "#3b3d22"],
    },
    {
        title: "Uniforme escolar",
        category: "Personal",
        description: "Diseño de uniforme de escolta escuela.",
        images: [
            "images/Project_5_1.png",
            "images/Project_5_2.png"
        ],
        palette: ["#000000", "#c5a059", "#4a121a"],
    },
    {
        title: "Lampir",
        category: "Escolar",
        description: "Vestido azul.",
        images: [
            "images/Project_6_1.png",
            "images/Project_6_2.png"
        ],
        palette: ["#8faec4", "#e2e8f0", "#5b7e98"],
    }
];

// Datos de Fichas Técnicas
const techSpecsData = [
    {
        flatSketch: "images/technical_sheet_1.png"
    },
    {
        flatSketch: "images/technical_sheet_2_!.png"
    },
    {
        flatSketch: "images/technical_sheet_3.png"
    },
    {
        flatSketch: "images/technical_sheet_4.png"
    }
];

// Función para cargar ficha técnica
function loadTechSpec(index) {
    const spec = techSpecsData[index];

    // Actualizar estado visual de los tabs
    document.querySelectorAll(".tech-spec-tab").forEach(tab => {
        tab.classList.remove("active-spec");
    });
    document.getElementById(`spec-tab-${index}`).classList.add("active-spec");

    // Inyectar solo la imagen en el panel
    const display = document.getElementById("tech-spec-display");
    display.innerHTML = `
        <img src="${spec.flatSketch}" 
             alt="Sketch ${index}" 
             class="w-full border border-mood-gold/20">`;
}

// Cargar primera ficha por defecto al iniciar
window.addEventListener('DOMContentLoaded', () => {
    loadTechSpec(0);
});

// Menu Mobile Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Filtrado de proyectos
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => {
            b.classList.remove('active', 'text-mood-gold', 'border-mood-gold');
            b.classList.add('text-mood-muted', 'border-transparent');
        });
        btn.classList.add('active', 'text-mood-gold', 'border-mood-gold');
        btn.classList.remove('text-mood-muted', 'border-transparent');

        const filter = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = ''; // Restablece el display original para integrarse a la rejilla de Tailwind
            } else {
                card.style.display = 'none'; // Oculta los elementos no seleccionados
            }
        });
    });
});

// Abrir Modal de Proyecto
function openProjectModal(index) {
    const data = projectsData[index];
    const modal = document.getElementById('project-modal');
    const content = document.getElementById('modal-content');

    content.innerHTML = `
                <div class="border-b border-mood-gold/20 pb-4">
                    <span class="text-xs uppercase tracking-widest text-mood-gold">${data.category}</span>
                    <h3 class="font-serif text-3xl text-mood-beige mt-1">${data.title}</h3>
                </div>

                <p class="text-xs text-mood-beige/80 leading-relaxed font-light">${data.description}</p>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    ${data.images.map(img => `<img src="${img}" class="w-full h-80 object-contain bg-mood-black/60 border border-mood-gold/20">`).join('')}
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-4 border-t border-mood-gold/10">
                    <div>
                        <span class="text-mood-gold uppercase tracking-widest block mb-1">Paleta de Color:</span>
                        <div class="flex gap-2 mt-1">
                            ${data.palette.map(c => `<div class="w-6 h-6 rounded-full border border-mood-gold/30" style="background-color: ${c}"></div>`).join('')}
                        </div>
                    </div>
                </div>
            `;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

// Toast Notificación
function showToast(text) {
    const toast = document.getElementById('toast-message');
    const toastText = document.getElementById('toast-text');
    toastText.textContent = text;
    toast.classList.remove('hidden');
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3500);
}

function handleFormSubmit(e) {
    e.preventDefault();
    showToast("Mensaje enviado con éxito al Atelier");
    e.target.reset();
}

function downloadCV() {
    showToast("Descargando CV en PDF...");
    const link = document.createElement("a");
    link.href = "documents/Documento A4 Curriculum Vitae minimalistabeige blanco negro.pdf"; // Ajusta la ruta
    link.download = "Curriculum_Vitae.pdf"; // Nombre del archivo al descargar
    link.click();
}