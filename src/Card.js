import {PaymentElement, useElements, useStripe} from '@stripe/react-stripe-js'
import React, {useState} from 'react'
import './card.css'
import axios from "axios"
import cogoToast from 'cogo-toast';


const Card =()=>{
    const elements = useElements()
    const stripe = useStripe()
    const [itemsCount, setItemsCount] = useState(1)

    const handleSubmit= async(e)=>{
        e.preventDefault()
        console.log('started')
        if(!stripe || !elements){
            return
        }


        const clientSecret = await axios.post('https://arcane-ocean-13863.herokuapp.com/create-payment-intent', {amount:itemsCount*2*100}).then(res=>res.data.clientSecret)
        
        const {paymentIntent} = await stripe.confirmCardPayment(clientSecret, {
            payment_method:{
                card:elements.getElement(CardElement)
            }
        })
        cogoToast.success(`payment: ${paymentIntent.id} was successful`)
       
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
}

export default Card
