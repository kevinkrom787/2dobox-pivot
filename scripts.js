
$saveBtn = $('.save-button');
$bottomSection = $('.bottom-section');
$searchInput = $('.search-input');
$deleteBtn = $('.delete-button');
$upvoteBtn = $('.upvote-button')
$downvoteBtn = $('.downvote-button')


$saveBtn.on('click', createTask);
$bottomSection.on('click', '.delete-button', deleteCard);
$bottomSection.on('blur', '.task-title', editTitle);
$bottomSection.on('keydown blur', '.task-body', editBody);
$bottomSection.on('click', '.upvote-button', increaseQuality);
$bottomSection.on('click', '.downvote-button', decreaseQuality);
$searchInput.on('keyup', filterIdeas);



function createTask() {
  $titleInput = $('.title-input');
  $bodyInput = $('.body-input');
  $saveBtn = $('.save-button');
  var card = new Card($titleInput.val(), $bodyInput.val());
  prependIdea(card);
  storeIdea(card);
  clearInputs();
}

function clearInputs() {
  $titleInput = $('.title-input');
  $bodyInput = $('.body-input');
  $('.title-input').val('');
  $('.body-input').val('');
}

function getIdeas() {
 for (var i=0; i < localStorage.length; i++) {
   var stored = localStorage.getItem(localStorage.key(i))
   var parsedCard = JSON.parse(stored);
   prependIdea(parsedCard);
 }
};

getIdeas();
 
function Card(title, body) {
 this.title = title;
 this.body = body;
 this.id = Date.now() || id;
 // this.qualityPosition = 2;
 this.quality = 'normal';
 // ['critical', 'high', 'normal', 'low', 'none'];
}

function prependIdea(card) {
$bottomSection.prepend (`
<article class="idea-card" id=${card.id}>
<img src ='icons/delete.svg' alt='delete-button' class='delete-button' width='20px' height='20px'>
 <h2 class='task-title' contenteditable>${card.title}</h2>
 <h3 class='task-body' contenteditable>${card.body}</h3>
 <img src ='icons/upvote.svg' alt='upvote-button' class='upvote-button' width="20px" height='20px'>
 <img src ='icons/downvote.svg' alt='downvote-button' class='downvote-button' width='20px' height='20px'>
 <p>quality:</p>
 <p id ='quality'> ${card.quality}</p>
 <hr id='idea-underline'>
</article>`);
}

function storeIdea(card) {
 var stringifyCard = JSON.stringify(card);
 localStorage.setItem(card.id, stringifyCard);
}


function editTitle(card) {
  var key = $(this).parent()[0].id;
  var currentTask = $(this).closest('.task-title');
  // getCard(key(date.now));
  var stringifiedTask = JSON.stringify(currentTask);
  localStorage.setItem(card.id, stringifiedTask);
  // update card with userInput
  // put back into localStorage with storeIdea
}

// get item from localStorate with ID
// function getCard(id) {
  // pull something out of localStorage based on id/key
  // store nonUpdated card in variable




function editBody() {
  console.log('thios')
 var currentCard = $(this).closest('.idea-card');
 var cardId = currentCard.attr('id');
 var parsedCard = JSON.parse(localStorage.getItem(cardId));
 parsedCard.body = $(this).text();
 console.log(parsedCard);
 storeIdea(parsedCard);
}

function storeQuality(cardId, qualityValue) {
 var parsedCard = JSON.parse(localStorage.getItem(cardId));
 parsedCard.quality = qualityValue;
 storeIdea(parsedCard);
}

function increaseQuality() {
var upQualityID = $(this).parent().find('#quality');
 var cardId = upQualityID.parent().attr('id');
 if (upQualityID.text() === 'none') {
  upQualityID.text('low');
} else if (upQualityID.text() === ' low') {
    upQualityID.text('normal');  
} else if (upQualityID.text() === ' normal') {
    upQualityID.text('high');
} else if (upQualityID.text() === ' high') {
    upQualityID.text('critical');
}
storeQuality(cardId, upQualityID.text())
}

function decreaseQuality() {
  // debugger;
var downQualityID = $(this).parent().find('#quality');
var cardId = downQualityID.parent().attr('id');
if (downQualityID.text() === ' critical') {
  downQualityID.text('high');
} else if (downQualityID.text() === ' high') {
  downQualityID.text('normal');
} else if (downQualityID.text() === ' normal') {
  downQualityID.text('low');
} else if (downQualityID.text() === ' low') {
  downQualityID.text('none');
} 
 storeQuality(cardId, downQualityID.text());
}

function deleteCard() {
  console.log(this)
 var deleteCard = $(this).closest('.idea-card');
 var cardId = deleteCard.attr('id');
 deleteCard.remove();
 localStorage.removeItem(cardId);
}

function filterIdeas() {
    $searchInput = $('.search-input').val().toUpperCase();
    $taskTitle = $('.task-title');
    $taskBody = $('.task-body');
    for (var i = 0; i < $taskTitle.length; i++ ){
        if ($($taskTitle[i]).text().toUpperCase().includes($searchInput) || $($taskBody[i]).text().toUpperCase().includes($searchInput)) {
          $($taskTitle[i]).parent().css('display', 'block');
        } else {
          $($taskTitle[i]).parent().css('display', 'none');
        }
    };
  }
