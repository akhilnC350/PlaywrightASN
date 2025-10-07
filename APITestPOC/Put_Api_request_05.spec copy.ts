/* 

Pre-requisites:
       1. Data:json file
       2. Creat token 

1. creating a booking (Post) -----> Bookingid
2. updating a booking (Put) // required token

*/

import {test, expect} from "@playwright/test";
import fs from 'fs';

// utility define function returns Json file data
function readjson(filePath:string) {
    return JSON.parse(fs.readFileSync(filePath,'utf-8'));
}

test('updatebooking(put)',async({request})=>{

    //1) Create booking (post) ---> bookingid
     
    const requestbody = readjson('data/post_request_body.json'); //reading put json file from its path 
    const createresponse=await request.post('/booking',{data:requestbody}); // posting data from Json file locatio
    
    expect(createresponse.status()).toBe(200);
    expect(createresponse.ok()).toBeTruthy();
 
     // Extract response body
     const responseBody = await createresponse.json(); // created response considering in "responseBody"
     const bookingid = responseBody.bookingid;  //retriving bookingid from responseBody
     console.log("Booking id=====>", bookingid); //printing  bookingid 
     
     
     //2) update booking (put) request    //required token 


     //creating token 
     const tokenrequestbody = readjson('data/Token_request_body.json'); //reading put json file from its path 
     const tokenresponse = await request.post('/auth',{data:tokenrequestbody});
     expect(tokenresponse.ok()).toBeTruthy();

     const tokenresponsebody = await tokenresponse.json();
     const token = tokenresponsebody.token;
     console.log("token ====>", bookingid);

 //sending update(put)

     const updaterequestbody = readjson('data/put_request_body.json'); //reading put json file from its path 
     const updateresponse = await request.put(`/booking/${bookingid}`,{data:updaterequestbody, headers: {
      Cookie: `token=${token}`,
    },
    
    });

    expect(updateresponse.status()).toBe(200);
  const updateResponseBody = await updateresponse.json();
  console.log("Updated booking=====>", updateResponseBody);

});
