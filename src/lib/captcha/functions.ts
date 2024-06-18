
//---------------------------------------------------------------------
export const verifyCaptcha = async (executeRecaptcha: ((action?: string | undefined) => Promise<string>) | undefined) => {
    
    if (!executeRecaptcha) {
        console.log("Execute recaptcha not available yet")
        return
    }
    
    const gReCaptchaToken = await executeRecaptcha("MarketPlaceFormCaptcha")
    return submitEnquiryForm(gReCaptchaToken)
    // executeRecaptcha("enquiryFormSubmit").then((gReCaptchaToken) => {
    //     return submitEnquiryForm(gReCaptchaToken)
    // })
}

//---------------------------------------------------------------------
export const submitEnquiryForm = async (gReCaptchaToken: string) => {
    console.log('gReCaptchaToken', gReCaptchaToken)
    try {
        const response = await fetch("/api/captchaSubmit", {
        method: "POST",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            gRecaptchaToken: gReCaptchaToken,
        }),
        })

        const data = await response.json()
        return data
    } catch (error) {
        console.error("Error submitting form:", error)
    }
}


    