<template>
    <button @click="MakePayment" :disabled="!readyState">
        <slot>{{props.text}}</slot>
    </button>
</template>

<script lang="ts" setup>
    import {ref, onBeforeMount, toRefs, defineEmits } from "vue";
    import useScriptLoader from "./isw-loader";
    import {_window} from './interface'

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
    const paymentOptions = ref<PaymentOptions>({
            merchantCode: "string",
            payItemID: "",
            amount: 0,
            redirectURL: "",
            callback: null,
            mode: "TEST",
            transactionReference: "",
            currency: "566",
            customerEmail: "",
            payItemName: "",
            customerName: "",
            customerMobileNo: "",
            disableAutoKobo: true,
            debug: false
    });
    const readyState = ref<boolean>(false);
    const emit = defineEmits(["error"])
    
 
    function MakePayment(){

        if(!readyState.value){
            emit('error', "Payment not ready yet");
            return false;
        }

        const koboMultiple = (paymentOptions.value.disableAutoKobo === true ? 1 : 100);

        const _paymentOptions = {
            merchant_code: paymentOptions?.value.merchantCode || "",
            pay_item_id: paymentOptions?.value.payItemID || "",
            amount: paymentOptions?.value.amount * koboMultiple,
            site_redirect_url: paymentOptions?.value.redirectURL || "",
            onComplete: paymentOptions?.value.callback,
            mode: paymentOptions.value.mode || 'TEST',
            txn_ref: paymentOptions.value.transactionReference,
            currency: paymentOptions.value.currency,
            pay_item_name: paymentOptions.value.payItemName,
            cust_name: paymentOptions.value.customerName || '',
            cust_email: paymentOptions.value.customerEmail || "",
            cust_id: paymentOptions.value.customerID || "",
            cust_mobile_no: paymentOptions.value.customerMobileNo || ''
        }

        try {
          _window.webpayCheckout(_paymentOptions);
        } catch (error) {
          emit('error', paymentOptions.value.debug == true ? error : "Payment failed! check network and try again"); 
        }
    }


    async function Initialize(){
        try {
            readyState.value =  await useScriptLoader(paymentOptions.value.mode);
        } catch (error) {
            readyState.value = false;
            emit('error', "Payment could not be initialized");
        }
    }


    onBeforeMount(() => {
        Initialize();
    });
    
</script>