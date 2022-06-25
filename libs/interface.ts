

export enum Modes {
    TEST="TEST",
    LIVE="LIVE"
}

export interface _Window extends Window {
    webpayCheckout: (paymentOption: any)=> void
}
