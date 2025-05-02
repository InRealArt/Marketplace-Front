'use client'
import Button from '@/components/Button/Button';
import React, { useEffect, useState } from 'react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'

export interface SimpleCaptchaProps {
    setButtonSendActive: React.Dispatch<React.SetStateAction<boolean>>
    buttonSendActive: boolean,
    setCaptchaToken: React.Dispatch<React.SetStateAction<string>>
    captchaToken: string, 
}

const SimpleCaptcha : React.FC<SimpleCaptchaProps> = ({
    setButtonSendActive, buttonSendActive, setCaptchaToken, captchaToken
}) => {

    //---------------------------------------------------------------------
    const [num1, setNum1] = useState<number>(0)
    const [num2, setNum2] = useState<number>(0)
    const [correctAnswer, setCorrectAnswer] = useState<number>(0)
    const [userInput, setUserInput] = useState<string>('')
    const [captchaAnswer, setCaptchaAnswer] = useState<string>('')
    const [challengeComplete, setChallengeComplete] = useState<boolean>(false)
    const [challengeFailed, setChallengeFailed] = useState<boolean>(false)

    const [notificationCaptchaError, setNotificationCaptchaError] = useState<string>('')
    const [notificationCaptchaSuccess, setNotificationCaptchaSuccess] = useState<string>('')

    //---------------------------------------------------------------------
    useEffect(
        () => {
            setNum1(Math.floor(Math.random() * 9 ) + 1)
            setNum2(Math.floor(Math.random() * 9 ) + 1)           
            setCorrectAnswer(num1 + num2)
        }
        ,[num1, num2]
    )

    const { executeRecaptcha } = useGoogleReCaptcha()
    
    //---------------------------------------------------------------------
    const handleSubmitCatchpaForm = async (e: any) => {
        console.log('CAPTCHA ANSWER : ', captchaAnswer)
        console.log('Correct answer : ', correctAnswer.toString())
        if (captchaAnswer != correctAnswer.toString()) {
            setNotificationCaptchaError('Wrong answer !')
        }    
        else {
            e.preventDefault();
            if (!executeRecaptcha) {
              console.log("Execute recaptcha not available yet");
              setNotificationCaptchaError(
                "Execute recaptcha not available yet likely meaning key not recaptcha key not set"
              );
              return;
            }
            executeRecaptcha("enquiryFormSubmit").then((gReCaptchaToken) => {
              submitEnquiryForm(gReCaptchaToken);
            });    
        }      
    }

    //---------------------------------------------------------------------
    const submitEnquiryForm = async (gReCaptchaToken: string) => {
        console.log('gReCaptchaToken', gReCaptchaToken)
        try {
          const response = await fetch("/api/captchaSubmit", {
            method: "POST",
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              captchaAnswer: captchaAnswer,
              gRecaptchaToken: gReCaptchaToken,
            }),
          });
    
          const data = await response.json()
          console.log(data)
          if (data?.success === true) {
            console.log(`Success with score: ${data?.score}`)
            console.log('Captcha Custom token : ', data.captchaToken)
            setCaptchaToken(data.captchaToken)
            setNotificationCaptchaSuccess(`Human checking successful ! You can now signup ...`)
            setButtonSendActive(true)
          } else {
            setNotificationCaptchaError(`Failure with score: ${data?.score}`)
          }
        } catch (error) {
          console.error("Error submitting form:", error)
          setNotificationCaptchaError("Error submitting form. Please try again later.")
        }
      };

  return (
    <div className='pt-4 flex flex-col gap-2 mx-auto sm:pt-5 sm:gap-2.5'>
        {notificationCaptchaSuccess ? (
            <div className='font-unbounded text-xs text-green-500 sm:text-sm'>
                {notificationCaptchaSuccess}
            </div>    
        ) : (
            <div className="pt-4 flex flex-col gap-2 mx-auto sm:pt-5 sm:gap-2.5">
                <div className="pt-1 mx-auto sm:pt-1.5">
                    <span className='font-unbounded text-xs text-red-500 sm:text-sm'>Verify that you are human : </span><br/>
                    <span className='font-unbounded text-xs text-red-500 sm:text-sm'>What is the sum of these 2 numbers : </span>
                    <span className='font-unbounded text-xs text-red-500 sm:text-sm'>{num1} &amp; </span>
                    <span className='hidden'>five</span>
                    <span className='hidden'>seven</span>
                    <span className='font-unbounded text-xs text-red-500 sm:text-sm'>{num2}</span>
                    <span className='font-unbounded text-xs text-red-500 sm:text-sm'>&nbsp;?</span>    
                </div>
                
                <div className='flex flex-col gap-2 mx-auto sm:gap-2.5'>
                    <div className='flex flex-col mx-auto'>
                        <input
                            type="text"
                            name="captchaAnswer"
                            value={captchaAnswer}
                            onChange={(e) => setCaptchaAnswer(e?.target?.value)}
                            className='border-2 border-red-500 rounded-md py-1.5 px-2 w-full bg-transparent font-poppins text-sm focus:outline-none focus:ring-2 focus:ring-red-500 sm:py-2 sm:px-3 sm:text-base'
                            placeholder="Your answer"
                        />
                    </div>
                    <div className='flex flex-col mx-auto'>
                        <Button text='Verify' action={handleSubmitCatchpaForm} additionalClassName='verifyCaptcha' />
                    </div>
                    <div>
                        {notificationCaptchaError && <p className='font-unbounded text-xs text-red-500 sm:text-sm'>{notificationCaptchaError}</p>}
                    </div>
                </div>
            </div>
        )}        

        <p className='font-unbounded text-xs text-red-500 sm:text-sm'>
            {challengeFailed && (
                <span>Oups ! Wrong answer</span>
            )}
        </p>
    </div>
  )
}

export default SimpleCaptcha