import { CONFIRMATION_ACCOUNT_CREATION_SUBJECT } from "../constants";
import { templateMarkeplaceSignup, templateMarketplaceAccountCreationconfirmation } from "./templates";


export const mappingEmailTemplates = {
    'MarketplaceAccountCreationConfirmation': {
        subject: CONFIRMATION_ACCOUNT_CREATION_SUBJECT,
        tpl: templateMarketplaceAccountCreationconfirmation
    }
}