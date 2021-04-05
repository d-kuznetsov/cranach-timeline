describe("Navigation", () => {
  it("loads all the pages and navigates between them", () => {
    cy.visit("/");

    cy.get("[data-testid='nav-timeline']").click();
    cy.url().should("include", "/timeline");

    cy.get("[data-testid='nav-grid']").click();
    cy.url().should("include", "/grid");

    cy.get("[data-testid='nav-contact']").click();
    cy.url().should("include", "/contact");
  });
});
