import {Modes} from "./interface";

/**
 * @desciption Loads the script necessary for payment to be initialized
 * @param {string} mode Payment mode can be TEST for development or LIVE for production
 * @param callback with two parameter @param {Error} err and @param {boolean} status
 */

const scriptLoader =  (mode: string, callback: Function): void =>{
    const script = document.createElement('script')

    script.src = (
        mode == Modes.TEST 
        ? "https://webpay-ui.k8.isw.la/inline-checkout.js"
        : "https://newwebpay.interswitchng.com/inline-checkout.js"
    );
    script.async = true

    document.getElementsByTagName("head")[0].appendChild(script)

    script.addEventListener('load', () => {
        callback(null, true)
    });

    script.addEventListener('error', (err) => {
        callback(err, false)
    });
}

export default scriptLoader;