document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchResultsContainer = document.getElementById('search-results');
    let timeoutId;

    searchInput.addEventListener('input', async () => {
        const searchTerm = searchInput.value.trim();
        clearTimeout(timeoutId);
        if (searchTerm !== '') {
            timeoutId = setTimeout(async () => {
                try {
                    const encodedTerm = encodeURIComponent(searchTerm);
                    const response = await fetch(`https://www.omdbapi.com/?apikey=5ec293e&s=${encodedTerm}&type=movie`);
                    const data = await response.json();
                    if (data.Response === 'True') {
                        displaySearchResults(data.Search);
                    } else {
                        searchResultsContainer.innerHTML = 'No results found';
                    }
                } catch (error) {
                    console.error('Error searching movies:', error);
                }
            }, 0);
        } else {
            searchResultsContainer.innerHTML = '';
        }
    });

    const displaySearchResults = (movies) => {
        searchResultsContainer.innerHTML = '';
        movies.forEach((movie) => {
            const movieItem = document.createElement('div');
            movieItem.classList.add('col-md-3', 'mb-4');
            movieItem.innerHTML = `
                <div class="card">
                    <img src="${movie.Poster}" class="card-img-top" alt="${movie.Title}">
                    <div class="card-body">
                        <h5 class="card-title">${movie.Title}</h5>
                        <p class="card-text">${movie.Year}</p>
                        <a href="movie_details.html?id=${movie.imdbID}" class="btn btn-primary">Details</a>
                        <button class="btn btn-secondary favorite-button" data-imdbid="${movie.imdbID}">Add to Favorites</button>
                    </div>
                </div>
            `;
            searchResultsContainer.appendChild(movieItem);
        });
    };

    // Event listener for favorite buttons
    searchResultsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('favorite-button')) {
            const imdbID = event.target.dataset.imdbid;
            addToFavorites(imdbID);
        }
    });

    const addToFavorites = (imdbID) => {
        // Retrieve existing favorites from local storage
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        // Check if the movie is already in favorites
        if (favorites.some(movie => movie.imdbID === imdbID)) {
            alert('This movie is already in your favorites.');
            return;
        }

        // Fetch movie details from OMDB API
        fetch(`https://www.omdbapi.com/?apikey=5ec293e&i=${imdbID}`)
            .then(response => response.json())
            .then(data => {
                if (data.Response === 'True') {
                    // Add movie to favorites array
                    favorites.push({
                        imdbID: data.imdbID,
                        Title: data.Title,
                        Poster: data.Poster,
                        Year: data.Year
                    });

                    // Update favorites in local storage
                    localStorage.setItem('favorites', JSON.stringify(favorites));
                    alert('Movie added to favorites!');
                } else {
                    alert('Failed to add movie to favorites.');
                }
            })
            .catch(error => {
                console.error('Error adding movie to favorites:', error);
                alert('An error occurred while adding movie to favorites.');
            });
    };
});
