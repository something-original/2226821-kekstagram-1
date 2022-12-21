const URLS = {
  'GET': 'https://26.javascript.pages.academy/kekstagram/data',
  'POST': 'https://26.javascript.pages.academy/kekstagram'
};

const get = (onSuccess, onFail) => {
  fetch(URLS['GET'])
    .then((response) => response.json())
    .then((posts) => {
      onSuccess(posts);
    })
    .catch(() => {
      onFail('Ошибка загрузки! Перезагрузите страницу!');
    });
};

const send = (onSuccess, onFail, body) => {
  fetch(
    URLS['POST'],
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Ошибка при отправке! Перезагрузите страницу!');
      }
    })
    .catch(() => {
      onFail('Ошибка при отправке! Перезагрузите страницу!');
    });
};

export { get, send };
