var accessKey = "YCGAlL3u9atOQlCUNh77ecjUYktCjCotWtZDpgieVH8";
const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

var photosArray = [];

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function displayPhotos() {
  photosArray.forEach((photo) => {
    //create <a> to link to unsplash
    const item = document.createElement("a");
    // item.setAttribute("href", photo.links.html);
    // item.setAttribute("target", "_blank");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    //image on the page
    const img = document.createElement("img");
    // img.setAttribute("src", photo.urls.regular);
    // img.setAttribute("alt", photo.alt_description);
    // img.setAttribute("title", photo.alt_description);
    //put image inside the <a> element and put both inside the container elelment
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    item.appendChild(img);
    imageContainer.appendChild(item);
    console.log(photo);
  });
}
async function getImagesFromAPi() {
  const imageFetchUrl = `https://api.unsplash.com/photos/random/?client_id=${accessKey}&count=10`;

  try {
    const result = await fetch(imageFetchUrl);
    photosArray = await result.json();
    console.log(photosArray);
    displayPhotos();
    // for (var i = 0; i < data.length; i++) {
    //   imageContainer.innerHTML = data[i].urls.raw;
    // }
    // data.map((n) => ( = n.));
  } catch (error) {
    console.log("nada", error);
  }
}

getImagesFromAPi();
