import React, { Component } from 'react'
// Import CSS styles for Chat page
//import './chat.css'
// Import Bootstrap components from react-bootstrap
import { FormControl, ListGroup,Card, Row, Col } from 'react-bootstrap';
import { useAuth0} from '@auth0/auth0-react';
// Import the axios library
import axios from 'axios'
// Import the Pusher JS library
import Pusher from 'pusher-js'




 const Example = () => {
 const { user } = useAuth0();
 localStorage.setItem("user", user.nickname)
    return user.nickname;
  }


export class Chat extends Component {
  // The state is initialized in the constructor and the functions below are bound with 'this'.
 
    constructor() {
        super();
        this.state = {
            value: '',
            username: '',
            messages: []
        };
        this.sendMessage = this.sendMessage.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    // componentWillMount() is invoked immediately before mounting occurs and we are setting the username state to the value gotten from the localStorage.
    componentWillMount() {
        
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
        console.log(response.data)
        }).catch(function (error) {
        console.error(error);
        });
        this.setState({ username: localStorage.getItem("user") });
        // Establish a connection to Pusher.
        this.pusher = new Pusher('0c34ed219ee5573abfa3', {
            authEndpoint: '/pusher/auth',
            cluster: 'us2',
            encrypted: true
        });
        // Subscribe to the 'private-reactchat' channel
        this.chatRoom = this.pusher.subscribe('private-reactchat');//user1-user2-private
    }
    // componentDidMount() is invoked immediately after a component is mounted. Listen for changes to the 'messages' state via Pusher and updates it.
    componentDidMount() {
        this.chatRoom.bind('messages', newmessage => {
            this.setState({messages: this.state.messages.concat(newmessage)})
        }, this);

    }
    // Used to update the value of the input form in which we type in our chat message
    handleChange(event) {
        this.setState({value: event.target.value});
    }
    // This sends the message inside the input form and sends it to Pusher.
    sendMessage(event) {
        event.preventDefault();
        if (this.state.value !== '') {
            axios.post('/message/send', {
                username: this.state.username,
                message: this.state.value
            })
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                })
            this.setState({value: ''})
        }
        else {
            // console.log('enter message')
        }
    }
    render() {
        // Renders the chat messages
        const messages = this.state.messages;
        const message = messages.map(item => {
            return (
                     
                        <div class="chat-message-left pb-4">
								<div>
                                    
									<img src="https://bootdey.com/img/Content/avatar/avatar3.png" class="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40"></img>
									<div class="text-muted small text-nowrap mt-2">2:34 am</div>
								</div>
								<div key={item.id} class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
									<div class="font-weight-bold mb-1">{item.username}</div>
									{item.message}
								</div>
							</div>
            )
        })
        // Renders the input form where the message to be sent is typed.
        return (
            <ListGroup>
                 <main class="content">
             <h4 className="text-center">Welcome, {this.state.username}</h4>
             <h5 className="text-center">Begin chatting here.</h5>
    <div class="container p-0">

		<h1 class="h3 mb-3">Messages</h1>

		<div class="card">
			<div class="row g-0">
				<div class="col-12 col-lg-5 col-xl-3 border-right">

					<div class="px-4 d-none d-md-block">
						<div class="d-flex align-items-center">
							<div class="flex-grow-1">
								<input type="text" class="form-control my-3" placeholder="Search..."></input>
							</div>
						</div>
					</div>
                    <hr class="d-block d-lg-none mt-1 mb-0"></hr>
				</div>
				<div class="col-12 col-lg-7 col-xl-9">
					<div class="py-2 px-4 border-bottom d-none d-lg-block">
						<div class="d-flex align-items-center py-1">
							<div class="position-relative">
								<img src="https://bootdey.com/img/Content/avatar/avatar3.png" class="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40"></img>
							</div>
							<div class="flex-grow-1 pl-3">
								<strong>{this.state.username}</strong>
								<div class="text-muted small"><em>Student</em></div>
							</div>
							<div>
								<button class="btn btn-primary btn-lg mr-1 px-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-phone feather-lg"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg></button>
								<button class="btn btn-info btn-lg mr-1 px-3 d-none d-md-inline-block"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-video feather-lg"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg></button>
								<button class="btn btn-light border btn-lg px-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-horizontal feather-lg"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg></button>
							</div>
						</div>
					</div>
                    <div class="position-relative">
						<div class="chat-messages p-4">
                           
                            {message}
                        	
                            <div class="flex-grow-0 py-3 px-4 border-top">
						<div class="input-group">
                        <Row className="show-grid">
                    <Col xs={12}>
                    
                        <div className="chat-container">
                            <form onSubmit={this.sendMessage}>
                                <Col xs={20} xsoffset={50}>
                                    <FormControl
                                        type="text"
                                        value={this.state.value}
                                        placeholder="Enter message here"
                                        onChange={this.handleChange}
                                    />
                                </Col>
                                
                              
                            </form>
                        </div>
                    </Col>
                </Row>
                <input className="btn btn-primary" value="Send" type="submit" />
                                
						</div>
					</div>
						</div>
					</div>
                </div>
                </div>
                </div>
                </div>
                </main>

                
            </ListGroup>
        )
    }
}

export default Chat;