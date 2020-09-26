var accessKey = "YCGAlL3u9atOQlCUNh77ecjUYktCjCotWtZDpgieVH8";
const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
var photosArray = [];

//check function for loading

function imageLoaded() {
  console.log("imageloaded");
  imagesLoaded++;
  console.log(imagesLoaded);
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    console.log(ready);
  }
}

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function displayPhotos() {
  totalImages = photosArray.length;
  imagesLoaded = 0;
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
    // check when images are loaded
    img.addEventListener("load", imageLoaded);

    //run
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}
async function getImagesFromAPi() {
  const imageFetchUrl = `https://api.unsplash.com/photos/random/?client_id=${accessKey}&count=10`;

  try {
    const result = await fetch(imageFetchUrl);
    photosArray = await result.json();
    console.log("loaded", imagesLoaded);
    console.log("total", totalImages);

    displayPhotos();
    // for (var i = 0; i < data.length; i++) {
    //   imageContainer.innerHTML = data[i].urls.raw;
    // }
    // data.map((n) => ( = n.));
  } catch (error) {
    console.log("nada", error);
  }
}

// check to see scrolling at the bottom

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getImagesFromAPi();
  }
});

getImagesFromAPi();
