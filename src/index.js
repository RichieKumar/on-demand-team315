import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Auth0ProviderWithHistory from './auth/auth0-provider-with-history';

import './index.css';

ReactDOM.render(
  <Router>
    <Auth0ProviderWithHistory
        domain="dev-fp7u5r2i.us.auth0.com"
        clientId="XRCuICcx4Za9o1XuGRiVeuDyk7T4mRj4"
        redirectUri={window.location.origin}
        audience="https://dev-fp7u5r2i.us.auth0.com/api/v2/"
        scope="read:current_user update:current_user_metadata"
    >
      <App />
    </Auth0ProviderWithHistory>
  </Router>,
  document.getElementById('root'),
);
