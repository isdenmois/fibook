describe('Book page', () => {
  beforeEach(function() {
    cy.viewport('iphone-6')
    cy.server()
      .route('GET', /api\/sql\?(.*)MD5(.*)Status = 0(.*)limit=20$/, 'fixture:bookPage.json')
      .route('GET', /api\/sql\?(.*)COUNT(.*)Status = 0/, 'fixture:bookPageCount.json')
      .route('GET', /api\/sql\?(.*)MD5(.*)Status = 1(.*)limit=20$/, 'fixture:emptyList.json')
      .route('GET', /api\/sql\?(.*)COUNT(.*)Status = 1/, 'fixture:emptyListCount.json')
      .route('GET', /api\/sql\?(.*)library_metadata(.*)MD5 = "test_md5"/, 'fixture:newBook.json')
      .route('GET', /api\/sql\?(.*)library_metadata(.*)MD5 = "some_read_md5"/, 'fixture:someReadBook.json')
  })

  it('should open and close book', () => {
    cy.visit('http://localhost:4000')

    cy.get('.components-style-tabs--tab-active .components-style-listItem--listItem:last-child')
      .as('read-book')
      .contains('Бестселлер')

    cy.get('@read-book').click()

    cy.url().should('contain', '/book/some_read_md5')

    cy.get('.components-style-toolbar--back-button').click()

    cy.url().should('eq', 'http://localhost:4000/')
  })

  it('should render new book', () => {
    cy.visit('http://localhost:4000/book/test_md5')

    cy.get('.pages-BookPage-components-style-bookPage--title').contains('Книжуля')
    cy.get('.pages-BookPage-components-style-bookPage--primary > div:nth-child(2)').contains('Нормас')

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

  it('should change book status', () => {
    cy.visit('http://localhost:4000/book/some_read_md5')

    cy.get('[data-page="book"] .components-style-page--content .components-style-listItem--listItem:nth-child(3)')
      .as('status')
      .contains('Непрочитано')

    cy.get('.components-style-page--tabs .components-style-button--wrapper:first-child').click()

    cy.get('@status').contains('Прочитано')

    cy.get('.components-style-toolbar--back-button').click()

    cy.get('.components-style-tabs--tab-active .components-style-listItem--listItem').should('have.length', 1)

    cy.get('.components-style-tabs--tab-right .components-style-listItem--listItem')
      .as('readBook')
      .should('have.length', 1)

    cy.get('@readBook').contains('Бестселлер')
  })
})
