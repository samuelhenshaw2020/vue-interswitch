<template>
    <button @click="MakePayment" :disabled="!readyState">
        <slot>{{props.text}}</slot>
    </button>
</template>

<script lang="ts" setup>
    import {ref, onBeforeMount, toRefs, defineEmits } from "vue";
    import useScriptLoader from "./useScriptLoader";



    interface _Window extends Window {
        webpayCheckout(paymentOption: any): void
    }

    declare var window: _Window;

    interface PaymentOptions  {
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

         //Lib params
        text?: string
        debug?: boolean,
        disableAutoKobo?: boolean
    }

   

    const props = defineProps<PaymentOptions>();
    const paymentOptions = toRefs<PaymentOptions>(props);
    const readyState = ref<boolean>(false);
    const emit = defineEmits(["error"])
    
 
    function MakePayment(){

        if(!readyState.value){
            emit('error', "Payment not ready yet");
            return false;
        }

        const koboMultiple = (paymentOptions.disableAutoKobo.value === true ? 1 : 100);

        const _paymentOptions = {
            merchant_code: paymentOptions.merchantCode.value || "",
            pay_item_id: paymentOptions.payItemID.value || "",
            amount: paymentOptions.amount.value * koboMultiple,
            site_redirect_url: paymentOptions.redirectURL.value || "",
            onComplete: paymentOptions.callback.value,
            mode: paymentOptions.mode.value || 'TEST',
            txn_ref: paymentOptions.transactionReference.value,
            currency: paymentOptions.currency.value || 566,
            pay_item_name: paymentOptions.payItemName.value,
            cust_name: paymentOptions.customerName.value || '',
            cust_email: paymentOptions.customerEmail.value || "",
            cust_id: paymentOptions.customerID.value || "",
            cust_mobile_no: paymentOptions.customerMobileNo.value || ''
        }

        try {
          window.webpayCheckout(_paymentOptions);
        } catch (error) {
          emit('error', paymentOptions.debug.value == true ? error : "Payment failed! check network and try again"); 
        }
    }


    async function Initialize(){
        try {
            readyState.value =  await useScriptLoader(paymentOptions.mode.value);
        } catch (error) {
            readyState.value = false;
            emit('error', "Payment could not be initialized");
        }
    }


    onBeforeMount(() => {
        Initialize();
    });
    
</script>