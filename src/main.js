import '../styles/modern-normalize.css';
import '../styles/style.css';

const day = document.querySelector('#day')
const month = document.querySelector('#month')
const year = document.querySelector('#year')
const numOfDays = document.querySelector('.bth-days')
const numOfMonths = document.querySelector('.bth-months')
const numOfYears = document.querySelector('.bth-years')
const btn = document.querySelector('.btn');
const endYear = new Date().getFullYear();
const endMonth = new Date().getMonth() + 1;
const endDay = new Date().getDate();

function validateDate(day, month, year) {
    if (year > endYear) {
        return { isValid: false, error: "Must be in Past.", errorIn: 'year' };
    }

    if (month < 1 || month > 12) {
        return { isValid: false, error: "Must be a valid month.", errorIn: 'month' };
    }

    if (day < 1 || day > 31) {
        return { isValid: false, error: "Must be a valid day.", errorIn: 'day' };
    }

    if (year === endYear && month > endMonth) {
        return { isValid: false, error: "Month is in the future.", erroIn: 'month-f' };
    }

    if (year === endYear && month === endMonth && day > endDay) {
        return { isValid: false, error: "Day is in the future.", erroIn: 'day-f' };
    }

    // Create a new Date object and check if it's a valid date
    const date = new Date(year, month - 1, day);
    if (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
    ) {
        return { isValid: true };
    } else {
        return { isValid: false, error: "Date is invalid." };
    }
}

function emptyField(...arg) {
    arg.forEach(x => {
        if (isNaN(parseInt(x.value))) {
            x.parentElement.style.color = 'hsl(0, 100%, 67%)';
            x.nextElementSibling.style.display = 'none';
            x.style.borderColor = 'hsl(0, 100%, 67%)';
            x.nextElementSibling.nextElementSibling.style.display = 'block';
        } else {
            x.parentElement.style.color = 'hsl(0, 1%, 44%)';
            x.style.borderColor = 'hsl(0, 0%, 86%)';
            x.nextElementSibling.nextElementSibling.style.display = 'none';
        }
    });

}

function onError(x, errorMsg) {
    x.parentElement.style.color = 'hsl(0, 100%, 67%)';
    x.style.borderColor = 'hsl(0, 100%, 67%)';
    x.nextElementSibling.textContent = errorMsg;
    x.nextElementSibling.style.display = 'block';

}

function removeError(...arg) {
    arg.forEach(x => {
        x.parentElement.style.color = 'hsl(0, 1%, 44%)';
        x.style.borderColor = 'hsl(0, 0%, 86%)';
        x.nextElementSibling.style.display = 'none';
    });
}

btn.addEventListener('click', () => {
    const dayInput = parseInt(day.value);
    const monthInput = parseInt(month.value);
    const yearInput = parseInt(year.value);

    emptyField(day, month, year);

    let yearDiff = endYear - yearInput;
    let monthDiff = endMonth - monthInput;
    let dayDiff = endDay - dayInput;

    if (dayDiff < 0) {
        const lastDayOfMonth = new Date(endYear, endMonth, 0).getDate();
        dayDiff += lastDayOfMonth;
    }
    175
    if (monthDiff < 0) {
        monthDiff += 12;
    }

    const validationResult = validateDate(dayInput, monthInput, yearInput);

    if (validationResult.isValid) {
        numOfYears.textContent = yearDiff;
        numOfMonths.textContent = monthDiff;
        numOfDays.textContent = dayDiff;
        removeError(day, month, year);
    } else {
        numOfYears.textContent = '--';
        numOfMonths.textContent = '--';
        numOfDays.textContent = '--';

        if (validationResult.erroIn === 'month-f') {
            onError(month, validationResult.error)
        }
        if (validationResult.erroIn === 'day-f') {
            onError(day, validationResult.error)
        }

        const errorMappings = [
            { errorType: 'day', variable: day },
            { errorType: 'month', variable: month },
            { errorType: 'year', variable: year },
        ];

        errorMappings.forEach(mapping => {
            if (validationResult.errorIn == mapping.errorType) {
                onError(mapping.variable, validationResult.error);
            }
        });
    }
})