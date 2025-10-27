// Animación al hacer scroll
document.addEventListener("DOMContentLoaded", function () {


  // Efecto de escritura para el nombre
  const heroNames = document.querySelectorAll(".hero-name, .hero-name2");

  heroNames.forEach((heroName) => {
    const originalName = heroName.textContent;

    const startTypewriter = () => {
      heroName.textContent = "";
      let i = 0;

      const typeWriter = () => {
        if (i < originalName.length) {
          heroName.textContent += originalName.charAt(i);
          i++;
          setTimeout(typeWriter, 140);
        }
      };

      typeWriter();
    };

    startTypewriter();
    setInterval(startTypewriter, 6900); // Reiniciar cada 69 segundos
  });


  // Actualizar fecha y hora
  function updateDateTime() {
    const now = new Date();
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    document.getElementById('currentDateTime').textContent =
      now.toLocaleDateString('es-ES', options);
  }

  setInterval(updateDateTime, 1000);
  updateDateTime();

  // Botón Scroll Down
  document.getElementById('scrollDownBtn').addEventListener('click', function () {
    window.scrollBy({
      top: window.innerHeight * 0.8,
      behavior: 'smooth'
    });
  });

  // Botón Back to Top
  document.getElementById('backToTop').addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Mostrar/ocultar botón back to top
  window.addEventListener('scroll', function () {
    const backToTop = document.getElementById('backToTop');
    if (window.scrollY > 300) {
      backToTop.style.display = 'flex';
    } else {
      backToTop.style.display = 'none';
    }
  });


  const observerOptions = {
    threshold: 0.2,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible");
      }
    });
  }, observerOptions);

  document.querySelectorAll(".animate-on-scroll").forEach((el) => {
    observer.observe(el);
  });


  // Animación de estadísticas
  function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');

    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'));
      let count = 0;
      const duration = 2000; // ms
      const increment = target / (duration / 20);

      const timer = setInterval(() => {
        count += increment;
        if (count >= target) {
          count = target;
          clearInterval(timer);
        }
        stat.textContent = Math.floor(count);
      }, 20);
    });
  }

  // Observar cuando la sección de estadísticas es visible
  const statsSection = document.getElementById('stats');
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStats();
        initStatsChart(); // Inicializar gráfico cuando la sección sea visible
        statsObserver.disconnect();
      }
    });
  }, { threshold: 0.5 });

  statsObserver.observe(statsSection);

  function initStatsChart() {
    const ctx = document.getElementById('statsChart').getContext('2d');

    // Plugin para sombra
    const shadowPlugin = {
      id: 'shadowPlugin',
      beforeDatasetsDraw(chart, args, options) {
        const { ctx } = chart;
        ctx.save();

        // Detectar si la página está en modo oscuro o claro
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        ctx.shadowColor = isDark ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.3)';
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 4;
        ctx.shadowOffsetY = 4;
      },
      afterDatasetsDraw(chart) {
        chart.ctx.restore();
      }
    };

    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Cypress', 'Jira', 'GitHub', 'JavaScript', 'API Testing'],
        datasets: [{
          label: 'Horas de experiencia',
          data: [250, 200, 240, 350, 250],
          backgroundColor: 'rgba(100, 255, 218, 0.7)',
          borderColor: 'rgba(100, 255, 218, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: '#ccd6f6'
            },
            grid: {
              color: 'rgba(136, 146, 176, 0.3)'
            }
          },
          x: {
            ticks: {
              color: '#ccd6f6'
            },
            grid: {
              color: 'rgba(136, 146, 176, 0.3)'
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: '#ccd6f6'
            }
          }
        }
      },
      plugins: [shadowPlugin] // activar el plugin de sombra
    });
  }

  // Modal para estudios adicionales
  const modal = document.getElementById('studyModal');
  const closeModal = document.getElementById('closeModal');
  const studyCards = document.querySelectorAll('.study-card');

  studyCards.forEach(card => {
    card.addEventListener('click', function () {
      const modalId = this.getAttribute('data-modal');
      openModal(modalId);
    });
  });

  closeModal.addEventListener('click', function () {
    modal.style.display = 'none';
  });

  window.addEventListener('click', function (e) {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  function openModal(modalId) {
    const courses = {
      study1: {
        title: "Curso Avanzado de HTML, CSS y JAVASCRIPT",
        image: "./assets/programacion.jpeg",
        description: "Programación web con HTML, CSS y JavaScript, desarrollando interfaces responsivas e interactivas.",
        duration: "500 horas",
        platform: "Egg Academy",
        certificate: "Disponible",
        date: "17 de noviembre de 2023"

      },
      study2: {
        title: "Curso de Bootstrap",
        image: "./assets/bootstrap.jpeg",
        description: "Formación en Bootstrap para el desarrollo de interfaces web responsivas, utilizando componentes, sistema de rejilla y utilidades para optimizar diseño y maquetación.",
        duration: "40 horas",
        platform: "Ademass training development",
        certificate: "Disponible",
        date: "Julio 2023 - Agosto 2023"

      },
      study3: {
        title: "Performance Testing con JMeter y K6 en HTML",
        image: "./assets/html.jpeg",
        description: "Masterclass en pruebas de rendimiento y estrés para aplicaciones web y APIs. Aprende a simular miles de usuarios concurrentes, analizar cuellos de botella, y optimizar el rendimiento de aplicaciones utilizando herramientas modernas como K6 y JMeter.",
        duration: "50 horas",
        platform: "Ademass training development",
        certificate: "Disponible"
      },
      study4: {
        title: "Postman",
        image: "./assets/postman.jpeg",
        description: "Formación en Postman para el diseño, ejecución y validación de pruebas de APIs REST, incluyendo manejo de colecciones, entornos y scripts de automatización.",
        duration: "40 horas",
        platform: "Ademass training development",
        certificate: "Disponible"
      },
      study5: {
        title: "Css3",
        image: "./assets/css3.jpeg",
        description: "Formación en CSS3 para la creación de interfaces modernas y responsivas, incluyendo uso avanzado de Flexbox, CSS Grid, animaciones, transiciones y técnicas de optimización de estilos.",
        duration: "40 horas",
        platform: "Ademass training development",
        certificate: "Disponible"
      },
      study6: {
        title: "seguridad informática nivel 1,2",
        image: "./assets/seguridad.jpeg",
        description: "Formación en seguridad informática para la protección de sistemas, redes y datos, incluyendo fundamentos de ciberseguridad, gestión de vulnerabilidades, criptografía, análisis de amenazas y mejores prácticas de protección.",
        duration: "40 horas",
        platform: "Carlos Slim",
        certificate: "Disponible"
      },
      study7: {
        title: "Aseguramiento de la Calidad/QA",
        image: "./assets/qa.jpeg",
        description: "Formación en testing de software, incluyendo fundamentos de QA, diseño y ejecución de casos de prueba, gestión de defectos, uso de herramientas como Postman, Cypress y Jira, además de buenas prácticas para garantizar la calidad del producto",
        duration: "40 horas",
        platform: "Carlos Slim",
        certificate: "Disponible"
      },
      study8: {
        title: "INSTITUTO DE FORMACIÓN PARA EL TRABAJO Y DESARROLLO HUMANO DEL HUILA",
        image: "./assets/procesamiento.jpeg",
        description: "Formación en manejo, análisis y presentación de datos, incluyendo el uso de hojas de cálculo, bases de datos, software de ofimática y técnicas de organización de la información para la toma de decisiones.",
        duration: "Un año",
        platform: "UNIHUILA",
        certificate: "Disponible"
      },
    };

    const course = courses[modalId];
    document.getElementById('modalTitle').textContent = course.title;
    document.getElementById('modalImage').src = course.image;
    document.getElementById('modalDescription').textContent = course.description;
    document.getElementById('modalDuration').textContent = course.duration;
    document.getElementById('modalPlatform').textContent = course.platform;
    document.getElementById('modalCertificate').textContent = course.certificate;

    modal.style.display = 'flex';
  }

  // Cargar repositorios de GitHub REALES
  async function fetchGitHubRepos() {
    const container = document.getElementById('githubRepos');
    container.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Cargando repositorios...</div>';

    try {
      const response = await fetch('https://api.github.com/users/CristianDevBonelo/repos');
      const repos = await response.json();

      if (!response.ok) throw new Error(repos.message || 'Error al cargar repositorios');

      container.innerHTML = '';

      // Ordenar repositorios por fecha de actualización (más recientes primero)
      repos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

      // Mostrar solo los primeros 6 repositorios
      repos.slice(0, 6).forEach(repo => {
        const repoCard = document.createElement('div');
        repoCard.className = 'github-repo animate-on-scroll';
        repoCard.innerHTML = `
                <h3 class="repo-name">${repo.name}</h3>
                <p class="repo-description">${repo.description || 'Sin descripción'}</p>
                <div class="repo-stats">
                  <div class="repo-stat">
                    <i class="fas fa-star"></i> ${repo.stargazers_count}
                  </div>
                  <div class="repo-stat">
                    <i class="fas fa-code-branch"></i> ${repo.forks_count}
                  </div>
                  <div class="repo-stat">
                    <i class="fas fa-eye"></i> ${repo.watchers_count}
                  </div>
                </div>
                <a href="${repo.html_url}" target="_blank" class="btn" style="margin-top: 15px; display: inline-block;">
                  Ver Repositorio
                </a>
              `;
        container.appendChild(repoCard);
        observer.observe(repoCard);
      });
    } catch (error) {
      console.error('Error fetching GitHub repos:', error);
      container.innerHTML = `<div class="error-message">
              <i class="fas fa-exclamation-triangle"></i> Error al cargar repositorios: ${error.message}
            </div>`;
    }
  }

  // Observar cuando la sección de GitHub es visible
  const githubSection = document.getElementById('github');
  const githubObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        fetchGitHubRepos();
        githubObserver.disconnect();
      }
    });
  }, { threshold: 0.3 });

  githubObserver.observe(githubSection);

});


