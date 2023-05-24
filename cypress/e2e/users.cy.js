describe("POST /user", () => {
  it("register a new user", () => {
    const user = {
      name: "Fernando Papito",
      email: "papito@yahoo.com",
      password: "pwd123",
    };

    cy.task("deleteUser", user.email);

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it("duplicate email", () => {
    const user = {
      name: "James Gunn",
      email: "james@hotmail.com",
      password: "pwd123",
    };

    cy.task("deleteUser", user.email);

    cy.postUser(user);

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(409);
      expect(response.body.message).to.eq("Duplicated email!");
    });
  });

  context("required fields", () => {
    let user;

    beforeEach(() => {
      user = {
        name: "Margot Robbie",
        email: "margot@gmail.com",
        password: "pwd123",
      };
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
