describe('Burrito Builder 9000', () => {
    beforeEach(() => {
        cy.fixture('burritos.json').then(orderInfo => {
            cy.intercept('http://localhost:3001/api/v1/orders', orderInfo)
        })
        cy.visit('http://localhost:3000/')
    })

    it('should have a title on page load', () => {
        cy.get('h1').contains('Burrito Builder 9000')
    })

    it('should show current orders with names and ingredients on page load', () => {
        cy.get('section').get('.order').get('h3').contains('patpat')
        cy.get('li').contains('grass')
    })

    it('should have an input for name', () => {
        cy.get('form').get('input[name="name"]').type('Rondelle').should('have.value', 'Rondelle')
    })

    it('should not submit order with just the name field filled', () => {
        cy.get('form').get('input[name="name"]').type('Rondelle')
        cy.get('button[name="submit"]').click()
        cy.get('h3').should('not.contain', 'Rondelle')
    })

    it('should have buttons for ingredients that add ingredients to the order display', () => {
        cy.get('button[name="sofritas"]').contains('sofritas').click()
        cy.get('button[name="jalapenos"]').click()
        cy.get('p').contains('Order: sofritas, jalapenos')
    })

    it('should not submit an order without just the ingredients field filled', () => {
        cy.get('button[name="sofritas"]').contains('sofritas').click()
        cy.get('button[name="jalapenos"]').click()
        cy.get('button[name="submit"]').click()
        cy.get('li').should('contain', 'french fries')
        cy.get('li').should('not.contain', 'jalapenos')
    })

    it('should submit and display a new order when both name and ingredients are filled', () => {
        cy.intercept({ 
            method: 'POST', 
            url: 'http://localhost:3001/api/v1/orders' 
        }, 
        {
            body: { "id": 13, "name": "Fern", "ingredients": ["steak", "queso fresco", "cilantro"]}
        })
        cy.get('input').type('Fern')
        cy.get('button[name="steak"]').click()
        cy.get('button[name="queso fresco"]').click()
        cy.get('button[name="cilantro"]').click()
        cy.get('button[name="submit"]').click()
        cy.get('h3').contains('Fern')
        cy.get('li').contains('queso fresco')
    })

    it('should be able to cancel an order', () => {
        cy.intercept({
            method: 'DELETE', 
            url: 'http://localhost:3001/api/v1/orders/17'
        })

        // Sees Alias but isn't stubbing?

        cy.get('button[name="delete"]').first().click()
        cy.get('h3').should('not.contain', 'patpat')
        cy.get('li').should('not.contain', 'lamb shank')
    })

})