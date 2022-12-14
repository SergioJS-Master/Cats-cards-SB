const cardCats = document.querySelector('.container__cats')

const getCardsHTML = function(cat) {
    return `
    <div class="card__cats">
        <div class="card__content">
            <img src="${cat.image}" alt="Нужно потерпеть">
            <h1>"${cat.name}"</h1>
            <p>${cat.description}</p>
            <button class="btn">Подробно</button>
            <button class="btn__delete">Удалить</button>
        </div>  
    </div>
    `
}  

                                                                 // fetch - ассинхронный метод, который возвращает промис. Если возвращ. промис, то мы
fetch('https://cats.petiteweb.dev/api/single/SergioJS-ONE/show/')// можем воспользоваться then
    .then((ref) => ref.json()) //ответ приходит в 2 этапа: 1 мы получаем заголовки и статусы. Нас интересует тело ответа, которое мы получем от сервера 
    .then((data) => {          // чтобы его получить, мы обратились ref к json(). Но json() возвращает промис, соотв. нужно обр. к еще одному .then
    
    cardCats.insertAdjacentHTML('afterbegin', data.map(cat => getCardsHTML(cat)).join(''))

    console.log({data})

})                         


