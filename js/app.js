'use strict';

const messagesContainer = document.querySelector('.messages-container');
const movieContainer = document.querySelector('.movie-container');
const searchInput = document.querySelector('.search-input');
const paginationContainer = document.querySelector('.pagination-container');

let searchTimeout;

renderMessage('Please enter movie name');
searchInput.addEventListener('input', e => {
    clearTimeout(searchTimeout);

    if (e.target && e.target.value) {
        searchTimeout = setTimeout(() => {
            getMovies(1);
        }, 500);
    } else {
        movieContainer.innerHTML = '';
        paginationContainer.innerHTML = '';
        renderMessage('Please enter movie name');
    }
});
