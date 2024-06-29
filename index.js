document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://jsonplaceholder.typicode.com/users';
    const productList = document.getElementById('productList');
    const sortCriteria = document.getElementById('sortCriteria');

    async function fetchProducts() {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Fetch error: ', error);
        }
    }

    function displayProducts(products) {
        productList.innerHTML = '';
        products.forEach(product => {
            const li = document.createElement('li');
            li.textContent = product.name;
            productList.appendChild(li);
        });
    }

    function sortProducts(products, criteria) {
        return products.sort((a, b) => {
            if (a[criteria] < b[criteria]) return -1;
            if (a[criteria] > b[criteria]) return 1;
            return 0;
        });
    }

    async function init() {
        const products = await fetchProducts();
        if (products) {
            displayProducts(products);

            sortCriteria.addEventListener('change', (event) => {
                const sortedProducts = sortProducts(products, event.target.value);
                displayProducts(sortedProducts);
            });
        }
    }

    init();
});
