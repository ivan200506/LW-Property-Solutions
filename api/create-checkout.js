// Creates a Stripe Checkout Session for a subscription, after the customer
// has read and signed the terms on the signing page (sign.html / zh-sign.html).
// The signature and customer details travel in the session metadata, so the
// webhook can attach them to the signed agreement emailed after payment.
//
// Required Vercel env vars:
//   STRIPE_SECRET_KEY            (Stripe Dashboard -> Developers -> API keys)
//   STRIPE_PRICE_BASIC_MONTHLY / _ANNUAL, STRIPE_PRICE_STD_MONTHLY / _ANNUAL,
//   STRIPE_PRICE_PRE_MONTHLY / _ANNUAL
//     (Stripe Dashboard -> Products -> each product's Pricing -> price ID,
//      looks like price_1AbC...)

const Stripe = require('stripe');
const { PLANS } = require('./terms');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  try {
    const body = req.body || {};
    const planKey = body.plan;
    const plan = PLANS[planKey];
    if (!plan) {
      res.status(400).json({ error: 'Invalid plan selected.' });
      return;
    }
    const name = (body.name || '').trim();
    const email = (body.email || '').trim();
    const phone = (body.phone || '').trim();
    const signature = (body.signature || '').trim();
    const lang = body.lang === 'zh' ? 'zh' : 'en';
    if (!name || !email || !signature) {
      res.status(400).json({ error: 'Name, email and signature are required.' });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      res.status(400).json({ error: 'Please enter a valid email address.' });
      return;
    }
    const priceId = process.env[plan.priceEnv];
    if (!priceId) {
      res.status(500).json({ error: 'Payment is not configured yet. Please call (347) 989-2686.' });
      return;
    }
    if (!process.env.STRIPE_SECRET_KEY) {
      res.status(500).json({ error: 'Payment is not configured yet. Please call (347) 989-2686.' });
      return;
    }
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const base = 'https://www.lw-propertysolutions.com';
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: email,
      metadata: {
        plan: planKey,
        plan_name: `${plan.tierEn} ${plan.billing}`,
        billing: plan.billing,
        customer_name: name,
        customer_phone: phone,
        signature,
        signed_at: new Date().toISOString(),
        terms_version: require('./terms').TERMS_VERSION,
        lang,
      },
      success_url: `${base}/${lang === 'zh' ? 'zh-success.html' : 'success.html'}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${base}/${lang === 'zh' ? 'zh-sign.html' : 'sign.html'}?plan=${planKey}`,
    });
    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('create-checkout error:', err);
    res.status(500).json({ error: 'Could not start checkout. Please call (347) 989-2686.' });
  }
};
