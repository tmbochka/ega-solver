document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('solveForm');
    const resultContainer = document.getElementById('resultContainer');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(form);

        fetch('/solve', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            resultContainer.innerHTML = `<h2>Результат:</h2><p>${data.result}</p>`;
        })
        .catch(error => {
            console.error('Ошибка:', error);
            resultContainer.innerHTML = `<h2>Ошибка:</h2><p>Произошла ошибка при обработке запроса.</p>`;
        });
    });
});