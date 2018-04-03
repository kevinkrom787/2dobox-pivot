function getIdeas(card) {
var foo = JSON.parse(localStorage.getItem(card.id));
debugger;
};

getIdeas();

$titleInput = $('.title-input');
$bodyInput = $('.body-input');
$saveBtn = $('.save-button');
$topSection = $('.top-section');
$bottomSection = $('.bottom-section');
$searchInput = $('.search-input');
$deleteBtn = $

$saveBtn.on('click', createIdea);
var cards = [];
function createIdea() {
  event.preventDefault();
  var card = new Card($titleInput.val(),  $bodyInput.val());
  var stringifyCard = JSON.stringify(card);
  localStorage.setItem(card.id, stringifyCard);

  cards.push(card);
  prependIdea(card);
 
}
  
function Card(title, body, id, quality) {
    this.title = title;
    this.body = body;
    this.id = Date.now();
    this.quality = 'swill';
}

function prependIdea(card) {
  console.log(card)
 $bottomSection.prepend (`
   <article class="idea-title-article" id=${card.id}>
   <h2>${card.title}</h2>
   <div class="idea-body-article">
   <h3>${card.body}</h3>
   <p>quality: ${card.quality} </p>
   <hr id='idea-underline'>
   </article>`);
}

// function prependIdea(event) {
//   // event.preventDefault();
//   var card = new Card($titleInput.val(),  $bodyInput.val())

//   var stringifyCard = JSON.stringify(card);
//   localStorage.setItem(card.id, stringifyCard);
// }

// function searchIdea() {

// }

