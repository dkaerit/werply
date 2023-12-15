const testUser = {
  email: 'testuser@example.com',
  password: 'testpassword',
};

// @ts-ignore-start
describe('LoginForm', () => {
  it('should login successfully', () => {
    cy.visit('/'); // Ajusta la ruta según la configuración de tu proyecto

    // Abre el formulario de inicio de sesión haciendo clic en el botón
    cy.get('[data-testid=open-login-form-btn]').click();

    // Ingresa credenciales en el formulario
    cy.get('[data-test="id-login"]').type(testUser.email);
    cy.get('[data-test="password-login"]').type(testUser.password);

    // Envía el formulario
    cy.get('form').submit();

    // Verifica que se haya iniciado sesión correctamente
    cy.url().should('include', '/home').then((url) => {
      const params = new URLSearchParams(url);
      expect(params.get('form')).to.be.null; // Asegúrate de que 'form' ya no esté presente
    });
  });
});
// @ts-ignore-end