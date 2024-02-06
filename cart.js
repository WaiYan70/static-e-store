let shoppingCart = document.getElementById('shopping-cart');
// label
let shoppingCartTotal = document.getElementById('shopping-cart-total');

let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
    let cartIcon = document.getElementById("item-counting-cart");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x,y) => x+y,0);
};
calculation();

let generateCartItems = () => {
    if (basket.length !== 0) {
        return(shoppingCart.innerHTML = basket.map((x)=>{
            let { id, item } = x;
            let search = carouselItemsData.find((y) => y.id === id) || [];
            let {image, name, price} = search;
            return `
                <div class="product-list has-bg">
                    <div class="table-title">
                        <ul>
                            <li class="dotgrid">
                                <div class="grouping wrapper">
                                    <span></span>
                                    <span>Product Name</span>
                                </div>
                                <div class="grouping wrapper">
                                    <span>Price</span>
                                    <span>Qty</span>
                                    <span>Total</span>
                                    <span></span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="table-content">
                        <ul>
                            <li class="dotgrid">
                                <div class="grouping wrapper">
                                    <div class="thumbnail ob-cover">
                                        <a href="">
                                            <img src=${image} alt="">
                                        </a>
                                    </div>
                                    <div class="variants">
                                        <h4 class="dot-title">
                                            ${name}
                                        </h4>
                                        <div class="color grey-color">
                                            <span>Color:</span>
                                            <span>Tosca</span>
                                        </div>
                                        <div class="size grey-color">
                                            <span>Size:</span>
                                            <span>L</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="grouping wrapper">    
                                    <div class="price">$ ${price}</div>
                                    <div class="quantity">
                                        <div class="control">
                                            <button><i onclick="decrement(${id})" class="ri-subtract-fill"></i></button>
                                            <input type="text" id=${id} value="${item}">
                                            <button><i onclick="increment(${id})" class="ri-add-fill"></i></button>
                                        </div>
                                    </div>
                                    <div class="price-sub">$ ${item * price}</div>
                                    <span class="item-remove">
                                        <i onclick="removeItem(${id})" class="ri-close-line"></i>
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            `
        }).join(""));
    } else {
        shoppingCart.innerHTML = ``;
        shoppingCartTotal.innerHTML = `
            <div class="cartEmpty">
                <h2> Cart is Empty</h2>
                <a href = "index.html">
                    <button class="backHomeBtn">Back to Home</button>
                </a>
            </div>
            
        `;
    }
};

generateCartItems();


let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);
    if (search === undefined) {
        basket.push({
            id: selectedItem.id,
            item: 1,
        });
    } else {
        search.item += 1;
    }
    generateCartItems();
    // console.log(basket);
    update(selectedItem.id);
    localStorage.setItem("data", JSON.stringify(basket));
};

let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);
    if (search === undefined) return;
    else if (search.item === 0) return;
    else {
        search.item -= 1;
    }
    // console.log(basket);
    update(selectedItem.id); 
    basket = basket.filter((x) => x.item !== 0);
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
    let search = basket.find((x)=>x.id === id);
    // console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
    TotalAmount();
};

let removeItem = (id) => {
    let selectedItem = id;
    basket = basket.filter((x) => x.id !== selectedItem.id);
    generateCartItems();
    TotalAmount();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
};

let clearCart = () => {
    basket = [];
    generateCartItems();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
};

let TotalAmount = () => {
    if(basket.length !== 0){
        let amount = basket.map((x) => {
            let {id, item} = x;
            let search = carouselItemsData.find((y) => y.id === id) || [];

            return item * search.price;
        }).reduce((x,y) => x + y, 0);
    // console.log(amount);
        shoppingCartTotal.innerHTML = `
            <div class="product-list has-bg">
                <div class="grouping">
                <div class="add-note">
                    <textarea rows="3" placeholder="Additional note +"></textarea>
                </div>
                <div class="sub-total">
                    <div class="sub-pricing">
                        <span>Subtotal : </span>
                        <span class="sub-total-price">$ ${amount}</span>
                    </div>
                    <div class="sub-terms">
                        <input type="checkbox" class="checker" id="terms">
                        <label for="terms">I agree to <a href="" class="grey-link">Terms & Conditions</a></label>
                    </div>
                    <div class="button">
                        <a href="page-checkout.html">
                            <button class="secondary-btn go-checkout-btn">Checkout</button>
                        </a>  
                    </div>
                    <div class="button">
                        <button onclick="clearCart()" class="secondary-btn clear-cart-btn">Clear Cart</button>
                    </div>
                </div>
                </div>
            </div>
        `;
    } else return;
};

TotalAmount();