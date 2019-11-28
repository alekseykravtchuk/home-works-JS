 "use strict";

(function () {
  
  function buildForm (tagName, arr) {
    var table = document.createElement("table");
    table.appendChild(document.createElement("tbody"));
    var tbody = table.lastChild;

    arr.forEach(buildRow);

    function buildRow(element, i, arr) {
      let row = document.createElement("tr");
      let td = document.createElement("td");
      td.style
      td.innerText = element.label;
      row.appendChild(td);

      switch(element.kind) {
        case "longtext":
          td = document.createElement("td");
          td.innerHTML = "<input type='text' name='" + element.name + "' style='width: 453px'>";
          row.appendChild(td);
          break;
        case "number":
          td = document.createElement("td");
          td.innerHTML = "<input type='text' name='" + element.name + "' style='width: 80px'>";
          row.appendChild(td);
          break;
        case "shorttext":
          td = document.createElement("td");
          td.innerHTML = "<input type='text' name='" + element.name + "' style='width: 200px'>";
          row.appendChild(td);
          break;
        case "combo":
          td = document.createElement("td");
          td.innerHTML = "<select name='" + element.name + "' style='width: 204px; margin-left: 2px'></select>";
          let select = td.lastChild;
          for(let variant of element.variants) {
            select.innerHTML += "<option value='" + variant.value + "'>" + variant.text + "</option>";
          }
          select.lastChild.setAttribute('selected', '');
          td.appendChild(select);
          row.appendChild(td);
          break;
        case "radio":
          td = document.createElement("td");
          for(let variant of element.variants) {
            td.innerHTML += "<input type='radio' name='" + variant.name + "' value='" + variant.value + "'>";
            td.innerHTML += "<span class='SRadio8a'>" + variant.text + "</span>";
            td.lastChild.style.cssText = "padding: 0px 10px 0px 0px;";
          }
          row.appendChild(td);
          break;
        case "check":
          td = document.createElement("td");
          td.innerHTML = "<input type='checkbox' name='" + element.name + "' checked=''>";
          row.appendChild(td);
          break;
        case "memo":
          row.innerHTML = '';
          td = document.createElement("td");
          td.setAttribute('colspan', '2');
          td.innerText = element.label;
          td.innerHTML += "<br> <textarea name='" + element.name + "'></textarea>";
          td.lastChild.style.cssText = "width: 608px; height: 50px;";
          row.appendChild(td);
          break;
        case "submit":
          let value = element.label;
          row.lastChild.innerHTML = "<input type='submit' value='" + value.substring(0, value.length - 1) + "'>";
          row.appendChild(document.createElement("td"));
      }


      tbody.appendChild(row);
    }

    var form = document.createElement(tagName);
    form.setAttribute('method', 'POST');
    form.setAttribute('action', '//fe.it-academy.by/TestForm.php');
    form.setAttribute('target', '_blank');
    form.appendChild(table);

    document.body.innerHTML += "<hr style='margin: 20px 0 15px 0'>";
    document.body.appendChild(form);
  }
  
  
  var formDef1=
  [
    {label:'Название сайта:',kind:'longtext',name:'sitename'},
    {label:'URL сайта:',kind:'longtext',name:'siteurl'},
    {label:'Посетителей в сутки:',kind:'number',name:'visitors'},
    {label:'E-mail для связи:',kind:'shorttext',name:'email'},
    {label:'Рубрика каталога:',kind:'combo',name:'division',
      variants:[{text:'здоровье',value:1},{text:'домашний уют',value:2},{text:'бытовая техника',value:3}]},
    {label:'Размещение:',kind:'radio',name:'payment',
      variants:[{text:'бесплатное',value:1},{text:'платное',value:2},{text:'VIP',value:3}]},
    {label:'Разрешить отзывы:',kind:'check',name:'votes'},
    {label:'Описание сайта:',kind:'memo',name:'description'},
    {label:'Опубликовать:',kind:'submit'},
  ];
  
  var formDef2=
  [
    {label:'Фамилия:',kind:'longtext',name:'lastname'},
    {label:'Имя:',kind:'longtext',name:'firstname'},
    {label:'Отчество:',kind:'longtext',name:'secondname'},
    {label:'Возраст:',kind:'number',name:'age'},
    {label:'Зарегистрироваться:',kind:'submit'},
  ];
  
  let tagName = "form";
  buildForm(tagName, formDef1);
  buildForm(tagName, formDef2);
  
})();