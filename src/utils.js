import Stripe from "stripe";

const stripe = new Stripe('sk_test_51KJ1pOKknMHdpkmJkUacdXgOwHkIhFsYgRZ1GdjcnbLXjZKsEuE0zO4kYlLsLqpWV2EXCtss9VSMraB6CRug8s4R00GwW7qphG');

const arrowFunc = async (amount) => {
    try{
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "usd",
          });
    
        return paymentIntent.client_secret
    } catch(error){
        return {Error:error.message}
    }  
  
};

export default arrowFunc