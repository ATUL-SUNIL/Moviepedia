document.addEventListener('DOMContentLoaded', () => {
    const favoritesList = document.getElementById('favorites-list');

    // Load favorite movies from local storage
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    displayFavoriteMovies(favorites);

    // Display favorite movies
    function displayFavoriteMovies(favorites) {
        favoritesList.innerHTML = '';

        if (favorites.length === 0) {
            favoritesList.innerHTML = '<p>No favorite movies added yet.</p>';
            return;
        }

        favorites.forEach(movie => {
            const movieItem = document.createElement('div');
            movieItem.classList.add('col-md-3', 'mb-4');
            movieItem.innerHTML = `
                <div class="card">
                    <img src="${movie.Poster}" class="card-img-top" alt="${movie.Title}">
                    <div class="card-body">
                        <h5 class="card-title">${movie.Title}</h5>
                        <p class="card-text">${movie.Year}</p>
                        <button class="btn btn-danger remove-button" data-imdbid="${movie.imdbID}">Remove from Favorites</button>
                    </div>
                </div>
            `;
            favoritesList.appendChild(movieItem);
        });
    }

    // Event listener for remove buttons
    favoritesList.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-button')) {
            const imdbID = event.target.dataset.imdbid;
            removeFromFavorites(imdbID);
        }
    });

    // Function to remove movie from favorites
    function removeFromFavorites(imdbID) {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        favorites = favorites.filter(movie => movie.imdbID !== imdbID);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        displayFavoriteMovies(favorites);
        alert('Movie removed from favorites!');
    }
});
