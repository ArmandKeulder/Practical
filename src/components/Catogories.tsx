import React from 'react';
import qs from 'qs';
import ax from 'axios'
import './style.css';
import { useEffect } from 'react';

function apiRequest(type: string, url: string) {
return $.ajax({
  url: url,
   type: type,
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem("token"),
   }
});
}
  
apiRequest("get","https://edeaf-api-staging.azurewebsites.net/v1/admin/Categories").done(function(data) {
 console.log(data) 
  })

export class Catogories extends React.Component
{
   
}

//function Catogories ({}) {
//    const message = 'Hello World'
//}