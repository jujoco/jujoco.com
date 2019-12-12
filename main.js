document.querySelector('body').classList.toggle('is-preload');

const client = contentful.createClient({
  space: "11nqwoqf3iw0",
  accessToken: "V4W-sWHHPe1ZvM4cHGU11qdXrl4fJxr7iK8NrZ40LjU"
});

client
  .getAssets()
  .then(assets => {
    let featureList = document.querySelector(".features");
    assets.items.forEach(asset => {
      let li = document.createElement("li");
      let p = document.createElement("p");
      let h3 = document.createElement("h3");
      let imageFile = document.createElement("img");
      let imageURL = "https:" + asset.fields.file.url;
      imageFile.src = imageURL;
      imageFile.className = "icon major";
      imageFile.alt = asset.fields.title;
      p.textContent = asset.fields.description;
      h3.textContent = asset.fields.title;
      li.appendChild(imageFile);
      li.appendChild(h3);
      li.appendChild(p);
      featureList.appendChild(li);
    });
  })
  .catch(e => {
    console.log(e);
  });
