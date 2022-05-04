import React, { useEffect, useState } from "react";
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { getConfig } from '../components/config';
import "./profile.css";

const Profile = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);

  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = "dev-fp7u5r2i.us.auth0.com";
  
      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://${domain}/api/v2/`,
          scope: "read:current_user",
        });
  
        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;
  
        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
  
        const { user_metadata } = await metadataResponse.json();
  
        setUserMetadata(user_metadata);
      } catch (e) {
        console.log(e.message);
      }
    };
  
    getUserMetadata();
  }, [getAccessTokenSilently, user?.sub]);

  var axios = require("axios").default;

var options = {
  method: 'GET',
  url: 'https://dev-fp7u5r2i.us.auth0.com/api/v2/users',
  params: {q: `email: ${user.email}`, search_engine: 'v3'},
  headers: {authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1PLTJQcWR5X3BYRVR2QUxaQWhpMCJ9.eyJpc3MiOiJodHRwczovL2Rldi1mcDd1NXIyaS51cy5hdXRoMC5jb20vIiwic3ViIjoid1dzbXBYUlEwclVxUkhoYlNhY1IyZEtacXFGSzRRSUxAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vZGV2LWZwN3U1cjJpLnVzLmF1dGgwLmNvbS9hcGkvdjIvIiwiaWF0IjoxNjUxNTMzMzYzLCJleHAiOjE2NTM1MzMzNjMsImF6cCI6IndXc21wWFJRMHJVcVJIaGJTYWNSMmRLWnFxRks0UUlMIiwic2NvcGUiOiJyZWFkOmNsaWVudF9ncmFudHMgY3JlYXRlOmNsaWVudF9ncmFudHMgZGVsZXRlOmNsaWVudF9ncmFudHMgdXBkYXRlOmNsaWVudF9ncmFudHMgcmVhZDp1c2VycyB1cGRhdGU6dXNlcnMgZGVsZXRlOnVzZXJzIGNyZWF0ZTp1c2VycyByZWFkOnVzZXJzX2FwcF9tZXRhZGF0YSB1cGRhdGU6dXNlcnNfYXBwX21ldGFkYXRhIGRlbGV0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgY3JlYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSByZWFkOnVzZXJfY3VzdG9tX2Jsb2NrcyBjcmVhdGU6dXNlcl9jdXN0b21fYmxvY2tzIGRlbGV0ZTp1c2VyX2N1c3RvbV9ibG9ja3MgY3JlYXRlOnVzZXJfdGlja2V0cyByZWFkOmNsaWVudHMgdXBkYXRlOmNsaWVudHMgZGVsZXRlOmNsaWVudHMgY3JlYXRlOmNsaWVudHMgcmVhZDpjbGllbnRfa2V5cyB1cGRhdGU6Y2xpZW50X2tleXMgZGVsZXRlOmNsaWVudF9rZXlzIGNyZWF0ZTpjbGllbnRfa2V5cyByZWFkOmNvbm5lY3Rpb25zIHVwZGF0ZTpjb25uZWN0aW9ucyBkZWxldGU6Y29ubmVjdGlvbnMgY3JlYXRlOmNvbm5lY3Rpb25zIHJlYWQ6cmVzb3VyY2Vfc2VydmVycyB1cGRhdGU6cmVzb3VyY2Vfc2VydmVycyBkZWxldGU6cmVzb3VyY2Vfc2VydmVycyBjcmVhdGU6cmVzb3VyY2Vfc2VydmVycyByZWFkOmRldmljZV9jcmVkZW50aWFscyB1cGRhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGRlbGV0ZTpkZXZpY2VfY3JlZGVudGlhbHMgY3JlYXRlOmRldmljZV9jcmVkZW50aWFscyByZWFkOnJ1bGVzIHVwZGF0ZTpydWxlcyBkZWxldGU6cnVsZXMgY3JlYXRlOnJ1bGVzIHJlYWQ6cnVsZXNfY29uZmlncyB1cGRhdGU6cnVsZXNfY29uZmlncyBkZWxldGU6cnVsZXNfY29uZmlncyByZWFkOmhvb2tzIHVwZGF0ZTpob29rcyBkZWxldGU6aG9va3MgY3JlYXRlOmhvb2tzIHJlYWQ6YWN0aW9ucyB1cGRhdGU6YWN0aW9ucyBkZWxldGU6YWN0aW9ucyBjcmVhdGU6YWN0aW9ucyByZWFkOmVtYWlsX3Byb3ZpZGVyIHVwZGF0ZTplbWFpbF9wcm92aWRlciBkZWxldGU6ZW1haWxfcHJvdmlkZXIgY3JlYXRlOmVtYWlsX3Byb3ZpZGVyIGJsYWNrbGlzdDp0b2tlbnMgcmVhZDpzdGF0cyByZWFkOmluc2lnaHRzIHJlYWQ6dGVuYW50X3NldHRpbmdzIHVwZGF0ZTp0ZW5hbnRfc2V0dGluZ3MgcmVhZDpsb2dzIHJlYWQ6bG9nc191c2VycyByZWFkOnNoaWVsZHMgY3JlYXRlOnNoaWVsZHMgdXBkYXRlOnNoaWVsZHMgZGVsZXRlOnNoaWVsZHMgcmVhZDphbm9tYWx5X2Jsb2NrcyBkZWxldGU6YW5vbWFseV9ibG9ja3MgdXBkYXRlOnRyaWdnZXJzIHJlYWQ6dHJpZ2dlcnMgcmVhZDpncmFudHMgZGVsZXRlOmdyYW50cyByZWFkOmd1YXJkaWFuX2ZhY3RvcnMgdXBkYXRlOmd1YXJkaWFuX2ZhY3RvcnMgcmVhZDpndWFyZGlhbl9lbnJvbGxtZW50cyBkZWxldGU6Z3VhcmRpYW5fZW5yb2xsbWVudHMgY3JlYXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRfdGlja2V0cyByZWFkOnVzZXJfaWRwX3Rva2VucyBjcmVhdGU6cGFzc3dvcmRzX2NoZWNraW5nX2pvYiBkZWxldGU6cGFzc3dvcmRzX2NoZWNraW5nX2pvYiByZWFkOmN1c3RvbV9kb21haW5zIGRlbGV0ZTpjdXN0b21fZG9tYWlucyBjcmVhdGU6Y3VzdG9tX2RvbWFpbnMgdXBkYXRlOmN1c3RvbV9kb21haW5zIHJlYWQ6ZW1haWxfdGVtcGxhdGVzIGNyZWF0ZTplbWFpbF90ZW1wbGF0ZXMgdXBkYXRlOmVtYWlsX3RlbXBsYXRlcyByZWFkOm1mYV9wb2xpY2llcyB1cGRhdGU6bWZhX3BvbGljaWVzIHJlYWQ6cm9sZXMgY3JlYXRlOnJvbGVzIGRlbGV0ZTpyb2xlcyB1cGRhdGU6cm9sZXMgcmVhZDpwcm9tcHRzIHVwZGF0ZTpwcm9tcHRzIHJlYWQ6YnJhbmRpbmcgdXBkYXRlOmJyYW5kaW5nIGRlbGV0ZTpicmFuZGluZyByZWFkOmxvZ19zdHJlYW1zIGNyZWF0ZTpsb2dfc3RyZWFtcyBkZWxldGU6bG9nX3N0cmVhbXMgdXBkYXRlOmxvZ19zdHJlYW1zIGNyZWF0ZTpzaWduaW5nX2tleXMgcmVhZDpzaWduaW5nX2tleXMgdXBkYXRlOnNpZ25pbmdfa2V5cyByZWFkOmxpbWl0cyB1cGRhdGU6bGltaXRzIGNyZWF0ZTpyb2xlX21lbWJlcnMgcmVhZDpyb2xlX21lbWJlcnMgZGVsZXRlOnJvbGVfbWVtYmVycyByZWFkOmVudGl0bGVtZW50cyByZWFkOmF0dGFja19wcm90ZWN0aW9uIHVwZGF0ZTphdHRhY2tfcHJvdGVjdGlvbiByZWFkOm9yZ2FuaXphdGlvbnNfc3VtbWFyeSByZWFkOm9yZ2FuaXphdGlvbnMgdXBkYXRlOm9yZ2FuaXphdGlvbnMgY3JlYXRlOm9yZ2FuaXphdGlvbnMgZGVsZXRlOm9yZ2FuaXphdGlvbnMgY3JlYXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJzIHJlYWQ6b3JnYW5pemF0aW9uX21lbWJlcnMgZGVsZXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJzIGNyZWF0ZTpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgcmVhZDpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgdXBkYXRlOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyBkZWxldGU6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIGNyZWF0ZTpvcmdhbml6YXRpb25fbWVtYmVyX3JvbGVzIHJlYWQ6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyBkZWxldGU6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyBjcmVhdGU6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIHJlYWQ6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIGRlbGV0ZTpvcmdhbml6YXRpb25faW52aXRhdGlvbnMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.S9zsJhN_NZWi3pjsATPZyyALxj9xBeRuzMj7DtxXAIZjrprPC--NgxsshR6v3riUZq6Zh9rgg6yL1USLZo0KtVgfg7cYztkZ2RiJxWYenbhLTooNYgHwrHeKd9F0qEcG5gHBjZ58ZHbxLNgT5LEtWdT2Jng2tvGDgLDfrKQLKs2ZuhsJT7qGIwyIzJmuPHX50bfpLukEFMvdcnFiyjt2tLHUCzymlkXURurFX0MAWB0_VL6CASRZ5SAt8luXdXunTkNsLbpEIPa6ECZjU1S12uIYQ30aFbeXLOq0j8_DTrPhogNrQTCxRnb10nY3WA9ujIg8O6EyWIU_EHkj1-JDsA'}
};
axios.request(options).then(function (response) {
  console.log(response.data[0].email);
 }).catch(function (error) {
   console.error(error);
 });



  return (
    <div onload = "checkEdits()" >
      
      <div class="container">
      <div class="row">
      <div class="col-xs-12 col-sm-9">
        <div class = "card">
        <div class="panel panel-default">
          <div class="panel-heading">
          <br></br>
          <h4 class="panel-title">&nbsp;&nbsp;&nbsp;User profile</h4>
          </div>
          <div class="panel-body">
            <div class="profile__avatar">
              
            <img
            src= {user.picture}
               alt="Profile"
            className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
          />  </div>
            <div class="profile__header">
              <h4 class = "title">{user.nickname}</h4>
              <h4> <small>Tutor</small></h4>
              <p class="text-muted">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non nostrum odio cum repellat veniam eligendi rem cumque magnam autem delectus qui.
              </p>
            
            </div>
          </div>
        </div>
        </div>
        <br></br>
        <div class = "card">
        <div class="panel panel-default">
          <div class="panel-heading">
          <br></br>
          <h4 class="panel-title">&nbsp;&nbsp;&nbsp;User info</h4>
          </div>
          <div class="panel-body"  >
         
            <table class="table profile__table"  contenteditable="true" >
              <tbody>
                <tr>
                  <th><strong>Age</strong></th>
                  <td>21</td>
                </tr>
                <tr>
                  <th><strong>Major</strong></th>
                  <td>ECEN</td>
                </tr>
                <tr>
                  <th><strong>Grade</strong></th>
                  <td>Junior</td>
                </tr>
              </tbody>
            </table>
            <button onClick={'alertHello'}>Save Edits</button>
                    </div>
        </div>
        </div>
        <br></br>
        <div class = "card">
        <div class="panel panel-default">
          <div class="panel-heading">
          <br></br>
          <h4 class="panel-title">&nbsp;&nbsp;&nbsp;Classes Tutoring</h4>
          </div>
          <div class="panel-body">
            <table class="table profile__table" contenteditable="true">
              <tbody>
                <tr>
                  <th><strong>CSCE</strong></th>
                  <td>121, 221, 222</td>
                </tr>
                <tr>
                  <th><strong>ECEN</strong></th>
                  <td>248, 214, 314</td>
                </tr>
                <tr>
                  <th><strong>MATH</strong></th>
                  <td>151, 251</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        </div>

         

      </div>
      <div class="col-xs-12 col-sm-3">

      
        <div class = "card">
        <div class="profile__contact-info">
          <div class="profile__contact-info-item">
            <div class="profile__contact-info-icon">
              <i class="fa fa-phone"></i>
            </div>
            <div class="profile__contact-info-body">
            <br></br>
              <h5 class="profile__contact-info-heading"> <strong>Work number</strong></h5>
              281-685-5884
            </div>
          </div>
          <div class="profile__contact-info-item">
            <div class="profile__contact-info-icon">
              <i class="fa fa-phone"></i>
            </div>
            <div class="profile__contact-info-body">
              <h5 class="profile__contact-info-heading"><strong>Mobile number</strong></h5>
              281-685-5884
            </div>
          </div>
          <div class="profile__contact-info-item">
            <div class="profile__contact-info-icon">
              <i class="fa fa-envelope-square"></i>
            </div>
            <div class="profile__contact-info-body">
              <h5 class="profile__contact-info-heading"><strong>E-mail</strong></h5>
              <a href="mailto:admin@domain.com">{user.email}</a>
            </div>
          </div>
          <div class="profile__contact-info-item">
            <div class="profile__contact-info-icon">
              <i class="fa fa-map-marker"></i>
            </div>
          
          </div>
        </div>
        </div>
        <p>
          <br></br>
          <a href="#" class="profile__contact-btn btn btn-lg btn-block btn-info" data-toggle="modal" data-target="#profile__contact-form">
            Contact user
          </a>
        </p> 
      </div>
    </div>
</div>        
  </div>
  );
};

export default withAuthenticationRequired (Profile);
