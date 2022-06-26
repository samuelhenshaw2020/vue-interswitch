

/**
 * @desciption Loads the script necessary for payment to be initialized
 * @param {string} mode Payment mode can be TEST for development or LIVE for production
 * @param callback with two parameter @param {Error} err and @param {boolean} status
 */

 export enum Modes {
    TEST="TEST",
    LIVE="LIVE"
}

const scriptLoader =  (mode: string): Promise<boolean> =>{
    return new Promise((resolve, reject) => {
        const script = document.createElement('script')

        script.src = (
            mode == Modes.TEST 
            ? "https://webpay-ui.k8.isw.la/inline-checkout.js"
            : "https://newwebpay.interswitchng.com/inline-checkout.js"
        );

        script.async = true;
    
        document.getElementsByTagName("head")[0].appendChild(script)

        const onLoad = () => {
            script.removeEventListener('load', onLoad); //clean up
            resolve(true)
        }
        script.addEventListener('load',  onLoad);

        const onError = (err) => {
            script.removeEventListener('error', onError); //clean up
            reject(err)
        }
        script.addEventListener('error', onError)
       
    });
}

export default scriptLoader;