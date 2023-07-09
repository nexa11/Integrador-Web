const cafeContainer = document.querySelector(".coffes-cont");
const moreBtn = document.querySelector(".btn-more");
const categoriasCafe = document.querySelector(".category");
const listaCategorias = document.querySelectorAll("btn-cofe");
const cartBtn = document.querySelector(".cart-label");
const cartMenu = document.querySelector(".shopp-cart");
const menuBtn = document.querySelector(".menu-label");
const barsMenu = document.querySelector(".navlist");
const overlay = document.querySelector(".overlay");


const cafeTemplate = (producto) => {
    const {id, name, price, cafeImg} = producto;

    return `<div class="coffe">
                <h3>${name}</h3>
                <img src="${cafeImg}" alt="">
                    <div class="stars">
                         <i class="fa-solid fa-star"></i>                    
                         <i class="fa-solid fa-star"></i>                    
                         <i class="fa-solid fa-star"></i>                    
                         <i class="fa-solid fa-star"></i>                    
                         <i class="fa-solid fa-star"></i>
                    </div>
                        <p>${price}</p>
                    <div class="price">
                        <button class="addBtn" data-id="${id}"
                        data-name="${name}"
                        data-price="${price}"
                        data-img="${cafeImg}">Add</button>
                    <i class="fa-solid fa-heart"></i>
                    </div>
            </div>`
}


const renderCafes = (listaCafe) => {
    cafeContainer.innerHTML += listaCafe.map(cafeTemplate).join("");
};

const lastCafe = () => {
    return appState.currentProductsIndex === appState.productsLimit - 1;
}

const mostrarMas = () => {
    appState.currentProductsIndex += 1;
    let {products, currentProductsIndex} = appState;
    renderCafes(products[currentProductsIndex]);
    if (lastCafe()) {
        moreBtn.classList.add("hidden");
    }
};

const btnInactive = (elemento) => {
    return (
        elemento.classList.contains("btn-cofe") && !elemento.classList.contains("active")
    )
}

const cambioEstadoBtn = (seleccionCategoria) => {
    const categorias = [...listaCategorias];
    categorias.forEach((categoryBtn) => {
        if(categoryBtn.dataset.category !== seleccionCategoria) {
            categoryBtn.classList.remove("active");
            return;
        }
        categoryBtn.classList.add("active");
    });
};

const setVerMasVisibility = () => {
    if (!appState.activeFilter) {
        moreBtn.classList.remove("hidden")
        return;
    }
    moreBtn.classList.add("hidden")
}

const cambiarEstado = (btn) => {
    appState.activeFilter = btn.dataset.category;
    cambioEstadoBtn(appState.activeFilter);
    setVerMasVisibility();

}

const renderFiltroDeProductos = () => {
    const productosFiltrados = cafeData.filter((product) => {
        return product.category === appState.activeFilter;
    });
    renderCafes(productosFiltrados);
}

const aplicarFiltro = ({target}) => {
    // .------
    if (!btnInactive(target)) {
        return; 
    }
    //.....
    cambiarEstado(target);
    //render por filtro
    cafeContainer.innerHTML = "";
    if(appState.activeFilter) {
        renderFiltroDeProductos();
        appState.currentProductsIndex = 0;
        return;
    }
    renderCafes(appState.products[0]);
    //sin filtro
};

const toggleCart = () => {
    cartMenu.classList.toggle("open-cart");
    if (basMenu.classList.contains("open-menu")){
        barsMenu.classList.remove("open-menu");
        return
    }
    overlay.classList.toggle("show-overlay");
}

const toggleMenu = () => {
    barsMenu.classList.toggle("open-menu");
    if (cartMenu.classList.contains("open-cart")) {
        cartMenu.classList.remove("open-cart");
        return;
    }
    overlay.classList.toggle("show-overlay");
}

const init = () => {
    renderCafes(appState.products[appState.currentProductsIndex]);
    moreBtn.addEventListener("click", mostrarMas);
    categoriasCafe.addEventListener("click", aplicarFiltro);
    cartBtn.addEventListener("click", toggleCart);
    menuBtn.addEventListener("click", toggleMenu);
}

init();




