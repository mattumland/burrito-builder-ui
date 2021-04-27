describe('Page load tests', () => {
  beforeEach(() => {
    cy
      .intercept('http://localhost:3001/api/v1/orders', { fixture: 'burrito-data.json' })
  })

})
