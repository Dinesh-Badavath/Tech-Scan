const dummyData = [
    { name: 'iPhone X', brand: 'Apple', price: 999, rating: 4.5 },
    { name: 'Samsung Galaxy S21', brand: 'Samsung', price: 799, rating: 4.2 },
    { name: 'Google Pixel 6', brand: 'Google', price: 899, rating: 4.4 },
    // Add more dummy data as needed
];

const productList = document.getElementById('productList');

// Function to display search results
function displayResults(data) {
    productList.innerHTML = '';
    data.forEach(product => {
        const item = document.createElement('li');
        item.innerHTML = `
            <strong>${product.brand} ${product.name}</strong><br>
            Price: $${product.price}<br>
            Rating: ${product.rating}
        `;
        productList.appendChild(item);
    });
}

// Function to handle search, filter, and sort
function updateResults() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const minPrice = parseFloat(document.getElementById('minPrice').value) || 0;
    const maxPrice = parseFloat(document.getElementById('maxPrice').value) || Number.MAX_SAFE_INTEGER;

    const brandFilters = Array.from(document.querySelectorAll('input[type=checkbox]'));
    const selectedBrands = brandFilters
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.id);

    const sortOption = document.getElementById('sortBy').value;

    // Apply filtering
    let filteredData = dummyData.filter(product => 
        product.name.toLowerCase().includes(searchInput) &&
        product.price >= minPrice &&
        product.price <= maxPrice &&
        (selectedBrands.length === 0 || selectedBrands.includes(product.brand))
    );

    // Apply sorting
    if (sortOption === 'priceAsc') {
        filteredData.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'priceDesc') {
        filteredData.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'ratingDesc') {
        filteredData.sort((a, b) => b.rating - a.rating);
    }

    displayResults(filteredData);
}

// Attach event listeners to trigger search, filter, and sort
document.getElementById('searchButton').addEventListener('click', updateResults);
document.getElementById('filterButton').addEventListener('click', updateResults);
document.getElementById('sortBy').addEventListener('change', updateResults);

// Initialize the display with all products
displayResults(dummyData);
