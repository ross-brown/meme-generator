
# Meme Generator

A meme generator that accepts a image URL or file upload, as well as optional text to be placed at the top and bottom of the image. 

Can also make fetch API calls to generate a random meme URL from Imgflip API.


## Tech Stack

JavaScript, HTML, CSS



## Lessons Learned

A greater refresher on building a simple web app with plain JavaScript. Utilized DOM manipulation and traversal in order to create a meme,
as well as be able to click on an existing meme and have it be removed from the DOM. 

One challenge I had throughout building this was figuring out a way to validate the input of the image URL. 
I researched mutliple possible solutions that included async fetch calls and also Promises. 
This over complicated the code and made it more messy than it needed to be. I ended up using regular expressions to match the URL to validate that
it had certain extensions on it to be an image, which ended up looking alot nicer and readable.
