// on form submit, append div that has meme (img and text)

//REQUIREMENTS:
//submit form on page to generate a new meme, add multiple to page by submitting alot
//click on a button to remove a meme from page
//on form submit, clear all inputs
//STYLE IT!!!!

const form = document.querySelector('form');
const memeSection = document.querySelector("#memes");
const imageInput = document.querySelector('#image-input');
const topTextInput = document.querySelector('#top-text-input');
const bottomTextInput = document.querySelector('#bottom-text-input');
const randomMemeBtn = document.querySelector('.meme-random');


async function getRandomMeme() {
  const randomIndex = Math.floor(Math.random() * 69);
  const response = await fetch('https://api.imgflip.com/get_memes');
  const data = await response.json();
  const filteredMemes = data.data.memes.filter(meme => meme.box_count < 3);
  imageInput.value = filteredMemes[randomIndex].url;
}

function createOverlay() {
  const div = document.createElement("div");
  const span = document.createElement("span");
  div.classList.add('overlay');
  span.classList.add("delete-meme");
  span.innerText = 'x';
  div.appendChild(span);
  return div;
}

function isImgLink(url) {
  const regex = /(https:\/\/)([^\s(["<,>/]*)(\/)[^\s[",><]*(.png|.jpg)(\?[^\s[",><]*)?/;
  return regex.test(url);
}

function createImg() {
  const img = document.createElement('img');
  img.src = imageInput.value;
  img.classList.add("meme");
  return img;
}

function createTopSpan() {
  const topSpan = document.createElement('span');
  topSpan.innerText = topTextInput.value.toUpperCase();
  topSpan.classList.add("top-text");
  return topSpan;
}

function createBottomSpan() {
  const bottomSpan = document.createElement("span");
  bottomSpan.innerText = bottomTextInput.value.toUpperCase();
  bottomSpan.classList.add("bottom-text");
  return bottomSpan;
}

function createMeme() {
  if (!isImgLink(imageInput.value)) {
    alert("Invalid or broken image URL");
    return;
  }

  const memeDiv = document.createElement('div');
  memeDiv.classList.add("meme-div");

  const img = createImg();
  const topSpan = createTopSpan();
  const bottomSpan = createBottomSpan();
  const overlay = createOverlay();

  memeDiv.append(img, topSpan, bottomSpan, overlay);
  return memeDiv;
}

function submitMeme(e) {
  e.preventDefault();
  memeSection.append(createMeme() || '');
  form.reset();
}

function deleteMeme(e) {
  if (e.target.classList.contains('overlay') || e.target.classList.contains('delete-meme')) {
    if (confirm('Are you sure you want to delete this meme?')) {
      e.target.closest('div.meme-div').remove();
    }
  }
}


form.addEventListener('submit', submitMeme);
memeSection.addEventListener('click', deleteMeme);
randomMemeBtn.addEventListener('click', getRandomMeme);
