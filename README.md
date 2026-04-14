# Greatphar Website

Профессиональный сайт производителя LED светильников для растений.

## Структура проекта

```
greatphar-website/
├── index.html          # Главная страница
├── css/
│   └── style.css       # Стили
├── js/
│   └── main.js         # JavaScript функционал
├── images/             # Изображения (добавить)
│   ├── product-gp600.jpg
│   ├── product-gp1000.jpg
│   ├── app-greenhouse.jpg
│   ├── app-indoor.jpg
│   ├── app-vertical.jpg
│   └── app-research.jpg
└── README.md
```

## Технологии

- HTML5
- CSS3 (Grid, Flexbox, CSS Variables)
- Vanilla JavaScript (ES6+)
- Адаптивный дизайн (Mobile-first)

## Особенности

- **Язык**: Русский
- **Шрифт**: Times New Roman
- **Цветовая схема**: Тёмная с зелёным акцентом (#00ff88)
- **Анимации**: Плавные переходы, счётчики, появление элементов при скролле
- **Форма обратной связи**: Модальное окно с валидацией

## Развёртывание на GitHub Pages

### 1. Создание репозитория

```bash
# Создать новый репозиторий на GitHub
# Название: greatphar-website
# Тип: Public
```

### 2. Загрузка файлов

**Вариант A: Через Git**

```bash
cd greatphar-website
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/ВАШ_ЮЗЕРНЕЙМ/greatphar-website.git
git push -u origin main
```

**Вариант B: Через веб-интерфейс**

1. Зайти в репозиторий на GitHub
2. Нажать "Add file" → "Upload files"
3. Загрузить все файлы
4. Нажать "Commit changes"

### 3. Включение GitHub Pages

1. Зайти в Settings репозитория
2. Перейти в раздел Pages (слева)
3. Source: Deploy from a branch
4. Branch: main → / (root)
5. Нажать Save

### 4. Привязка домена (опционально)

1. В разделе Pages найти "Custom domain"
2. Ввести: www.greatphar.com
3. Нажать Save
4. В DNS настроить CNAME запись:
   - www → ВАШ_ЮЗЕРНЕЙМ.github.io

## Что нужно доделать

### 1. Изображения

Заменить placeholder-изображения на реальные:

- `images/product-gp600.jpg` - Фото GP-600 Pro
- `images/product-gp1000.jpg` - Фото GP-1000 Max
- `images/app-greenhouse.jpg` - Теплицы
- `images/app-indoor.jpg` - Гроубоксы
- `images/app-vertical.jpg` - Вертикальные фермы
- `images/app-research.jpg` - Исследования

### 2. Технические параметры

В файле `index.html` найти и заменить:

```html
<!-- В таблице характеристик GP-600 Pro -->
<tr>
    <td>Размеры (Д×Ш×В)</td>
    <td>【待补充】</td>  <!-- Заменить на реальные размеры -->
</tr>
<tr>
    <td>Вес</td>
    <td>【待补充】</td>  <!-- Заменить на реальный вес -->
</tr>

<!-- Аналогично для GP-1000 Max -->
```

### 3. Контактная информация

В разделе CTA заменить:

```html
<div class="contact-item">
    <span class="contact-label">Телефон</span>
    <span class="contact-value">【待补充】</span>  <!-- Добавить телефон -->
</div>
<div class="contact-item">
    <span class="contact-label">Адрес</span>
    <span class="contact-value">【待补充】</span>  <!-- Добавить адрес -->
</div>
```

### 4. Форма обратной связи

В файле `js/main.js` настроить отправку форм:

```javascript
// Вариант 1: Formspree (бесплатно, до 50 писем/месяц)
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

// Вариант 2: EmailJS
// Вариант 3: Собственный бэкенд
```

## Локальное тестирование

```bash
# Перейти в папку проекта
cd greatphar-website

# Запустить локальный сервер (Python 3)
python -m http.server 8000

# Или с помощью Node.js
npx serve

# Открыть в браузере
http://localhost:8000
```

## Контакты для поддержки

При возникновении вопросов по развёртыванию или модификации сайта.

---

**Greatphar © 2026**
