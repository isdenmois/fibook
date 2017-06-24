describe('Book page', () => {
    beforeEach(function(){
        cy.viewport('iphone-6')
    })

    it('should render book', () => {
        cy
            .server()
            .route("GET", /api\/sql\?(.*)library_metadata(.*)MD5 = "test_md5"/, "fixture:newBook.json")

        cy.visit('http://localhost:4000/book/test_md5')

        cy.get('.pages-BookPage-components-style-bookPage--title').contains('Книжуля')
        cy.get('.pages-BookPage-components-style-bookPage--author').contains('Нормас')

        cy.get('[data-page="book"] .components-style-page--content .components-style-listItem--listItem')
            .as('details')
            .should('have.length', 5)

        cy.get('@details')
            .first()
            .find('.components-style-listItem--center')
            .contains('Автор')
        cy.get('@details')
            .first()
            .find('.components-style-listItem--right')
            .contains('Нормас')

        cy.get('@details')
            .eq(1)
            .find('.components-style-listItem--center')
            .contains('Название')
        cy.get('@details')
            .eq(1)
            .find('.components-style-listItem--right')
            .contains('Книжуля')

        cy.get('@details')
            .eq(2)
            .find('.components-style-listItem--right')
            .contains('Непрочитано')

        cy.get('@details')
            .eq(3)
            .find('.components-style-listItem--right')
            .contains('2,33 МБ')

        cy.get('@details')
            .eq(4)
            .find('.components-style-listItem--right')
            .contains('/flash/Books')
    })
})
