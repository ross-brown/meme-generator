// on form submit, append div that has meme (img and text)

//REQUIREMENTS:
//submit form on page to generate a new meme, add multiple to page by submitting alot
//click on a button to remove a meme from page
//on form submit, clear all inputs
//STYLE IT!!!!

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const memeSection = document.querySelector("#memes");
  const imageInput = document.querySelector('#image-input');
  const topTextInput = document.querySelector('#top-text-input');
  const bottomTextInput = document.querySelector('#bottom-text-input');


  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const newImg = document.createElement('img');
    newImg.src = imageInput.value;
    newImg.classList.add("meme")
    memeSection.append(newImg);
    form.reset();
  });
})
