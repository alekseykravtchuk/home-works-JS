 "use strict";

(function () {
  
  function buildForm (arr) {
    var table = document.createElement("table");
    table.appendChild(document.createElement("tbody"));
    var tbody = table.lastChild;

    arr.forEach(buildRow);

    function buildRow(element) {
      let row = document.createElement("tr");
      let td = document.createElement("td");
      td.innerText = element.label;
      row.appendChild(td);
      td = document.createElement("td");
      let inputWidth = {number: '80px', shorttext: '200px', longtext: '453px'};
      switch(element.kind) {
        case "longtext":
        case "number":
        case "shorttext":
          td.innerHTML = "<input type='text' name='" + element.name + "' style='width: " + inputWidth[element.kind] + "'>";
          break;
        case "combo":
          td.innerHTML = "<select name='" + element.name + "' style='width: 204px; margin-left: 2px'></select>";
          let select = td.lastChild;
          for(let variant of element.variants) {
            select.innerHTML += "<option value='" + variant.value + "'>" + variant.text + "</option>";
          }
          select.lastChild.setAttribute('selected', '');
          td.appendChild(select);
          break;
        case "radio":
          for(let variant of element.variants) {
            td.innerHTML += "<input type='radio' name='" + variant.name + "' value='" + variant.value + "'>";
            td.innerHTML += "<span class='SRadio8a'>" + variant.text + "</span>";
            td.lastChild.style.cssText = "padding: 0px 10px 0px 0px;";
          }
          break;
        case "check":
          td.innerHTML = "<input type='checkbox' name='" + element.name + "' >";
          break;
        case "memo":
          row.innerHTML = '';
          td.setAttribute('colspan', '2');
          td.innerText = element.label;
          td.innerHTML += "<br> <textarea name='" + element.name + "'></textarea>";
          td.lastChild.style.cssText = "width: 608px; height: 50px;";
          break;
        case "submit":
          let value = element.label;
          row.lastChild.innerHTML = "<input type='submit' value='" + value.substring(0, value.length - 1) + "'>";
      }
      row.appendChild(td);
      tbody.appendChild(row);
    }

    var form = document.createElement("form");
    form.setAttribute('method', 'POST');
    form.setAttribute('action', '//fe.it-academy.by/TestForm.php');
    form.setAttribute('target', '_blank');
    form.appendChild(table);

    document.body.innerHTML += "<p style='margin: 20px 0 20px 5px'>Для внесения вашего сайта в каталог, заполните форму:</p>";
    document.body.appendChild(form);
  }
  
  
  var formDef1=
  [ {label:'Разработчики:', kind: 'longtext', name: 'author'},
    {label:'Название сайта:',kind:'longtext',name:'sitename'},
    {label:'URL сайта:',kind:'longtext',name:'siteurl'},
    {label:'Дата запуска сайта:',kind:'number',name:'startdate'},
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
  
  
  buildForm(formDef1);
  
})();