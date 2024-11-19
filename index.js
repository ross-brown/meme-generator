"use strict";

const form = document.querySelector('form');
const memeSection = document.querySelector("#memes");
const imageInput = document.querySelector('#image-input');
const topTextInput = document.querySelector('#top-text-input');
const bottomTextInput = document.querySelector('#bottom-text-input');
const randomMemeBtn = document.querySelector('.meme-random');
const fileUploadInput = document.querySelector('#image-upload');

const MEME_API_URL = 'https://api.imgflip.com/get_memes';

function isImgLink(url) {
  if (typeof url !== 'string') return false;

  const regex = /(https:\/\/)([^\s(["<,>/]*)(\/)[^\s[",><]*(.png|.jpg)(\?[^\s[",><]*)?/;
  return regex.test(url);
}


async function getRandomMeme() {
  try {
    const response = await fetch(MEME_API_URL);
    const data = await response.json();
    const filteredMemes = data.data.memes.filter(meme => meme.box_count < 3);

    if (filteredMemes.length === 0) throw new Error('No valid memes available');

    const randomIndex = Math.floor(Math.random() * filteredMemes.length);
    return filteredMemes[randomIndex].url;
  } catch (error) {
    console.error(error);
    return null;
  }
}

function createOverlay() {
  const overlay = document.createElement("div");
  overlay.classList.add('overlay');

  const deleteButton = document.createElement("span");
  deleteButton.classList.add("delete-meme");
  deleteButton.innerText = 'x';
  overlay.appendChild(deleteButton);

  return overlay;
}

function createImg() {
  const img = document.createElement('img');
  img.src = fileUploadInput.files[0] ? URL.createObjectURL(fileUploadInput.files[0]) : imageInput.value;
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
  if (!isImgLink(imageInput.value) && !fileUploadInput.files[0]) {
    alert("Please enter a valid Image URL or File");
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


async function handleRandomMeme() {
  const memeURL = await getRandomMeme();
  if (memeURL) imageInput.value = memeURL;
}

function handleSubmit(event) {
  event.preventDefault();
  const newMeme = createMeme();

  if (newMeme) {
    memeSection.appendChild(newMeme);
    form.reset();
  }
}

function handleDeleteMeme(event) {
  if (event.target.classList.contains('overlay') || event.target.classList.contains('delete-meme')) {
    if (confirm('Are you sure you want to delete this meme?')) {
      event.target.closest('div.meme-div').remove();
    }
  }
}


form.addEventListener('submit', handleSubmit);
memeSection.addEventListener('click', handleDeleteMeme);
randomMemeBtn.addEventListener('click', handleRandomMeme);
