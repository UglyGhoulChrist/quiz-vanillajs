import questions from "../data/data.js";
import { IQuestion } from "../interfaces/interfaces.js";
import { getImagesSlide, getQuestionsSlide } from "./generateHtml.js";

// Получаю question-slide
const questionsSlide = <HTMLElement>document.getElementById("questions-slide");
// Получаю images-slide
const imagesSlide = <HTMLElement>document.getElementById("images-slide");
// Получаю место после которого нужно вставить вопросы
const insertQuestions = <HTMLElement>document.getElementById(
    "insert-questions-after-begin",
);
// Получаю место после которого нужно вставить картинки
const insertImages = <HTMLElement>document.getElementById(
    "insert-images-after-begin",
);

// Получаю modal
const modal = <HTMLElement>document.getElementById("modal");
// Получаю modal-content
const modalContent = <HTMLElement>document.getElementById("modal-content");
// Получаю modal-title
const modalTitle = <HTMLElement>document.getElementById("modal-title");
// Получаю modal-text
const modalText = <HTMLElement>document.getElementById("modal-text");
// Получаю modal-button
const modalButton = <HTMLElement>document.getElementById("modal-button");

// Получаю HTML разметку списка вопросов и списка картинок
const questionsHtml: string = getQuestionsSlide(questions);
const imagesHtml: string = getImagesSlide(questions);

// Вставляю HTML разметку списка вопросов и списка картинок
insertQuestions &&
    insertQuestions.insertAdjacentHTML("afterend", questionsHtml);
insertImages && insertImages.insertAdjacentHTML("afterend", imagesHtml);

// Получаю количество слайдов
const countSlides: number = questionsSlide?.children.length;
// Задаю начальный слайд
let activeIndexSlide: number = 0;

// Получаю место где нужно выставить оценку
const insertResult = <HTMLElement>document.getElementById("result");

// Количество правильных ответов
let counterCorrectAnswers: number = 0;

// Смещаю imageSlide на n-1 экран вниз
imagesSlide.style.top = `-${100 * (countSlides - 1)}vh`;

// Проверка объекта события на то, что он HTMLElement
const isHtmlElement = (v: any): v is HTMLElement => v instanceof HTMLElement;

// Ловлю клик по кнопкам => запускаю функцию смещения на +1 позицию
addEventListener("click", (e: Event) => {
    if (!isHtmlElement(e.target)) return;
    if (e.target.classList.contains("start-button")) changeSlide();
    if (e.target.id === "modal-button") {
        modal.classList.remove("modal_open");
        changeSlide();
    }

    // Возврата на начало игры
    if (e.target.classList.contains("end-button")) window.location.reload();
});

// Ловлю клик submit form => отменяю действие по умолчанию, проверяю правильность ответа
addEventListener("submit", (e: Event) => {
    if (!isHtmlElement(e.target)) return;
    if (e.target.classList.contains("form")) {
        e.preventDefault();
        checkCorrectnessAnswer(e);
    }
});

// Функция смещения на +1 позицию
function changeSlide(): void {
    activeIndexSlide += 1;
    // Смещает левую часть в одну сторону, правую в другую сторону
    questionsSlide.style.transform = `translateY(${-100 * activeIndexSlide}vh)`;
    imagesSlide.style.transform = `translateY(${+100 * activeIndexSlide}vh)`;
}

// Функция проверки правильного ответа
function checkCorrectnessAnswer(e: Event): void {
    if (!isHtmlElement(e.target)) return;
    // Получаю вопрос на который отвечаю
    const question: IQuestion = questions[activeIndexSlide - 1];
    // Получаю правильный ответ вопроса
    const correct: 0 | 1 | 2 = question.correct;

    // Показываю модальное окно
    modal.classList.add("modal_open");

    // Получаю чекбоксы
    const checkboxA = <HTMLInputElement>document.getElementById(
        `a${question.id}`,
    );
    const checkboxB = <HTMLInputElement>document.getElementById(
        `b${question.id}`,
    );
    const checkboxC = <HTMLInputElement>document.getElementById(
        `c${question.id}`,
    );

    // Проверяю правильно ответил или нет
    if (
        correct === 0 && checkboxA.checked || correct === 1 && checkboxB.checked ||
        correct == 2 && checkboxC.checked
    ) {
        modalContent.classList.remove("modal-content_wrong");
        modalContent.classList.add("modal-content_right");
        modalTitle.innerText = "Правильно! Это:";
        modalText.innerText = question.variants[correct];
        counterCorrectAnswers += 1;
    } else {
        modalContent.classList.remove("modal-content_right");
        modalContent.classList.add("modal-content_wrong");
        // Проверяю ответил или нет
        if (checkboxA.checked || checkboxB.checked || checkboxC.checked) {
            modalTitle.innerText = "Не правильно. Это:";
        } else {
            modalTitle.innerText = "Это:";
        }
        modalText.innerText = question.variants[correct];
    }

    // Проверяю последний ли был вопрос
    if (question.id === countSlides - 3) {
        // Выставляю оценку
        insertResult.innerText = `${counterCorrectAnswers} из ${countSlides - 2
            } правильно!`;
    }
}
