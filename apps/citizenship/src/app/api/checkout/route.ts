import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: Request) {
    try {
        if (!process.env.STRIPE_SECRET_KEY) {
            console.error("Missing STRIPE_SECRET_KEY");
            return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
        }

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
            apiVersion: '2025-12-15.clover' as any, // Ensure compatible API version
        });

        const { priceId, userId, successUrl, cancelUrl } = await req.json();

        if (!priceId) {
            return NextResponse.json({ error: 'Missing priceId' }, { status: 400 });
        }

        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            success_url: successUrl,
            cancel_url: cancelUrl,
            metadata: {
                userId: userId,
            },
        });

        return NextResponse.json({ sessionId: session.id, url: session.url });
    } catch (err: any) {
        console.error('Stripe Checkout Error:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
