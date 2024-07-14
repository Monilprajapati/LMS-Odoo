import { asyncHandler } from "../utils/asyncHandler";

export const createCheckoutSession = async(req,res) => {
    const { products, totalPrice } = req.body;
    console.log(req.body);
    if (!products || !totalPrice) {
        return res.status(400).json({ error: 'Missing products data or totalPrice in request.' });
    }
    
    console.log('Total Price:', totalPrice);
    
    const lineItems = products.map((product) => ({
        price_data: {
            currency: "inr",
            product_data: {
                name: product.name
            },
            unit_amount: product.price * 100
        },
        quantity: product.quantity 
    }));
    
    
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/cancel",
            metadata: {
                totalPrice: totalPrice // Include the calculated total price
            }
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: 'Error creating checkout session' });
    }
}