import makeRandomTable from "./generator.js";

document.addEventListener("DOMContentLoaded", () => {
  // Функция выделения активной строки
  function toggleActive() {
    let activeElements = document.getElementsByClassName("active");
    for (let i = 0; i < activeElements.length; i++) {
      activeElements[i].classList.remove("active");
    }
    this.classList.add("active");
  }

  document.getElementById("button").onclick = () => {
    const modalEl = document.querySelector(".modal");
    const objectTable = makeRandomTable();
    let sortItems = [];

    const modalClose = () => {
      document.querySelector(".modal").classList.remove("modal--active");
      modalEl.removeEventListener("click", modalListener);
      document
        .querySelector(".modal__body")
        .removeEventListener("change", sortListener);
      sortItems = [];
      setTimeout(function () {
        modalEl.querySelector(".mytable").remove();
        modalEl.querySelector(".modal__sort").remove();
      }, 200);
    };

    const modalActive = () => {
      modalEl.classList.add("modal--active");
    };
    const modalListener = (e) => {
      if (
        e.target.classList.contains("modal") ||
        e.target.classList.contains("js-modal-close")
      ) {
        modalClose();
      }
    };
    const sortTable = (sortItems) => {
      let sortedData = JSON.parse(JSON.stringify(objectTable.data));
      sortItems.forEach((sortItem, i) => {
        if (sortItem.value !== "") {
          for (let j = 0; j < Object.keys(objectTable.data).length; j++) {
            const element = objectTable.data[j];
            if (element[i] !== +sortItem.value) delete sortedData[j];
          }
        }
      });
      renderTable(
        {
          headers: objectTable.headers,
          data: sortedData,
        },
        "modal__table"
      );
    };
    const sortListener = (e) => {
      if (e.target.classList.contains("modal__sort-select")) {
        const index = +e.target.id.replace("select-", "");
        sortItems[index].value = e.target.value;
        console.log(sortItems);
        sortTable(sortItems);
      }
    };
    const renderTable = (objectTable, parrent) => {
      let container = document.querySelector(`.${parrent}`);
      if (container.querySelector(".mytable")) {
        container.querySelector(".mytable").remove();
      }
      let htmlTable = document.createElement("table");
      let htmlTableHeader = document.createElement("thead");
      let htmlTableBody = document.createElement("tbody");

      htmlTable.classList.add("mytable");

      objectTable.headers.forEach((item) => {
        let th = document.createElement("th");

        th.append(item);
        htmlTableHeader.append(th);
      });
      htmlTable.append(htmlTableHeader);
      for (const item in objectTable.data) {
        if (Object.hasOwnProperty.call(objectTable.data, item)) {
          const element = objectTable.data[item];
          let tr = document.createElement("tr");
          tr.onclick = toggleActive;
          element.forEach((element) => {
            let td = document.createElement("td");
            td.append(element);
            tr.append(td);
          });
          htmlTableBody.append(tr);
        }
      }
      htmlTable.append(htmlTableBody);

      container.append(htmlTable);
    };

    const renderSort = (objectTable, parrent) => {
      const container = document.querySelector(`.${parrent}`);
      const htmlSort = document.createElement("div");
      htmlSort.classList.add("modal__sort");
      // Рендер полей селекта
      const createOpt = (parrent, value = "", text = value) => {
        const htmlSortOpt = document.createElement("option");
        htmlSortOpt.value = value;
        htmlSortOpt.textContent = text;
        parrent.append(htmlSortOpt);
      };

      // Перебор значений полей таблицы
      objectTable.headers.forEach((item, i) => {
        const htmlSortItem = document.createElement("div");
        htmlSortItem.classList.add("modal__sort-item");

        const htmlSortSelect = document.createElement("select");
        htmlSortSelect.classList.add("modal__sort-select");
        htmlSortSelect.setAttribute("name", item);
        htmlSortSelect.id = "select-" + i;

        const htmlSortLabel = document.createElement("label");
        htmlSortLabel.classList.add("modal__sort-label");
        htmlSortLabel.setAttribute("for", "select-" + i);

        htmlSortLabel.textContent = item;
        createOpt(htmlSortSelect, "", "Выберите фильтр");

        //  Цикл поиска уникальных значений
        const uniqueData = [];
        for (let j = 0; j < Object.keys(objectTable.data).length; j++) {
          const val = objectTable.data[`${j}`][i];
          if (uniqueData.indexOf(val) == -1) {
            uniqueData.push(val);
          }
        }
        //   Сортировка и отрисовка значений
        uniqueData
          .sort((a, b) => (a > b ? 1 : -1))
          .forEach((item) => createOpt(htmlSortSelect, item));

        htmlSortItem.append(htmlSortLabel, htmlSortSelect);
        htmlSort.append(htmlSortItem);
      });
      if (sortItems.length == 0) {
        objectTable.headers.forEach((item, i) => {
          sortItems[i] = {
            name: item,
            value: "",
          };
        });
      }
      container.prepend(htmlSort);
    };

    modalEl.addEventListener("click", modalListener);
    document
      .querySelector(".modal__body")
      .addEventListener("change", sortListener);
    renderTable(objectTable, "modal__table");
    renderSort(objectTable, "modal__body");
    modalActive();
  };
  document.getElementById("button").click();
});

// Обработчик на кнопку - вызов перерегенирации новых данных
