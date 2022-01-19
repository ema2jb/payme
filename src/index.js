import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'

const stripePromise = loadStripe('pk_test_51KJ1pOKknMHdpkmJci36J9dTZkTRU4VXevJjQ3plOs5ZGV2KD2aFObv2Cqwn1eYB89IrDowhDnawABwKxyGwlZbT00lh6dxHQi')


ReactDOM.render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </React.StrictMode>,
  document.getElementById('root')
);


