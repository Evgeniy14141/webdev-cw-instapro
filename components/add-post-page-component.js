import { renderUploadImageComponent } from './upload-image-component.js';

import { renderHeaderComponent } from './header-component.js';

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  let imageUrl = ''; // ------------
  let description = ''; // ------------
  const render = () => {


    // TODO: Реализовать страницу добавления поста
    const appHtml = `
    <div class="page-container">
    <div class="header-container"></div>
      <div class="form">
          <h3 class="form-title">Добавить пост</h3>
      <div class="form-inputs">
          <div class="upload-image-container">
          </div>
              <label>Опишите фотографию:
                  <textarea class="input textarea" rows="4" id="description"></textarea>
              </label>
                  <button class="button" id="add-button">Добавить</button>
              </div>
          </div>
      </div>
   </div>
  `;

    appEl.innerHTML = appHtml;

    renderHeaderComponent({
      element: document.querySelector('.header-container'),
    });

    renderUploadImageComponent({
      element: document.querySelector('.upload-image-container'),
      onImageUrlChange(newImageUrl) {
        imageUrl = newImageUrl;
      },
    });
    const textArea = document.getElementById('description');

    textArea.oninput = () => {
      if (textArea.value.charAt(0) === ' ') {
        textArea.value = '';
      }
    }

    textArea.addEventListener('input', (e) => {
      description = e.target.value;
    });

    document.getElementById('add-button').addEventListener('click', () => {
      if (!imageUrl) {
        alert('Добавьте фото');
        return;
      }
      if (!description) {
        alert('Добавьте описание');
        return;
      }
      onAddPostClick({
        description: description.replaceAll('<', '&lt;').replaceAll('>', '&gt;'),
        imageUrl: imageUrl,
      });
    });
  };
  render();
}

