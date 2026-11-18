// Stripe webhook: after a subscription payment completes, email the signed
// agreement to the customer and to support@lw-propertysolutions.com.
//
// Register this endpoint in Stripe Dashboard -> Developers -> Webhooks:
//   https://www.lw-propertysolutions.com/api/stripe-webhook
// Listen for: checkout.session.completed
// The signing secret from that webhook goes in the STRIPE_WEBHOOK_SECRET
// Vercel env var. Email is sent via Resend (RESEND_API_KEY env var);
// the sending domain (lw-propertysolutions.com) must be verified in Resend.

const Stripe = require('stripe');
const { Resend } = require('resend');
const { buildAgreementEmail } = require('./terms');

function readRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  let event;
  try {
    const buf = await readRawBody(req);
    event = stripe.webhooks.constructEvent(
      buf,
      req.headers['stripe-signature'],
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  if (event.type === 'checkout.session.completed') {
    const s = event.data.object;
    const md = s.metadata || {};
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const { subject, html } = buildAgreementEmail({
        lang: md.lang || 'en',
        name: md.customer_name || (s.customer_details && s.customer_details.name) || '',
        email: s.customer_email || '',
        phone: md.customer_phone || '',
        planKey: md.plan,
        signature: md.signature || '',
        signedAt: md.signed_at || '',
        sessionId: s.id,
        amount: s.amount_total != null ? s.amount_total / 100 : null,
        currency: s.currency || 'usd',
      });
      await resend.emails.send({
        from: 'L&W Property Solutions <agreements@lw-propertysolutions.com>',
        to: [s.customer_email, 'support@lw-propertysolutions.com'],
        subject,
        html,
      });
      console.log('Signed agreement emailed for session', s.id);
    } catch (err) {
      // Log only: Stripe already recorded the payment, so the webhook must
      // still return 200 or Stripe will keep retrying.
      console.error('Signed-agreement email failed for session', s.id, err);
    }
  }

  res.json({ received: true });
};

// Stripe needs the raw request body to verify the webhook signature.
module.exports.config = { api: { bodyParser: false } };
