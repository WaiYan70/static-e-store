const search = () => {
    const searchbox = document.getElementById("searching-item").value.toUpperCase();
    const storeItems = document.getElementById("search-list");
    const product = document.querySelectorAll(".search-card");
    const pname = storeItems.getElementsByTagName("h3");

    for (let i = 0; i < pname.length; i++) {
        const match = product[i].getElementsByTagName("h3")[0];
        if (match) {
            let textValue = match.textContent || match.innerHTML;
            if(textValue.toUpperCase().indexOf(searchbox) > -1){
                product[i].style.display = "";
                // product[i].style.opacity = "1";
            } else {
                product[i].style.display = "none";
                // product[i].style.opacity = "0";
            }
        }        
    }
}