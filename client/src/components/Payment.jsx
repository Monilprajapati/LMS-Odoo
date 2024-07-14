import React from 'react'

function Payment() {
    const makePayment = async () => {
        const stripe = await loadStripe(
          "pk_test_51OdukbSDxMHH7tt0LcUi5DGV8WcTkJtCXEQL7R5XIES7EjG63L979jKDw2EK4u21Sr9TaEXDcYzE68c9yvkfQsaf00MQU7CnUD"
        );
    
        const body = {
          products: orders.flatMap((order) =>
            order.products.map((product) => ({
              ...product,
              name: products[product.productId]?.name,
              quantity: product.quantity,
            }))
          ),
          totalPrice,
        };
        
        const headers = {
          "Content-Type": "application/json",
        };
    
        console.log("Request Body:", body);
    
        const response = await fetch(
          "http://localhost:4000/api/create-checkout-session",
          {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body),
          }
        );
    
        const session = await response.json();
    
        const result = stripe.redirectToCheckout({
          sessionId: session.id,
        });
        
        if(result.ok){
          navigate('success');
          console.log("success");
        }
        if (result.error) {
          console.log(result.error);
        }
      };
  return (
    <div>
      
    </div>
  )
}

export default Payment
