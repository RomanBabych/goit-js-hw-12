export const createGalleryItemMarkup = images => {
  return images
    .map(
      image => `
<li class='gallery-item'>
<a class='gallery-item-link' href='${image.largeImageURL}'>
    <img
    src='${image.webformatURL}'
    alt='${image.tags}'>
</a>
<div class='stats'>
<span>
<p class='stat-name'>Likes</p>
<p class='stat-value'>${image.likes}</p>
</span>
<span>
<p class='stat-name'>Views</p>
<p class='stat-value'>${image.views}</p>
</span>
<span>
<p class='stat-name'>Comments</p>
<p class='stat-value'>${image.comments}</p>
</span>
<span>
<p class='stat-name'>Downloads</p>
<p class='stat-value'>${image.downloads}</p>
</span>
</div>
</li>
`
    )
    .join('');
};
