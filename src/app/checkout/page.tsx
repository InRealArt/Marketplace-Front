import { CheckoutClient } from './checkout-client'

export const metadata = {
  title: 'Payment | In Real Art',
  description: 'Complete your payment securely on In Real Art'
}

export default function CheckoutPage() {
  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-900">Complete your order</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="rounded-lg border p-6 bg-white shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Order summary</h2>
          <CheckoutClient />
        </div>
        
        <div className="rounded-lg border p-6 bg-white shadow-sm">
          <h2 className="text-xl font-semibold mb-6 text-gray-900">Important information</h2>
          <p className="text-gray-700 mb-4">
            Your payment is secured by Stripe, a global leader in online payment solutions. 
            Your credit card data is never stored on our servers.
          </p>
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="font-medium mb-2 text-gray-900">Need help?</h3>
            <p className="text-sm text-gray-700">
              If you encounter any difficulties during payment, 
              please don't hesitate to contact our support team at 
              <a href="mailto:support@inrealart.com" className="text-blue-600 hover:underline ml-1">
                support@inrealart.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 