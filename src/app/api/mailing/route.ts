import { NextResponse } from "next/server";
import { PostDataSingleMailing } from "@/types_mailing";
import { mappingEmailTemplates } from "@/lib/brevo/templates/mapping";

// Déclaration des types nécessaires
interface BrevoApiInstance {
    authentications: {
        apiKey: {
            apiKey: string
        }
    }
    sendTransacEmail(sendSmtpEmail: any): Promise<any>
}

interface BrevoEmailData {
    sender?: { email: string; name?: string }
    to?: Array<{ email: string; name?: string }>
    subject?: string
    htmlContent?: string
    params?: Record<string, any>
}

export async function POST(request: Request) {
    try {
        // Vérifier que la clé API est présente
        const apiKeyValue = process.env.BREVO_API_KEY
        if (!apiKeyValue) {
            console.error('BREVO_API_KEY is not defined in environment variables')
            return NextResponse.json({
                mailSent: false,
                error: 'API key not configured'
            }, { status: 500 })
        }

        // Utilisation de require dynamique pour éviter les problèmes d'ESM
        const brevo = eval('require')('@getbrevo/brevo')

        const apiInstance: BrevoApiInstance = new brevo.TransactionalEmailsApi()
        const apiKey = apiInstance.authentications['apiKey']
        apiKey.apiKey = apiKeyValue

        const postData: PostDataSingleMailing = await request.json();
        const { to, templateName } = postData;

        console.log("to,templateName", to, templateName)

        const sendSmtpEmail: BrevoEmailData = new brevo.SendSmtpEmail()
        sendSmtpEmail.sender = { "email": "teaminrealart@gmail.com" }

        const tpl_mail = mappingEmailTemplates[postData.templateName]['tpl']
        const subject_ = mappingEmailTemplates[postData.templateName]['subject']

        sendSmtpEmail.subject = subject_
        sendSmtpEmail.htmlContent = tpl_mail
        sendSmtpEmail.to = [{ "email": to }]
        sendSmtpEmail.params = { "name": postData.params.name, "surname": postData.params.surname }

        const data = await apiInstance.sendTransacEmail(sendSmtpEmail)
        console.log('API called successfully. Returned data: ' + JSON.stringify(data))

        return NextResponse.json({
            mailSent: true
        })

    } catch (error) {
        console.error('BREVO ERROR', error)
        return NextResponse.json({
            mailSent: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 })
    }
}
