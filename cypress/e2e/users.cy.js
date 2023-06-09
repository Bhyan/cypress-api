describe("POST /user", () => {
  beforeEach(() => {
    cy.fixture("users").then(function (users) {
      this.users = users;
    });
  });

  it("register a new user", function () {
    const user = this.users.create;

    cy.task("deleteUser", user.email);

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it("duplicate email", function() {
    const user = this.users.duplicate_email;

    cy.task("deleteUser", user.email);

    cy.postUser(user);

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(409);
      expect(response.body.message).to.eq("Duplicated email!");
    });
  });

  context("required fields", function() {
    let user;

    beforeEach(function() {
      user = this.users.required
    });

    it("name is required", () => {
      delete user.name;

      cy.postUser(user).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.message).to.eq(
          'ValidationError: "name" is required'
        );
      });
    });

    it("email is required", () => {
      delete user.email;

      cy.postUser(user).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.message).to.eq(
          'ValidationError: "email" is required'
        );
      });
    });

    it("password is required", () => {
      delete user.password;

      cy.postUser(user).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.message).to.eq(
          'ValidationError: "password" is required'
        );
      });
    });
  });
});
