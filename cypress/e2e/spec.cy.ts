describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')
    cy.findByPlaceholderText(/name/i).type('44356565')
    cy.findByRole('button', { name: /Жми../i }).click()
  })
})