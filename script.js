document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    themeToggle.addEventListener('click', () => {
        htmlElement.classList.toggle('dark-theme');
        themeToggle.classList.add('clicked');
        setTimeout(() => {
            themeToggle.classList.remove('clicked');
        }, 300);
    });

    // Animation des sections au défilement
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.style.opacity = '0';
        observer.observe(section);
    });

    // Animation fluide du défilement
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Animation du bouton CTA
    const ctaButton = document.querySelector('.cta-button');
    ctaButton.addEventListener('mouseover', () => {
        ctaButton.style.transform = 'scale(1.05)';
    });
    ctaButton.addEventListener('mouseout', () => {
        ctaButton.style.transform = 'scale(1)';
    });

    // Effet de parallaxe sur la section hero
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
    });

    // Gestion des modals
    const modalOverlay = document.getElementById('modal-overlay');
    const modalContent = document.getElementById('modal-content');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalYear = document.getElementById('modal-year');
    const modalRating = document.getElementById('modal-rating');
    const modalClose = document.getElementById('modal-close');
    const modalUsage = document.getElementById('modal-usage');
    const modalSource = document.getElementById('modal-source');

    const skillsData = {
        'HTML': {
            type: 'langage',
            description: 'Langage de balisage utilisé pour structurer le contenu des pages web.',
            year: 2018,
            rating: 5,
            usage: "Création de la structure de pages web",
            source: 'https://developer.mozilla.org/fr/docs/Web/HTML'
        },
        'CSS': {
            type: 'langage',
            description: 'Langage de style utilisé pour définir la présentation des documents HTML.',
            year: 2018,
            rating: 4,
            usage: "Création du design des pages web",
            source: 'https://developer.mozilla.org/fr/docs/Web/CSS'
        },
        'JavaScript': {
            type: 'langage',
            description: 'Langage de programmation utilisé pour rendre les pages web interactives.',
            year: 2022,
            rating: 2,
            usage: "Ajout d'animation et de dynamismes aux pages web",
            source: 'https://developer.mozilla.org/fr/docs/Web/JavaScript'
        },
        'PHP': {
            type: 'langage',
            description: 'Langage de programmation principalement utilisé pour produire des pages Web dynamiques via un serveur HTTP.',
            year: 2022,
            rating: 3,
            usage: "Développement de sites web dynamiques et gestion de bases de données",
            source: 'https://www.php.net/'
        },
        'SQL': {
            type: 'langage',
            description: 'Langage de requête structurée pour gérer et manipuler des bases de données relationnelles.',
            year: 2020,
            rating: 4,
            usage: "Gestion et manipulation de bases de données",
            source: 'https://sql.sh/'
        },
        'Java': {
            type: 'langage',
            description: 'Langage de programmation orienté objet utilisé pour développer des applications robustes et portables.',
            year: 2019,
            rating: 3,
            usage: "Développement via l'api Spigot pour les serveurs Minecraft",
            source: 'https://www.java.com/'
        },
        'Lua': {
            type: 'langage',
            description: 'Langage de script léger et embarquable, souvent utilisé dans le développement de jeux.',
            year: 2021,
            rating: 3,
            usage: "Développement de script pour des serveurs FiveM",
            source: 'https://www.lua.org/'
        },
        'Visual Studio Code': {
            type: 'IDE',
            description: 'Éditeur de code source gratuit et puissant développé par Microsoft, offrant de nombreuses fonctionnalités pour faciliter le développement logiciel.',
            year: 2020,
            rating: 5,
            usage: "Développement de projets web",
            source: 'https://code.visualstudio.com/'
        },
        'Eclipse': {
            type: 'IDE',
            description: 'Environnement de développement intégré pour Java avec outils de programmation, débogage et gestion de projets.',
            year: 2019,
            rating: 4,
            usage: "Développement de plugins pour le jeu Minecraft",
            source: 'https://www.eclipse.org/'
        },
        'VSCodium': {
            type: 'IDE',
            description: 'Version open source de Visual Studio Code sans les modules propriétaires de Microsoft.',
            year: 2021,
            rating: 5,
            usage: "Développement de projets web",
            source: 'https://vscodium.com/'
        },
        'Cursor': {
            type: 'IDE',
            description: 'Éditeur de code basé sur l\'IA pour améliorer la productivité des développeurs.',
            year: 2024,
            rating: 3,
            usage: "Développement assisté par IA",
            source: 'https://cursor.sh/'
        },
        'Atom': {
            type: 'IDE',
            description: 'Éditeur de texte libre et open-source développé par GitHub.',
            year: 2021,
            rating: 4,
            usage: "Édition de code et de texte",
            source: 'https://atom.io/'
        },
        'Sublime Text': {
            type: 'IDE',
            description: 'Éditeur de texte rapide pour le code, le marquage et la prose.',
            year: 2020,
            rating: 4,
            usage: "Édition de code et de texte",
            source: 'https://www.sublimetext.com/'
        },
        'Notepad++': {
            type: 'logiciel',
            description: 'Éditeur de texte gratuit et open-source pour Windows, optimisé pour la programmation.',
            year: 2018,
            rating: 5,
            usage: "Édition de code et de texte",
            source: 'https://notepad-plus-plus.org/'
        },
        'Sony Vegas': {
            type: 'logiciel',
            description: 'Logiciel de montage vidéo professionnel.',
            year: 2019,
            rating: 4,
            usage: "Montage et édition vidéo",
            source: 'https://www.vegascreativesoftware.com/fr/vegas-pro/'
        },
        'Photoshop': {
            type: 'logiciel',
            description: 'Logiciel de retouche, de traitement et de dessin assisté par ordinateur.',
            year: 2016,
            rating: 4,
            usage: "Édition d'images et création graphique",
            source: 'https://www.adobe.com/products/photoshop.html'
        },
        'Suite Office': {
            type: 'logiciel',
            description: 'Ensemble de logiciels bureautiques comprenant Word, Excel, PowerPoint, etc.',
            year: 2018,
            rating: 4,
            usage: "Création de documents, feuilles de calcul et présentations",
            source: 'https://www.office.com/'
        },
        'Canva': {
            type: 'logiciel',
            description: 'Plateforme de conception graphique en ligne pour créer des visuels attrayants.',
            year: 2021,
            rating: 5,
            usage: "Création de designs pour les réseaux sociaux, présentations, et autres supports visuels",
            source: 'https://www.canva.com/'
        },
        'PhpMyAdmin': {
            type: 'logiciel',
            description: 'Interface web pour gérer les bases de données MySQL.',
            year: 2020,
            rating: 5,
            usage: "Administration de bases de données MySQL",
            source: 'https://www.phpmyadmin.net/'
        }
    };

    function openModal(skill) {
        console.log('Opening modal for:', skill);
        const data = skillsData[skill];
        modalTitle.textContent = skill;
        modalDescription.textContent = `${data.type.charAt(0).toUpperCase() + data.type.slice(1)} : ${data.description}`;
        modalYear.textContent = `Année de début : ${data.year}`;
        modalRating.innerHTML = `Maîtrise : ${'★'.repeat(data.rating)}${'☆'.repeat(5 - data.rating)}`;
        modalUsage.textContent = `Utilisation : ${data.usage || 'Non spécifié'}`;
        
        if (data.source) {
            modalSource.href = data.source;
            modalSource.style.display = 'flex';
        } else {
            modalSource.style.display = 'none';
        }
        
        modalContent.className = 'modal-content';
        modalContent.classList.add(data.type.toLowerCase());
        
        modalOverlay.style.display = 'block';
    }

    function closeModal() {
        modalOverlay.style.display = 'none';
    }

    document.querySelectorAll('.skill, .software').forEach(item => {
        item.addEventListener('click', () => openModal(item.textContent));
    });

    document.getElementById('modal-close').addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });
});
