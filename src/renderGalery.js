const gallery = document.querySelector('.gallery');
export default function renderGaleryItem(images) {
    const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return `<div class="photo-card">
        <a href="${webformatURL}">
        <img class="img-card" src="${largeImageURL}" alt="${tags}" loading="lazy" width="300" height="200" />
        </a>
        <div class="info">
          <p class="info-item">
            <b>Likes</b>
            <span>${likes}</span>
          </p>
          <p class="info-item">
            <b>Views</b>
            <span>${views}</span>
          </p>
          <p class="info-item">
            <b>Comments</b>
            <span>${comments}</span>
          </p>
          <p class="info-item">
            <b>Downloads</b>
            <span>${downloads}</span>
          </p>
        </div>
      </div>`
    }).join('');

    gallery.insertAdjacentHTML("beforeend", markup);
}