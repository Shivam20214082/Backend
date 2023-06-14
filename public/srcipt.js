function redirectToNewPage() {
  window.location.href = "/login";
}
function direct() {
  window.location.href = "/dashboard";
}

function goToNextPage() {
  window.location.href = "/404";
}

// modify the logout function
function logout() {
  fetch("/logout")
    .then(() => {
      // reload the page after logging out
      window.location.reload();
      window.location.href = "/";
    })
    .catch((error) => console.error(error));
}

//searching operation

// Get all the products

const products = document.querySelectorAll(".product");

const productsData = [
  { id: "p1", name: "Daal", link: "/daal" },
  { id: "p2", name: "Rice", link: "/rice" },
  { id: "p3", name: "Milk", link: "/milk" },
  { id: "p4", name: "Sugar", link: "/sugar" },
  { id: "p5", name: "oil", link: "/oil" },
  { id: "p6", name: "Soap", link: "/soap" },
  { id: "p7", name: "Aata", link: "/aata" },
  { id: "p8", name: "Jaggery", link: "/jaggery" },
  { id: "p9", name: "Almond", link: "/almond" },
  { id: "p10", name: "Cheshew", link: "/kaju" },
  { id: "p11", name: "Resins", link: "/resin" },
  { id: "p12", name: "Coconut", link: "/coconut" },
];

// Log the product data to the console
console.log(productsData);

// Get references to the search input and results container
const searchInput = document.getElementById("search-input");
const searchResultsContainer = document.getElementById("search-results");

// Add an event listener to the search input
searchInput.addEventListener("input", (e) => {
  // Get the search query
  const query = e.target.value.toLowerCase().trim();

  // If there is no search query, hide the search results container and exit the event listener
  if (query === "") {
    searchResultsContainer.style.display = "none";
    return;
  }

  // Filter the products based on the search query
  const filteredProducts = productsData.filter((product) => {
    return product.name.toLowerCase().includes(query);
  });

  // Update the search results container with the filtered products
  updateSearchResults(filteredProducts);
});

// Add a click event listener to the document object to hide the search results container when the user clicks outside of it
document.addEventListener("click", (e) => {
  // Check if the clicked element is inside the search container or not
  if (
    !searchInput.contains(e.target) &&
    !searchResultsContainer.contains(e.target)
  ) {
    searchResultsContainer.style.display = "none";
  }
});

// Function to update the search results container
function updateSearchResults(products) {
  // Clear the current search results
  searchResultsContainer.innerHTML = "";
  searchResultsContainer.style.backgroundColor = "white";

  // Loop through each product and add its name and link to the container
  products.forEach((product) => {
    const productElement = `
      <div class="search-result">
        <a href="${product.link}">${product.name}</a>
      </div>
    `;
    searchResultsContainer.insertAdjacentHTML("beforeend", productElement);
  });

  // Display the search results container if there are results, otherwise hide it
  if (products.length > 0) {
    searchResultsContainer.style.display = "block";
  } else {
    searchResultsContainer.style.display = "none";
  }
}
