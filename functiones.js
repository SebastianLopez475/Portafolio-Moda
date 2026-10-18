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
        palette: ["#0a0908", "#4a121a", "#c5a059"],
        materials: "Terciopelo de seda, tul ilusion, encaje chantilly, ballenas de acero."
    },
    {
        title: "Sombras de Borgoña",
        category: "Avant-Garde • Experimental",
        description: "Una exploración volumétrica sobre la silueta femenina. Utiliza técnicas de drapeado directo sobre maniquí y superposición de capas en tonos borgoña y vinos profundos.",
        images: [
            "images/Project_5_1.png",
            "images/Project_5_2.png"
        ],
        palette: ["#4a121a", "#121110", "#9e473b"],
        materials: "Cuero teñido artesanalmente, raso pesado, organza de seda."
    },
    {
        title: "Elegía Botánica",
        category: "Prêt-à-Porter Premium",
        description: "Línea caracterizada por abrigos de corte sastreado y solapas amplias. Una oda a las tonalidades sepia, tierras y ocres con acabados metálicos.",
        images: [
            "images/Project_6_1.png",
            "images/Project_6_2.png"
        ],
        palette: ["#d8cbb9", "#8c8275", "#c5a059"],
        materials: "Paño de lana 100%, lino rústico, forros en viscosa impresos."
    }
];

// Datos de Fichas Técnicas
const techSpecsData = [
    {
        ref: "FT-2024-01",
        name: "Corsé Victoriano Desestructurado",
        fabric: "Terciopelo Algodón 100% / Forro Entretela Rígida",
        colorway: "Negro Óxido / Borgoña Profundo",
        hardware: "Ojalillos de latón envejecido, varillas de espiral 6mm, cordón de satén.",
        stitches: "Puntada recta 2.5mm / Carga interna de costura",
        flatSketch: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=600&q=80"
    },
    {
        ref: "FT-2024-02",
        name: "Saco Editorial Solapa Drapeada",
        fabric: "Paño de Lana Virgeb 450g / Forro de Raso de Viscosa",
        colorway: "Marrón Sepia / Terracota",
        hardware: "Botón de asta natural 28mm, hombreras de sastrería.",
        stitches: "Puntada invisible en ruedo, hilván de picado en solapa",
        flatSketch: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80"
    },
    {
        ref: "FT-2024-03",
        name: "Vestido Evassé Terciopelo Devoré",
        fabric: "Seda Devoré Motivo Floral / Tul de Poliamida",
        colorway: "Vino Tinto / Dorado Antiguo",
        hardware: "Cierre invisible de 50cm, broche de gancho metálico.",
        stitches: "Costura francesa 5mm, dobladillo pañuelo",
        flatSketch: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80"
    }
];

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

// Carga Dinámica de Ficha Técnica
function loadTechSpec(index) {
    const spec = techSpecsData[index];
    const display = document.getElementById('tech-spec-display');

    // Actualizar clase activa en pestañas
    document.querySelectorAll('.tech-spec-tab').forEach((tab, i) => {
        if (i === index) {
            tab.classList.add('border-mood-gold', 'bg-mood-black/50');
            tab.classList.remove('border-mood-gold/10', 'bg-mood-black/30');
        } else {
            tab.classList.remove('border-mood-gold', 'bg-mood-black/50');
            tab.classList.add('border-mood-gold/10', 'bg-mood-black/30');
        }
    });

    display.innerHTML = `
                <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-mood-gold/20 pb-4 mb-6 gap-2">
                    <div>
                        <span class="text-[10px] tracking-widest text-mood-gold uppercase">Ficha Técnica Oficial</span>
                        <h3 class="font-serif text-2xl text-mood-beige">${spec.name}</h3>
                    </div>
                    <span class="px-3 py-1 bg-mood-burgundy/40 border border-mood-burgundy text-mood-beige text-[11px] uppercase tracking-widest">${spec.ref}</span>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div class="space-y-4 text-xs">
                        <div>
                            <span class="text-mood-gold block uppercase tracking-widest mb-0.5">Tejido Principal:</span>
                            <p class="text-mood-beige/80 font-light">${spec.fabric}</p>
                        </div>
                        <div>
                            <span class="text-mood-gold block uppercase tracking-widest mb-0.5">Variación Cromática:</span>
                            <p class="text-mood-beige/80 font-light">${spec.colorway}</p>
                        </div>
                        <div>
                            <span class="text-mood-gold block uppercase tracking-widest mb-0.5">Insumos & Avíos:</span>
                            <p class="text-mood-beige/80 font-light">${spec.hardware}</p>
                        </div>
                        <div>
                            <span class="text-mood-gold block uppercase tracking-widest mb-0.5">Costuras & Acabados:</span>
                            <p class="text-mood-beige/80 font-light">${spec.stitches}</p>
                        </div>
                    </div>

                    <div class="editorial-frame">
                        <span class="text-[10px] text-mood-muted uppercase tracking-widest block mb-2 text-center">Geometral / Muestra Textil</span>
                        <img src="${spec.flatSketch}" alt="Geometral Plano" class="w-full h-48 object-cover border border-mood-gold/10">
                    </div>
                </div>
            `;
}

// Cargar primera ficha por defecto al iniciar
window.addEventListener('DOMContentLoaded', () => {
    loadTechSpec(0);
});

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
    showToast("Iniciando descarga del CV en PDF...");
}