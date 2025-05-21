// éléments du dom==============================================
let questionPresente = 0;
let score = 0;
let meilleurScore = localStorage.getItem("meilleurScore") || 0;

// selecteurs du dom
const questionElt = document.querySelector(".question");
const reponsesElt = document.querySelector(".reponse");
const scoreElt = document.querySelector(".score");
const bestScoreElt = document.querySelector(".meilleur-score");
const btnDemarrer = document.querySelector(".bouton");
const contQuiz = document.querySelector(".cont-quiz");
// Ecouteurs statiques==========================================================
// bouton demarrer
btnDemarrer.addEventListener("click", demarrer);

// afficher le meilleur score du joueur
bestScoreElt.textContent = `Meilleur score : ${meilleurScore}`;

// cacher les éléments html de la page titre
function demarrer() {
  questionPresente = 0;
  score = 0;
  btnDemarrer.style.display = "none";
  afficherQuestion();
  scoreElt.textContent = "";
  contQuiz.classList.add("visible");
}

function afficherQuestion() {
  reponsesElt.innerHTML = "";
  const contQuiz = document.querySelector(".cont-quiz");
  contQuiz.classList.remove("visible");

  setTimeout(() => {
    if (questionPresente < questions.length) {
      let q = questions[questionPresente];
      questionElt.textContent = q.question;

      q.options.forEach((option) => {
        let btn = document.createElement("button");
        btn.textContent = option;
        btn.className = "option-btn";
        btn.onclick = () => validerReponse(option);
        reponsesElt.appendChild(btn);
      });
    } else {
      finQuiz();
    }
    contQuiz.classList.add("visible");
  }, 350);
}

function validerReponse(optionChoisie) {
  const boutons = document.querySelectorAll('.option-btn');
  let bonneReponse = questions[questionPresente].reponse;

  boutons.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === bonneReponse) {
      btn.classList.add('bonne');
    }
    if (btn.textContent === optionChoisie && optionChoisie !== bonneReponse) {
      btn.classList.add('mauvaise');
    }
  });

  if (optionChoisie === bonneReponse) {
    score++;
  }

  setTimeout(() => {
    questionPresente++;
    afficherQuestion();
  }, 1200);
}

function finQuiz() {
  questionElt.textContent = "Bravo! Vous avez terminé :)";
  reponsesElt.innerHTML = "";
  scoreElt.textContent = `Votre score : ${score} / ${questions.length}`;

  if (score > meilleurScore) {
    meilleurScore = score;
    localStorage.setItem("meilleurScore", meilleurScore);
    bestScoreElt.textContent = `Meilleur score : ${meilleurScore} (Nouveau record !)`;
  } else {
    bestScoreElt.textContent = `Meilleur score : ${meilleurScore}`;
  }

  btnDemarrer.textContent = "Rejouer";
  btnDemarrer.style.display = "inline-block";
  contQuiz.classList.add("visible");
}
