// Clase Modo Presentación 
class PresentationMode {
  constructor() {
    this.isActive = false;
    this.currentSlide = 0;
    this.slides = [];
    this.toggleButton = null;
    this.init();
  }

  init() {
    this.createToggleButton();
    
    // Detectar tecla Ctrl+R
    document.addEventListener('keydown', (e) => {
      if (e.key === 'r' && e.ctrlKey) {
        e.preventDefault();
        this.toggle();
      }
      
      // Navegación en modo presentación
      if (this.isActive) {
        if (e.key === 'ArrowDown' || e.key === ' ' || e.key === 'PageDown') {
          e.preventDefault();
          this.nextSlide();
        } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
          e.preventDefault();
          this.prevSlide();
        } else if (e.key === 'Escape') {
          this.deactivate();
        }
      }
    });

    this.initTouchEvents();
  }

  createToggleButton() {
    this.toggleButton = document.createElement('button');
    this.toggleButton.className = 'presentation-toggle';
    this.toggleButton.id = 'presentationToggle';
    this.toggleButton.title = 'Activar modo presentación (Ctrl + R)';
    this.toggleButton.innerHTML = `
      <i class="fas fa-desktop"></i>
      <span class="presentation-label">Modo Presentación</span>
      <span class="shortcut-hint">Ctrl + R</span>
    `;
    
    this.toggleButton.addEventListener('click', () => this.toggle());
    document.body.appendChild(this.toggleButton);
  }

  initTouchEvents() {
    let touchStartY = 0;

    document.addEventListener('touchstart', (e) => {
      touchStartY = e.touches[0].clientY;
    });

    document.addEventListener('touchend', (e) => {
      if (!this.isActive) return;
      
      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY - touchEndY;
      
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          this.nextSlide();
        } else {
          this.prevSlide();
        }
      }
    });
  }

  toggle() {
    if (this.isActive) {
      this.deactivate();
    } else {
      this.activate();
    }
  }

  activate() {
    this.isActive = true;
    
    // Solo agregar clase al body para tracking, no para estilos
    document.body.classList.add('presentation-mode-active');
    
    this.slides = Array.from(document.querySelectorAll('section'));
    this.currentSlide = 0;
    
    this.updateToggleButton();
    this.createSlideIndicator();
    this.goToSlide(0);
    this.showInstructions();
    
    // Aplicar scroll suave a todo el documento
    document.documentElement.style.scrollBehavior = 'smooth';
  }

  deactivate() {
    this.isActive = false;
    document.body.classList.remove('presentation-mode-active');
    document.documentElement.style.scrollBehavior = '';
    
    this.updateToggleButton();
    this.removeSlideIndicator();
    this.hideInstructions();
  }

  updateToggleButton() {
    if (!this.toggleButton) return;
    
    const label = this.toggleButton.querySelector('.presentation-label');
    const hint = this.toggleButton.querySelector('.shortcut-hint');
    const icon = this.toggleButton.querySelector('i');
    
    if (this.isActive) {
      label.textContent = 'Salir Presentación';
      hint.textContent = 'ESC';
      icon.className = 'fas fa-times';
      this.toggleButton.title = 'Salir del modo presentación (ESC)';
    } else {
      label.textContent = 'Modo Presentación';
      hint.textContent = 'Ctrl + P';
      icon.className = 'fas fa-desktop';
      this.toggleButton.title = 'Activar modo presentación (Ctrl + P)';
    }
  }

  createSlideIndicator() {
    this.indicator = document.createElement('div');
    this.indicator.className = 'presentation-indicator';
    this.indicator.innerHTML = '<div class="indicator-title">Slides</div>';
    
    this.slides.forEach((slide, index) => {
      const dot = document.createElement('div');
      dot.className = `indicator-dot ${index === 0 ? 'active' : ''}`;
      dot.setAttribute('data-slide', index);
      dot.addEventListener('click', () => this.goToSlide(index));
      
      const sectionTitle = slide.querySelector('.section-title')?.textContent || `Slide ${index + 1}`;
      dot.title = sectionTitle;
      
      this.indicator.appendChild(dot);
    });
    
    document.body.appendChild(this.indicator);
  }

  removeSlideIndicator() {
    if (this.indicator) {
      this.indicator.remove();
      this.indicator = null;
    }
  }

  goToSlide(index) {
    if (index >= 0 && index < this.slides.length) {
      this.currentSlide = index;
      this.slides[index].scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      this.updateSlideIndicator();
    }
  }

  nextSlide() {
    if (this.currentSlide < this.slides.length - 1) {
      this.goToSlide(this.currentSlide + 1);
    }
  }

  prevSlide() {
    if (this.currentSlide > 0) {
      this.goToSlide(this.currentSlide - 1);
    }
  }

  updateSlideIndicator() {
    const dots = document.querySelectorAll('.indicator-dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentSlide);
    });
  }

  showInstructions() {
    this.instructions = document.createElement('div');
    this.instructions.className = 'presentation-instructions';
    this.instructions.innerHTML = `
      <div class="instructions-container">
        <div class="instruction">
          <span class="key">🔼</span>
          <span>Anterior</span>
        </div>
        <div class="instruction">
          <span class="key">🔽</span>
          <span>Siguiente</span>
        </div>
        <div class="instruction">
          <span class="key">ESC</span>
          <span>Salir</span>
        </div>
      </div>
    `;
    document.body.appendChild(this.instructions);
    
    setTimeout(() => {
      this.hideInstructions();
    }, 4000);
  }

  hideInstructions() {
    if (this.instructions) {
      this.instructions.style.opacity = '0';
      setTimeout(() => {
        if (this.instructions && this.instructions.parentNode) {
          this.instructions.remove();
        }
      }, 300);
    }
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  window.presentationMode = new PresentationMode();
});