// automation-pipeline.js
document.addEventListener('DOMContentLoaded', function () {
  const pipelineStages = document.querySelectorAll('.pipeline-stage');
  const detailCards = document.querySelectorAll('.detail-card');
  const runButton = document.getElementById('runPipeline');
  const resetButton = document.getElementById('resetPipeline');
  const metricValues = document.querySelectorAll('.metric-value');

  let currentStage = 0;
  let isRunning = false;

  // Inicializar pipeline
  function initPipeline() {
    pipelineStages.forEach(stage => {
      stage.classList.remove('active', 'completed', 'running');
    });
    detailCards.forEach(card => card.style.display = 'none');
    currentStage = 0;
    updateMetrics();
  }

  // Ejecutar pipeline paso a paso
  function runPipelineStep() {
    if (currentStage >= pipelineStages.length) {
      isRunning = false;
      runButton.innerHTML = '<i class="fas fa-play"></i> Ejecutar Pipeline';
      runButton.disabled = false;
      return;
    }

    // Marcar etapa anterior como completada
    if (currentStage > 0) {
      pipelineStages[currentStage - 1].classList.remove('running');
      pipelineStages[currentStage - 1].classList.add('completed');
    }

    // Activar etapa actual
    const currentStageElement = pipelineStages[currentStage];
    currentStageElement.classList.add('active', 'running');

    // Mostrar detalles de la etapa
    showStageDetails(currentStage + 1);

    currentStage++;

    // Continuar con la siguiente etapa después de un delay
    if (currentStage < pipelineStages.length) {
      setTimeout(runPipelineStep, 1500);
    } else {
      setTimeout(() => {
        pipelineStages[pipelineStages.length - 1].classList.remove('running');
        pipelineStages[pipelineStages.length - 1].classList.add('completed');
        isRunning = false;
        runButton.innerHTML = '<i class="fas fa-play"></i> Ejecutar Pipeline';
        runButton.disabled = false;
      }, 1500);
    }
  }

  // Mostrar detalles de la etapa
  function showStageDetails(stageNumber) {
    detailCards.forEach(card => card.style.display = 'none');
    const detailCard = document.getElementById(`detail-${stageNumber}`);
    if (detailCard) {
      detailCard.style.display = 'block';
    }
  }

  // Actualizar métricas con animación
  function updateMetrics() {
    metricValues.forEach(metric => {
      const target = parseInt(metric.getAttribute('data-target'));
      animateValue(metric, 0, target, 2000);
    });
  }

  // Animación de números
  function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);

      if (end % 1 === 0) {
        // Número entero
        element.textContent = Math.floor(progress * (end - start) + start);
      } else {
        // Número decimal
        element.textContent = (progress * (end - start) + start).toFixed(1);
      }

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  // Event Listeners
  runButton.addEventListener('click', function () {
    if (!isRunning) {
      isRunning = true;
      runButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Ejecutando...';
      runButton.disabled = true;
      resetButton.disabled = true;
      initPipeline();
      setTimeout(runPipelineStep, 500);
    }
  });

  resetButton.addEventListener('click', function () {
    if (!isRunning) {
      initPipeline();
      // Mostrar la primera tarjeta de detalles
      detailCards[0].style.display = 'block';
    }
  });

  // Click en etapas para ver detalles
  pipelineStages.forEach((stage, index) => {
    stage.addEventListener('click', function () {
      if (!isRunning) {
        pipelineStages.forEach(s => s.classList.remove('active'));
        stage.classList.add('active');
        showStageDetails(index + 1);
      }
    });
  });

  // Inicializar
  initPipeline();
  detailCards[0].style.display = 'block'; // Mostrar primera tarjeta por defecto

  // Intersection Observer para animaciones
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Animar métricas cuando sean visibles
        if (entry.target.id === 'automation-pipeline') {
          setTimeout(updateMetrics, 500);
        }
      }
    });
  }, observerOptions);

  // Observar elementos animados en la sección
  document.querySelectorAll('#automation-pipeline .animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
});

