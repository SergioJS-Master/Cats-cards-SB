const newRateOne = document.querySelector('#budget_one');
console.log(newRateOne.innerHTML);

for(let i = 0; i < 11; i ++) {
    let options = document.createElement('option');
    options.value = i; 
    options.innerHTML = i;
    newRateOne.append(options);
}

const newRateTwo = document.querySelector('#budget_two');

for(let i = 0; i < 26; i++) {
    let newOptions = document.createElement('option');
    newOptions.value = i;
    newOptions.innerHTML = i;
    newRateTwo.append(newOptions);
}
