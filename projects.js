var client = contentful.createClient({
  space: '11nqwoqf3iw0',
  accessToken: 'V4W-sWHHPe1ZvM4cHGU11qdXrl4fJxr7iK8NrZ40LjU'
});

var id = document.querySelector('body').className;

client
  .getAsset(id)
  .then(function(asset) {
    var header = document.getElementById('header');
    var fragment = document.createDocumentFragment();
    var h1 = document.createElement('h1');
    var p = document.createElement('p');
    h1.textContent = asset.fields.title;
    p.textContent = asset.fields.description;
    fragment.appendChild(h1);
    fragment.appendChild(p);
    header.appendChild(fragment);

    var imgSection = document.querySelector('.image.main');
    var img = document.createElement('img');
    img.src = 'https:' + asset.fields.file.url;
    img.alt = asset.fields.title;
    imgSection.appendChild(img);
  })
  .catch(function(e) {
    console.log(e);
  });

console.log('Hi :)');