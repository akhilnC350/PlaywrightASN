/*
Test: create booking
request type: post 
request body: Random/dynamic data(faker)

Pre-requistes:
----------------------
Install faker-js library for generating dynamic data
nmp install @faker-js/faker
npm
*/

import { test, expect } from '@playwright/test';
import { faker, Faker } from '@faker-js/faker';
import {DateTime} from 'luxon'; 

test("create post request using Json file", async ({ request }) => {
  
  //data generation using faker library

  const firstname=faker.person.firstName();
  const lastname=faker.person.lastName();
  const totalprice=faker.number.int({min:100, max:5000});
  const depositpaid=faker.datatype.boolean();


  const checkindate=DateTime.now().toFormat("yyyy-MM-dd");
  const checkoutdate=DateTime.now().plus({day:5}).toFormat("yyyy-MM-dd");

  const additionalneeds="Breakfast";
  
  // request body (faker)
  const requestBody = {
    firstname: firstname,
    lastname: lastname,
    totalprice: totalprice,
    depositpaid: depositpaid,
    bookingdates: {
      checkin: checkindate,
      checkout: checkoutdate,
    },
    additionalneeds: additionalneeds
  };

  
  // send post request
  const response = await request.post('https://restful-booker.herokuapp.com/booking', {
    data: requestBody
  });

  // basic validations
  expect(response.status()).toBe(200);
  expect(response.ok()).toBeTruthy();

  //
 // expect(response.headers()['content-type']).toContain('applicatqnvon/json');
  expect(response.headers()['content-length']).toBeDefined();

  // parse JSON response
  const responseBody = await response.json();
  console.log(responseBody);

  // short alias for convenience
  const { booking } = responseBody;

  // validate response structure
  expect(responseBody).toHaveProperty("bookingid");
  expect(responseBody).toHaveProperty("booking");

  // validate entire object
  expect(booking).toMatchObject({
    firstname: requestBody.firstname,
    lastname: requestBody.lastname,
    totalprice: requestBody.totalprice,
    depositpaid: requestBody.depositpaid,
    bookingdates: {
      checkin: requestBody.bookingdates.checkin,
      checkout: requestBody.bookingdates.checkout,
    },
    additionalneeds: requestBody.additionalneeds
  });
});