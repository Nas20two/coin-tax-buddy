import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

export async function createCheckoutSession(priceId: string, customerEmail?: string) {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/pricing`,
      customer_email: customerEmail,
      subscription_data: {
        trial_period_days: 7, // Optional: 7-day free trial
      },
    });

    return { id: session.id, url: session.url };
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
}

export async function getSubscriptionStatus(sessionId: string) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return session;
  } catch (error) {
    console.error('Error retrieving session:', error);
    throw error;
  }
}

export async function createCustomerPortalSession(customerId: string) {
  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${process.env.FRONTEND_URL}/account`,
    });

    return { url: session.url };
  } catch (error) {
    console.error('Error creating portal session:', error);
    throw error;
  }
}

// Webhook handler for subscription events
export async function handleWebhook(payload: string, signature: string) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';
  
  try {
    const event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
    
    switch (event.type) {
      case 'checkout.session.completed':
        // Handle successful subscription
        const session = event.data.object;
        console.log('Subscription created:', session.id);
        // TODO: Update user record in database
        break;
        
      case 'invoice.payment_succeeded':
        // Handle successful payment
        console.log('Payment succeeded');
        break;
        
      case 'invoice.payment_failed':
        // Handle failed payment
        console.log('Payment failed');
        break;
        
      case 'customer.subscription.deleted':
        // Handle cancellation
        console.log('Subscription cancelled');
        // TODO: Update user record in database
        break;
    }
    
    return { received: true };
  } catch (error) {
    console.error('Webhook error:', error);
    throw error;
  }
}
