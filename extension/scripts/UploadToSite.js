var bookTitle = document.querySelector("#bookTitle").innerText;
var bookAuthors = document.querySelector("#bookAuthors").innerText;
var category = document.getElementsByClassName("actionLinkLite bookPageGenreLink")[0].innerText;
var description = document.querySelector("#description").children[0].innerText;
var image = document.querySelector("#coverImage").src;

if (category=="Fiction" || category=="Literature")
    category = "1";
else if (category=="Comics")
    category = "2";
else if (category=="Biography" || category=="Autobiography")
    category = "4";
else if (category=="Textbooks" || category=="Reference")
    category = "5"; 
else if (category=="Food and Drink")
    category = "6";

chrome.runtime.sendMessage( 
{ 
  bookTitle: bookTitle,
  bookAuthors: bookAuthors,
  category: category,
  description: description,
  image: image
}, function(response) {});