import useScriptLoader from "./isw-loader";

interface _Window extends Window {
    webpayCheckout(paymentOption: any): void
}



interface ISWPluginPaymentOptions  {
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

declare var window: _Window;


export default {
    /**
     * 
     * @param {any} app Vue app context
     * @param {never} options No options is required
     */
    install(app: any, options: any){
        const iswcheckout = async (paymentOptions: ISWPluginPaymentOptions) => {
            return new Promise(async (resolve, reject) => {
                try {

                    await useScriptLoader(paymentOptions.mode);

                    const _paymentOptions = {
                        merchant_code: paymentOptions.merchantCode || "",
                        pay_item_id: paymentOptions.payItemID || "",
                        amount: paymentOptions.amount,
                        site_redirect_url: paymentOptions.redirectURL || "",
                        onComplete: paymentOptions.callback,
                        mode: paymentOptions.mode || 'TEST',
                        txn_ref: paymentOptions.transactionReference,
                        currency: paymentOptions.currency || 566,
                        pay_item_name: paymentOptions.payItemName,
                        cust_name: paymentOptions.customerName || '',
                        cust_email: paymentOptions.customerEmail || "",
                        cust_id: paymentOptions.customerID || "",
                        cust_mobile_no: paymentOptions.customerMobileNo || ''
                    }
    
                    window.webpayCheckout(_paymentOptions);

                    resolve(true);
                  } catch (error: any) {
                    reject(error);
                  }
            })
        } 

        app.config.globalProperties.$isw = iswcheckout;
        app.provide("iswcheckout", iswcheckout);
    }
}
