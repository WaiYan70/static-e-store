const triggerOpen = document.querySelectorAll('[data-trigger-button]');
const triggerClose = document.querySelectorAll('[data-close-button]');
const overlay = document.querySelector('[data-overlay]');
const searchItems = document.querySelector('[data-search-items]');

for(let i = 0; i < triggerOpen.length;i++){
    let currentId = triggerOpen[i].dataset.target;
    let targetEl = document.querySelector(`#${currentId}`);

    const openData = function(){
        targetEl.classList.remove('active');
        overlay.classList.remove('active');
        searchItems.classList.remove('active');
        console.log("remove active");
    };
    triggerOpen[i].addEventListener('click', function(){
        targetEl.classList.add('active');
        overlay.classList.add('active');
        searchItems.classList.add('active');
        console.log("add active");
    });

    targetEl.querySelector('[data-close-button]').addEventListener('click', openData);
    overlay.addEventListener('click', openData);
    searchItems.addEventListener('click', openData);
}

const triggerOpenCart = document.querySelectorAll('[data-trigger-button-cart]');

for(let i = 0; i < triggerOpenCart.length;i++){
    let currentId = triggerOpenCart[i].dataset.target;
    let targetEl = document.querySelector(`#${currentId}`);

    const openData = function(){
        targetEl.classList.remove('active');
        overlay.classList.remove('active');
    };
    triggerOpenCart[i].addEventListener('click', function(){
        targetEl.classList.add('active');
        overlay.classList.add('active');
    });

    targetEl.querySelector('[data-close-button]').addEventListener('click', openData);
    overlay.addEventListener('click', openData);
}

// Mobile - submenu 
const submenu = document.querySelectorAll('.child-trigger');
submenu.forEach((menu) => menu.addEventListener('click', function(e){
    e.preventDefault();
    submenu.forEach((item)=> item != this ? item.closest('.has-child').classList.remove('active') : null);
    if (this.closest('.has-child').classList != 'active') {
        this.closest('.has-child').classList.toggle('active');
    }
}))

// sorter (sorting categories {Sweater, Hoodie and Shirt})
const sorter = document.querySelector('.sort-list');
if(sorter){
    const sortLi = sorter.querySelectorAll('li');
    sorter.querySelector('.opt-trigger').addEventListener('click', function(){
        sorter.querySelector('ul').classList.toggle('show');
    });
    sortLi.forEach((item)=>item.addEventListener('click', function(){
        sortLi.forEach((li)=> li != this ? li.classList.remove('active'):null);
        this.classList.add('active');
        sorter.querySelector('.opt-trigger span.value').textContent = this.textContent;
        sorter.querySelector('ul').classList.toggle('show')
    }));
}

// tabbed in index/product-single page 
// changing the text when click on the button/ name
const trigger = document.querySelectorAll('.tabbed-trigger');
const content = document.querySelectorAll('.tabbed > div');
trigger.forEach((btn) => {
    btn.addEventListener('click', function(){
        let dataTarget = this.dataset.id;
        let body = document.querySelector(`#${dataTarget}`);

        trigger.forEach((b) => b.parentNode.classList.remove('active'));
        content.forEach((s) => s.classList.remove('active'));
        this.parentNode.classList.add('active');
        // this.parentElement.classList.add('active');
        body.classList.add('active');
    });
});

// Filtering in Product Category Page
const filterList = document.querySelector(".filter-list");
const filterButtons = document.querySelectorAll(".filter-btn");
const itemCategory = document.querySelectorAll(".item-category");


let itemIndex = 0;
itemCategory.forEach((itemEach) =>{
    itemEach.style.viewTransitionName = `item-${++itemIndex}`;
})

filterButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        const filter = e.target.getAttribute('data-filter');
        if(!document.startViewTransition) {
            // check the active button
            updateActiveButton(e.target);
            // filter the list
            filterItems(filter);
        };
        document.startViewTransition(() => {
            // check the active button
            updateActiveButton(e.target);
            // filter the list
            filterItems(filter);
        });
    })
});

function updateActiveButton(newButton){
    filterList.querySelector('.active').classList.remove('active');
    newButton.classList.add('active');
}

function filterItems(itemFilter){
    // get each item category
    // check if that category matches the filter 
    // if it matches, show that relative items' category
    // if not, hide other items' category
    itemCategory.forEach((item)=>{
        const itemCate = item.getAttribute('data-category');
        if(itemFilter === 'all' || itemFilter === itemCate){
            item.removeAttribute('hidden');
        } else{
            item.setAttribute('hidden','');
        }
    });
}

