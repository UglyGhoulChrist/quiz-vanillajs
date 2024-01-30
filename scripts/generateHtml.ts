import { IQuestion } from "../interfaces/interfaces"

/**
 * @description Получить карточку вопроса
 * @param question
 * @returns {string}
 */

function getQuestionSlide({ id, title, background, variants }: IQuestion): string {

    return `
<div class="question-slide" style="background: ${background}">
    <h2>Вопрос ${id + 1}</h2>
    <h4>${title}</h4>
    <div>
        <form name=${id} class="form">
            <label class="checkbox" for="a${id}">
                <input type="radio" name="answer" id="a${id}">${variants[0]}
            </label>
            <label class="checkbox" for="b${id}">
                <input type="radio" name="answer" id="b${id}">${variants[1]}
            </label>
            <label class="checkbox" for="c${id}">
                <input type="radio" name="answer" id="c${id}">${variants[2]}
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

function getQuestionsSlide(questions: IQuestion[]): string {
    return questions.map((question) => getQuestionSlide(question)).join("")
}

/**
 * @description Получить карточку фотографии вопроса
 * @param question
 * @returns {string}
 */

function getImageSlide({ image }: IQuestion): string {
    return `<div class="image-slide" style="background-image: url(./images/${image});"></div>`
}

/**
 * @description Получить массив карточек фотографий вопросов
 * @param questions
 * @returns {string}
 */

function getImagesSlide(questions: IQuestion[]): string {
    return questions.map((question) => getImageSlide(question)).reverse().join("")
}

export { getQuestionsSlide, getImagesSlide }