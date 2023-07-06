const goToNextStep = () => cy.get('[data-test="next-step"]').trigger('click');
const goToPrevStep = () => cy.get('[data-test="prev-step"]').trigger('click');

const enterTestDataToInputs = () => {
  cy.get('[data-test="input"][id="name"]').type('test name');
  cy.get('[data-test="input"][id="email"]').type('email@example.com');
  cy.get('[data-test="input"][id="phone"]').type('555444333');
};

const checkTitle = (title: string) => cy.get('[data-test="title"]').should('contain', title);

export {
  goToNextStep,
  goToPrevStep,
  enterTestDataToInputs,
  checkTitle,
};
