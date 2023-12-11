import { getCookie } from "./utils/cookie.js";
import { getData } from "./utils/httpReq.js";
import { e2p } from "./utils/replaceNumber.js";

let allProducts = null;

const loginBtn = document.getElementById('login')
const dashboardBtn = document.getElementById('dashboard')

const inputBox = document.querySelector('input')

const mainContent = document.getElementById('products')

const listItems = document.querySelectorAll('li')


const renderProducts = products => {
    mainContent.innerHTML = '';
    console.log(products);
    products.forEach(product => {
        const jsx = `
        <div>
            <img alt='${product.title}' src='${product.image}' />
            <h4>${product.title.split(' ').slice(0, 3).join(' ')}</h4>
            <div id='price'> 
                <p>$ ${e2p(product.price)}</p>
                <button>
                خرید
                <i class='fa-solid fa-cart-shopping'></i>
                </button>
            </div>
            <div id='rate'>
                <i class='fa-solid fa-star'></i>
                <span>${e2p(product.rating.rate)}</span>
            </div>
            <div id='count'>
                <i class='fa-solid fa-user'></i>
                <span>${e2p(product.rating.count)}</span>
            </div>
        </div>
        `;

        mainContent.innerHTML += jsx;
    });
};

const init = async () => {
    const cookie = getCookie()
    if (cookie) {
        loginBtn.style.display = 'none'
    } else if (!cookie) {
        dashboardBtn.style.display = 'none'
    }

    allProducts = await getData('products');
    renderProducts(allProducts)

    // console.log(allProducts);
};

const searchHandler = () => {
    const query = inputBox.value.trim().toLowerCase();

    if (!query) renderProducts(allProducts);
    const filteredProducts = allProducts.filter((product) => product.title.toLowerCase().includes(query))
    renderProducts(filteredProducts)
};

const filterHandler = (event) => {
    const category = event.target.innerText.toLowerCase();

    listItems.forEach((li) => {
        if (li.innerText.toLowerCase() === category) {
            li.classList = 'selected';
        } else {
            li.classList = ''
        }
    });

    if (category === 'all') return renderProducts(allProducts);

    const filteredProducts = allProducts.filter(
        (product) => product.category.toLowerCase() === category
    );

    renderProducts(filteredProducts);
};

document.addEventListener('DOMContentLoaded', init);

inputBox.addEventListener('input', searchHandler);

listItems.forEach(li => {
    li.addEventListener('click', filterHandler)
});