import { NextRequest, NextResponse } from 'next/server';
import { getUserCart, upsertUserCart } from '@/lib/cart';

export async function POST(request: NextRequest) {
  try {
    const { userId, items, totalPrice } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Calculate totalPrice if not provided
    const calculatedTotalPrice = totalPrice || items.reduce((total: number, item: any) => {
      return total + (item.price || 0) * (item.quantity || 1);
    }, 0);

    // Update cart in the database using our server function
    const cart = await upsertUserCart(userId, items, calculatedTotalPrice);

    return NextResponse.json({ success: true, cart });
  } catch (error) {
    console.error('Failed to update cart:', error);
    return NextResponse.json(
      { error: 'Failed to update cart' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Get cart from database using our server function
    const cart = await getUserCart(userId);

    if (!cart) {
      return NextResponse.json({ items: [] });
    }

    return NextResponse.json({ items: cart.items });
  } catch (error) {
    console.error('Failed to get cart:', error);
    return NextResponse.json(
      { error: 'Failed to get cart' },
      { status: 500 }
    );
  }
} 