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
  if(typeof url !== 'string') return false;
  return(url.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gmi) != null);
}



function createMeme() {
  if (!isImgLink(imageInput)) {
    alert("Invalid or broken image URL");
    return;
  }

  const memeDiv = document.createElement('div');
  const img = document.createElement('img');
  const topSpan = document.createElement('span');
  const bottomSpan = document.createElement('span');

  memeDiv.classList.add("meme-div");


  img.src = imageInput.value;
  img.classList.add("meme");

  topSpan.innerText = topTextInput.value.toUpperCase();
  topSpan.classList.add('top-text');
  bottomSpan.innerText = bottomTextInput.value.toUpperCase();
  bottomSpan.classList.add('bottom-text');

  memeDiv.appendChild(img);
  memeDiv.appendChild(topSpan);
  memeDiv.appendChild(bottomSpan);
  memeDiv.appendChild(createOverlay());
  return memeDiv;
}

function submitMeme(e) {
  e.preventDefault();
    memeSection.append(createMeme() || '');
  form.reset();
}

function deleteMeme(e) {
  if (e.target.classList.contains('overlay')) {
    if (confirm('Are you sure you want to delete this meme?')) {
      e.target.parentElement.remove();
    }
  }
}

form.addEventListener('submit', submitMeme);
memeSection.addEventListener('click', deleteMeme);
