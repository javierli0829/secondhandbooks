var bookTitle = document.querySelector("#bookTitle").innerText;
var bookAuthors = document.querySelector("#bookAuthors").innerText;
var category = document.getElementsByClassName("actionLinkLite bookPageGenreLink")[0].innerText;
var description = document.querySelector("#description").children[0].innerText;
var image = document.querySelector("#coverImage").src;

chrome.runtime.sendMessage( 
{ 
  bookTitle: bookTitle,
  bookAuthors: bookAuthors,
  category: category,
  description: description,
  image: image
}, function(response) {});