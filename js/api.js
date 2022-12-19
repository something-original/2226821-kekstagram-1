const URLS = {
    'GET': 'https://26.javascript.pages.academy/kekstagram/data',
    'POST': 'https://26.javascript.pages.academy/kekstagram'
};

const getData = (onSuccess, onFail) => {
    fetch(URLS['GET'])
    .then((response) => response.json())
    .then((posts) => { onSuccess(posts); })
    .catch(() => { onFail('Something went wrong while loading'); });
};

const sendData = (onSuccess, onFail, body) => {
    fetch(URLS['POST'], { method: 'POST', body, }, )
    .then((response) => { response.ok ? onSuccess() : onFail('Something went wrong while sending')})
    .catch(() => onFail('Something went wrong while sending'))
};

export { getData, sendData };
