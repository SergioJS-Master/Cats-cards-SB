const $cardCats = document.querySelector('[data-btnDel]')
const $createCatForm = document.forms.createCatForm

const ACTION = {
    DETAIL: 'detail',
    DELETE: 'delete',
    CHANGE: 'change'
}

const getCardsHTML = function(cat) {
    return `
        <div data-cat-id="${cat.id}" class="card__cats">
            <div class="card__content">
                <img src="${cat.image}" alt="Нужно потерпеть">
                <h1>"${cat.name}"</h1>
                <p>${cat.description}</p>
                <button data-action="${ACTION.DETAIL}" class="btn__info">Подробно</button>
                <button data-action="${ACTION.CHANGE}" class="btn__change"> Изменить</button>
                <button data-action="${ACTION.DELETE}" class="btn__delete">Удалить</button>
            </div>  
        </div>        
    `
}
                                                                // fetch - ассинхронный метод, который возвращает промис. Если возвращ. промис, то мы
fetch('https://cats.petiteweb.dev/api/single/SergioJS-ONE/show/')// можем воспользоваться then
    .then((ref) => ref.json()) //ответ приходит в 2 этапа: 1 мы получаем заголовки и статусы. Нас интересует тело ответа, которое мы получем от сервера 
    .then((data) => {         // чтобы его получить, мы обратились ref к json(). Но json() возвращает промис, соотв. нужно обр. к еще одному .then
    
    $cardCats.insertAdjacentHTML('afterbegin', data.map(cat => getCardsHTML(cat)).join(''))
    // console.log({data})
})                         

//добавление на кнопки удаления  
$cardCats.addEventListener('click', (e) => {
    if(e.target.dataset.action === ACTION.DELETE) {
        console.log(e.target);

        const $cardCatsId = e.target.closest('[data-cat-id]')
        const catIdSearch = $cardCatsId.dataset.catId;
        console.log({catIdSearch});

        fetch(`https://cats.petiteweb.dev/api/single/SergioJS-ONE/delete/${catIdSearch}`, {
            method: 'DELETE',
        }).then((res) => {
            if (res.status === 200) {
                return $cardCatsId.remove()
            } else {
                alert(`Удалить кода с ID: ${catIdSearch}, не удалось `) 
            }
        })
    }  
})

//дофление функции создания новой карточки кота
$createCatForm.addEventListener('submit', (e) => {
    e.preventDefault() // preventDefault - отмена поведение формы по умолчанию
    
    let formDataObject = Object.fromEntries(new FormData(e.target).entries())

    formDataObject = {
        ...formDataObject,
        id: +formDataObject.id,
        rate: +formDataObject.rate,
        age: +formDataObject.age,
        favorite: !!formDataObject.favorite
    }

    if(formDataObject.id == '') {
        alert('Введите обязательные данные')
    }
    
    fetch('https://cats.petiteweb.dev/api/single/SergioJS-ONE/add/', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json' // Content-Type - этим заголовком вы сообщ. серверу, что мы отсыл. ему данные в формате JSON
        },//'Content-Type': 'application/json' - отображ искл. так, это пропис. в спецификации JS
        body: JSON.stringify(formDataObject) //объект фн. и тд передать невозможно. По этому мы должны преобразовать в строку
    }).then((res) => {
        if (res.status === 200) {
            return $cardCats.insertAdjacentHTML('afterbegin', getCardsHTML(formDataObject))
        }
        throw Error('Ошибка, добавить картоку не получилось')
    }).catch(alert)
})