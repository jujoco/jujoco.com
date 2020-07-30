import { createClient } from 'contentful'
import '../css/main.css'

const client = createClient({
  space: '11nqwoqf3iw0',
  accessToken: 'V4W-sWHHPe1ZvM4cHGU11qdXrl4fJxr7iK8NrZ40LjU'
});


export const func1 = () => {
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
}


export const func2 = function() {
  document.querySelector('body').classList.toggle('is-preload');

  client
    .getAssets()
    .then(function(assets) {
      let featureList = document.querySelector('.features');
      let fragment = document.createDocumentFragment();
      assets.items.forEach(function(asset, i) {
        let li = document.createElement('li');
        let a = document.createElement('a');
        let img = document.createElement('img');
        let h3 = document.createElement('h3');
        let p = document.createElement('p');

        a.href = 'project-' + i + '.html';
        img.src = 'https:' + asset.fields.file.url;
        img.className = 'icon major';
        img.alt = asset.fields.title;
        p.textContent = asset.fields.description;
        h3.textContent = asset.fields.title;
        a.appendChild(img);
        li.appendChild(a);
        li.appendChild(h3);
        li.appendChild(p);
        fragment.appendChild(li);
      });
      featureList.appendChild(fragment);
    })
    .catch(function(e) {
      console.log(e);
    });
}