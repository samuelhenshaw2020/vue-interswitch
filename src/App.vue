<script lang="ts">
import Interswitch from '../libs';
import {defineComponent} from "vue"
export default defineComponent({
  components: {
    Interswitch
  },
  setup(){
    const onCallback = (response)=>{
      console.log(response)
    }

    const onError = (err) => {
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
        merchantCode='MX26070'
        payItemID='Default_Payable_MX26070'
        customerEmail='johndoe@gmail.com'
        redirectURL="http://localhost:3000"
        text="Pay Now"
        mode='TEST'
        :transactionReference="Date.now().toString()"
        :amount="10000"
        class="bg-danger btn"
        :callback="onCallback"
        @error="onError"
    />
    
  </main>
</template>

