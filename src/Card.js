import {PaymentElement, useElements, useStripe} from '@stripe/react-stripe-js'
import React, {useState, useEffect} from 'react'
import axios from "axios"
import cogoToast from 'cogo-toast';


const Card =()=>{
    const elements = useElements()
    const stripe = useStripe()
    const [itemsCount, setItemsCount] = useState(1);

    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const stripePayment = async()=>{
      const clientSecret =  await axios.post('https://arcane-ocean-13863.herokuapp.com/create-payment-intent', {amount:2000}).then(res=>res.data.clientSecret)
      console.log(clientSecret)
      if (!clientSecret) {
        return;
      }
  
      stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
        switch (paymentIntent.status) {
          case "succeeded":
            setMessage("Payment succeeded!");
            break;
          case "processing":
            setMessage("Your payment is processing.");
            break;
          case "requires_payment_method":
            setMessage("Your payment was not successful, please try again.");
            break;
          default:
            setMessage("Something went wrong.");
            break;
        }
      });
    }
/*
    useEffect(() => {
      if (!stripe) {
        return;
      }
      stripePayment()
     
    }, [stripe]);
  */

    const handleSubmit= async(e)=>{
        e.preventDefault()
        console.log('started')
        if(!stripe || !elements){
            return
        }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000",
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsLoading(false);

    
    
    /*
    const {paymentIntent} = await stripe.confirmCardPayment(clientSecret, {
        payment_method:{
            card:elements.getElement(PaymentElement)
        }
    })
    cogoToast.success(`payment: ${paymentIntent.id} was successful`)
    */
    }
    
    const options = {
            style: {
              base: {
                iconColor: '#c4f0ff',
                color: 'black',
                fontWeight: '400',
                fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
                fontSize: '16px',
                fontSmoothing: 'antialiased',
                ':-webkit-autofill': {
                  color: '#fce883',
                },
                '::placeholder': {
                  color: '#87BBFD',
                },
              },
              invalid: {
                iconColor: '#FFC7EE',
                color: '#FFC7EE',
              },
            },
    }
/*
    return<>
        <div className="outerContainer">
            <div className="innerContainer">
                <form onSubmit={handleSubmit}>
                    <h3>Each item cost $2</h3>
                    <label htmlFor="items">Enter Number of items</label>
                    <input className="input" value={itemsCount} onChange={({target:{value}})=>setItemsCount(value)} type="number" name="items" id="items"/>
                    <p>{`you are paying ${itemsCount * 2} dollars`}</p>
                    <label htmlFor="card-element">Enter Card Details</label>
                    <PaymentElement id="card-element" options={options} />
                    <button className="button">Pay</button>
                </form>
            </div>
        </div>
    </>
*/
return (
  <form id="payment-form" onSubmit={handleSubmit}>
    <PaymentElement id="payment-element" />
    <button disabled={isLoading || !stripe || !elements} id="submit">
      <span id="button-text">
        {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
      </span>
    </button>
    {/* Show any error or success messages */}
    {message && <div id="payment-message">{message}</div>}
  </form>
);
}

export default Card