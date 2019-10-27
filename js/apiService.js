let sentRequests = [];

const getSome = (url, requestType, params) => new Promise((resolve, reject) => {
    if (!requestTypes.includes(requestType)) {
        console.error(`Unsupported request type: ${requestType}`);
        return;
    }

    let requestUrl = `${apiUrl}/${url}?api_key=${apiKey}`;

    let xhr = new XMLHttpRequest();

    if (params && requestType === 'GET') {
        Object.keys(params).forEach((key, i) => {
            requestUrl += `&${key}=${params[key]}`;
        });
    }

    xhr.open(requestType,
            requestUrl,
            true);

    if (params && requestType === 'POST') {
        abortRequestWithSameUrl({xhr: xhr, url: url});
        sentRequests.push({xhr: xhr, url: url});
        xhr.send(params);
    } else {
        abortRequestWithSameUrl({xhr: xhr, url: url});
        sentRequests.push({xhr: xhr, url: url});
        xhr.send();
    }

    xhr.onload = () => {
        if (xhr.status === 200) {
            resolve(JSON.parse(xhr.responseText));
        } else {
            console.log(xhr);
            reject(`${xhr.status} ${xhr.statusText ? ':' : ''} ${xhr.statusText}`);
        }
    }
});

const getRequestsWithSameUrl = request => {
    return sentRequests.filter(r => r.url === request.url);
};
const abortRequestWithSameUrl = request => {
  getRequestsWithSameUrl(request).forEach(r => {
      r.xhr.abort();
      sentRequests.splice(sentRequests.indexOf(r), 1);
  });
};
