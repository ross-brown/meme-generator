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


function createMeme() {
  const memeDiv = document.createElement('div');
  const img = document.createElement('img');
  const topSpan = document.createElement('span');
  const bottomSpan = document.createElement('span');

  memeDiv.classList.add("meme-div");

  img.src = imageInput.value;
  img.classList.add("meme");

  topSpan.innerText = topTextInput.value;
  topSpan.classList.add('top-text');
  bottomSpan.innerText = bottomTextInput.value;
  bottomSpan.classList.add('bottom-text');

  memeDiv.appendChild(img);
  memeDiv.appendChild(topSpan);
  memeDiv.appendChild(bottomSpan);
  return memeDiv;
}

function submitMeme(e) {
  e.preventDefault();
  memeSection.append(createMeme());
  form.reset();
}


form.addEventListener('submit', submitMeme);
