function toggleAuth() {
    const authTitle = document.getElementById('auth-title');
    const authForm = document.getElementById('auth-form');
    const toggleText = document.querySelector('.auth__toggle');

    if (authTitle.textContent === 'Login') {
        authTitle.textContent = 'Register';
        authForm.innerHTML = `
            <div class="auth__group">
                <label class="auth__label" for="username">Username</label>
                <input class="auth__input" type="text" id="username" required>
            </div>
            <div class="auth__group">
                <label class="auth__label" for="password">Password</label>
                <input class="auth__input" type="password" id="password" required>
            </div>
            <button type="submit" class="auth__button">Register</button>
        `;
        toggleText.textContent = 'Already have an account? Login';
    } else {
        authTitle.textContent = 'Login';
        authForm.innerHTML = `
            <div class="auth__group">
                <label class="auth__label" for="username">Username</label>
                <input class="auth__input" type="text" id="username" required>
            </div>
            <div class="auth__group">
                <label class="auth__label" for="password">Password</label>
                <input class="auth__input" type="password" id="password" required>
            </div>
            <button type="submit" class="auth__button">Login</button>
        `;
        toggleText.textContent = "Don't have an account? Register";
    }
}


document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("searchButton").addEventListener("click", function () {
        searchContacts();
    });
});

function searchContacts() {
    const searchTitle = document.getElementById('search-title');
    const searchForm = document.getElementById('search-form');
    const searchText = document.querySelector('.search__text');
    const searchInput = document.getElementById("searchInput");

    if (!searchInput || searchInput.value.trim() === ""){
        alert("Please enter a search term.");
        return;
    }

    fetch ("search.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ searchTerm: searchInput.value })
    })
    .then(response => response.json())
    .then (data => {
        if (data.error){
            alert("No records found.")
        }
        else {
            console.log("Search results:", data.results);
        }
    })
    .catch(error => {
        console.error("Error during search:", error);
        alert("An error occurrred during the search.");
    });

    if (searchTitle.textContent === "Search Contacts") {
        searchTitle.textContent = "Enter Search Term";
        searchForm.innerHTML = `
            <div class="search__group">
                <label class="search__label" for="searchInput">Search</label>
                <input class="search__input" type="text" id="searchInput" required>
            </div>
            <button type="submit" class="search__button">Search</button>
        `;
        toggleText.textContent = "Clear Search";
    } else {
        searchTitle.textContent = "Search Contacts";
        searchForm.innerHTML = `
            <div class="search__group">
                <label class="search__label" for="searchInput">Search</label>
                <input class="search__input" type="text" id="searchInput" required>
            </div>
            <button type="submit" class="search__button">Search</button>
        `;
        toggleText.textContent = "Enter Search Term";
    }
}
