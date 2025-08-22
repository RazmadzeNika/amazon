import{cart,removeFromCart} from '/data/cart.js'
import{products} from '/data/products.js'
import{formatCurrency} from "./utils/money.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {deliveryOptions} from '/data/deliveryOptions.js';

const today = dayjs();
const deliveryDate = today.add(7,'days')
console.log(deliveryDate.format('dddd, MMMM D'));


let cartSummaryHTML ='';


cart.forEach((cartItem) => {
    const productId= cartItem.productId

    let matchingItem ;

    products.forEach((product) => {
        if (product.id === productId) {
            matchingItem = product;
        }
    })

    const deliveryOptionId=cartItem.deliveryOptionId;


    let deliveryOption;

    deliveryOptions.forEach((option) => {
        if (option.id === deliveryOptionId) {
            deliveryOption = option;
        }
    });

    const today = dayjs()
    const deliveryDate = today.add(
        deliveryOption.deliveryDays,
        'days'
    );
    const dateString = deliveryDate.format('dddd, MMMM D');

    cartSummaryHTML += `
          <div class="cart-item-container js-cart-item-container-${matchingItem.id}">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingItem.image}" alt="">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingItem.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(matchingItem.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-quantity-link"
                  data-product-id = "${matchingItem.id}">
                    <input class="quantity-input">
                    <span class="save-quantity-link link-primary">Save</span>
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link"
                  data-product-id="${matchingItem.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(matchingItem,cartItem)}
                  
              </div>
            </div>
          </div>
    
    `

    document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;
})



function deliveryOptionsHTML(matchingItem,cartItem) {
    let html = ''

    deliveryOptions.forEach((deliveryOption) => {
        const today = dayjs()
        const deliveryDate = today.add(
            deliveryOption.deliveryDays,
            'days'
        );
        const dateString = deliveryDate.format('dddd, MMMM D');
        const priceString = deliveryOption.priceCents===0
            ? 'FREE'
            :`$${formatCurrency(deliveryOption.priceCents)}`;

        const isChecked = deliveryOption.id === cartItem.deliveryOptionId

        html+=`<div class="delivery-option">
                  <input type="radio"
                  ${isChecked ? 'checked' : ''} 
                    class="delivery-option-input"
                    name="delivery-option-${matchingItem.id}">
                  <div>
                  <div class="delivery-option-date">
                      ${dateString}
                  </div>
                  <div class="delivery-option-price">
                      ${priceString} Shipping
                  </div>
          </div>
</div>`

    })
    return html;
}

document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        removeFromCart(productId);

        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.remove()
        updateCartQuantity()
    })
});

export function updateCartQuantity(){
    let quantity = 0;

    cart.forEach((cartItem) => {

        quantity += cartItem.quantity;
    })
    document.querySelector('.js-items-quantity').innerHTML = `${quantity} Items`;

}


updateCartQuantity();

document.querySelectorAll('.js-update-quantity-link').forEach((link) => {
    link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        console.log(productId);

        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.classList.add('is-editing-quantity');
    })
})
