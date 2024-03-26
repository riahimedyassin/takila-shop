export const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Takila Shop API",
      version: "0.1.0",
      description:
        "This is a simple Shop API without any payment system implementation",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Riahi Yassin",
        url: "https://github.com/riahimedyassin",
        email: "riahimohamedyassin@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./controllers/*.ts"],
};
