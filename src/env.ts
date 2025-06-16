import { z } from "zod";

const envSchema = z.object({
  COMPANY_NAME: z.string(),
  TWITTER_CREATOR: z.string(),
  TWITTER_SITE: z.string(),
  SITE_NAME: z.string(),
  SHOPIFY_REVALIDATION_SECRET: z.string(),
  SHOPIFY_STOREFRONT_ACCESS_TOKEN: z.string(),
  SHOPIFY_STORE_DOMAIN: z.string(),
  // UPS API Configuration
  UPS_CLIENT_ID: z.string(),
  UPS_CLIENT_SECRET: z.string(),
  UPS_ACCOUNT_NUMBER: z.string(),
  UPS_API_BASE_URL: z.string().optional(),
});

envSchema.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> { }
  }
}