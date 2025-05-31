//Add other values with '|' if needed
export type MailTemplate = 'MarketplaceAccountCreationConfirmation' | 'PasswordReset'

export type PostDataSingleMailingParams = {
  name: string,
  surname?: string,
  resetUrl?: string
}
export type PostDataSingleMailing = {
  to: string
  params: PostDataSingleMailingParams
  templateName: MailTemplate
}
