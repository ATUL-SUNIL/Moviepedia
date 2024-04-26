// Function to fetch movie details based on the IMDb ID from URL parameter
const fetchMovieDetails = async () => {
    // Get the IMDb ID from the URL parameter
    const imdbID = getIMDbIDFromURL();

    if (imdbID) {
        try {
            // Fetch movie details from OMDB API
            const response = await fetch(`https://www.omdbapi.com/?apikey=5ec293e&i=${imdbID}`);
            const data = await response.json();
            console.log(data.Actors);
            // If movie details are retrieved successfully
            if (data.Response === 'True') {
                // Populate movie details in HTML elements
                document.getElementById('title').textContent = data.Title;
                document.getElementById('year').textContent = data.Year;
                document.getElementById('genre').textContent = data.Genre;
                document.getElementById('director').textContent = data.Director;
                document.getElementById('actors').textContent = data.Actors;
                document.getElementById('plot').textContent = data.Plot;
                document.getElementById('imdbRating').textContent = data.imdbRating;

                // Set movie poster image
                if (data.Poster !== 'N/A') {
                    document.getElementById('poster').src = data.Poster;
                } else {
                    document.getElementById('poster').src = 'https://via.placeholder.com/300x450?text=No+Poster+Available';
                }
            } else {
                // If movie details are not found or an error occurs
                console.error('Error fetching movie details:', data.Error);
            }
        } catch (error) {
            console.error('Error fetching movie details:', error);
        }
    } else {
        console.error('IMDb ID not found in URL parameter');
    }
};

// Function to get the IMDb ID from the URL parameter
const getIMDbIDFromURL = () => {
    // Get the current URL
    const urlParams = new URLSearchParams(window.location.search);
    // Extract the value of the 'id' parameter
    const imdbID = urlParams.get('id');
    return imdbID;
};

// Call the function to fetch and display movie details when the page loads
fetchMovieDetails();
