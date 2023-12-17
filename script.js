const triggerOpen = document.querySelectorAll('[data-trigger-button]');
const triggerClose = document.querySelectorAll('[data-close-button]');
const overlay = document.querySelector('[data-overlay]');

for(let i = 0; i < triggerOpen.length;i++){
    let currentId = triggerOpen[i].dataset.target,
        targetEl = document.querySelector(`#${currentId}`);

    const openData = function(){
        targetEl.classList.remove('active');
        overlay.classList.remove('active');
    };
    triggerOpen[i].addEventListener('click', function(){
        targetEl.classList.add('active');
        overlay.classList.add('active');
    });

    targetEl.querySelector('[data-close-button]').addEventListener('click', openData);
    overlay.addEventListener('click', openData);

    // if (targetEl) {
    //     const openData = function () {
    //         targetEl.classList.remove('active');
    //         overlay.classList.remove('active');
    //     };

    //     triggerOpen[i].addEventListener('click', function () {
    //         targetEl.classList.add('active');
    //         overlay.classList.add('active');
    //     });

    //     const closeButton = targetEl.querySelector('[data-close-button]');
    //     if (closeButton) {
    //         closeButton.addEventListener('click', openData);
    //     }

    //     overlay.addEventListener('click', openData);
    // }
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
