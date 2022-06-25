<template>
    <button @click="initPayment">
        <slot>{{props.text}}</slot>
    </button>
</template>

<script lang="ts" setup>
    import {ref, defineProps, onBeforeMount, toRefs, onUnmounted, onMounted, defineEmits} from "vue";
    import { _Window} from "./interface"
    import scriptLoader from "./scriptLoader";


    var window: _Window;

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

        text?: string

        debug?: boolean,

    }

    const props = defineProps<PaymentOptions>();
    const paymentOptions = toRefs<PaymentOptions>(props);
    const loadstate = ref<{loaded: boolean}>({loaded: false});
    const emit = defineEmits(["error"])
    
 
    const initPayment = async () =>  {

        if(!loadstate.value.loaded){
            return;
        }

        const _paymentOptions = {
            merchant_code: paymentOptions.merchantCode.value || "",
            pay_item_id: paymentOptions.payItemID.value || "",
            amount: paymentOptions.amount.value,
            site_redirect_url: paymentOptions.redirectURL.value || "",
            onComplete: paymentOptions.callback.value,
            mode: paymentOptions.mode.value || 'TEST',
            txn_ref: paymentOptions.transactionReference.value,
            currency: paymentOptions.currency.value || '566',
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


    onBeforeMount(() => {
        scriptLoader(paymentOptions.mode.value, (err: any, status: boolean) =>{
            if(err) throw new Error("Payment script load failed")
            loadstate.value.loaded = status;
        });
    })

    onMounted(() => {
        console.log(paymentOptions.text.value)
    })

    onUnmounted(() => {
      
    })

    
</script>

<style>
  
</style>
