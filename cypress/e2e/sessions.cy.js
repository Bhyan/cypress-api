describe("POST /sessions", () => {
  beforeEach(() => {
    cy.fixture("users").then(function (users) {
      this.users = users;
    });
  });

  it("user session", function() {
    const user = this.users.login;

    cy.task("removeUser", user.email);
    cy.postUser(user);

    cy.postSession(user).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.user.name).to.eq(user.name);
      expect(response.body.user.email).to.eq(user.email);
      expect(response.body.token).not.to.be.empty;
    });
  });

  it("invalid password", function() {
    const user = this.users.inv_pass

    cy.postSession(user).then((response) => {
      expect(response.status).to.eq(401);
    });
  });

  it("email not found", function() {
    const user = this.users.email_404

    cy.postSession(user).then((response) => {
      expect(response.status).to.eq(401);
    });
  });
});
