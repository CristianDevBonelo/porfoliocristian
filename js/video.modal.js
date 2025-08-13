(function(){
    const openBtn = document.getElementById('open-steps');
    const modal = document.getElementById('cypress-steps-modal');
    const overlay = document.getElementById('modalOverlay');
    const closeBtn = document.getElementById('modalClose');
    const closeStepsBtn = document.getElementById('close-steps');

    // abrir modal
    function openModal() {
      modal.classList.add('show');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    // cerrar modal
    function closeModal() {
      modal.classList.remove('show');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    openBtn && openBtn.addEventListener('click', openModal);
    closeBtn && closeBtn.addEventListener('click', closeModal);
    closeStepsBtn && closeStepsBtn.addEventListener('click', closeModal);
    overlay && overlay.addEventListener('click', closeModal);

    // cerrar con ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('show')) closeModal();
    });
})();
