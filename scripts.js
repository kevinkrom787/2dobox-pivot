var titleInput = document.querySelector('.title-input');
var bodyInput = document.querySelector('.body-input');
var saveBtn = document.querySelector('.save-button');
var topSection = document.querySelector('.top-section');
var bottomSection = document.querySelector('.bottom-section');
var searchInput = document.querySelector('.search-input');
saveBtn.addEventListener('click', createIdea);

function createIdea() {
  event.preventDefault();
  var idea=document.createElement('article');
  idea.setAttribute('class', 'idea-body');
  prependIdea(bottomSection, idea);
  titleInput.value = '';
  bodyInput.value='';
}
  



// function searchIdea() {

// }