import { NextRequest, NextResponse } from 'next/server';
import { getAnonymousCart, upsertAnonymousCart, deleteAnonymousCart } from '@/lib/cart';

// Set expiration time for anonymous carts (e.g., 30 days)
const EXPIRATION_DAYS = 30;

export async function POST(request: NextRequest) {
  try {
    const { cartId, items } = await request.json();

    if (!cartId) {
      return NextResponse.json(
        { error: 'Cart ID is required' },
        { status: 400 }
      );
    }

    // Calculate expiration date
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + EXPIRATION_DAYS);

    // Update anonymous cart in the database using our server function
    const cart = await upsertAnonymousCart(cartId, items);

    return NextResponse.json({ success: true, cart });
  } catch (error) {
    console.error('Failed to update anonymous cart:', error);
    return NextResponse.json(
      { error: 'Failed to update anonymous cart' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const cartId = searchParams.get('cartId');

    if (!cartId) {
      return NextResponse.json(
        { error: 'Cart ID is required' },
        { status: 400 }
      );
    }

    // Get anonymous cart from database using our server function
    const cart = await getAnonymousCart(cartId);

    if (!cart) {
      return NextResponse.json({ items: [] });
    }

    // Check if cart has expired
    if (cart.expiresAt < new Date()) {
      // Delete expired cart
      await deleteAnonymousCart(cartId);
      return NextResponse.json({ items: [] });
    }

    return NextResponse.json({ items: cart.items });
  } catch (error) {
    console.error('Failed to get anonymous cart:', error);
    return NextResponse.json(
      { error: 'Failed to get anonymous cart' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const cartId = searchParams.get('cartId');

    if (!cartId) {
      return NextResponse.json(
        { error: 'Cart ID is required' },
        { status: 400 }
      );
    }

    // Delete anonymous cart from database using our server function
    await deleteAnonymousCart(cartId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete anonymous cart:', error);
    return NextResponse.json(
      { error: 'Failed to delete anonymous cart' },
      { status: 500 }
    );
  }
} 