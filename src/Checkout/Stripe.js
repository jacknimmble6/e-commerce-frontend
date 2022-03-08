import { Elements, CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useDispatch } from "react-redux";

const stripePromise = 
  loadStripe("pk_test_51IiVCyGIYilrPRlMd94EF5L7W8TMcKREybqm8dNKVIURd9zStgxNGEykftvWYJMuNygNAmP1zYJz8LskPoP7nnmk00S1h0zGFn");
  
  const PaymentForm = ({ handleFinishOrder }) => {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch()

    const handleSubmit = (stripe, elements) => async () => {
    const cardElement = elements.getElement(CardElement)

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });
  
    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
    }

    dispatch({ type: 'finishOrder', payload: { 
      cardNumber: paymentMethod.card.last4 ,
      cardType: paymentMethod.card.brand,
      cardType2: paymentMethod.card.funding
    }})

    handleFinishOrder()
  }

  const inputStyle = { 
    height: '300px', 
    fontSize: '25px'
}

  return (
    <div className="w-[60%] m-auto mt-24">
      <CardElement options={{ style: { base: inputStyle } }}/>
      <button className='m-auto text-center text-[30px] ml-[300px] mt-8' onClick={handleSubmit(stripe, elements)}>
        Buy
      </button>
    </div>
  );
}
  
const Stripe = ({ handleFinishOrder }) => (
  <Elements stripe={stripePromise}>
    <PaymentForm handleFinishOrder={handleFinishOrder}/>
  </Elements>
);

export default Stripe