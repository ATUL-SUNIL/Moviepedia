
---

# Moviepedia

Moviepedia is a web application that serves as an IMDb clone, allowing users to search for movies, view movie details, and manage a list of favorite movies. This application utilizes the OMDB API to fetch movie data.

## Table of Contents
- [Features](#features)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API](#api)


## Features
- **Movie Search**: Search for movies by title.
- **Movie Details**: View detailed information about a movie, including title, year, genre, director, actors, plot, and IMDb rating.
- **Favorites Management**: Add movies to your favorites list and view/remove them.


## Usage
1. **Search for Movies**:
   - Enter a movie title in the search bar and press enter or click the search button.
   - View search results and click on any movie to view its details.

2. **View Movie Details**:
   - Click on a movie from the search results to navigate to the movie details page.
   - View detailed information about the selected movie.

3. **Manage Favorites**:
   - Click the "Add to Favorites" button on the movie details page to add a movie to your favorites.
   - Click the "Favorites" button in the navbar to view your favorite movies.
   - Remove movies from your favorites list by clicking the "Remove from Favorites" button.

## Project Structure
```
moviepedia/
├── index.html
├── movie_details.html
├── favorites.html
├── styles.css
├── script.js
├── script2.js
├── favorites.js
```
- **index.html**: The main page where users can search for movies.
- **movie_details.html**: The page displaying detailed information about a selected movie.
- **favorites.html**: The page displaying the user's favorite movies.
- **styles.css**: Custom CSS styles for the application.
- **script.js**: JavaScript for handling movie search and favorites management.
- **script2.js**: JavaScript for fetching and displaying movie details.
- **favorites.js**: JavaScript for handling the favorites page functionality.

## API
This application uses the [OMDB API](http://www.omdbapi.com/) to fetch movie data. You need an API key to use this service.

**Example API request**:
```sh
https://www.omdbapi.com/?apikey=YOUR_API_KEY&s=SEARCH_TERM&type=movie
```


