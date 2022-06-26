<script lang="ts">
import Interswitch from '../libs';
import {defineComponent} from "vue"
export default defineComponent({
  components: {
    Interswitch
  },
  setup(){
    
    const onCallback = (response: any)=>{
      console.log(response)
    }

    const onError = (err: any) => {
      console.log(err)
    }

    return {onCallback, onError}
  }
});
</script>

<template>
  <main class="text-center">
      <h1 class="text-danger">Interswitch Payment </h1>
      <Interswitch  
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
        
    />
    
  </main>
</template>

