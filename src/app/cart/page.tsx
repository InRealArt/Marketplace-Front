'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import Button from '@/components/Button/Button';
import { toast } from 'sonner';

export default function CartPage() {
  const { items, removeFromCart, getCartTotal, clearCart } = useCart();
  const cartTotal = getCartTotal();

  // Handle removing item from cart
  const handleRemoveItem = async (nftId: number, purchaseType: string) => {
    const result = await removeFromCart(nftId, purchaseType);
    
    if (result.success) {
      toast.success(result.message);
    } else if (result.error) {
      toast.error(result.error);
    }
  };

  // Handle clearing the cart
  const handleClearCart = async () => {
    try {
      const result = await clearCart();
      
      if (result && result.success) {
        toast.success(result.message || 'Cart cleared successfully');
      }
    } catch (error) {
      toast.error('Failed to clear cart');
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Your Cart</h1>
      
      {items.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl mb-6">Your cart is empty</p>
          <Link href="/artworks" className="inline-block px-6 py-3 bg-[#D4AF37] text-black font-medium rounded-md">
            Browse Artworks
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-[rgba(30,30,30,0.5)] rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Cart Items ({items.length})</h2>
                  <button 
                    onClick={handleClearCart}
                    className="text-[#D4AF37] hover:underline"
                  >
                    Clear Cart
                  </button>
                </div>
                
                {items.map((item) => (
                  <div 
                    key={`${item.nft.id}-${item.purchaseType}`} 
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 mb-4 border-b border-gray-700"
                  >
                    <div className="w-24 h-24 sm:w-32 sm:h-32 relative flex-shrink-0 rounded overflow-hidden">
                      <Image 
                        src={item.nft.mainImageUrl || '/icons/Nft.png'}
                        alt={item.nft.name || 'NFT Image'}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/icons/Nft.png';
                        }}
                      />
                    </div>
                    
                    <div className="flex-grow">
                      <h3 className="text-lg font-medium mb-2">{item.nft.name}</h3>
                      <p className="text-sm text-gray-400 mb-2">
                        Type: {item.purchaseType === 'physical' ? 'Physical Only' : 
                              item.purchaseType === 'nft' ? 'NFT Only' : 
                              'NFT + Physical'}
                      </p>
                      <p className="text-[#D4AF37] font-bold text-lg">
                        {item.purchaseType === 'physical' && `${item.nft.pricePhysicalBeforeTax} €`}
                        {item.purchaseType === 'nft' && `${item.nft.priceNftBeforeTax} €`}
                        {item.purchaseType === 'nftPlusPhysical' && `${item.nft.priceNftPlusPhysicalBeforeTax} €`}
                      </p>
                    </div>
                    
                    <button 
                      onClick={() => handleRemoveItem(item.nft.id, item.purchaseType)}
                      className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 rounded text-white"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-[rgba(30,30,30,0.5)] rounded-lg shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{cartTotal} €</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="border-t border-gray-700 pt-4 mt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>{cartTotal} €</span>
                  </div>
                </div>
              </div>
              
              <Button
                text="Proceed to Checkout"
                link="/checkout"
                additionalClassName="gold w-full"
              />
              
              <p className="text-center mt-4 text-sm text-gray-400">
                <Link href="/artworks" className="text-[#D4AF37] hover:underline">
                  Continue Shopping
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 