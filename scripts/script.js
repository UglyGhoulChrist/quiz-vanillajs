import questions from "../data/data.js"
import { getQuestionsSlide, getImagesSlide } from "./generateHtml.js"

// Получаю question-slide
const questionsSlide = document.getElementById('questions-slide')
// Получаю images-slide
const imagesSlide = document.getElementById('images-slide')

// Получаю место после которого нужно вставить вопросы
const insertQuestions = document.getElementById('insert-questions-after-begin')
// Получаю место после которого нужно вставить картинки
const insertImages = document.getElementById('insert-images-after-begin')

// Получаю HTML разметку списка вопросов и списка картинок
const questionsHtml = getQuestionsSlide(questions)
const imagesHtml = getImagesSlide(questions)

// Вставляю HTML разметку списка вопросов и списка картинок
insertQuestions.insertAdjacentHTML("afterend", questionsHtml)
insertImages.insertAdjacentHTML("afterend", imagesHtml)

// Получаю количество слайдов
const countSlides = questionsSlide.children.length
// Задаю начальный слайд
let activeIndexSlide = 0

// Получаю место где нужно выставить оценку
const insertResult = document.getElementById('result')

// Количество правильных ответов
let counterCorrectAnswers = 0

// Смещаю imageSlide на n-1 экран вниз
imagesSlide.style.top = `-${100 * (countSlides - 1)}svh`

// Ловлю клик по кнопкам => запускаю функцию смещения на +1 позицию
addEventListener('click', (e) => {
    if (e.target.classList.contains('start-button')) changeSlide(1)
    if (e.target.classList.contains('answer-button')) changeSlide(1)
    // Возврата на начало игры
    if (e.target.classList.contains('end-button')) window.location.reload()
})

// Ловлю клик submit form => отменяю действие по умолчанию, проверяю правильность ответа
addEventListener('submit', (e) => {
    if (e.target.classList.contains('form')) {
        e.preventDefault()
        checkCorrectnessAnswer(e)
    }
})

// Функция смещения на +1 позицию
function changeSlide(direction) {
    activeIndexSlide += direction
    // Смещает левую часть в одну сторону, правую в другую сторону
    questionsSlide.style.transform = `translateY(${-100 * activeIndexSlide}vh)`
    imagesSlide.style.transform = `translateY(${+100 * activeIndexSlide}vh)`
};

// Функция проверки правильного ответа
function checkCorrectnessAnswer(e) {
    // Получаю вопрос на который отвечаю
    const question = questions[e.target.name]
    // Получаю правильный ответ вопроса
    const correct = question.correct
    // Проверяю правильно ответил или нет
    if (e.target[correct].checked) counterCorrectAnswers += 1
    // Проверяю последний ли был вопрос
    if (question.id === countSlides - 3) {
        // Выставляю оценку
        insertResult.innerText = (`${counterCorrectAnswers} из ${countSlides - 2} правильно!`)
    }
}