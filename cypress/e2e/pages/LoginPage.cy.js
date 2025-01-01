class LoginPage {
    visit() {
        cy.visit('/login');
    }

    get emailInput() {
        return cy.get('[data-testid="login-email"]');
    }

    get passwordInput() {
        return cy.get('[data-testid="login-password"]');
    }

    get submitButton() {
        return cy.get('[data-testid="login-submit"]');
    }

    verifErrorMessageForEmail() {
        return cy.get(':nth-child(1) > .invalid-feedback').should('be.visible').and('contain', 'Email addres');
    }

    verifErrorMessageForPassword() {
        return cy.get(':nth-child(2) > .invalid-feedback').should('be.visible').and('contain', 'Password is re');
    }

    verifAlertMessage() {
       // return cy.get('[data-testid="alert-message"]').should('be.visible');
    }

    verifHomePage() {
        return cy.get('[data-testid="home"]').contains('MyN');
    }

    login(email, password) {
        this.emailInput.type(email);
        if (password) {
            this.passwordInput.type(password);
        }
        this.submitButton.click();

    }
}
export default new LoginPage();