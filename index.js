const cafeContainer = document.querySelector(".coffes-cont");
const moreBtn = document.querySelector(".btn-more");
const categoriasCafe = document.querySelector(".category");
const listaCategorias = document.querySelectorAll("btn-cofe");
const cartBtn = document.querySelector(".cart-label");
const cartMenu = document.querySelector(".shopp-cart");
const menuBtn = document.querySelector(".menu-label");
const barsMenu = document.querySelector(".navlist");
const overlay = document.querySelector(".overlay");
const comprasCart = document.querySelector(".item-cart")
const total = document.querySelector(".total");
const successModal = document.querySelector(".add-modal");
const comprar = document.querySelector(".btn-buy");
const borrar = document.querySelector(".btn-vaciar");
const burbuja = document.querySelector(".burbuja");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const salvarCarrito = () => {
    localStorage.setItem("cart", JSON.stringify(cart))
};

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
                        <p>$ ${price}</p>
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

const btnInactive = (element) => {
    return (
        element.classList.contains("btn-cofe") && 
        !element.classList.contains("active")
    )
}

const cambioEstadoBtn = (selectedCategory) => {
    const categorias = [...listaCategorias];
    categorias.forEach((categoryBtn) => {
        if(categoryBtn.dataset.category !== selectedCategory) {
            categoryBtn.classList.remove("active");
            return;
        }
        categoryBtn.classList.add("active");
    });
};

const setVerMasVisibility = () => {
    if (!appState.activeFilter) {
        moreBtn.classList.remove("hidden");
        return;
    }
    moreBtn.classList.add("hidden");
};

const cambiarEstado = (btn) => {
    appState.activeFilter = btn.dataset.category;
    cambioEstadoBtn(appState.activeFilter);
    setVerMasVisibility();

};

const renderFiltroDeProductos = () => {
    const productosFiltrados = cafeData.filter((product) => {
        return product.category === appState.activeFilter;
    });
    renderCafes(productosFiltrados);
}

const aplicarFiltro = ({target}) => {
    if (!btnInactive(target)) {
        return; 
    }
    cambiarEstado(target);

    cafeContainer.innerHTML = "";
    if(appState.activeFilter) {
        renderFiltroDeProductos();
        appState.currentProductsIndex = 0;
        return;
    }
    renderCafes(appState.products[0]);
};

