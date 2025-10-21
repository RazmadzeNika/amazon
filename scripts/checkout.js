import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import '../data/cart-class.js';
import {loadProductsFetch} from '../data/products.js';
// import '../data/backend-practice.js'
import {loadCartFetch} from '../data/cart.js';

//

async function loadPage() {
    try {
        await loadProductsFetch();

        await loadCartFetch();
    } catch (error) {
        console.log(error);
    }
    
    // await new Promise((resolve) => {
    //     loadCart(() => {
    //         resolve();
    //     })
    // })

    renderOrderSummary();
    renderPaymentSummary();
}

loadPage().then(() => {
})

// Promise.all([
//     loadProductsFetch(),
//     new Promise((resolve) => {
//         loadCart(() => {
//             resolve();
//         })
//     })
// ]).then(() => {
//     renderOrderSummary();
//     renderPaymentSummary()
// });

// new Promise((resolve) => {
//     loadProducts(() => {
//         resolve('value1')
//     });
// }).then((value) => {
//     console.log(value);
//     return new Promise((resolve) => {
//         loadCart(() => {
//             resolve();
//         })
//     }).then(() => {
//         renderOrderSummary();
//         renderPaymentSummary()
//     })
// })

// loadProducts(() => {
//     loadCart(() => {
//         renderOrderSummary();
//         renderPaymentSummary();
//     })
//
// });
