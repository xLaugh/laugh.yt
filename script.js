function openProjectModal(projectId) {
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    
    // Cacher tous les détails de projet
    document.querySelectorAll('[id$="-detail"]').forEach(el => {
        el.classList.add('hidden');
    });
    
    // Afficher les détails spécifiques au projet
    const projectDetail = document.getElementById(`${projectId}-detail`);
    if (projectDetail) {
        projectDetail.classList.remove('hidden');
    }
    
    // Configuration spécifique selon le projet
    switch(projectId) {
        case 'jeffwars':
            modalTitle.textContent = 'JeffWars';
            break;
        case 'pourcentage':
            modalTitle.textContent = 'Pourcentage Roleplay';
            break;
        case 'entrepot-bot':
            modalTitle.textContent = 'Bot Discord L\'Entrepôt';
            break;
        case 'pourcentage-bot':
            modalTitle.textContent = 'Bot Discord Pourcentage';
            break;
        case 'linklaugh':
            modalTitle.textContent = 'Link.laugh.yt';
            break;
        case 'bipbipfood':
            modalTitle.textContent = 'BipBipFood28';
            break;
        case 'lfterritory':
            modalTitle.textContent = 'LfTerritory';
            break;
        case 'cookedcraft':
            modalTitle.textContent = 'CookedCraft';
            break;
        case 'lckhudplus':
            modalTitle.textContent = 'lckHUDplus';
            break;
        case 'laughfightclub':
            modalTitle.textContent = 'LaughFightClub';
            break;
        case 'jump':
            modalTitle.textContent = 'Jump';
            break;
        case 'simplepvpsoup':
            modalTitle.textContent = 'SimplyPvPSoup';
            break;
        case 'pourcentageshop':
            modalTitle.textContent = 'PourcentageShop';
            break;
        case 'pourcentage-mdt':
            modalTitle.textContent = 'Pourcentage MDT';
            break;
        default:
            modalTitle.textContent = 'Détails du projet';
    }
    
    // Afficher la modal
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = 'auto';
} 