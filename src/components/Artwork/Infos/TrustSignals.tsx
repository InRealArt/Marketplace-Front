'use client';

import React from 'react';
import Image from 'next/image';
import { Shield, Truck, CreditCard, LockKeyhole } from 'lucide-react';
import CustomTooltip from '@/components/ui/CustomTooltip';

const TrustSignals = () => {
  return (
    <div className="mt-6 border border-[rgba(255,255,255,0.1)] rounded-[8px] overflow-hidden">
      {/* Secure payment section */}
      <div className="p-4 bg-[rgba(30,30,30,0.5)]">
        <h3 className="flex items-center text-sm font-medium text-[rgba(255,255,255,0.9)] mb-3">
          <Shield className="w-4 h-4 mr-2" />
          Secure Payment
        </h3>
        <div className="flex items-center flex-wrap gap-3">
          <CustomTooltip
            trigger={
              <div className="relative h-8 w-12 bg-white rounded-md flex items-center justify-center p-1">
                <Image
                  src="/images/partners/stripe.svg"
                  alt="Stripe"
                  width={36}
                  height={24}
                  className="object-contain"
                />
              </div>
            }
            content={<p>Secure payments processed by Stripe</p>}
          />
          
          <CustomTooltip
            trigger={
              <div className="relative h-8 w-12 bg-white rounded-md flex items-center justify-center p-1">
                <Image
                  src="/images/partners/visa.svg"
                  alt="Visa"
                  width={36}
                  height={24}
                  className="object-contain"
                />
              </div>
            }
            content={<p>Pay with Visa</p>}
          />
          
          <CustomTooltip
            trigger={
              <div className="relative h-8 w-12 bg-white rounded-md flex items-center justify-center p-1">
                <Image
                  src="/images/partners/mastercard.svg"
                  alt="Mastercard"
                  width={36}
                  height={24}
                  className="object-contain"
                />
              </div>
            }
            content={<p>Pay with Mastercard</p>}
          />
          
          <CustomTooltip
            trigger={
              <div className="relative h-8 w-12 bg-white rounded-md flex items-center justify-center p-1">
                <Image
                  src="/images/partners/amex.svg"
                  alt="American Express"
                  width={36}
                  height={24}
                  className="object-contain"
                />
              </div>
            }
            content={<p>Pay with American Express</p>}
          />
        </div>
      </div>

      {/* Shipping partners section */}
      <div className="p-4 bg-[rgba(20,20,20,0.8)]">
        <h3 className="flex items-center text-sm font-medium text-[rgba(255,255,255,0.9)] mb-3">
          <Truck className="w-4 h-4 mr-2" />
          Trusted Delivery
        </h3>
        <div className="flex items-center flex-wrap gap-3">
          <CustomTooltip
            trigger={
              <div className="relative h-8 w-12 bg-white rounded-md flex items-center justify-center p-1">
                <Image
                  src="/images/partners/ups.svg"
                  alt="UPS"
                  width={36}
                  height={24}
                  className="object-contain"
                />
              </div>
            }
            content={<p>Shipping via UPS</p>}
          />
          
          <CustomTooltip
            trigger={
              <div className="relative h-8 w-12 bg-white rounded-md flex items-center justify-center p-1">
                <Image
                  src="/images/partners/dhl.svg"
                  alt="DHL"
                  width={36}
                  height={24}
                  className="object-contain"
                />
              </div>
            }
            content={<p>Shipping via DHL</p>}
          />
          
          <CustomTooltip
            trigger={
              <div className="relative h-8 w-12 bg-white rounded-md flex items-center justify-center p-1">
                <Image
                  src="/images/partners/fedex.svg"
                  alt="FedEx"
                  width={36}
                  height={24}
                  className="object-contain"
                />
              </div>
            }
            content={<p>Shipping via FedEx</p>}
          />
        </div>
      </div>

      {/* Trust points section */}
      <div className="p-4 bg-[rgba(30,30,30,0.5)]">
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="flex items-center">
            <CreditCard className="w-4 h-4 mr-2 text-[#b38273]" />
            <span>Secure Payment</span>
          </div>
          <div className="flex items-center">
            <LockKeyhole className="w-4 h-4 mr-2 text-[#b38273]" />
            <span>Data Protection</span>
          </div>
          <div className="flex items-center">
            <Shield className="w-4 h-4 mr-2 text-[#b38273]" />
            <span>Authenticity Guaranteed</span>
          </div>
          <div className="flex items-center">
            <Truck className="w-4 h-4 mr-2 text-[#b38273]" />
            <span>Insured Shipping</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals; 