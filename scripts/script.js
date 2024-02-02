import questions from "../data/data.js";
import { getQuestionsSlide, getImagesSlide } from "./generateHtml.js";
const questionsSlide = document.getElementById('questions-slide');
const imagesSlide = document.getElementById('images-slide');
const insertQuestions = document.getElementById('insert-questions-after-begin');
const insertImages = document.getElementById('insert-images-after-begin');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');
const modalTitle = document.getElementById('modal-title');
const modalText = document.getElementById('modal-text');
const modalButton = document.getElementById('modal-button');
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
    if (e.target.id === 'modal-button') {
        modal.classList.remove('modal_open');
        changeSlide();
    }
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
    const question = questions[activeIndexSlide - 1];
    const correct = question.correct;
    modal.classList.add('modal_open');
    if (e.target[correct].checked) {
        modalContent.classList.remove('modal-content_wrong');
        modalContent.classList.add('modal-content_right');
        modalTitle.innerText = 'Правильно! Это:';
        modalText.innerText = question.variants[correct];
        counterCorrectAnswers += 1;
    }
    else {
        modalContent.classList.remove('modal-content_right');
        modalContent.classList.add('modal-content_wrong');
        if (e.target[0].checked || e.target[1].checked || e.target[2].checked) {
            modalTitle.innerText = 'Не правильно. Это:';
        }
        else {
            modalTitle.innerText = 'Это:';
        }
        modalText.innerText = question.variants[correct];
    }
    if (question.id === countSlides - 3) {
        insertResult.innerText = (`${counterCorrectAnswers} из ${countSlides - 2} правильно!`);
    }
}
