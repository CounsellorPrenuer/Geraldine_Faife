export interface Env {
	RAZORPAY_KEY_ID: string;
	RAZORPAY_KEY_SECRET: string;
	// ADD OTHER BINDINGS HERE IF NEEDED
}

const COUPONS: Record<string, { type: 'percentage' | 'flat', value: number }> = {
	'WELCOME10': { type: 'percentage', value: 10 },
	'OFF20': { type: 'percentage', value: 20 },
	'GP500': { type: 'flat', value: 500 },
};

const handleCors = (_request: Request) => {
	const headers = new Headers();
	headers.set('Access-Control-Allow-Origin', '*');
	headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
	headers.set('Access-Control-Allow-Headers', 'Content-Type');
	return headers;
};

export default {
	async fetch(request: Request, env: Env, _ctx: any): Promise<Response> {
		if (request.method === 'OPTIONS') {
			return new Response(null, { headers: handleCors(request) });
		}

		const url = new URL(request.url);
		const corsHeaders = handleCors(request);

		try {
			// Coupon Validation
			if (url.pathname === '/validate-coupon' && request.method === 'GET') {
				const code = url.searchParams.get('code')?.toUpperCase();
				if (!code || !COUPONS[code]) {
					return new Response(JSON.stringify({ valid: false, message: 'Invalid coupon code' }), {
						status: 400,
						headers: { ...corsHeaders, 'Content-Type': 'application/json' },
					});
				}
				return new Response(JSON.stringify({ valid: true, coupon: COUPONS[code] }), {
					headers: { ...corsHeaders, 'Content-Type': 'application/json' },
				});
			}

			// Create Razorpay Order
			if (url.pathname === '/create-order' && request.method === 'POST') {
				const body: any = await request.json();
				const { amount, currency = 'INR', receipt } = body;

				if (!amount) {
					return new Response(JSON.stringify({ error: 'Amount is required' }), {
						status: 400,
						headers: { ...corsHeaders, 'Content-Type': 'application/json' },
					});
				}

				const auth = btoa(`${env.RAZORPAY_KEY_ID}:${env.RAZORPAY_KEY_SECRET}`);
				const razorpayResponse = await fetch('https://api.razorpay.com/v1/orders', {
					method: 'POST',
					headers: {
						'Authorization': `Basic ${auth}`,
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						amount: Math.round(amount * 100), // Razorpay expects amount in paise
						currency,
						receipt,
					}),
				});

				const orderData = await razorpayResponse.json();
				return new Response(JSON.stringify(orderData), {
					status: razorpayResponse.status,
					headers: { ...corsHeaders, 'Content-Type': 'application/json' },
				});
			}

			// Standard Contact Form Submission
			if (url.pathname === '/submit-contact' && request.method === 'POST') {
				const body: any = await request.json();
				const { name, email, message } = body;

				if (!name || !email) {
					return new Response(JSON.stringify({ error: 'Name and email are required' }), {
						status: 400,
						headers: { ...corsHeaders, 'Content-Type': 'application/json' },
					});
				}

				// --- EMAIL LOGIC (Placeholder) ---
				// Send notification to admin and autoreply to user
				console.log(`New contact form submission from ${name} (${email}): ${message}`);

				return new Response(JSON.stringify({ success: true, message: 'Message sent successfully' }), {
					headers: { ...corsHeaders, 'Content-Type': 'application/json' },
				});
			}

			// Verify Razorpay Payment (and send email)
			if (url.pathname === '/verify-payment' && request.method === 'POST') {
				const body: any = await request.json();
				const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userData, package: pkg } = body;

				if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
					return new Response(JSON.stringify({ success: false, error: 'Missing payment details' }), {
						status: 400,
						headers: { ...corsHeaders, 'Content-Type': 'application/json' },
					});
				}

				// --- EMAIL LOGIC (Placeholder) ---
				console.log(`Payment verified for ${userData?.email || 'N/A'}. Package: ${pkg?.name || 'N/A'}`);

				return new Response(JSON.stringify({ success: true }), {
					headers: { ...corsHeaders, 'Content-Type': 'application/json' },
				});
			}

			return new Response('Not Found', { status: 404, headers: corsHeaders });
		} catch (error: any) {
			return new Response(JSON.stringify({ error: error.message }), {
				status: 500,
				headers: { ...corsHeaders, 'Content-Type': 'application/json' },
			});
		}
	},
} satisfies any;
