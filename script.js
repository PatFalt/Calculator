let calculator = document.querySelector('.calculator');
let display = document.querySelector('.display');
let keys = calculator.querySelector('.keys');

function calc(n1, operator, n2) {
    let result = '';

    if (operator == 'add') {
        result = parseFloat(n1) + parseFloat(n2)
    } else if (operator == 'subtract') {
        result = parseFloat(n1) - parseFloat(n2)
    } else if (operator == 'multply') {
        result = parseFloat(n1) * parseFloat(n2)
    } else if (operator == 'divide') {
        result = parseFloat(n1) / parseFloat(n2)
    };

    return result;
};

keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        let key = e.target;
        let action = key.dataset.action;
        let keyContent = key.textContent;
        let displayedNum = display.textContent
        let previousKeyType = calculator.dataset.previousKeyType
        if (!action) {
            if (displayedNum =='0' || previousKeyType == 'operator') {
                display.textContent = keyContent
            } else {
                display.textContent = displayedNum + keyContent
            };
        } else if (action == 'add' || action == 'subtract' || action == 'divide' || action == 'multiply') {
            key.classList.add('is-depressed');
            calculator.dataset.previousKeyType = 'operator'
            calculator.dataset.firstValue = displayedNum;
            calculator.dataset.operator = action;
        } else if (action == 'decimal') {
            display.textContent = displayedNum + '.';
        } else if (action == 'clear') {
            display.textContent = 0;
        } else if (action == 'calc') {
            let firstValue = calculator.dataset.firstValue;
            let operator = calculator.dataset.operator;
            let secondValue = displayedNum;
            display.textContent = calc(firstValue, operator, secondValue)
        };
        Array.from(key.parentNode.children).forEach(
            k => k.classList.remove('is-depressed')
        );
    };
});

