export const cart =[
    {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
    },{
        productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        },
    {
     productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
     quantity: 2,
    }
];

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