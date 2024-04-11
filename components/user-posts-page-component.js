import { renderHeaderComponent } from './header-component.js';
import { getToken, posts, user } from '../index.js';
import { formatDistanceToNow } from 'https://cdn.jsdelivr.net/npm/date-fns@2.29.3/esm/index.js';
import { setLike } from '../helpers.js';
import { like } from '../api.js';

export function renderUserPostsPageComponent({ appEl }) {
  const render = () => {
    const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>
      <div class="posts-user-header" data-user-id="${posts[0].user.id}">
        <img src="${
          posts[0].user.imageUrl
        }" class="posts-user-header__user-image">
        <p class="posts-user-header__user-name">${posts[0].user.name}</p>
      </div>
      <ul class="posts">
        ${posts
          .map((el) => {
            return `<li class="post">
              <div class="post-image-container">
                <img class="post-image" src="${el.imageUrl}">
              </div>
              <div class="post-likes">
                <button data-is-liked="${el.isLiked}" data-post-id="${
              el.id
            }" class="like-button">
                <img src="./assets/images/${
                  el.isLiked ? `like-active.svg` : `like-not-active.svg`
                }">
                </button>
                <p class="post-likes-text">
                  Нравится: <strong>${el.likes.length}</strong>
                </p>
              </div>
              <p class="post-text">
                <span class="user-name">${el.user.name}</span>
                ${el.description}
              </p>
              <p class="post-date">
                ${formatDistanceToNow(new Date(el.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </li>`;
          })
          .join('')}</ul>
    </div>
  `;

    appEl.innerHTML = appHtml;

    renderHeaderComponent({
      element: document.querySelector('.header-container'),
    });

    for (let postLikes of document.querySelectorAll('.post-likes')) {
      const likeButton = postLikes.querySelector('.like-button');
      const postLikesText = postLikes.querySelector('strong');
      const postId = likeButton.dataset.postId;

      likeButton.addEventListener('click', () => {
        setLike({
          like,
          likeButton,
          postLikesText,
          postId,
          token: getToken(),
          user,
        });
      });
    }
  };

  render();
}
