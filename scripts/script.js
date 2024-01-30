import questions from "../data/data.js";
import { getQuestionsSlide, getImagesSlide } from "./generateHtml.js";
const questionsSlide = document.getElementById('questions-slide');
const imagesSlide = document.getElementById('images-slide');
const insertQuestions = document.getElementById('insert-questions-after-begin');
const insertImages = document.getElementById('insert-images-after-begin');
const questionsHtml = getQuestionsSlide(questions);
const imagesHtml = getImagesSlide(questions);
insertQuestions && insertQuestions.insertAdjacentHTML("afterend", questionsHtml);
insertImages && insertImages.insertAdjacentHTML("afterend", imagesHtml);
const countSlides = questionsSlide === null || questionsSlide === void 0 ? void 0 : questionsSlide.children.length;
let activeIndexSlide = 0;
const insertResult = document.getElementById('result');
let counterCorrectAnswers = 0;
imagesSlide.style.top = `-${100 * (countSlides - 1)}vh`;
const isHtmlElement = (v) => v instanceof HTMLElement;
addEventListener('click', (e) => {
    if (!isHtmlElement(e.target))
        return;
    if (e.target.classList.contains('start-button'))
        changeSlide();
    if (e.target.classList.contains('answer-button'))
        changeSlide();
    if (e.target.classList.contains('end-button'))
        window.location.reload();
});
addEventListener('submit', (e) => {
    if (!isHtmlElement(e.target))
        return;
    if (e.target.classList.contains('form')) {
        e.preventDefault();
        checkCorrectnessAnswer(e);
    }
});
function changeSlide() {
    activeIndexSlide += 1;
    questionsSlide.style.transform = `translateY(${-100 * activeIndexSlide}vh)`;
    imagesSlide.style.transform = `translateY(${+100 * activeIndexSlide}vh)`;
}
;
function checkCorrectnessAnswer(e) {
    if (!isHtmlElement(e.target))
        return;
    const question = questions[e.target.name];
    const correct = question.correct;
    if (e.target[correct].checked)
        counterCorrectAnswers += 1;
    if (question.id === countSlides - 3) {
        insertResult.innerText = (`${counterCorrectAnswers} из ${countSlides - 2} правильно!`);
    }
}
