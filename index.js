let API_KEY = "563492ad6f91700001000001655b3dcd6ee44b8c9bb3116140e09fc1";
let input = document.getElementById("input");
let btn = document.getElementById("btn");
let images = document.getElementById("images");
let inputDiv = document.getElementById("input-div");
let d = (div) => document.createElement(div);
let quantity = 30;
let searchText = "";
let search = false;

// DEFAULT PHOTOS
async function defPhotos() {
  const data = await fetch(
    `https://api.pexels.com/v1/curated?per_page=${quantity}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: API_KEY,
      },
    }
  );
  const res = await data.json();

  console.log(res);
  displayImg(res);
}

// SEARCH PHOTOS
async function searchPhotos(q) {
  const data = await fetch(`https://api.pexels.com/v1/search/?query=${q}`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: API_KEY,
    },
  });
  const res = await data.json();

  console.log(res);
  displayImg(res);
}

function displayImg(res) {
  res.photos.forEach((e) => {
    let image = d("div");
    image.className = "image";
    let img = d("img");
    img.className = "img";
    img.setAttribute("src", `${e.src.portrait}`);
    img.addEventListener("click", () => {
      let modal = d("div");
      modal.className = "modal";
      let cross = d("div");
      cross.className = "cross";
      cross.innerText = "X";
      let alt = d("h2");
      alt.className = "alt";
      alt.innerText = `${e.alt}`;
      cross.addEventListener("click", () => {
        modal.style.display = "none";
      });
      window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          modal.style.display = "none";
        }
      });
      let imgM = d("img");
      imgM.className = "m-img";
      imgM.setAttribute("src", `${e.src.portrait}`);
      let download = d("a");
      download.className = "download";
      download.setAttribute("download", `${e.src.portrait}`);
      let downloadBnt = d("i");
      downloadBnt.className = "fa-solid fa-download";
      download.appendChild(downloadBnt);
      modal.appendChild(download);
      modal.appendChild(alt);
      modal.appendChild(cross);
      modal.appendChild(imgM);
      document.body.appendChild(modal);
    });
    let a = d("a");
    a.className = "author";
    a.setAttribute("href", `${e.photographer_url}`);
    a.setAttribute("target", "blank");
    let p = d("p");
    p.className = "creator";
    p.innerText = `${e.photographer}`;
    let span = d("span");
    span.className = "photo";
    span.innerText = "📷";
    a.appendChild(p);
    a.appendChild(span);
    image.appendChild(img);
    image.appendChild(a);
    images.appendChild(image);
  });
}

input.addEventListener("input", (e) => {
  e.preventDefault();
  searchText = e.target.value;
});

window.addEventListener("keydown", (e) => {
  if (input.value !== "" && e.key === "Enter") {
    clear();
    search = true;
    searchPhotos(searchText);
    input.value = "";
  }
});

btn.addEventListener("click", () => {
  if (input.value !== "") {
    clear();
    searchPhotos(searchText);
    input.value = "";
  }
});

function clear() {
  images.innerHTML = "";
}

defPhotos();
