import { CONFIRMATION_ACCOUNT_CREATION_SUBJECT, PASSWORD_RESET_SUBJECT } from "../constants";
import { templateMarkeplaceSignup, templateMarketplaceAccountCreationconfirmation, templatePasswordReset } from "./templates";


export const mappingEmailTemplates = {
    'MarketplaceAccountCreationConfirmation': {
        subject: CONFIRMATION_ACCOUNT_CREATION_SUBJECT,
        tpl: templateMarketplaceAccountCreationconfirmation
    },
    'PasswordReset': {
        subject: PASSWORD_RESET_SUBJECT,
        tpl: templatePasswordReset
    }
}