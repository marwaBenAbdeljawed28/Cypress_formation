describe('API login and retrive notes', ()=>{
    let authToken;
    const apiURL=  'https://practice.expandtesting.com/notes/api/users/login';

  
    it('should login via API and retive token ', ()=>{

        cy.request({
            method: 'POST',
            url: apiURL,
            body:{
              email: 'test-log@gmail.com', 
              password: '123456789',
            }
              
            }).then((response)=>{
                expect(response.status).to.equal(200);
                authToken = response.body.data.token;
                expect(authToken).to.not.be.empty;
            })
    });
    it('should retrive all notes using the token', ()=>{
        cy.request({
            method: 'GET',
            url: 'https://practice.expandtesting.com/notes/api/notes',
            headers:{
                'x-auth-token': authToken,
            }
        }).then((response)=>{
          expect(response.status).to.equal(200);
          expect(response.body.data).to.be.an("array");
        })

    })

});