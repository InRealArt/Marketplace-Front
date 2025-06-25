'use client'

import { useState } from 'react';
import Image from 'next/image';
import Button from '@/components/Button/Button';
import { ArrowRightIcon } from 'lucide-react';

export default function JoinUsSection() {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (value && !validateEmail(value)) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !validateEmail(email)) {
      setIsValid(false);
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubmitted(true);
      setEmail('');
    } catch (error) {
      console.error('Error submitting email:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full mx-auto mt-[10rem]">
      <div className="flex flex-col lg:flex-row min-h-[600px] rounded-2xl">
        {/* Left side - Dark background */}
        <div className="flex-1 bg-[#1B1C1E] p-8 lg:p-12 flex flex-col justify-center">
          <div>
            {/* Logo */}
            <Image src="/images/logo-small.png" alt="InRealArt Logo" width={43} height={43} className='mb-8' />

            {/* Title */}
            <h1 className="text-3xl lg:text-4xl  text-white mb-6 leading-tight font-bricolage">
              Rejoignez InRealArt pour vous prévenir des dernières œuvres de vos artistes préféré
            </h1>

            {/* Subtitle */}
            <h2 className="text-lg mb-8 leading-relaxed font-montserrat">
              En vous saisissants votre adresse mail vous bénéficierez d'alerte exclusif réglé en fonction de vos favoris
            </h2>

            {/* Form */}
            {isSubmitted ?
              <div>
                <p>Votre adresse mail a bien été enregistrée</p>
              </div> :
              <form onSubmit={handleSubmit} className="font-montserrat">
                <fieldset className='flex gap-4'>
                  <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    name='email'
                    placeholder="Adresse mail"
                    className={`w-full px-6 bg-transparent border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${!isValid
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-[#4D4D4D] focus:ring-white'
                      }`}
                  />

                  <Button text='Envoyer' type='submit' additionalClassName='whiteBorder'>
                    {isSubmitting ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <ArrowRightIcon className='w-8 h-8' />
                    )}
                  </Button>
                </fieldset>
                {!isValid && (
                  <p className="text-red-400 text-sm mt-2">
                    Veuillez entrer une adresse email valide
                  </p>
                )}
              </form>}
          </div>
        </div>

        {/* Right side - Purple background */}
        <div className="flex-1 bg-[#6052FF] flex items-end p-8 relative">
          <Image
            src="/images/joinUs-1.png"
            alt="Portrait artwork"
            width={300}
            height={300}
            className="rounded-lg shadow-lg w-1/2 h-auto"
          />
          <Image
            src="/images/joinUs-2.png"
            alt="Abstract artwork"
            width={250}
            height={200}
            className="rounded-lg shadow-lg w-1/2 h-auto ml-[-20px] mb-[4rem]"
          />
        </div>
      </div>
    </section>
  );
} 