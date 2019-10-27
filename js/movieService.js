const getMovies = (page) => {
    movieContainer.innerHTML = '';
    paginationContainer.innerHTML = '';
    renderMessage('Loading...');
    getSome('search/movie', 'GET', {query: searchInput.value, page: page}).then(res => {

        currentPage = res.page;
        numberOfPages = res.total_pages > 1000 ? 1000 : res.total_pages; // back limitation
        setShownPages();
        renderPagination();

        if (res.results.length) {
            messagesContainer.innerHTML = '';
            res.results.forEach(movie => {
                renderMovie(movie);
            });
            setShownPages();
        } else {
            renderMessage('Sorry but we didn’t find movies with this name, try changing the searching query.');
        }
    }, e => {
        movieContainer.innerHTML = '';
        renderMessage(`Sorry, something went wrong.<br>Error ${e}`, 'red');
    });
};
