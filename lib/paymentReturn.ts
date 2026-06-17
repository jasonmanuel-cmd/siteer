export const PAYMENT_RETURN_STORAGE_KEY = "siteer:payment-return";

export type PaymentReturnState = {
    reportToken: string;
    email: string;
    confirmToken: string;
};
