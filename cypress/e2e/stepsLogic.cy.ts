import {
  goToNextStep,
  goToPrevStep,
  enterTestDataToInputs,
  checkTitle,
} from '../support/helpers';

describe('Steps logic', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Personal Info step', () => {
    it('Should show correct errors when input data is invalid', () => {
      goToNextStep();
      cy.get('[data-test="message"][id="name-error"]').should('contain', 'Please enter your name');
      cy.get('[data-test="message"][id="email-error"]').should('contain', 'Please enter your email address');
      cy.get('[data-test="message"][id="phone-error"]').should('contain', 'Please enter your phone number');
      enterTestDataToInputs();
      goToNextStep();
      checkTitle('Select your plan');
      goToPrevStep();
      checkTitle('Personal Info');
      cy.get('[data-test="input"][id="name"]').should('have.value', 'test name');
      cy.get('[data-test="input"][id="email"]').should('have.value', 'email@example.com');
      cy.get('[data-test="input"][id="phone"]').should('have.value', '555444333');
    });

    it('Should redirect to next step when all text input data is correct', () => {
      goToNextStep();
      checkTitle('Personal Info');
      enterTestDataToInputs();
      goToNextStep();
      checkTitle('Select your plan');
    });

    it('When go back to personal info step , should load correct data from store', () => {
      enterTestDataToInputs();
      goToNextStep();
      checkTitle('Select your plan');
      goToPrevStep();
      checkTitle('Personal Info');
      cy.get('[data-test="input"][id="name"]').should('have.value', 'test name');
      cy.get('[data-test="input"][id="email"]').should('have.value', 'email@example.com');
      cy.get('[data-test="input"][id="phone"]').should('have.value', '555444333');
    });
  });

  describe('Select Your Plan step', () => {
    it('Monthly plan should correctly be selected in finishing step', () => {
      enterTestDataToInputs();
      goToNextStep();

      ['Arcade', 'Advanced', 'Pro'].forEach((inputName: string) => {
        cy.get(`[data-test="${inputName.toLocaleLowerCase()}"]`).click();
        cy.get(`[data-test="input"][value="${inputName}"]`).should('be.checked', true);
        goToNextStep();
        goToNextStep();
        cy.get('[data-test="finishing-up-heading"]').should('contain', `${inputName} (Monthly)`);

        goToPrevStep();
        goToPrevStep();
      });
    });

    it('Yearly plan should correctly be selected in finishing step', () => {
      enterTestDataToInputs();
      goToNextStep();
      cy.get('[data-test="payment-mode-button"]').click();

      ['Arcade', 'Advanced', 'Pro'].forEach((inputName: string) => {
        cy.get(`[data-test="${inputName.toLocaleLowerCase()}"]`).click();
        cy.get(`[data-test="input"][value="${inputName}"]`).should('be.checked', true);
        goToNextStep();
        goToNextStep();
        cy.get('[data-test="finishing-up-heading"]').should('contain', `${inputName} (Yearly)`);

        goToPrevStep();
        goToPrevStep();
      });
    });
  });

  describe('Pick Addons step', () => {
    it('Addons should be added correclty in finishing step', () => {
      enterTestDataToInputs();
      goToNextStep();
      goToNextStep();

      cy.get('[data-test="checkbox-input"]').each(($el: JQuery<Element>) => {
        cy.wrap($el).click();
      });

      goToNextStep();

      const correctAddonsNames: string[] = ['Online service', 'Larger storage', 'Customizable profile'];
      cy.get('[data-test="addon-heading"]').each(($el: JQuery<Element>, index: number) => {
        cy.wrap($el).invoke('text').should('contain', correctAddonsNames[index]);
      });
    });
  });

  describe('Finishing Up step', () => {
    it('After select items, should show correct price', () => {
      enterTestDataToInputs();
      goToNextStep();
      goToNextStep();

      cy.get('[data-test="checkbox-input"]').each(($el: JQuery<Element>) => {
        cy.wrap($el).click();
      });

      goToNextStep();
      cy.get('[data-test="summary-price"]').should('contain', '+$14/mo');
    });
  });

  describe('Thank You step', () => {
    it('Should show thank you message', () => {
      enterTestDataToInputs();
      for (let i = 0; i < 4; i += 1) goToNextStep();
      checkTitle('Thank you!');
    });
  });
});
