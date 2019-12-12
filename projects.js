const client = contentful.createClient({
  space: '11nqwoqf3iw0',
  accessToken: 'V4W-sWHHPe1ZvM4cHGU11qdXrl4fJxr7iK8NrZ40LjU'
});

const id = document.querySelector('body').className;

client
  .getAsset(id)
  .then(asset => {
    let header = document.getElementById('header');
    let fragment = document.createDocumentFragment();
    let h1 = document.createElement('h1');
    let p = document.createElement('p');
    h1.textContent = asset.fields.title;
    p.textContent = asset.fields.description;
    fragment.appendChild(h1);
    fragment.appendChild(p);
    header.appendChild(fragment);

    let imgSection = document.querySelector('.image.main');
    let img = document.createElement('img');
    img.src = 'https:' + asset.fields.file.url;
    img.alt = asset.fields.title;
    imgSection.appendChild(img);
  })
  .catch(e => {
    console.log(e);
  });

console.log('Hi :)');