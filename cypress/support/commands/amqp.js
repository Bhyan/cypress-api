Cypress.Commands.add("purgeQueueMessages", () => {
  cy.api({
    url: Cypress.env("amqpHost") + "/contents",
    method: "DELETE",
    body: {
      mode: "purge",
      name: Cypress.env("amqpQueue"),
      vhost: "etsuluhy",
    },
    headers: {
      authorization: Cypress.env("amqpToken"),
    },
    failOnStatusCode: false,
  }).then((response) => {
    return response;
  });
});

Cypress.Commands.add("getQueueMessages", () => {
  cy.api({
    url: Cypress.env("amqpHost") + "/get",
    method: "POST",
    body: {
      ackmode: "ack_requeue_true",
      count: "2",
      encoding: "auto",
      name: Cypress.env("amqpQueue"),
      truncate: "50000",
      vhost: "etsuluhy",
    },
    headers: {
      authorization: Cypress.env("amqpToken"),
    },
    failOnStatusCode: false,
  }).then((response) => {
    return response;
  });
});
