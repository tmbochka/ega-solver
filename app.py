from flask import Flask, render_template, request, jsonify
import math

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/solve', methods=['POST'])
def solve():
    task_type = request.form['task_type']
    input_data = request.form['input_data']
    search_type = request.form['search_type']

    if task_type == 'bitwise_conjunction':
        result = solve_bitwise_conjunction(input_data, search_type)
    elif task_type == 'number_segments':
        result = solve_number_segments(input_data, search_type)
    elif task_type == 'coordinate_plane':
        result = solve_coordinate_plane(input_data)
    elif task_type == 'function_del':
        result = solve_function_del(input_data)
    else:
        result = "Неверный тип задачи"

    return jsonify(result=result)

def solve_bitwise_conjunction(input_data, search_type):
    # Преобразуем введенное выражение в форму, подходящую для вычисления
    formula = input_data.replace('->', '<=')

    # Функция для проверки истинности формулы
    def check_formula(x, A):
        return eval(formula.replace('a', str(A)))

    # Перебираем возможные значения A
    if search_type == 'max':
        for A in range(1000, 0, -1):
            if all(check_formula(x, A) for x in range(1000)):
                return str(A)
    elif search_type == 'min':
        for A in range(1000):
            if all(check_formula(x, A) for x in range(1000)):
                return str(A)

def solve_number_segments(input_data, search_type):
    # Разбиваем входные данные на отрезки
    segments = input_data.split(';')
    segments = [seg.strip() for seg in segments if seg.strip()]

    # Функция для проверки истинности формулы
    def check_formula(x, A):
        for seg in segments:
            start, end = map(int, seg.strip('[]').split(','))
            if start <= x <= end:
                return True
        return False

    # Перебираем возможные значения x
    first_x = None
    last_x = None
    for x in [k * 0.25 for k in range(-10000, 10000)]:
        if check_formula(x, 1) != (search_type == 'max'):
            if first_x is None:
                first_x = x
            last_x = x

    # Вычисляем длину отрезка A
    if first_x is not None and last_x is not None:
        length = math.ceil(last_x - first_x)
        return str(length)
    else:
        return "Не удалось найти подходящий отрезок A"

def solve_coordinate_plane(input_data):
    # Реализация решения задачи с координатной плоскостью
    return "Решение координатной плоскости"

def solve_function_del(input_data):
    # Реализация решения задачи с функцией ДЕЛ
    return "Решение функции ДЕЛ"

if __name__ == '__main__':
    app.run(debug=True)