const pollTitle = document.getElementById('poll__title');
const pollAnswers = document.getElementById('poll__answers');
const url = 'https://students.netoservices.ru/nestjs-backend/poll';

function statHtmlTemplate(answer, votes) {
  return `
    <div class="poll__answer">${answer}: ${votes}%</div>
  `
}

function addStat(statList) {
  for (i in statList) {
    let { answer, votes } = statList[i];
    pollAnswers.insertAdjacentHTML('beforeend', statHtmlTemplate(answer, votes));
  }
}

function postAnswer(id, index) {
  data = {
    vote: id.toString(),
    answer: index.toString()
  }

  fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json'
    }
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      addStat(data.stat);
    })
    .catch(err => {
      console.log('Ошибка ', err);
    })
}

function vote(id) {
  let pollAnswer = document.querySelectorAll('.poll__answer');

  pollAnswer.forEach((element, index) => {
    element.addEventListener("click", e => {
      e.preventDefault();

      alert('Спасибо, ваш голос засчитан!');
      pollAnswer.forEach(e => e.remove());
      postAnswer(id, index);
    })
  })
}

function answerHtmlTemplate(answer) {
    return `
      <button class="poll__answer">${answer}</button>
    `
}

function addSurveyDataToPage(title, answers, id) {
  pollTitle.textContent = title;

  for ( let index in answers) {
    pollAnswers.insertAdjacentHTML('beforeend', answerHtmlTemplate(answers[index]));
  }
  vote(id);
}

function getSurveyData() {
  fetch(url)
    .then(response => {
      return response.json();
    })
    .then(surveyData => {
      let { id } = surveyData;
      let { title, answers } = surveyData.data;
      addSurveyDataToPage(title, answers, id);
    })
    .catch(err => {
      console.log(err);
    })

}

document.addEventListener("DOMContentLoaded", () => {
  getSurveyData();
})
