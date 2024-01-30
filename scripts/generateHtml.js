import backgroundColors from "../data/backgroundColors.js"

/**
 * @description Получить карточку вопроса
 * @param question
 * @returns {string}
 */

function getQuestionSlide(question) {

    const backgroundColor = backgroundColors[~~(Math.random() * backgroundColors.length)]

    return `
<div class="question-slide" style="${backgroundColor}">
    <h2>Вопрос ${question.id + 1}</h2>
    <p>${question.title}</p>
    <div>
        <form name=${question.id} class="form">
            <label class="checkbox" for="a${question.id}">
                <input type="radio" name="answer" id="a${question.id}">${question.variants[0]}
            </label>
            <label class="checkbox" for="b${question.id}">
                <input type="radio" name="answer" id="b${question.id}">${question.variants[1]}
            </label>
            <label class="checkbox" for="c${question.id}">
                <input type="radio" name="answer" id="c${question.id}">${question.variants[2]}
            </label>
            <button type="submit" class="answer-button">Ответить</button>
        </form>
    </div>
</div>          
          `
}

/**
 * @description Получить массив карточек вопросов
 * @param questions
 * @returns {string}
 */

function getQuestionsSlide(questions) {
    return questions.map((question) => getQuestionSlide(question)).join("")
}

/**
 * @description Получить карточку фотографии вопроса
 * @param question
 * @returns {string}
 */

function getImageSlide(question) {
    const pathImage = `./images/${question.id}.webp`
    return `
<div class="image-slide" style="background-image: url(${pathImage});"></div>
        `
}

/**
 * @description Получить массив карточек фотографий вопросов
 * @param questions
 * @returns {string}
 */

function getImagesSlide(questions) {
    return questions.map((question) => getImageSlide(question)).reverse().join("")
}

export { getQuestionsSlide, getImagesSlide }