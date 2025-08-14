// cypress/e2e/portafolio.cy.js
describe('Prueba automatizada Portafolio', () => {
  it('Flujo completo con video y pasos visibles', () => {
    const registrarPaso = (texto) => {
      cy.log(`📌 ${texto}`);
      cy.window().then((win) => {
        let cont = win.document.getElementById('cypress-steps');
        if (!cont) {
          cont = win.document.createElement('div');
          cont.id = 'cypress-steps';
          Object.assign(cont.style, {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            background: 'rgba(0,0,0,0.75)',
            color: '#fff',
            padding: '12px',
            maxWidth: '320px',
            fontSize: '13px',
            borderRadius: '10px',
            zIndex: '99999',
            fontFamily: 'sans-serif',
          });
          cont.innerHTML = '<strong>📋 Pasos de la prueba:</strong><br>';
          win.document.body.appendChild(cont);
        }
        cont.innerHTML += `• ${texto}<br>`;
      });
    };

    // --- Inicio ---
    cy.visit('http://localhost:8000');
    registrarPaso('Abrir el portafolio en localhost');
    cy.wait(1500);

    // Ver CV (abrir y volver)
    cy.contains('a.btn', 'Ver CV', { timeout: 8000 })
      .should('be.visible')
      .invoke('removeAttr', 'target')
      .click();
    registrarPaso('Clic en "Ver CV"');
    cy.wait(1500);
    cy.go('back');
    registrarPaso('Volver a la pestaña principal');
    cy.wait(800);

    // Scroll down button
    cy.get('#scrollDownBtn', { timeout: 8000 }).should('be.visible').click();
    registrarPaso('Clic en "Scroll Down"');
    cy.wait(800);

    // Scroll por secciones
    cy.scrollTo(0, 500); cy.wait(800);
    cy.scrollTo(0, 1000); cy.wait(900);
    cy.scrollTo('bottom'); cy.wait(1200);
    registrarPaso('Recorrer la página hasta el final');

    // Cursos
    const cursos = [
      'Programacion html + css | javascript',
      'Curso de bootstrap',
      'Curso de html5',
      'Curso de postman',
      'CCurso de css3',
      'Técnico en seguridad informática',
      'Tester QA',
      'Técnico laboral procesamiento de datos'
    ];

    cursos.forEach(curso => {
      cy.contains(curso, { timeout: 6000 })
        .scrollIntoView()
        .should('be.visible')
        .click();
      registrarPaso(`Abrir curso: ${curso}`);
      cy.wait(900);
      cy.get('body').click(0, 0);
      registrarPaso(`Cerrar popup: ${curso}`);
      cy.wait(700);
    });

    // Formulario de contacto
    cy.get('#contact', { timeout: 10000 }).scrollIntoView().should('be.visible');
    registrarPaso('Ir a la sección Contacto');

    cy.get('#name', { timeout: 10000 }).should('be.visible').clear().type('Prueba Cypress - Video Demo', { delay: 40 });
    registrarPaso('Llenar nombre en formulario');

    cy.get('#email', { timeout: 10000 }).should('be.visible').clear().type('cypress@test.com', { delay: 30 });
    registrarPaso('Llenar email en formulario');

    cy.get('#message', { timeout: 10000 }).should('be.visible').clear().type('Este formulario se llenó automáticamente con Cypress para mostrar en mi portafolio.', { delay: 20 });
    registrarPaso('Llenar mensaje en formulario');

    cy.get('#contactForm', { timeout: 8000 }).within(() => {
      cy.get('button[type="submit"]').should('be.visible').click();
    });
    registrarPaso('Enviar formulario de contacto');

    cy.get('#formMessage', { timeout: 10000 }).should('be.visible').and(($el) => {
      expect($el.text().trim().length).to.be.greaterThan(0);
    });
    registrarPaso('Mensaje de respuesta visible');

    // Subir cn scroll
    cy.scrollTo('top');
    registrarPaso('Hacer scroll hasta la parte superior');
    cy.wait(900);

    registrarPaso('✅ Prueba finalizada');
    cy.wait(800);
  });
});
