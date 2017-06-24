describe('Home page', () => {
    beforeEach(function(){
        cy.viewport('iphone-6')
    })

    it('should turn tabs', () => {
        cy
            .server()
            .route("GET", /api\/sql\?(.*)MD5(.*)Status = 0(.*)limit=20$/, "fixture:newBooks.json")
            .route("GET", /api\/sql\?(.*)COUNT(.*)Status = 0/, "fixture:newBooksCount.json")
            .route("GET", /api\/sql\?(.*)MD5(.*)Status = 1(.*)limit=20$/, "fixture:emptyList.json")
            .route("GET", /api\/sql\?(.*)COUNT(.*)Status = 1/, "fixture:emptyListCount.json")

        cy.visit('http://localhost:4000')

        cy.contains('.components-style-tabs--button-active', 'Новые')
        cy.get('.components-style-tabs--button').should('contain', 'Прочтенные')

        cy.get('.components-style-tabs--button').click()

        cy.contains('.components-style-tabs--button', 'Новые')
        cy.contains('.components-style-tabs--button-active', 'Прочтенные')
        cy.contains('.components-style-tabs--tab-active', 'Книг в разделе нет')
    })

    it('should render list', () => {
        cy
            .server()
            .route("GET", /api\/sql\?(.*)MD5(.*)Status = 0(.*)limit=20$/, "fixture:newBooks.json")
            .route("GET", /api\/sql\?(.*)COUNT(.*)Status = 0/, "fixture:newBooksCount.json")
            .route("GET", /api\/sql\?(.*)MD5(.*)Status = 0(.*)offset=20$/, "fixture:newBooksSecondPage.json")
            .route("GET", /api\/sql\?(.*)MD5(.*)Status = 1(.*)limit=20$/, "fixture:readBooks.json")
            .route("GET", /api\/sql\?(.*)COUNT(.*)Status = 1/, "fixture:readBooksCount.json")

        cy.visit('http://localhost:4000')

        cy.get('.components-style-tabs--tab-active .components-style-listItem--listItem').should('have.length', 20)

        cy.get('.components-style-tabs--tab-active .components-style-listTab--loadMore').click()

        cy.get('.components-style-tabs--tab-active .components-style-listItem--listItem').should(items => {
            expect(items).to.have.length(21)
        })

        cy.get('.components-style-tabs--button').click()

        cy.get('.components-style-tabs--tab-active .components-style-listItem--listItem').should(items => {
            expect(items).to.have.length(1)
        })
    })
})
