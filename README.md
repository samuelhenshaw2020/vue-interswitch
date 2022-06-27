# Interswitch for Vue 3.x

[![Issues](	https://img.shields.io/github/issues/samuelhenshaw2020/vue-interswitch)](https://github.com/samuelhenshaw2020/vue-interswitch/issues)
[![Forks](	https://img.shields.io/github/forks/samuelhenshaw2020/vue-interswitch)](https://github.com/samuelhenshaw2020/vue-interswitch/network/members)
[![Stars](	https://img.shields.io/github/stars/samuelhenshaw2020/vue-interswitch)](https://github.com/samuelhenshaw2020/vue-interswitch/stargazers)
[![Pull Request](https://img.shields.io/github/issues-pr/samuelhenshaw2020/vue-interswitch)](https://github.com/samuelhenshaw2020/vue-interswitch/stargazers)
[![Stats](https://img.shields.io/github/watchers/samuelhenshaw2020/vue-interswitch)](https://github.com/samuelhenshaw2020/vue-interswitch/stargazers)

> Interswitch community vue package that integrates with vue apps for Quickteller Business for recieve payments online.
> 
**Note**: You need a [Quickteller Business](https://business.quickteller.com) to obtain the required `code/keys`.


![](https://github.com/samuelhenshaw2020/vue-interswitch/blob/main/.images/interswitch.png?raw=true)

![](https://github.com/samuelhenshaw2020/vue-interswitch/blob/main/.images/vue-interswitch.png?raw=true)

## Installation
To install, run:
```bash
npm install vue-interswitch
```

## Usage
This package has two ways of integrating with vue project - as `component` and `plugin`

### As Component
Below are the various implementations using options or composition api


```js

// COMPOSITION API with defineComponent (Typescipt)
<script lang="ts">
import Interswitch from 'vue-interswitch';
import {defineComponent} from "vue"
export default defineComponent({
  components: {
    Interswitch
  },
  setup(){
    
    const onCallback = (response)=>{
      console.log(response)
    }
    return {onCallback}
  }
});
</script>

// COMPOSITION API 2 (Typescipt)

<script lang="ts" setup>
    import Interswitch from 'vue-interswitch';
    const onCallback = (response)=>{
      console.log(response)
    }
  
</script>

// OPTIONS API

<script>
    import Interswitch from 'vue-interswitch';
    export default {
        components: {
            Interswitch
        },
        methods: {
            onCallback(response){
                console.log(response)
            }
        }
    }
</script>


```

The template will look as seen below

```js
<template>
  <main>
      <Interswitch  
        merchantCode='MX#####'
        payItemID='Default_Payable_MX#####'
        customerEmail='johndoe@gmail.com'
        redirectURL="http://localhost:3000"
        text="Pay Now"
        mode='TEST'
        :transactionReference="Date.now().toString()" 
        :amount="100" 
        class="custom, bootstrap or tailwind class here"
        :callback="onCallback"
    />
  </main>
  // Note that amount should be the actuall amount, assen if payment is 1,000 enter 1000 as the amount, the module automatically multiplies the amount by 100 so as to meet the requirement of "amount should be in kobo"


</template> 
```



## Handle Error Event
To handle errors, an event is emitted when there is an error, hence binding an `function` to handle the error and get the error message or error stack trace (for `debug=true` mode only). Below is a guide


**Note**: to get dev level error with stack trace set `debug=true` on the `<Interswitch :debug="true" />` component then bind a function to the emitter event 

```js
    /**
     * In your template
     * debug=true mode is not needed for production
     * the error message is automatically 
     * "Payment failed! check network and try again"
     * 
     * */
    <Interswitch :debug="true" @error="onError" />

    //within your script
    const onError = (err) => { //composition api
      console.log(err)
    }

    //do accordingly for options api

```


### As Plugin

`vue-interswitch` package exposes a plugin `isw`. The plugin can be imported in `main.(ts|js) ` as seen below

```js
import { createApp } from 'vue'
import App from './App.vue';
import {isw} from "vue-interswitch"; // here

const app = createApp(App);
app.use(isw) //here 

app.mount('#app')


```
According to [vue documentation](https://vuejs.org/guide/reusability/plugins.html#writing-a-plugin) when creating custom plugin, they have to be provided with `app.provide(key, value)` and then injected into app component using `inject(key)`, hence, in your component inject `iswcheckout`. see below

```js
<script setup lang="ts">
import { inject } from 'vue'

// make sure to cast iswcheckout as any to avoid 'This expression is not callable' error
const iswcheckout: any = inject('iswcheckout')

const MakePayment = () => {
  const props = {
      merchantCode: 'MX#####',
      payItemID: 'Default_Payable_MX#####',
      customerEmail: 'johndoe@gmail.com',
      redirectURL: 'http://localhost:3000',
      text: 'Pay Now',
      mode: 'TEST',
      transactionReference: Date.now().toString(),
      amount: 100, //there is no automatic multiplication here.....manually multiply amount with 100
      callback: (response: any) => {
        console.log('response: ', response)
      }
  }

  iswcheckout(props)
}
</script>

```


**Note:**
 - `debug=true` is not needed for `production` as `debug` is automatically false if not included.
 - **merchantCode** and **payItemID** can be gotten on your [Quickteller Business dashboard](https://business.quickteller.com/developertools)
 - **amount** must be in kobo **`Hence, that has been handled (with exception of the plugin approach), every amount provided is automatically multiplied by 100 within library logic`**



## Parameters
Below is a list of all the Interswitch official supported parameters.

| Parameters           | Data Type                 | Required | Description                                                                                                                                                                                                                                         |
|----------------------|---------------------------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| merchantCode         | string                   | true     | This can be found on your dashboard.
| payItemID            | string                   |  true    | This can be found on your dashboard.
| customerEmail        | string                   | true     | The email of the person making the payment.                                                                                                                                                                                                         |
| amount               | string                    | true     | The cost of the item being paid for in kobo.                                                                                                                                                                                                        |
| transactionReference | string                    | true    | This is a unique reference string required for every transaction. You can create a method to generate this. |
| text      | string                    |  true   |  This represents the text on the payment button.
| mode      | string                    | true    | This represents your integration mode. It can be 'TEST' or 'LIVE'.
| callback  | function                  | true    | This function is called after every transaction.
| redirectURL | string                  | false   | The url you want the user to be redirected to after a transaction.
| currency             | string                    | false    | The ISO code of the currency being used. If this field is not added, the currency naira is assumed.                                                                                                                                                 |
| customerName         | string                    | false    | The name of the person making the payment.                                                                                                                                                                                                          |
| customerID           | string                    | false    | The ID of the person making the payment.                                                                                                                                                                                                            |
| customerMobileNo           | string                    | false    | The mobile number of the person making the payment.                                                                                                                                                                                                            |
|payItemName            | string                    | false   | The name of the item being paid for. |                                                                                   |                                                                                     |
| className             | string                    | false   | You can use this to add a CSS class to the payment button.
|  style                | object                    | false    | You can use this to add inline styles to the payment button.


## Response Sample

After a transaction, a sample response from the callback function will be like so:
```js
{
    bpTrxnRef: "",
    bpResp: "",
    rechPin: "",
    amount: 10000,
    apprAmt: 10000,
    cardNum: "",
    desc: "Approved by Financial Institution",
    mac: "",
    payRef: "FBN|WEB|MX26070|13-04-2021|3512130|866194",
    resp: "00",
    retRef: "000106923853",
    txnref: "1618305656700",
    url: "http://localhost:3000",
}
```

if within your response, `desc` messsage reads `MERCHANT_OR_PAYMENT_ITEM_DOES_NOT_EXIST` and other fields shows `undefined` it implies information supplied might not be correct.


## Extra Library Parameters
Below is a list of all the Interswitch official supported parameters.

| Parameters           | Data Type                 | Required | Description                                                                                                                                                                                                                                         |
|----------------------|---------------------------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| text         | string                   | true     | It specifies the text to display on the button.
| debug        | boolean                  | false    | Helps to show raw stack trace error for development purposes
| disableAutoKobo         |  boolean       | false    | it is optional and it specifies if automatic multiplication of `amount` should apply or note. It is `false` by default. setting `disableAutoKobo=true` will allow developer to manually multiply `amount` with 100  for kobo

**NOTE:**
The key 'resp' gives the final status of the transaction.  
There are quite a number of response codes that can be returned, the full list can be viewed [here](https://sandbox.interswitchng.com/docbase/docs/webpay/response-codes/)

## - Handling the Response 
For integrity purpose, you are advised to make a server side request to get the final status of a transaction before giving value.
To do this, make a post request to the endpoint below:
##### Test mode: #####
https://qa.interswitchng.com/collections/api/v1/gettransaction.json?merchantcode={MERCHANT_CODE}&transactionreference={TRANSACTION_REFERENCE}&amount={AMOUNT_IN_KOBO}
##### Live mode: #####
https://webpay.interswitchng.com/collections/api/v1/gettransaction.json?merchantcode={MERCHANT_CODE}&transactionreference={TRANSACTION_REFERENCE}&amount={AMOUNT_IN_KOBO}



 ## License 
The MIT License (MIT). Please see [License File](LICENSE.md) for more information.