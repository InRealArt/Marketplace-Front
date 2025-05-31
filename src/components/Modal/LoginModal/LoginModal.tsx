'use client'
import React, { useState } from 'react';
import Modal from '@/components/Modal/Modal';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { isLoginModalDisplay } from '@/redux/reducers/modals/selectors';
import { setLoginModalDisplay } from '@/redux/reducers/modals/reducer';
import Image from 'next/image';

// Import our new components
import SignInContent from './SignInContent';
import SignUpContent from './SignUpContent';
import ForgotPasswordContent from './ForgotPasswordContent';

/**
 * LoginModal component that handles user authentication.
 * Includes sign-in, sign-up, and forgot password functionality.
 */
const LoginModal = () => {
  const isLoginModalOpen = useAppSelector(isLoginModalDisplay);
  const dispatch = useAppDispatch();
  
  // State to track which form is currently displayed
  const [isSignin, setIsSignin] = useState<boolean>(true);
  const [showForgotPassword, setShowForgotPassword] = useState<boolean>(false);

  // Handler to close the modal and reset state
  const handleCloseModal = () => {
    dispatch(setLoginModalDisplay(false));
    // Reset state when modal is closed
    setIsSignin(true);
    setShowForgotPassword(false);
  };

  return (
    <Modal
      title={''}
      show={isLoginModalOpen}
      hide={handleCloseModal}
      additionalClassName="login"
      withoutHeader
    >
      <div className="pb-[50px] max-h-[90vh] overflow-hidden">
        <Image
          src="/images/LoginHeader.png"
          width={740}
          height={200}
          alt="HeaderLoginModal"
          className="w-full h-auto rounded-t-[20px] md:w-full md:h-[100px]"
        />
        <div className="flex flex-col items-center w-[75%] mx-auto max-h-[78vh] overflow-x-hidden overflow-y-scroll md:w-[85%]">
          {showForgotPassword ? (
            <ForgotPasswordContent 
              setIsSignin={setIsSignin}
              setShowForgotPassword={setShowForgotPassword}
            />
          ) : isSignin ? (
            <SignInContent
              setIsSignin={setIsSignin}
              setShowForgotPassword={setShowForgotPassword}
            />
          ) : (
            <SignUpContent
              setIsSignin={setIsSignin}
            />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal;
