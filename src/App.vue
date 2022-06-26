<script lang="ts">
// import Interswitch from '../libs';
import {defineComponent, inject} from "vue"
export default defineComponent({
  components: {
    // Interswitch
  },
  setup(){
    
    const onCallback = (response: any)=>{
      console.log(response)
    }

    const onError = (err: any) => {
      console.log(err)
    }

    const props = {
    merchantCode: 'MX93271',
    payItemID: 'Default_Payable_MX93271',
    customerEmail: 'samuelhenshaw2021@gmail.com',
    redirectURL: 'http://localhost:3000',
    text: 'Pay Now',
    mode: 'TEST',
    transactionReference: Date.now().toString(),
    amount: 100,
    callback: (response: any) => {
      console.log('response: ', response)
    }
    }

    // const {iswCheckout}: any = inject("iswCheckout")
    const Paynow = () => {
      // iswCheckout(props)
    }

    
    return {onCallback, onError,Paynow,}
  }
});
</script>

<template>
  <main class="text-center">
      <h1 class="text-danger">Interswitch Payment </h1>
      <!-- <Interswitch  
        merchantCode='MX93271'
        payItemID='Default_Payable_MX93271'
        customerEmail='samuelhenshaw2021@gmail.com'
        redirectURL="http://localhost:3000"
        text="Pay Now"
        mode='TEST'
        :transactionReference="Date.now().toString()"
        :amount="100"
        currency="566"
        class="bg-danger btn"
        :callback="onCallback"
        @error="onError"
        
    /> -->

    <!-- <button @click="Paynow">pay now</button> -->
    
  </main>
</template>

