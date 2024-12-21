const { test, expect } = require("@playwright/test");
const { Ajv } = require("ajv");

const ajv = new Ajv();

test("Test case 1, GET-DATA", async ({ request }) => {
  const response = await request.get("https://reqres.in/api/users/2");
  expect(response.status()).toBe(200);

  const resData = await response.json();

  expect(resData.data.id).toBe(2);
  expect(resData.data.email).toBe("janet.weaver@reqres.in");
  expect(resData.data.first_name).toBe("Janet");
  expect(resData.data.last_name).toBe("Weaver");
  expect(resData.data.avatar).toBe("https://reqres.in/img/faces/2-image.jpg");
  expect(resData.support.url).toBe("https://contentcaddy.io?utm_source=reqres&utm_medium=json&utm_campaign=referral");
  expect(resData.support.text).toBe("Tired of writing endless social media content? Let Content Caddy generate it for you.");

  const valid = ajv.validate(require("./jsonschema/get-object-schema.json"), resData);

  if(!valid) {
    console.error("AJV validation errors: ", ajv.errorsText());
  }

  expect(valid).toBe(true);
});

test("Test case 2, POST-DATA", async ({ request }) => {
  const bodyData = {
    "name": "Akbar Saputra",
    "job": "Trainee"
  };
  const headerData = {
    Accept: "application/json",
  };

  const response = await request.post("https://reqres.in/api/users/", {
    headers: headerData,
    data: bodyData,
  });

  const resData = await response.json();

  expect(response.status()).toBe(201);
  expect(resData.name).toBe("Akbar Saputra");
  expect(resData.job).toBe("Trainee");
  const valid = ajv.validate(require("./jsonschema/post-object-schema.json"), response);

  if(!valid) {
    console.error("AJV validation errors: ", ajv.errorsText());
  }

  console.log(resData);

});

test("Test case 3, PUT-DATA", async ({ request }) => {
  const bodyData = {
    "name": "Luki",
    "job": "Trainer"
  };
  const headerData = {
    Accept: "application/json",
  };

  const response = await request.put("https://reqres.in/api/users/2", {
    headers: headerData,
    data: bodyData,
  });

  const resData = await response.json();

  expect(response.status()).toBe(200);
  expect(resData.name).toBe("Luki");
  expect(resData.job).toBe("Trainer");
  const valid = ajv.validate(require("./jsonschema/put-object-schema.json"), response);

  if(!valid) {
    console.error("AJV validation errors: ", ajv.errorsText());
  }

  console.log(resData);

});

test("Test case 4, DELETE DATA", async ({ request }) => {
  const response = await request.delete("https://reqres.in/api/users/2");

  expect(response.status()).toBe(204);
})