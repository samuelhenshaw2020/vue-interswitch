declare module "Interswitch" {

    interface ISWPluginOptionsProps {
        disableAutoKobo?: boolean
    }
    const ISWPluginOptions:   ISWPluginOptionsProps

    

    interface ISWPluginPaymentOptionsProps  {
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
    const ISWPaymentOptions: ISWPluginPaymentOptionsProps;


    // Web payment

    interface PaymentOptionsProps  extends ISWPluginPaymentOptionsProps{
        text?: string
        debug?: boolean,
        disableAutoKobo?: boolean
    }
    const PaymentOptions: PaymentOptionsProps;


    type ModesType = "TEST" | "LIVE";
    

    
   


    export {
        ISWPluginOptions,
        ISWPaymentOptions,
        PaymentOptions,
        ModesType
    }
    
}