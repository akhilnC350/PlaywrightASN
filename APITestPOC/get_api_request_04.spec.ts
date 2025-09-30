import {test,expect} from "@playwright/test";
test('get booking details by Id- path param',async({request})=>{

    const bookingId=1; //we consider this as a path parameter.
//sending get request along with path parameter
const response = await request.get(`/booking/${bookingId}`); //

//parse the response and print
const responseBody = await response.json();//
console.log(responseBody);

//add assertions
expect(response.ok()).toBeTruthy(); //
expect(response.status()).toBe(200); //

 



});



