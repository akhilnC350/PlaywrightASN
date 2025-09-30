/*
Test: create booking
request type: post 
request body: JSON file
*/

import { test, expect } from '@playwright/test';
import fs from 'fs';

test("create post request using Json file", async ({ request }) => {
  
  
  
  //read data from Json (request body)
  const jsonFile="data/post_request_body.json";
  const requestBody:any=JSON.parse(fs.readFileSync(jsonFile,'utf-8'));
  
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

  // more validations
  expect(responseBody.bookingid).toBeDefined(); 
  expect(booking.firstname).toBe("Akhil");
  expect(booking.lastname).toBe("Negi");
  expect(booking.totalprice).toBe(1000);
  expect(booking.depositpaid).toBe(true);
  expect(booking.bookingdates.checkin).toBe("2025-10-01");
  expect(booking.bookingdates.checkout).toBe("2025-10-02");
  expect(booking.additionalneeds).toBe("Breakfast");

  // validate response structure
  expect(responseBody).toHaveProperty("bookingid");
  expect(responseBody).toHaveProperty("booking");

  // validate entire object
  expect(booking).toMatchObject({
    firstname: "Akhil",
    lastname: "Negi",
    totalprice: 1000,
    depositpaid: true,
    bookingdates: {
      checkin: "2025-10-01",
      checkout: "2025-10-02",
    },
    additionalneeds: "Breakfast"
  });
});