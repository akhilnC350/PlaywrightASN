import {test,expect} from "@playwright/test";
test('get booking details by Id- path param',async({request})=>{

    const bookingId=1; //we consider this as a path parameter.
//sending get request along with path parameter
const response = await request.get(`/booking/${bookingId}`); //

//parse the response and print
const responseBody = await response.json();//
console.log(responseBody);

//add assertions
expect(response.ok()).toBeTruthy(); 
expect(response.status()).toBe(200); //


});


test('Get booking details by name - query param',async({request})=>{

    const firstname="Jim";
    const lastname="Brown";
//sending get request along with path parameter
const response = await request.get("/booking",{ params:{firstname, lastname}});


//parse the response and print
const responseBody = await response.json();//
console.log(responseBody);

//add assertions
expect(response.ok()).toBeTruthy(); //
expect(response.status()).toBe(200); //

// check response shoudl not be emplty 
expect(responseBody.length).toBeGreaterThan(0);

for(const item of responseBody)
{
     expect(item).toHaveProperty('bookingid');
     expect(typeof item.bookingid).toBe("number") // type of operatior 
     expect(item.bookingid).toBeGreaterThan(0);
}


});