// // Filtering in Product Category Page
// // const filterButtons = document.querySelectorAll(".filter-btn");
// // const itemCategory = document.querySelectorAll(".item-category");
// const btns = document.querySelectorAll(".filter-btn");
// const imgs = document.querySelectorAll(".item-category");

// // add a click event to all buttons
// for(let i = 1; i < btns.length; i++){
//     btns[i].addEventListener('click', filterImg);
// }

// // set active button on click
// function setActiveBtn(e){
//     //Remove active class from all buttons
//     btns.forEach(btn => {
//         btn.classList.remove('btn-clicked');
//     });
//     //Add active class to clicked button
//     e.target.classList.add('btn-clicked');
// }

// //Filter Images
// function filterImg(e){
//     // Run the active button function
//     setActiveBtn(e);
//     //loop through all images
//     imgs.forEach(img => {
//         //Expand all images
//         img.classList.remove('img-shrink');
//         img.classList.add('img-expand');

//         //Get data from  data attributes
//         //Get image type data
//         const imgType = parseInt(img.dataset.img);
//         //Get button type data
//         const btnType = parseInt(e.target.dataset.btn);
//         // If the image type and the type of the clicked button are not same
//         if(imgType !== btnType){
//             //hide the image
//             img.classList.remove('img-expand');
//             img.classList.add('img-shrink');
//         }
//     });
// }

// //Set click event for the 'All' button
// btns[0].addEventListener('click', (e) => {
//     //Run the active button function
//     setActiveBtn(e);
//     //Loop through all images
//     imgs.forEach(img => {
//         //Expand all images
//         img.classList.remove('img-shrink');
//         img.classList.add('img-expand');
//     });
// });

// Scrolling Animations in Sections on Home Page
const observer = new IntersectionObserver((entries) =>{
    entries.forEach((entry) => {
        if(entry.isIntersecting){
            entry.target.classList.add('show-section');
        } else{
            entry.target.classList.remove('show-section');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden-section');
hiddenElements.forEach((el) => observer.observe(el));

// Scrolling Animations for Header Text in Sections on Home Page
const observerText = new IntersectionObserver((entries) =>{
    entries.forEach((entry) => {
        if(entry.isIntersecting){
            entry.target.classList.add('show-text');
        } else{
            entry.target.classList.remove('show-text');
        }
    });
});

const hiddenTextElements = document.querySelectorAll('.hidden-text');
hiddenTextElements.forEach((el) => observerText.observe(el));

// Scrolling Animations for each Items in Guide/Blog Sections on Home Page
const observerItem = new IntersectionObserver((entries) =>{
    entries.forEach((entry) => {
        if(entry.isIntersecting){
            entry.target.classList.add('show-item');
        } else{
            entry.target.classList.remove('show-item');
        }
    });
});

const hiddenItemElements = document.querySelectorAll('.hidden-item');
hiddenItemElements.forEach((el) => observerItem.observe(el));


// Scrolling Animation in Footer
const observerFooter = new IntersectionObserver((entries) =>{
    entries.forEach((entry) => {
        if(entry.isIntersecting){
            entry.target.classList.add('show-footer-left');
            entry.target.classList.add('show-footer-bottom');
        } else{
            entry.target.classList.remove('show-footer-left');
            entry.target.classList.remove('show-footer-bottom');
        }
    });
},{
    // threshold: 0,
    rootMargin: "70px",
});

const hiddenFooterTopLeftElements = document.querySelectorAll('.hidden-footer-left');
hiddenFooterTopLeftElements.forEach((el) => observerFooter.observe(el));
const hiddenFooterBottomElements = document.querySelectorAll('.hidden-footer-bottom');
hiddenFooterBottomElements.forEach((el) => observerFooter.observe(el));

// Hero Image Slider Section - 1
const swiper = new Swiper('.sliderbox', {
    loop: true,
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    autoHeight: true,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
});

// Carousel Slider
const caurosel = new Swiper('.carouselbox', {
    spaceBetween: 30,
    slidesPerView: 'auto',
    centeredSlides: true,
  
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    
    breakpoints:{
        481: {
            slidesPerView: 2,
            slidesPerGroup: 1,
            centeredSlides: false,
        },
        640: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            centeredSlides: false,
        },
        992: {
            slidesPerView: 4,
            slidesPerGroup: 4,
            centeredSlides: false,
        }
    }
});

// product image > page-single
const thumbImage = new Swiper('.thumbnail-image', {
    // loop: true,
    direction: 'vertical',
    spaceBetween: 15,
    slidesPerView: 1,
    freeMode: true,
    watchSlidesProgress: true,
});

const mainImage = new Swiper('.main-image',{
    loop: true,
    autoHeight: true,

    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    thumbs: {
        swiper: thumbImage,
    },
});