$(document).ready(function() {
  $('.save-button').prop('disabled', true)
  disableButton()
})


$('.save-button').on('click', createTask);
$('.save-button').on('click', disableButton);

$('.bottom-section').on('click', '.delete-button', deleteCard);
$('.bottom-section').on('blur', '.task-title', editTitle);
$('.bottom-section').on('keydown blur', '.task-body', editBody);
$('.bottom-section').on('click', '.upvote-button', increaseQuality);
$('.bottom-section').on('click', '.downvote-button', decreaseQuality);
$('.search-input').on('keyup', filterIdeas);



function disableButton() {
        $('.title-input, .body-input').keyup(function () {
            if ($('.title-input').val() == '' || $('.body-input').val() == '') {
                $('.save-button').prop('disabled', true);
            } else {
                $('.save-button').prop('disabled', false);
            }
        });
    }

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
   // hideCompleteTasks(parsedCard);
 }
};

getIdeas();
 
function Card(title, body) {

  this.title = title;
  this.body = body;
  this.id = Date.now();
  this.quality = 'normal';
  this.complete = false;
}

function prependIdea(card) {
  var completedClass = ''
   if (card.complete === true) {
    completedClass = 'task-done';
  }
  $('.bottom-section').prepend (`
    <article class="idea-card" id=${card.id}>
     <img src ='icons/delete.svg' alt='delete-button' class='delete-button' width='20px' height='20px'>
     <h2 class='task-title' contenteditable>${card.title}</h2>
     <h3 class='task-body' contenteditable>${card.body}</h3>
     <img src ='icons/upvote.svg' alt='upvote-button' class='upvote-button' width="20px" height='20px'>
     <img src ='icons/downvote.svg' alt='downvote-button' class='downvote-button' width='20px' height='20px'>
     <p>quality:</p>
     <p id ='quality'> ${card.quality}</p>
     <button class='complete-button ${completedClass}'>Completed Task</button>
     <hr id='idea-underline'>
    </article>`);

  }

function storeIdea(card) {
  var stringifyCard = JSON.stringify(card);
  localStorage.setItem(card.id, stringifyCard);
}

function editTitle(card) {
  var currentCard = $(this).closest('.idea-card');
  var cardId = currentCard.attr('id');
  var parsedCard = JSON.parse(localStorage.getItem(cardId));
  parsedCard.title = $(this).text();
  storeIdea(parsedCard);
}

function editBody(card) {
  var currentCard = $(this).closest('.idea-card');
  var cardId = currentCard.attr('id');
  var parsedCard = JSON.parse(localStorage.getItem(cardId));
  parsedCard.body = $(this).text();
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
 if (upQualityID.text() === ' normal') {
  upQualityID.text(' high');
} else if (upQualityID.text() === ' high') {
    upQualityID.text(' critical');
} else if (upQualityID.text() === ' none ') {
    upQualityID.text(' low');
}  else if (upQualityID.text() === ' low') {
    upQualityID.text(' normal');
  }
storeQuality(cardId, upQualityID.text())
}

function decreaseQuality() {
var downQualityID = $(this).parent().find('#quality');
var cardId = downQualityID.parent().attr('id');
if (downQualityID.text() === ' normal') {
  downQualityID.text(' low');
} else if (downQualityID.text() === ' low') {
  downQualityID.text(' none');
} else if (downQualityID.text() === ' critical') {
  downQualityID.text(' high');
} else if (downQualityID.text() === ' high') {
  downQualityID.text(' normal');
}
 storeQuality(cardId, downQualityID.text());
}

function deleteCard() {
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

$('.bottom-section').on('click', '.complete-button', markAsComplete);

function markAsComplete(card) {
  var currentCard = $(this).closest('.idea-card');
  var cardId = currentCard.attr('id');
  var parsedCard = JSON.parse(localStorage.getItem(cardId));
  // $complete = $('.complete-button');
  $(this).toggleClass('task-done')
  if (parsedCard.complete === false) {
    parsedCard.complete = true;
    } else {
      parsedCard.complete = false;
    }
  storeIdea(parsedCard);
}



$(document).ready(hideCompleteTasks);

function hideCompleteTasks() {
  var completedButtons = $('.task-done');
  var tasksToHide = completedButtons.parent();
  tasksToHide.css('display', 'none')
}





