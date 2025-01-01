describe("API Get Notes with Spy and Stub after Login", () =>{
beforeEach(()=>{

    
    cy.visit('/login');

    cy.intercept("GET","https://practice.expandtesting.com/notes/api/notes",
        {
            data: [],
        }

    ).as('allNotesStub')
    cy.fixture('user').then((user)=>{
        cy.login(user.validUser.email,user.validUser.password)
        cy.get('[data-testid="home"]').contains('MyNotes');
      
      });
});

it("API Get Notes with stub after login", ()=>{
    cy.wait('@allNotesStub').then((interception) => {

        expect(interception.response.statusCode).to.eq(200);
        expect(interception.response.body.data).to.have.length(0);


    })

});

})