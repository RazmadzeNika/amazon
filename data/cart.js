export const cart =[];

export function addToCart(productId){
    let matchingItem
    let selectorValue= document.querySelector(`.js-quantity-selector-${productId}`).value

    cart.forEach((item)=>{
        if (productId === item.productId) {
            matchingItem = item
        }
    })
    if (matchingItem) {
        matchingItem.quantity += Number(selectorValue)
    }else{
        cart.push({
            productId,
            quantity: Number(selectorValue),
        })
    }

    let cartQuantity = 0

    cart.forEach((item)=>{
        cartQuantity+=item.quantity;
    })
    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity
    console.log(cart);
}