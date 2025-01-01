describe('API of account creation', () => {

  const apiURL= 'https://practice.expandtesting.com/notes/api/users/register';

  it('should sccessfully create an account ', () => {
    const uniqEmail = `user_${Date.now()}@gmail.com`;

    cy.request({
    method: 'POST',
    url: apiURL,
    body:{
      name: 'test user1',
      email: uniqEmail,
      password: '123456',
      confirm_password: '23456'
    },
      
    }).then((response)=>{
     expect(response.status).to.equal(201);
     expect(response.body).to.have.property('message','User account created successfully');
    })
  });

  

  it('should return an error an already used email address', () => {
    
    cy.request({
      method: 'POST',
      url: apiURL,
      body:{
        name: 'test user1',
        email: 'teste-log@gmail.com',
        password: '123456',
        confirm_password: '23456'
      },
        failOnStatusCode: false
      }).
      then((response)=>{
        expect(response.status).to.equal(409);
        expect(response.body).to.have.property('message','An account already exists with the same email address');
      })
  })
})