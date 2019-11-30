 "use strict";

(function () {
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

  let inputWidth = {
    number: '80px',
    shorttext: '200px',
    longtext: '453px'
  };

  var form1 = document.createElement("form");
  form1.setAttribute("id", "formDef1");
  var form2 = document.createElement("form");
  form2.setAttribute("id", "formDef2");

  buildForm(form1, formDef1);
  buildForm(form2, formDef2);

  function buildForm (form, arr) {
    var table = document.createElement("table");

    arr.forEach((element) => {
      let row = document.createElement("tr");
      let td = document.createElement("td");
      td.innerHTML = element.label;
      row.appendChild(td);
      td = document.createElement("td");
      let input = document.createElement("input");
      switch(element.kind) {
        case "longtext":
        case "number":
        case "shorttext":
          input.setAttribute("type", "text");
          input.setAttribute("name", element.name);
          input.style.width = inputWidth[element.kind];
          td.appendChild(input);
        break;
        case "combo":
          let select = document.createElement("select");
          select.setAttribute("name", element.name);
          select.style = "width: 204px; margin-left: 2px;";
          for(let variant of element.variants) {
            let option = document.createElement("option");
            option.setAttribute("value", variant.value);
            option.innerHTML = variant.text;
            select.appendChild(option);
          }
          select.lastChild.setAttribute('selected', '');
          td.appendChild(select);
          break;
        case "radio":
          input.setAttribute("type", "radio");
          for(let variant of element.variants) {
            input.setAttribute("name", element.name);
            input.setAttribute("value", variant.value);
            let span = document.createElement("span");
            span.innerHTML = variant.text;
            span.style.cssText = "padding: 0px 10px 0px 0px";
            td.appendChild(input);
            td.appendChild(span);            
          }
          break;
        case "check":
          input.setAttribute("type", "checkbox");
          input.setAttribute("name", element.name);
          td.appendChild(input);
          break;
        case "memo":
          row.removeChild(row.lastChild);
          td.setAttribute('colspan', '2');
          td.innerHTML = element.label + "<br>";
          let textarea = document.createElement("textarea");
          textarea.setAttribute("name", element.name);
          textarea.style.cssText = "width: 608px; height: 50px";
          td.appendChild(textarea);
          break;
        case "submit":
          let value = element.label;
          row.removeChild(row.lastChild);
          input.setAttribute("type", "submit");
          input.setAttribute("value", value.substring(0, value.length - 1))
          td.appendChild(input);
      }

      row.appendChild(td);
      table.appendChild(row);
    });

    form.setAttribute('method', 'POST');
    form.setAttribute('action', '//fe.it-academy.by/TestForm.php');
    form.setAttribute('target', '_blank');
    form.appendChild(table);
    document.body.innerHTML += "<hr style='margin: 20px 0 15px 0'>";
    document.body.appendChild(form);
  }
})();