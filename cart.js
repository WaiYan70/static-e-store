let shoppingCart = document.getElementById('shopping-cart');
// label
let shoppingCartTotal = document.getElementById('shopping-cart-total');

let basket = JSON.parse(localStorage.getItem("data")) || [];

console.log(basket);

let calculation = () => {
    let cartIcon = document.getElementById("item-counting-cart");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x,y) => x+y,0);
};
calculation();