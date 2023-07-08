const cafeData = [
	{
		id: 1,
		name: "Arabica Coffee",
		price: "3400,00",
		category: "destacados",
		cafeImg: "./assets/img/cafe1.png",
	},
    {
        id: 2,
        name: "Cafe instantaneo puro",
        price: "1150,00",
        category: "destacados",
        cafeImg: "./assets/img/cafe2.png",
    },
    {
        id: 3,
        name: "Lavazza cafe expresso",
        price: "4500,00",
        category: "destacados",
        cafeImg: "./assets/img/cafe3.png",
    },
    {
        id: 4,
        name: "Vittoria Coffee",
        price: "1100,00",
        category: "destacados",
        cafeImg: "./assets/img/cafe4.png",
    },
    {
        id: 5,
        name: "Bombay Expresso Blend",
        price: "4500,00",
        category: "vendidos",
        cafeImg: "./assets/img/cafe5.png",
    },
    {
        id: 6,
        name: "Vittoria Expresso",
        price: "5060,00",
        category: "vendidos",
        cafeImg: "./assets/img/cafe6.png",
    },
    {
        id: 7,
        name: "Blue Tokai Coffee",
        price: "1010,00",
        category: "vendidos",
        cafeImg: "./assets/img/cafe7.png",
    },
    {
        id: 8,
        name: "Colombian Brew Coffe",
        price: "7040,00",
        category: "vendidos",
        cafeImg: "./assets/img/cafe8.png",
    },
    {
        id: 9,
        name: "King Coffe",
        price: "1110,00",
        category: "ultmos",
        cafeImg: "./assets/img/cafe9.png",
    },
    {
        id: 10,
        name: "Lark Coffee",
        price: "3400,00",
        category: "ultimos",
        cafeImg: "./assets/img/cafe10.png",
    },
    {
        id: 11,
        name: "Lemon Flavor Coffe",
        price: "8300,00",
        category: "ultimos",
        cafeImg: "./assets/img/cafe11.png",
    },
    {
        id: 12,
        name: "Lavazza Expresso",
        price: "7400,00",
        category: "ultimos",
        cafeImg: "./assets/img/cafe12.png",
    },
];

const dividecafes = (size) => {
    let listaCafe = [];
    for (let i = 0; i < cafeData.length; i += size) {
        listaCafe.push(cafeData.slice(i, i + size));
    };
    return listaCafe;
};

const appState = {
    products: dividecafes(4),
    currentProductsIndex: 0,
    productsLimit: dividecafes(4).length,
    activeFilter: null,
};