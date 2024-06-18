'use client'
import Button from '@/components/Button/Button';
import React, { useEffect, useState } from 'react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { toast } from 'sonner';

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

    <div className='containerCaptcha'>
        {
            notificationCaptchaSuccess ? (
                <div className='challengeComplete'>
                    {notificationCaptchaSuccess}
                </div>    
            )
            : 
            (

                    <div className="subContainerCaptcha"> {/* Add a top margin for better spacing */}
                        <div className="subContainerCaptchaQuestion"> {/* Add a top margin for better spacing */}
                          <span className='questionCaptcha'>Verify that you are human : </span><br/>
                          <span className='questionCaptcha'>What is the sum of these 2 numbers : </span>
                          <span className='questionCaptcha'>{num1} &amp; </span>
                          <span className='questionCaptchaHidden'>five</span>
                          <span className='questionCaptchaHidden'>seven</span>
                          <span className='questionCaptcha'>{num2}</span>
                          <span className='questionCaptcha'>&nbsp;?</span>    
                        </div>
                        
                        <div className='containerCaptchaInputButton'>
                            <div className='containerCaptchaInput'>
                              <input
                                  type="text"
                                  name="captchaAnswer"
                                  value={captchaAnswer}
                                  onChange={(e) => setCaptchaAnswer(e?.target?.value)}
                                  className='inputCaptchaAnswer'
                                  placeholder="Your answer"
                              />
                            </div>
                            <div className='containerCaptchaButton'>
                              <Button text='Verify' action={handleSubmitCatchpaForm} additionalClassName='verifyCaptcha' />
                            </div>
                            <div>
                              {notificationCaptchaError && <p className='challengeFailed'>{notificationCaptchaError}</p>}
                            </div>
                            
                        </div>
                    </div>
                

            )
        }        

        <p className='challengeFailed'>
            {challengeFailed && (
                <span>Oups ! Wrong answer</span>
            )}
        </p>
        
    </div>
  )
}

export default SimpleCaptcha