import loginPage from './pages/loginPage.cy';
describe('login page tests', () => {

  
  beforeEach(() => {

    loginPage.visit();
  })

  it('should allow a user to login with valid credentials', () => {

    cy.fixture("user").then((user) => {
      loginPage.login(user.validUser.email, user.validUser.password);
      loginPage.verifHomePage();
    })

  })

  it('login useing incorrect credentials', () => {
    cy.fixture("user").then((user) => {
      loginPage.login(user.InvalidUser.email, user.InvalidUser.password);
      loginPage.verifAlertMessage();
    })
  })

  it('invalid email and empty password', () => {

    cy.fixture("user").then((user) => {
      loginPage.login(user.InvalidUser.email, "");
    })
    loginPage.verifErrorMessageForEmail();
    loginPage.verifErrorMessageForPassword();

  })

})