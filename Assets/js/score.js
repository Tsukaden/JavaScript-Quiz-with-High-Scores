
var highscores = JSON.parse(localStorage.getItem('highscores')) || [];
highscores.sort((a, b) => b.score - a.score);
var output = document.getElementById('output');
highscores.forEach(highscore => {
  var li = document.createElement('li');
  li.textContent = `${highscore.initials} - ${highscore.score}`;
  output.appendChild(li);
});

var resetBtn = document.getElementById('reset');
resetBtn.addEventListener('click', function() {
  localStorage.removeItem('highscores');
  output.innerHTML = '';
});