const words = ["DM17", "17", "STUDIO17", "DAYMONKE", "Daymonke", "17DM", "DMNK", "dmnk", "Quga", "KitKit", "member3", "Podslushano: Rozetka", "Kit", "Qwag", 'memba', 'Rozetka', 'dm', 'quggerqugger1'];

const marquee = document.getElementById("marquee");
const marqueeText = document.getElementById("marquee-text");

// Получаем сохраненную позицию или начинаем справа за экраном
let position = parseFloat(localStorage.getItem("marqueePosition")) || window.innerWidth;

// Получаем уже сохраненные слова или начинаем с пустого массива
let generatedWords = JSON.parse(localStorage.getItem("generatedWords")) || [];
let lastWords = generatedWords.slice(-2);  // последние два слова для проверки

// Функция получения случайных слов (чтобы два одинаковых слова не были рядом)
function getRandomWord() {
    let randomWord;
    do {
        randomWord = words[Math.floor(Math.random() * words.length)];
    } while (lastWords.includes(randomWord));  // Проверяем, чтобы слово не было одинаковым с двумя последними

    lastWords = [lastWords[1] || "", randomWord];  // Обновляем последние два использованных слова
    return randomWord;
}

// Генерация длинного текста для бегущей строки
function generateMarqueeText() {
    let text = '';
    // Генерируем случайные слова до тех пор, пока текст не выйдет за пределы экрана
    while (text.length < window.innerWidth) {
        let newWord = getRandomWord();
        text += newWord + "&nbsp;&nbsp;&nbsp;&nbsp;"; // Добавляем пробелы между словами
        generatedWords.push(newWord);  // Добавляем новое слово в массив

        // Сохраняем сгенерированные слова в localStorage
        localStorage.setItem("generatedWords", JSON.stringify(generatedWords));
    }
    return text;
}

// Устанавливаем начальный текст (если он не был сохранен)
if (generatedWords.length === 0) {
    marqueeText.innerHTML = generateMarqueeText();
} else {
    marqueeText.innerHTML = generatedWords.join("&nbsp;&nbsp;&nbsp;&nbsp;");
}

// Функция анимации
function animateMarquee() {
    position -= 0.3; // Уменьшаем скорость (больше значение - медленнее)

    if (position < -marqueeText.offsetWidth) {
        position = window.innerWidth; // Если текст вышел за экран, возвращаем его направо
        marqueeText.innerHTML = generateMarqueeText(); // Генерируем новый текст
    }

    marquee.style.transform = `translateX(${position}px)`; // Применяем смещение

    localStorage.setItem("marqueePosition", position); // Сохраняем позицию

    requestAnimationFrame(animateMarquee); // Рекурсивный вызов
}

// Запускаем анимацию
animateMarquee();


// POYAVLENIE TEXTA // 

const daymonkeContainer = document.getElementById('daymonke-container'); // Элемент "Daymonke"
let lastScrollY = window.scrollY; // Переменная для отслеживания последней позиции прокрутки

const SCROLL_HIDE_THRESHOLD = 300; // Количество пикселей для скрытия текста
const SCROLL_SHOW_THRESHOLD = 200; // Количество пикселей для показа текста

let scrollPositionAtHide = 0; // Переменная для хранения позиции, на которой текст был скрыт

// Изначально текст видим
daymonkeContainer.classList.add('visible');

// Слушаем событие прокрутки
window.addEventListener('scroll', function () {
    // Если прокручиваем вниз
    if (window.scrollY > lastScrollY && window.scrollY > SCROLL_HIDE_THRESHOLD) {
        // Скрываем элемент при прокрутке вниз
        daymonkeContainer.classList.remove('visible');
        daymonkeContainer.classList.add('hidden');
        scrollPositionAtHide = window.scrollY; // Запоминаем позицию, на которой скрыли текст
    }

    // Если прокручиваем вверх и прокручено больше, чем SCROLL_SHOW_THRESHOLD от того места, где текст был скрыт
    if (window.scrollY < lastScrollY && window.scrollY < (scrollPositionAtHide - SCROLL_SHOW_THRESHOLD)) {
        // Показываем элемент при прокрутке вверх
        daymonkeContainer.classList.remove('hidden');
        daymonkeContainer.classList.add('visible');
    }

    // Обновляем lastScrollY для следующего сравнения
    lastScrollY = window.scrollY;
});




// random data //

function generateRandomDate() {
    // Генерация случайного дня, месяца и года
    const day = String(Math.floor(Math.random() * 31) + 1).padStart(2, '0');
    const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
    const year = 2025;  // Можно поменять на нужный год

    return `${day}.${month}.${year}`;
}

function updateFooterDate() {
    const dateElement = document.getElementById('random-date');
    dateElement.textContent = generateRandomDate();
}

// Обновление даты каждые 5 секунд
setInterval(updateFooterDate, 3600000);

// Инициализация даты при загрузке страницы
updateFooterDate();
