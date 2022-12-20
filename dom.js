const newRateOne = document.querySelector('#rating');
    //console.log(newRateOne.innerHTML);

for(let i = 0; i <= 10; i ++) {
    let options = document.createElement('option');
    options.value = i; 
    options.innerHTML = i;
    newRateOne.append(options);
}

const newRateTwo = document.querySelector('#age_cat');

for(let i = 0; i <= 25; i++) {
    let newOptions = document.createElement('option');
    newOptions.value = i;
    newOptions.innerHTML = i;
    newRateTwo.append(newOptions);
}

//модалка
const newRateOneModal = document.querySelector('#modal_rating_cat');

for(let i = 0; i <= 10; i ++) {
    let options = document.createElement('option');
    options.value = i; 
    options.innerHTML = i;
    newRateOneModal.append(options);
}

const newRateTwoModal = document.querySelector('#modal_age_cat');

for(let i = 0; i <= 25; i++) {
    let newOptions = document.createElement('option');
    newOptions.value = i;
    newOptions.innerHTML = i;
    newRateTwoModal.append(newOptions);
}