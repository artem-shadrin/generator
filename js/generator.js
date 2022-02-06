// Файл для генерации таблицы со случайными набором полей и случайным набором данных

// Функция определения случайного числа с вхождением в набор нижней и верхней границы диапазона
const getRandom = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Функция генерации объекта - таблица
const makeRandomTable = () => {
  // Набор данных для заголовков таблицы
  const tableHeadersRange = [
    "Наименование",
    "Свойство цвета",
    "Звук",
    "Морозостокость",
    "Жесткость",
    "Эйяфьятлайокюдль",
    "Ph",
    "Длина дуги",
    "Ширина",
    "Вид шифера",
    "Количество волн",
    "Применение",
    "Вес элемента",
    "Обозначение",
    "Высота профиля",
    "Толщина листа",
    "Толщина стенки",
    "Рабочая ширина листа",
    "Масса 1м трубы",
    "Длина листа",
    "Масса",
    "Тип",
    "Влажность",
    "Наименование",
    "Класс прочности",
    "Назначение",
    "Высота",
    "Вес элемента, кг",
    "Наружный диаметр",
    "Вид и назначение",
    "Модель",
    "Цвет",
    "Материал",
    "Характер наполнения",
    "Прочность",
    "Вид доски",
    "Сорт доски",
    "Вид распила",
    "Толщина",
    "Длина",
    "Порода дерева",
    "Плотность",
    "Объем",
    "Вид линолеума",
    "Структура",
    "Тип основания",
    "Основа",
    "Класс износостойкости",
    "Срок службы, лет",
    "Вес",
    "Ширина",
    "Толщина",
    "Длина",
    "Длина min",
    "Длина max",
    "Длина стороны",
    "Площадь поперечного сечения",
    "Масса проката",
  ];

  // Создание служебных переменных для сборки объекта  - таблица
  const tableRowData = {}; //строки
  const tableHeadersCount = getRandom(3, tableHeadersRange.length); //случайное количество полей (столбцов) от 3 до размера набора данных
  const tableRowCount = getRandom(0, 50); //случайное количество строк

  // Генерация случайных разных заголовков из набора
  let tableHeaders = [];
  let tempIndex = [];
  do {
    let randomIndex = getRandom(0, tableHeadersRange.length - 1);
    if (tempIndex.includes(randomIndex)) continue;
    tempIndex.push(randomIndex);
    tableHeaders.push(tableHeadersRange[randomIndex]);
  } while (tempIndex.length < tableHeadersCount);

  // Генерация случайных числовых данных в диапазоне от 0 до 1000
  for (let i = 0; i < tableRowCount; i++) {
    let tempRowData = [];
    for (let j = 0; j < tableHeadersCount; j++) {
      tempRowData.push(getRandom(0, 1000));
    }
    tableRowData[i] = tempRowData;
  }

  // Формирование объекта - таблица с набором заголовков и заполненными случайными данными строками
  return {
    headers: tableHeaders,
    data: tableRowData,
  };
};

export default makeRandomTable;
