let carouselWrapper = document.getElementById("carousel-wrapper");
// console.log(carouselWrapper);

let basket = JSON.parse(localStorage.getItem("data")) || [];

let carouselItemLists = () => {
    return (carouselWrapper.innerHTML = carouselItemsData.map((x) => {
        let{id, name, price, image, imagehover} = x;
        let search = basket.find((x) => x.id === id) || [];
        return `
            <div id=item-id-${id} class="item carousel-item swiper-slide">
                <div class="dot-image">
                    <a href="" class="product-permalink"></a>
                    <div class="thumbnail">
                        <img
                            src=${image}
                            loading="lazy"
                            alt=""
                        />
                    </div>
                    <div class="thumbnail hover">
                        <img
                            src=${imagehover}
                            alt=""
                        />
                    </div>
                    <div class="actions">
                        <ul>
                            <li>
                                <a href="">
                                    <i class="ri-star-line"></i>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <i class="ri-arrow-left-right-line"></i>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <i class="ri-eye-line"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="label">
                        <span>-25%</span>
                    </div>
                </div>
                <div class="dot-info">
                    <h2 class="dot-title">
                        <a href="">${name}</a>
                    </h2>
                    <div class="product-price">
                        <span class="before">$62.00</span>
                        <span class="current">$${price}</span>
                    </div>
                    <div class="item-control">
                        <i onclick="decrement(${id})" class="ri-subtract-fill"></i>
                        <div id=${id} class="item-quantity">
                            ${search.item === undefined ? 0 : search.item}
                        </div>
                        <i onclick="increment(${id})" class="ri-add-fill"></i>
                    </div>                
                </div>
            </div>
        `;
    }).join(""));
};
// let carouselWrapper = document.getElementById("carousel-wrapper");
// carouselWrapper.innerHTML = carouselItemLists();
// console.log(carouselItemLists());
carouselItemLists();

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
    localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
    let search = basket.find((x)=>x.id === id);
    // console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
}

let calculation = () => {
    let cartIcon = document.getElementById("item-counting-cart");
    // cartIcon.innerHTML = 100;
    // console.log(basket.map((x)=>x.item).reduce((x,y)=>x+y,0));
    cartIcon.innerHTML = basket.map((x)=>x.item).reduce((x,y)=>x+y,0);
}

calculation();