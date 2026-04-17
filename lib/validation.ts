import { z } from "zod";

/** URL http/https uniquement (pas de javascript:, file:, data:). */
export const httpUrl = z
  .string()
  .trim()
  .max(2048)
  .refine(v => {
    try {
      const u = new URL(v);
      return u.protocol === "http:" || u.protocol === "https:";
    } catch {
      return false;
    }
  }, "URL invalide");

/** ID service JAP : entier positif. */
export const serviceId = z.number().int().positive();

/** Quantité positive (int). Accepte string aussi pour compat JSON lax. */
export const quantity = z.coerce.number().int().positive().max(10_000_000);

/** Email trimé. */
export const email = z.string().trim().toLowerCase().email("Format d'email invalide").max(254);

/** Mot de passe utilisateur : 8-128. */
export const userPassword = z.string().min(8, "Mot de passe trop court (min 8)").max(128);

/** Nom utilisateur : 1-100 après trim. */
export const userName = z.string().trim().min(1, "Nom requis").max(100);

export const cartItemSchema = z.object({
  serviceId,
  link: httpUrl,
  quantity,
});

export const cartCheckoutSchema = z.object({
  items: z.array(cartItemSchema).min(1, "Panier vide").max(10, "Maximum 10 articles par commande"),
  email: email.optional(),
});

export const singleOrderSchema = z.object({
  serviceId,
  link: httpUrl,
  quantity,
  email: email.optional(),
});

export const registerSchema = z.object({
  email,
  name: userName,
  password: userPassword,
});

export const loginSchema = z.object({
  email,
  password: z.string().min(1).max(128),
});

export const paymentIntentSchema = z.object({
  orderIds: z.array(z.string().min(1).max(64)).min(1).max(10),
});
