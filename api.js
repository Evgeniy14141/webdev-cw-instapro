// Замени на свой, чтобы получить независимый от других набор данных.
// "боевая" версия инстапро лежит в ключе prod

const personalKey = 'chashkin-eugeniy';
const baseHost = 'https://wedev-api.sky.pro';
export const postsHost = `${baseHost}/api/v1/${personalKey}/instapro`;

export function getPosts({ token }) {
  return fetch(postsHost, {
    method: 'GET',
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      if (response.status === 401) {
        throw new Error('Нет авторизации');
      }

      return response.json();
    })
    .then((data) => {
      return data.posts;
    });
}

export function getUserPosts({ userId, token }) {
  return fetch(`${postsHost}/user-posts/${userId}`, {
    method: 'GET',
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data.posts;
    });
}


export function registerUser({ login, password, name, imageUrl }) {
  return fetch(baseHost + '/api/user', {
    method: 'POST',
    body: JSON.stringify({
      login: login.replaceAll('<', '&lt;').replaceAll('>', '&gt;'),
      password: password.replaceAll('<', '&lt;').replaceAll('>', '&gt;'),
      name: name.replaceAll('<', '&lt;').replaceAll('>', '&gt;'),
      imageUrl,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error('Такой пользователь уже существует');
    }
    return response.json();
  });
}

export function loginUser({ login, password }) {
  return fetch(baseHost + '/api/user/login', {
    method: 'POST',
    body: JSON.stringify({
      login: login.replaceAll('<', '&lt;').replaceAll('>', '&gt;'),
      password: password.replaceAll('<', '&lt;').replaceAll('>', '&gt;'),
    }),
  })
    .then((response) => {
      if (response.status === 400) {
        throw new Error('Неверный логин или пароль');
      }
      return response.json();
    })
    .catch((error) => {
      console.error(error);
    });
}


// Загружает картинку в облако, возвращает url загруженной картинки
export function uploadImage({ file }) {
  const data = new FormData();
  data.append('file', file);

  return fetch(baseHost + '/api/upload/image', {
    method: 'POST',
    body: data,
  }).then((response) => {
    return response.json();
  });
}

export function like({ postId, token, isLiked }) {
  const likeUrl = isLiked ? 'dislike' : 'like';
  return fetch(`${postsHost}/${postId}/${likeUrl}`, {
    method: 'POST',
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data.post;
    })
    .catch((error) => {
      console.error(error);
    });
}
