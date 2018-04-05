$titleInput = $('.title-input');
$bodyInput = $('.body-input');
$saveBtn = $('.save-button');
$topSection = $('.top-section');
$bottomSection = $('.bottom-section');
$searchInput = $('.search-input');
$deleteBtn = $('.delete-button');
$upvoteBtn = $('.upvote-button')
$downvoteBtn = $('.downvote-button')
var cards = [];



$saveBtn.on('click', createIdea);
$bottomSection.on('click', '.delete-button', deleteCard);
$bottomSection.on('click', '.upvote-button', increaseQuality);
$bottomSection.on('click', '.downvote-button', decreaseQuality);


function getIdeas() {
  for (var i=0; i < localStorage.length; i++) {
    // console.log(i, localStorage, localStorage.key(i))
    var stored = localStorage.getItem(localStorage.key(i))
    console.log(stored, 'stored')
    var parsedCard = JSON.parse(stored); 
    console.log('parsed', parsedCard);
    prependIdea(parsedCard);
  }
};

getIdeas();

function createIdea() {
  event.preventDefault();
  var card = new Card($titleInput.val(),  $bodyInput.val());
  cards.push(card);
  prependIdea(card);
  storeIdea(card);
 
}
  
function Card(title, body, id, quality) {
    this.title = title;
    this.body = body;
    this.id = Date.now();
    this.quality = 'swill';
}

function prependIdea(card) {
 $bottomSection.prepend (`
   <article class="idea-card" id=${card.id}>
   <h2 contenteditable>${card.title}</h2
   <img src = 'icons/upvote.svg' class='upvote-button' width="20px" height='20px'>
   <img src = 'icons/downvote.svg' class='downvote-button' width='20px' height='20px'>
   <img src = 'icons/delete.svg' class='delete-button' width='20px' height='20px'>
   <hr id='idea-underline'>
   
   </article>`);
}

function storeIdea(card) {
  var stringifyCard = JSON.stringify(card);
  localStorage.setItem(card.id, stringifyCard);
}



// function searchIdea() {

// }

function decreaseQuality() {
  var decreaseQuality = $(this).closest('.idea-card');
  var cardId = decreaseQuality.attr('id');
  decreaseQuality.quality.innerHTML = "quality: plausible";
  quality.innerText = "quality: swill";
  console.log('decrease')
}

function increaseQuality() {
  var increaseQuality = $(this).closest('.idea-card');
  var cardId = increaseQuality.attr('id');
  quality.innerText = "quality: plausible";
  quality.innerText = "quality: genius";
  console.log('quality')
}

// function increaseQuality() {
//   var increaseQuality = $(this).closest('.idea-card');
//   var cardId = increaseQuality.attr('id');
//     if (card.quality.innerText = 'swill') {
//       card.quality.innerText = 'plausible'
//     } else if {
//       (card.quality.innerText ='plausible') {
//         card.quality.innerText = 'genius'
//       }
//       else {
//       card.quality.innerText = 'genius'
//     }
// }

function deleteCard() {
  var deleteCard = $(this).closest('.idea-card');
  var cardId = deleteCard.attr('id');
  console.log(deleteCard);
  console.log(cardId);
  deleteCard.remove();
  localStorage.removeItem(cardId);

