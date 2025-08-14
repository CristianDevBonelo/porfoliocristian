import './commands'

before(() => {
  cy.log('Iniciando pruebas E2E con Cypress 🚀')
})

beforeEach(() => {
  cy.log('Preparando entorno para la prueba...')
})

afterEach(() => {
  cy.log('Prueba finalizada ✅')
})

//cypress