const renderMovie = movie => {
    movieContainer.innerHTML += `<li>
            <figure>
                <figcaption><h3>${movie.title}</h3></figcaption>
                <img src="${movie.poster_path ? imgUrl + movie.poster_path : 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'}" alt=""/>
            </figure>
            <div class="overview">
                <h3>Overview</h3>
                <p>${movie.overview}</p>
            </div>
     </li>`
};
const renderMessage = (messageText, color) => {
    let msg = document.createElement('h1');
    msg.innerHTML = messageText;
    msg.style.textAlign = 'center';
    if (color) {
        msg.style.color = color;
    }
    messagesContainer.innerHTML = '';
    messagesContainer.appendChild(msg);
};

const renderPagination = () => {
    const createPageBtn = (value) => {
        const pageBtn = document.createElement('div');
        pageBtn.classList.add('page');
        pageBtn.innerHTML = value;

        return pageBtn;
    };

    paginationContainer.innerHTML = '';

    if (numberOfPages === 1) {
        return;
    }

    const prev = createPageBtn('Prev');
    const next = createPageBtn('Next');
    const first = createPageBtn('First');
    const last = createPageBtn('Last');

    prev.addEventListener('click', () => getMovies(currentPage - 1));
    next.addEventListener('click', () => getMovies(currentPage + 1));
    first.addEventListener('click', () => getMovies(1));
    last.addEventListener('click', () => getMovies(numberOfPages));

    if (shownPages[0] !== 1) {
        paginationContainer.appendChild(first);
    }
    if (isPrevExist) {
        paginationContainer.appendChild(prev);
    }

    shownPages.forEach(p => {
        let page = createPageBtn(p);
        if (p === currentPage) {
            page.classList.add('_active');
        }
        if (p !== currentPage) {
            page.addEventListener('click', () => {
                getMovies(p);
            });
        }
        paginationContainer.appendChild(page);
    });

    if (isNextExist) {
        paginationContainer.appendChild(next);
    }
    if (shownPages[shownPages.length - 1] !== numberOfPages) {
        paginationContainer.appendChild(last);
    }
};
