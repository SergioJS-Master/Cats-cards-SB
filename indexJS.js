
const $cardCats = document.querySelector('#container__catsAll');
//const catsTest = document.querySelector('#container__catsAll')
const $createCatForm = document.forms.createCatForm;
const $btnChangeCard = document.querySelector('[data-btnChange]');
const $modalWr = document.querySelector('[data-modalWr]');
const $modalContent = document.querySelector('[data-modalContent]');
const $catCreateFormTemplate = document.getElementById('createCatForm');
const $modalBtnInfoCard = document.querySelector('[data-btnInfo]')
const $dataModalInfo = document.querySelector('[data-modalInfo]')
const $containerCatsAll = document.querySelector('#container__cats')
const $cataFormOne = document.querySelector('.catFormOne')

//добавление карточек котов 
const ACTION = {
    DETAIL: 'detail',
    DELETE: 'delete',
    CHANGE: 'change'
}
const showAllCats = () => {
    const getCardsHTML = function(cat) {
        return `
            <div data-cat-id="${cat.id}" class="card__cats">
                <div class="card__content">
                    <img src="${cat.image}" alt="Нужно потерпеть">
                    <h1>"${cat.name}" </h1>
                    <p hidden>${cat.description} </p>
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
            $cardCats.innerHTML = ''
            $cardCats.insertAdjacentHTML('afterbegin', data.map(cat => getCardsHTML(cat)).join(''))
        // console.log({data})
        }
    )      
}
showAllCats()




'___________________________________________________________________________________________________________________________________________'
//добавление на кнопки удаления  
$cardCats.addEventListener('click', (e) => {
    e.preventDefault()
    
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





'___________________________________________________________________________________________________________________________________________'
//добавление функции создания новой карточки кота
const addNewCardCat = $createCatForm.addEventListener('submit', (e) => {
    e.preventDefault() // preventDefault - отмена поведение формы по умолчанию

    const objCat = (formDataObject) => ({
        ...formDataObject,
        id: +formDataObject.id,
        rate: +formDataObject.rate,
        age: +formDataObject.age,
        favorite: !!formDataObject.favorite
    })
    let formDataObject = objCat(Object.fromEntries(new FormData($createCatForm).entries()))
    //localStorage.setItem('catInfoLocalSt', JSON.stringify(formDataObject))

    
    fetch('https://cats.petiteweb.dev/api/single/SergioJS-ONE/add/', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json' // Content-Type - этим заголовком вы сообщ. серверу, что мы отсыл. ему данные в формате JSON
        },//'Content-Type': 'application/json' - отображ искл. так, это пропис. в спецификации JS
        body: JSON.stringify(formDataObject) //объект фн. и тд передать невозможно. По этому мы должны преобразовать в строку
    }).then((res) => {
        if (res.status === 200) {
            return $cardCats.insertAdjacentHTML('afterbegin', showAllCats(objCat))
        }
        throw Error('Ошибка, добавить картоку не получилось. Попробуйте другой номер ID')
    }).catch(alert)
})

let newObj = {};
$cataFormOne.addEventListener('change', () => { 
    newObj[event.target.name] = event.target.value;
    localStorage.setItem('newObj', JSON.stringify(newObj))
})

if (localStorage.getItem('newObj')) {
    newObj = JSON.parse(localStorage.getItem('newObj'))
    for (let key in newObj) {
        $cataFormOne.elements[key].value = newObj[key]
    }
}   

'___________________________________________________________________________________________________________________________________________'
//добавление функции коррекции карточки 

const putModalEdit = (cat) => 
    `<form class="modal__form" id="editCatForm" data-BtnPut data-id="${cat.id}">
        <h1>Редактировать котика</h1>
        <div class="modal_form_group">
            <label for="name">Введите имя котика:</label>
            <input 
                name="name"
                type="text" 
                placeholder="например: Барсик" 
                id="name"
                value="${cat.name}">
        </div>
        <div class="modal_form_group">
            <label>Это любимый котик?</label>
            <label>
            <input 
                name="favorite"
                type="radio"
                value='${cat.favorite}'>
                Любимый ♥
            </label>
            <label>
            <input 
                name="favorite"
                type="radio"
                value='${cat.favorite}'>
                Нет :(
            </label>
        </div>
        <div class="modal_form_group">
            <label for="rating">Выберите рейтинг от 0 до 10:</label>
            <input type="number" id="rating" name="rate" min="1" max="10" value='${cat.rate}' />
        </div>
        <div class="modal_form_group">
            <label for="age_cat">Выберите возраст:</label>
            <input type="number" id="age_cat" name="age" min="1" max="100000" value='${cat.age}' />
        </div>
        <div class="modal_form_group">
            <label for="name">Описание котика:</label>
            <input 
                name="description"
                type="text"
                placeholder="Описание" 
                class="form-control"
                value='${cat.description}'
            /> 
        </div>
        <div class="modal_form_group">
            <label for="img">Введите ссылку на изображение:</label>
            <input 
                name="image"
                type="text" 
                placeholder="вставьте URL картинки" 
                id="img"
                value='${cat.image}'
            />
        </div> 
        
        <button class="modal_btn_delete" type="reset">Очистить форму</button>
        <button class="modal_btn_add" type="submit">Принять изменения</button>
    </form>`

const modalBtnEdit = document.querySelector('.modal_btn_add')

const hideModal = 'hidden_edit';
const clickModalWrHandler = (e) => {
    if (e.target === $modalWr || e.key === 'Escape') {
        $modalWr.classList.add(hideModal)
        $modalWr.removeEventListener('click', clickModalWrHandler)
       // window.location.reload()
        $modalContent.innerHTML = ''
    }
}


const openModalChange = (e) => {
    const targetModalName = e.target.dataset.action;
    if(targetModalName === ACTION.CHANGE) {
        $modalWr.classList.remove(hideModal)
        $modalWr.addEventListener('click', clickModalWrHandler)

        const $cardCatsId = e.target.closest('[data-cat-id]')
        const catIdSearch = $cardCatsId.dataset.catId;

        fetch(`https://cats.petiteweb.dev/api/single/SergioJS-ONE/show/${catIdSearch}`)
            .then((ref) => ref.json()) 
            .then((data) => {  
                $modalContent.insertAdjacentHTML('afterbegin', putModalEdit(data))     
        
                let putFormBtn = document.querySelector('#editCatForm')
                
                const allPut = (e) => { 
                    e.preventDefault();
                    let formData = new FormData(e.target);
                    let obj = {};
                    formData.forEach((value, key) => obj[key] = value);
                
                    fetch(`https://cats.petiteweb.dev/api/single/SergioJS-ONE/update/${catIdSearch}`, {
                        method: 'PUT',
                        headers: { 
                        'Content-Type': 'application/json' 
                    },
                        body: JSON.stringify(obj)
                    })
                    .then((res) => {
                        
                        //$modalWr.removeEventListener('click', clickModalWrHandler)
                        putFormBtn.removeEventListener('submit', allPut)
                        
                        showAllCats()
                    })
                }
                putFormBtn.addEventListener('submit', allPut)
        })
        
    }
}

document.addEventListener('click', openModalChange);
document.addEventListener('keydown', clickModalWrHandler)





'___________________________________________________________________________________________________________________________________________'
//добавление кнопки информации 
const hiddenDeleteInfo = 'hidden_info'
const $modalInfoCard = document.querySelector('.modal__info')

const clickModalInfobBlock = ((e) => {
    if (e.target === $dataModalInfo) {
        $dataModalInfo.classList.add(hiddenDeleteInfo)
        $dataModalInfo.removeEventListener('click', clickModalInfobBlock)
        $dataModalInfo.innerHTML = '';
    }
})

const openClickModalInfobBlock = ((e) => {
    if(e.target.dataset.action === ACTION.DETAIL) {
        $dataModalInfo.classList.remove(hiddenDeleteInfo)
        $dataModalInfo.addEventListener('click', clickModalInfobBlock)
        
        const $cardCatsId = e.target.closest('[data-cat-id]')
        const catIdSearch = $cardCatsId.dataset.catId;
        
        const putModalCats = (cat) => {
            return `
                <div class="modal_info_card">
                <div data-cat-id="${cat.id}" class="modal_info_cats">
                        <img src="${cat.image}" alt="Нужно потерпеть">
                        <h1>Имя: "${cat.name}" </h1>
                        <p>Любимчик?: <span class = 'span'>${cat.favorite === true ? 'Д♥А' : ' нет :('}</span></p>
                        <p>Рейтинг: "${cat.rate}"</p>
                        <p>Возраст: "${cat.age}"</p>
                        <p>"${cat.description}"</p>
                    </div>  
                </div>
            `
        }
        fetch(`https://cats.petiteweb.dev/api/single/SergioJS-ONE/show/${catIdSearch}`)
            .then((ref) => ref.json()) 
            .then((data) => {  
                $dataModalInfo.insertAdjacentHTML('afterbegin', putModalCats(data))   
        })
    }
})
document.addEventListener('click', clickModalInfobBlock);
document.addEventListener('click', openClickModalInfobBlock);
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        $dataModalInfo.classList.add(hiddenDeleteInfo);
        $dataModalInfo.innerHTML = '';
    }
})