const toggleCart = () => {
    cartMenu.classList.toggle("open-cart");
    if (barsMenu.classList.contains("open-menu")){
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

const closeOnScroll = () => {
    if (!barsMenu.classList.contains("open-menu") && !cartMenu.classList.contains("open-cart")){
        return
    }
    barsMenu.classList.remove("open-menu");
    cartMenu.classList.remove("open-cart");
    overlay.classList.remove("show-overlay");
};

const closeOnClick = (e) => {
    if(!e.target.classList.contains("nav-link")) {
        return
    }
    barsMenu.classList.remove("open-menu");
    overlay.classList.remove("show-overlay");
}

const closeOverlayClick = () => {
    barsMenu.classList.remove("open-menu");
    cartMenu.classList.remove("open-cart");
    overlay.classList.remove("show-overlay");
};

//CARRITO

const productCartTemplate = (cartProduct) => {
    const {id, name, price, img, quantity} = cartProduct;
    return `
        <div class="box-cart">
            <img src=${img} alt="">
            <div class="cart-cont">
                <h3>${name}</h3>
                <span class="precio">$ ${price}</span>
            </div>
            <div class="quantity-menu">
                <span class="quantity-man menos" data-id=${id}>-</span>
                <span class="quantity">${quantity}</span>
                <span class="quantity-man mas" data-id=${id}>+</span>
            </div>
        </div>
    `
}

const renderCart = () => {
    if(!cart.length) {
        comprasCart.innerHTML = `<p class="msj-vacio">No hay productos agregados</p>
        `;
        return;
    }
    comprasCart.innerHTML = cart.map(productCartTemplate).join("");
};

const carritoTotal = () => {
    return cart.reduce((acc, val) => {
        return acc + Number(val.price) * val.quantity;
    }, 0);
};

const mostrarTotal = () => {
    total.innerHTML = `$ ${carritoTotal()}`;
};

const crearDataProducto = (product) => {
    const {id, name, price, img} = product;
    return {id, name, price, img}
};

const productoExistente = (productId) => {
    return cart.find((item) => {
        return item.id === productId;
    });
};

const addUnidad = (product) => {
    cart = cart.map((cartProduct) => {
        return cartProduct.id === product.id 
        ? {...cartProduct, quantity: cartProduct.quantity + 1}
        : cartProduct;
    });
};

const mostrarModal = (msg) => {
    successModal.classList.add("active-modal");
    successModal.textContent = msg;
    setTimeout (() => {
        successModal.classList.remove("active-modal");
    }, 1500);
};

const crearCartProducto = (product) => {
    cart = [
        ...cart, {
            ...product,
            quantity: 1,
        },
    ];
};

const desabilitarBtn = (btn) => {
    if(!cart.length) {
        btn.classList.add("disabled");
    } else {
        btn.classList.remove("disabled");
    }
};

const renderBurbuja = () => {
    burbuja.textContent = cart.reduce((acc, val) => {
        return acc + val.quantity;
    }, 0);
};

const updateEstadoCarrito = () => {
    salvarCarrito();
    renderCart();
    mostrarTotal();
    desabilitarBtn(comprar);
    desabilitarBtn(borrar);
    renderBurbuja();
}

const addProduct = (e) => {
    if(!e.target.classList.contains("addBtn")){
        return
    }
    const product = crearDataProducto(e.target.dataset)
    if (productoExistente(product.id)) {
    addUnidad(product)
    mostrarModal("Agregaste una unidad al carrito")
    } else {
        crearCartProducto (product);
        mostrarModal("El producto esta en el carrito")
    }
    updateEstadoCarrito();
};

const sustraerUnidad = (existeProducto) => {
    cart = cart.map((product) => {
        return product.id === existeProducto.id
        ? {...product, quantity: Number(product.quantity) - 1}
        : product;
    });
};

const borraProductoCarrito = (existeProducto) => {
    cart = cart.filter((product) => {
        return product.id !== existeProducto.id
    });
    updateEstadoCarrito();
}

const handleMenos = (id) => {
    const existeProducto = cart.find((item) => item.id === id);
    if(existeProducto.quantity === 1) {
        if(window.confirm("¿Desea eliminar el producto del carrito?")) {
            borraProductoCarrito(existeProducto)
        }
        return
    }
    sustraerUnidad(existeProducto);
};

const handleMas = (id) => {
    const existeProducto = cart.find((item) => item.id === id);
    addUnidad(existeProducto)
}

const handleQuantity = (e) => {
    if (e.target.classList.contains("menos")) {
        handleMenos(e.target.dataset.id);
    } else if (e.target.classList.contains("mas")) {
        handleMas(e.target.dataset.id);
    }
    updateEstadoCarrito();
};

const resetCarrito = () =>{
    cart = [];
    updateEstadoCarrito();
}

const accionCartCompleto = (confirmMsg, successMsg) => {
    if (!cart.length) return;

    if(window.confirm(confirmMsg)){
        resetCarrito();
        alert(successMsg);
    }
}

const compraCompletada = () => {
    accionCartCompleto("¿Desea finalizar su compra?", "¡Gracias por tu compra!");
};

const deleteCarrito = () => {
    accionCartCompleto("¿Desea vaciar el carrito?", "No hay productos en el carrito");
}

const init = () => {
    renderCafes(appState.products[appState.currentProductsIndex]);
    moreBtn.addEventListener("click", mostrarMas);
    categoriasCafe.addEventListener("click", aplicarFiltro);
    cartBtn.addEventListener("click", toggleCart);
    menuBtn.addEventListener("click", toggleMenu);
    window.addEventListener("scroll", closeOnScroll)
    barsMenu.addEventListener("click", closeOnClick)
    overlay.addEventListener("click", closeOverlayClick);
    document.addEventListener("DOMContentLoaded", renderCart)
    document.addEventListener("DOMContentLoaded", mostrarTotal);
    cafeContainer.addEventListener("click", addProduct);
    comprasCart.addEventListener("click", handleQuantity);
    comprar.addEventListener("click", compraCompletada);
    borrar.addEventListener("click", deleteCarrito);
    desabilitarBtn(comprar);
    desabilitarBtn(borrar);
    renderBurbuja();
}

init();




