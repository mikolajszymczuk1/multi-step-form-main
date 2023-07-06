import {
  goToNextStep,
  goToPrevStep,
  enterTestDataToInputs,
  checkTitle,
} from '../support/helpers';

describe('Steps routing', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should open main page', () => {
    checkTitle('Personal Info');
  });

  it('Should redirect to main page when user enter to another page by url', () => {
    cy.visit('/select-your-plan');
    checkTitle('Personal Info');
  });

  it('Should correctly redirect to the next or previous steps when user click next or back buttons', () => {
    checkTitle('Personal Info');
    enterTestDataToInputs();
    cy.get('[data-test="next-step"]').trigger('click');

    ['Select your plan', 'Pick add-ons', 'Finishing up', 'Thank you'].forEach((stepName: string) => {
      checkTitle(stepName);
      if (stepName !== 'Thank you') goToNextStep();
    });

    cy.window().then((win) => win.history.back());

    ['Finishing up', 'Pick add-ons', 'Select your plan', 'Personal Info'].forEach((stepName: string) => {
      checkTitle(stepName);
      if (stepName !== 'Personal Info') goToPrevStep();
    });
  });
});
