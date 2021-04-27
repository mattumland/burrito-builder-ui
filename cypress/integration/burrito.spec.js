describe('Page load tests', () => {
  beforeEach(() => {
    cy
      .intercept('http://localhost:3001/api/v1/orders', { fixture: 'burrito-data.json' })
      .visit('http://localhost:3000')
  })

  it('Should load the header title and blank order form', () => {
    cy
      .get('h1').contains('Burrito Builder')
      .get('input').should('be.visible')
      .get('input').should('be.empty')
      .get('button')
      .should(($button) => {
        expect($button).to.have.length(13)
        expect($button, 'first').to.contain('beans')
        expect($button, 'second').to.contain('steak')
        expect($button, 'third').to.contain('carnitas')
        expect($button, 'thirteenth').to.contain('Submit Order')
      })
  })

  it('Should have a default message on page load', () => {
    cy
      .get('[data-cy=order]').contains('Order: Nothing selected')
  })
})

describe('Input tests', () => {
  beforeEach(() => {
    cy
    .intercept('http://localhost:3001/api/v1/orders', { fixture: 'burrito-data.json' })
    .visit('http://localhost:3000')
  })

  it('Should not should how an alert empty order is submitted', () => {
    cy.get('[data-cy=orderButton]').click()
    cy.on('window:alert', (txt) => {
      expect(txt).to.equal('Please fill out the order form completely. Do it! YOU MUST DO IT!')
    })
  })

  it('Should update the order field when ingredients are selected', () => {
    cy
      .get('[data-cy=beans]').click()
      .get('[data-cy=steak]').click()
      .get('[data-cy=order]').contains('Order: beans, steak')
  })
})

describe('Post test', () => {
  beforeEach(() => {
    cy
      .intercept('http://localhost:3001/api/v1/orders', { fixture: 'burrito-data.json' })
      .intercept({
        method: 'POST',
        url: 'http://localhost:3001/api/v1/orders'},
      {
        statusCode: 201,
        body: {id: 666, name: 'Hail Satan', ingredients: ["lettuce"]}  })
      .visit('http://localhost:3000')
  })

  it('Should update the order list when a complete order is submitted', () => {
    cy
    .get('[data-cy=lettuce]').click()
    .get('input[type="text"]').type('Hail Satan')
    .get('[data-cy=orderButton]').click()
    .get('h3').contains('Hail Satan')
  })

})
