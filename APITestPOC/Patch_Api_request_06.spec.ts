/* 

Pre-requisites:
       1. Data:json file
       2. Creat token 

1. creating a booking (Post) -----> Bookingid
2. Partial update booking (Patch) // required token

*/

import {test, expect} from "@playwright/test"; 
import fs from 'fs'; //for path location exist check 

// utility define function returns Json file data
function readjson(filePath:string) {
    return JSON.parse(fs.readFileSync(filePath,'utf-8'));
}

test('patch booking(put)',async({request})=>{

    //1) Create booking (post) ---> bookingid
     
    const requestbody = readjson('data/post_request_body.json'); //reading put json file from its path 
    const createresponse=await request.post('/booking',{data:requestbody}); // posting data from Json file locatio
    
    expect(createresponse.status()).toBe(200); // confirming the satus code 
    expect(createresponse.ok()).toBeTruthy(); // confirming the 360 view of post under which header , body as well status should be covered
 
     // Extract response body
     const responseBody = await createresponse.json(); // created response considering in "responseBody"
     const bookingid = responseBody.bookingid;  //retriving bookingid from responseBody
     console.log("Booking id=====>", bookingid); //printing  bookingid 
     
     
     //2) Partial update booking (patch) request    //required token 


     //creating token 
     const tokenrequestbody = readjson('data/Token_request_body.json'); //reading put json file from its path where token exist 
     const tokenresponse = await request.post('/auth',{data:tokenrequestbody});// executed auth post for token and considering auth access in token response 
     expect(tokenresponse.ok()).toBeTruthy(); // comfirming the response is well confirming 

     const tokenresponsebody = await tokenresponse.json();
     const token = tokenresponsebody.token;
     console.log("token ====>", bookingid);

 //sending update(patch)

     const patchrequestbody = readjson('data/patch_request_body.json'); //reading put json file from its path 
     const patchresponse = await request.patch(`/booking/${bookingid}`,{data:patchrequestbody, headers: {
      Cookie: `token=${token}`,
    },
    
    });

    expect(patchresponse.status()).toBe(200);
  const patchResponseBody = await patchresponse.json();
  console.log("Patch booking=====>", patchResponseBody);

});
