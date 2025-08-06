document.addEventListener('DOMContentLoaded', function() {
    // ===== Боковое меню =====
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const sidebarClose = document.getElementById('sidebar-close');

    menuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        sidebar.classList.add('active');
        sidebarOverlay.classList.add('active');
    });

    sidebarClose.addEventListener('click', function() {
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
    });

    sidebarOverlay.addEventListener('click', function() {
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
    });

    // ===== Валидация формы =====
    const contactForm = document.querySelector('.contact-form');
    const nameInput = contactForm.querySelector('input[type="text"]');
    const emailInput = contactForm.querySelector('input[type="email"]');
    const phoneInput = contactForm.querySelector('input[type="tel"]');
    const messageTextarea = contactForm.querySelector('textarea');

    // Регулярные выражения для проверки
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[\d\s\-\(\)]{7,}$/; // Простая проверка телефона

    // Функция показа ошибки
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        let errorElement = formGroup.querySelector('.error-message');

        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            formGroup.appendChild(errorElement);
        }

        errorElement.textContent = message;
        input.style.borderColor = '#ff4d4d';
    }

    // Функция удаления ошибки
    function clearError(input) {
        const formGroup = input.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');

        if (errorElement) {
            errorElement.remove();
        }
        input.style.borderColor = '#333';
    }

    // Валидация при вводе
    nameInput.addEventListener('input', () => {
        if (nameInput.value.trim() === '') {
            showError(nameInput, 'Введите имя');
        } else {
            clearError(nameInput);
        }
    });

    emailInput.addEventListener('input', () => {
        if (!emailRegex.test(emailInput.value.trim())) {
            showError(emailInput, 'Введите корректный email');
        } else {
            clearError(emailInput);
        }
    });

    phoneInput.addEventListener('input', () => {
        if (!phoneRegex.test(phoneInput.value.trim())) {
            showError(phoneInput, 'Введите корректный телефон');
        } else {
            clearError(phoneInput);
        }
    });

    // Отправка формы
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;

        // Проверка имени
        if (nameInput.value.trim() === '') {
            showError(nameInput, 'Введите имя');
            isValid = false;
        }

        // Проверка email
        if (!emailRegex.test(emailInput.value.trim())) {
            showError(emailInput, 'Введите корректный email');
            isValid = false;
        }

        // Проверка телефона (необязательное поле)
        if (phoneInput.value.trim() !== '' && !phoneRegex.test(phoneInput.value.trim())) {
            showError(phoneInput, 'Введите корректный телефон');
            isValid = false;
        }

        // Если всё valid, отправляем
        if (isValid) {
            // Заглушка для отправки (можно заменить на Fetch/AJAX)
            console.log('Данные для отправки:', {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                phone: phoneInput.value.trim(),
                message: messageTextarea.value.trim()
            });

            // Показываем уведомление
            alert('Спасибо! Мы свяжемся с вами в ближайшее время.');
            
            // Закрываем попап и очищаем форму
            document.getElementById('popup').classList.remove('active');
            contactForm.reset();
        }
    });

    // ===== Попап =====
    const popup = document.getElementById('popup');
    const ctaButtons = document.querySelectorAll('.btn-primary');
    const closeButton = document.querySelector('.popup-close');

    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (e.target.textContent.trim() === 'Связаться' || 
                (e.target.tagName === 'A' && e.target.textContent.trim() === 'Связаться')) {
                e.preventDefault();
                popup.classList.add('active');
            }
        });
    });

    closeButton.addEventListener('click', function() {
        popup.classList.remove('active');
    });

    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
            popup.classList.remove('active');
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            popup.classList.remove('active');
        }
    });
});