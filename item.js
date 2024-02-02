const carouselWrapper = document.getElementById("carousel-wrapper");
// console.log(carouselWrapper);

const carouselItemsData = [
    {
        id: "jfhgbvnscs1",
        name: "Teal Sweater",
        price: "45",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing.",
        image: "assets/product_01.jpg",
        imagehover: "assets/product_01b.jpg",
    },
    {
        id: "ioytrhndcv2",
        name: "Light Blue Sweater",
        price: "50",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing.",
        image: "assets/product_02.jpg",
        imagehover: "assets/product_02b.jpg",
    },
    {
        id: "wuefbncxbsn3",
        name: "Light Blue Shirt",
        price: "85",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing.",
        image: "assets/product_03.jpg",
        imagehover: "assets/product_03b.jpg",
    }, 
    {
        id: "thyfhcbcv4",
        name: "Grey Hoodie",
        price: "65",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing.",
        image: "assets/product_04.jpg",
        imagehover: "assets/product_04b.jpg",
    },
    {
        id: "thiecbawdjksadjk5",
        name: "Light Blue Hoodie",
        price: "70",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing.",
        image: "assets/product_05.jpg",
        imagehover: "assets/product_05b.jpg",
    },
    {
        id: "iuertrywebncdjksadjk6",
        name: "Brown Sweater",
        price: "35",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing.",
        image: "assets/product_06.jpg",
        imagehover: "assets/product_06b.jpg",
    },
    {
        id: "thierytbvcbvzdhadjk7",
        name: "Pink Hoodie",
        price: "60",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing.",
        image: "assets/product_07.jpg",
        imagehover: "assets/product_07b.jpg",
    }, 
    {
        id: "trfoiwfcnbcawdjksadjk8",
        name: "Red Sweater",
        price: "40",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing.",
        image: "assets/product_08.jpg",
        imagehover: "assets/product_08b.jpg",

    },
];

const basket = [];

const carouselItemLists = () => {
    return (carouselWrapper.innerHTML = carouselItemsData.map((x) => {
        let{id, name, price, image, imagehover} = x;
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
                        <div id=${id} class="item-quantity">0</div>
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

const increment = (id) => {
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
};

const decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);
    if (search === undefined) return;
    else if (search.item === 0) return;
    else {
        search.item -= 1;
    }
    // console.log(basket);
    update(selectedItem.id);
};

const update = (id) => {
    let search = basket.find((x)=>x.id === id);
    // console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
}