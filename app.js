let dataList = document.querySelector("#dog-breeds");
let searchButton = document.querySelector("#getimg");
let inputfield = document.querySelector("#breed-input");
let gallery = document.querySelector("#img-gallery");
let message = document.querySelector("#message");
let dog_imgs = [];

function renderImgs() {
    renderMessage();
    for (image of dog_imgs) {
        const cur_img = document.createElement("img");
        cur_img.src = image;
        gallery.append(cur_img);
    }
}

function renderMessage() {
    message.innerHTML = `found ${dog_imgs.length} results`;
}

async function fetch_images(dog_breed) {
    let imgs = await axios.get(`https://dog.ceo/api/breed/${dog_breed}/images`);
    for (item of imgs.data.message) {
        dog_imgs.push(item);
    }
    console.log(dog_imgs);
    renderImgs();
}

async function getBreeds() {
    const resp = await axios.get("https://dog.ceo/api/breeds/list/all");
    let breeds = resp.data.message;
    for (let breed in breeds) {
        let option = document.createElement("option");
        option.value = breed;
        dataList.append(option);
    }
}

searchButton.addEventListener("click", () => {
    fetch_images(inputfield.value);
});


getBreeds();
