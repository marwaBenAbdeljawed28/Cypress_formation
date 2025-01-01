describe('create and verification of note', () => {

  beforeEach(()=>{
    cy.visit('/login');
     cy.fixture('user').then((user)=>{
      cy.login(user.validUser.email,user.validUser.password)
      cy.get('[data-testid="home"]').contains('MyN');
    });
    cy.get('[data-testid="notes-list"]').then($body => {
      if ($body.find('[data-testid="note-card"]').length > 0) {
        cy.get('[data-testid="note-card"]').each($el => {
          cy.wrap($el)
            .find('[data-testid="note-delete"]')
            .click()
            .get('[data-testid="note-delete-confirm"]')
            .click();
        });
      }
    });
    cy.get('[data-testid="add-new-note"]').click(); 

    cy.get('[data-testid="note-category"]').as('categoryHome');
  });

  it('create a note in the home category and checks its presence in the home and All tabs ',()=>{
   cy.get('@categoryHome').select('Home');
   cy.get('[data-testid="note-completed"]').check();
   cy.get('[data-testid="note-title"]').type('titre');
   cy.get('[data-testid="note-description"]').type('Description');
   cy.get('[data-testid="note-submit"]').click()

   cy.get('[data-testid="category-all"]').click();
   cy.contains('titre').should('exist');

   cy.get('[data-testid="category-home"]').click();
   cy.contains('titre').should('exist');
   cy.contains('Description').should('exist');

   cy.get('[data-testid="toggle-note-switch"]').should('have.css','background-color','rgb(0, 0, 255)')

  });

  it.only('create a note in the home category without checking the box and verifies its presence ',()=>{

    cy.get('@categoryHome').select('Home');
    
    cy.get('[data-testid="note-title"]').type('marwa');
    cy.get('[data-testid="note-description"]').type('benab');
    cy.get('[data-testid="note-submit"]').click()
 
    cy.get('[data-testid="category-all"]').click();
    cy.contains('marwa').should('exist');
 
    cy.get('[data-testid="category-home"]').click();
    cy.contains('marwa').should('exist');
    cy.contains('benab').should('exist');
 
    cy.get('[data-testid="toggle-note-switch"]').should('have.css','background-color','rgba(0, 0, 0, 0)');
 
   });

});