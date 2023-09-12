const selectorFoods = document.querySelector('.selector-foods');
const selectorDrinks = document.querySelector('.selector-drinks');
const foodMenu = document.querySelector('.food-menu-items');
const drinkMenu = document.querySelector('.drink-menu-items');

selectorFoods.addEventListener('click', () => switchMenu(selectorFoods));
selectorDrinks.addEventListener('click', () => switchMenu(selectorDrinks));

function switchMenu(clickedElement) {
    if(clickedElement === selectorFoods && getComputedStyle(foodMenu).display === 'none') {
        drinkMenu.style.display = 'none';
        foodMenu.style.display = 'flex';
    } else if (clickedElement === selectorDrinks && getComputedStyle(drinkMenu).display === 'none') {
        foodMenu.style.display = 'none';
        drinkMenu.style.display = 'flex';
    } else {
        //do nothing
    }
}

// Get the current date
const currentDate = new Date();

// Format the current date as "YYYY-MM-DD"
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0');
const day = String(currentDate.getDate()).padStart(2, '0');

const formattedDate = `${year}-${month}-${day}`;

// Set the formatted date as the default value for the input
document.getElementById('dateInput').value = formattedDate;

// Set the desired default time (in 24-hour format, e.g., "HH:mm")
const defaultTime = "12:30"; // 2:30 PM

// Set the default time as the value for the input
document.getElementById('timeInput').value = defaultTime;