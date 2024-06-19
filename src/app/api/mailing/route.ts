import { NextResponse } from "next/server";
import { z } from 'zod'
const brevo = require('@getbrevo/brevo')
import fs from 'fs';
import path from 'path';
import { templateMarkeplaceSignup } from "@/lib/brevo/templates/templates";
import { PostDataSingleMailing } from "@/types_mailing";
import { mappingEmailTemplates } from "@/lib/brevo/templates/mapping";


export async function POST(request: Request, response: Response) {
    let apiInstance = new brevo.TransactionalEmailsApi()
    let apiKey = apiInstance.authentications['apiKey']
    apiKey.apiKey = process.env.NEXT_PUBLIC_BREVO_API_KEY
    //console.log('BREVO_API_KEY : ', apiKey.apiKey)
    let sendSmtpEmail = new brevo.SendSmtpEmail()


    const postData: PostDataSingleMailing = await request.json();
    const { to, templateName } = postData;

    console.log("to,templateName", to, templateName)

    sendSmtpEmail.sender = {"email": "teaminrealart@gmail.com"}
    const tpl_mail = mappingEmailTemplates[postData.templateName]['tpl']
    const subject_ = mappingEmailTemplates[postData.templateName]['subject']
    sendSmtpEmail.subject = mappingEmailTemplates[postData.templateName]['subject']
    //console.log('tpl_mail : ', tpl_mail)

    
    sendSmtpEmail.htmlContent = tpl_mail
    sendSmtpEmail.to = [{ "email": to}]

    //sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" }
    sendSmtpEmail.params = {"name": postData.params.name, "surname": postData.params.surname}


    try {
        const data : any = await apiInstance.sendTransacEmail(sendSmtpEmail)
        console.log('API called successfully. Returned data: ' + JSON.stringify(data))
        
    } catch (error) {
        console.error('BREVO ERROR', error)
        return NextResponse.json({
            mailSent: false
          })
    }
    const data : any = await apiInstance.sendTransacEmail(sendSmtpEmail)
    console.log('API called successfully. Returned data: ' + JSON.stringify(data))


    return NextResponse.json({
        mailSent: true
      })

    // console.log('Tentative envoi email ....')
    // apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data: any) {
    //     console.log('API called successfully. Returned data: ' + JSON.stringify(data))
    // }, function (error: any) {
    //     console.error('BREVO ERROR', error)
    // })

  
}
