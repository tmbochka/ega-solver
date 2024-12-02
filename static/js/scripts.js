document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('solveForm');
    const resultContainer = document.getElementById('resultContainer');
    const searchTypeButtons = document.querySelectorAll('.search_type');
    const searchTypeInput = document.getElementById('search_type_input');
    const segmentsContainer = document.getElementById('segmentsContainer');
    const addSegmentButton = document.getElementById('addSegment');
    const taskTypeSelect = document.getElementById('task_type');
    const inputDataTextarea = document.getElementById('input_data');
    const expressionContainer = document.getElementById('expressionContainer');
    const expressionInput = document.getElementById('expression');

    searchTypeButtons.forEach(button => {
        button.addEventListener('click', function() {
            searchTypeButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            searchTypeInput.value = this.getAttribute('data-value');
        });
    });

    addSegmentButton.addEventListener('click', function() {
        const segmentDiv = document.createElement('div');
        segmentDiv.className = 'segment';
        segmentDiv.innerHTML = `
            <input type="text" name="segment_name" placeholder="Имя отрезка (например, P)" style="width: 50px;">
            <input type="text" name="segment" placeholder="Отрезок (например, [4, 15])">
            <button type="button" class="removeSegment">✖</button>
        `;
        segmentsContainer.appendChild(segmentDiv);
    });

    segmentsContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('removeSegment')) {
            event.target.parentElement.remove();
        }
    });

    taskTypeSelect.addEventListener('change', function() {
        if (this.value === 'number_segments') {
            segmentsContainer.style.display = 'block';
            addSegmentButton.style.display = 'block';
            expressionContainer.style.display = 'block';
            inputDataTextarea.style.display = 'none';
        } else {
            segmentsContainer.style.display = 'none';
            addSegmentButton.style.display = 'none';
            expressionContainer.style.display = 'none';
            inputDataTextarea.style.display = 'block';
        }
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(form);
        const segments = [];
        document.querySelectorAll('input[name="segment"]').forEach(input => {
            segments.push(input.value);
        });
        formData.set('input_data', segments.join(';'));
        formData.set('expression', expressionInput.value);

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