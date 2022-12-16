const $cardCats = document.querySelector('[data-btnDel]')

const ACTION = {
    DETAIL: 'detail',
    DELETE: 'delete'
}

const getCardsHTML = function(cat) {
    return `
        <div data-cat-id="${cat.id}" class="card__cats">
            <div class="card__content">
                <img src="${cat.image}" alt="Нужно потерпеть">
                <h1>"${cat.name}"</h1>
                <p>${cat.description}</p>
                <button data-action="${ACTION.DETAIL}" class="btn">Подробно</button>
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
    console.log({data})
})                         

$cardCats.addEventListener('click', (e) => {
    if(e.target.dataset.action == ACTION.DELETE) {
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
