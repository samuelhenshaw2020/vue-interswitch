

declare module "vue-interswitch" {

    export const isw: () => void;

    // export interface ISWPluginOptionsProps {
    //     disableAutoKobo?: boolean
    // }
    
    export interface ISWPluginPaymentOptionsProps  {
        merchantCode: string,
        payItemID: string,
        amount: number,
        customerEmail: string,
        mode: string,
        transactionReference: string,
    
        currency?: string,
        redirectURL?: string,
        customerName?: string,
        customerMobileNo?: string,
        customerID?: string,
        payItemName?: string,
    
        callback: Function,
    }
    
    
    // Web payment
    
    export interface PaymentOptionsProps  extends ISWPluginPaymentOptionsProps{
        text?: string
        debug?: boolean,
        disableAutoKobo?: boolean
    }
    
    
    export  type ModesType = "TEST" | "LIVE";
    
}