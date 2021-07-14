(function () {
  function addStudent() {
    add_btn = document.getElementById('btn_add_student')
    add_btn.addEventListener('click', function () {

      let student_form = document.getElementById('student_form')
      if (document.getElementById('alertError')) {
        student_form.removeChild(document.getElementById('alertError'))
      }
      let valid_form = validateForm(student_form)
      if (valid_form != false) {
        let data = converData(student_form)
        student_form.reset()
        let table = document.getElementById('student_table_body')
        let row = createRow(data)
        storageSave(data)
        table.append(row)
      }
    })
  }

  function filterTable(filter, index) {
    // let input = document.getElementById("myInput");
    filter = filter.toUpperCase();
    let table = document.getElementById("student_table_body");
    let tr = table.getElementsByTagName("tr");
    let td, value
    for (let i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td");
      if (index == 1) {
        value = td[2].textContent.toUpperCase()
        value = value.split('-')[0]
      } else if  (index == 2) {
        value = td[2].textContent.toUpperCase()
        value = value.split('-')[1]
      }
      else {
        value = td[index].textContent.toUpperCase()
      }
      if (value.indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }

  function addAlert(student_form, message) {
    let alert_error = document.createElement('div')
    alert_error.className = 'alert alert-danger'
    alert_error.role = 'alert'
    alert_error.id = 'alertError'
    alert_error.innerHTML = message
    student_form.append(alert_error)
  }

  function validateForm(student_form) {
    valid = true;
    let form = document.getElementById('student_form')
    let inputs = form.querySelectorAll('.form-control')
    inputs.forEach(function (input) {
      if (input.value == "") {
        if (input.ariaLabel == null) {
          addAlert(form, `Не заполнено поле Год рождения`)
        } else {
          addAlert(form, `Не заполнено поле ${input.ariaLabel}`)
        }
        valid = false
      }
    });
    return valid;
  }

  function converData(student_form) {
    let name = student_form.querySelector('#name').value.trim()
    let surname = student_form.querySelector('#surname').value.trim()
    let middlename = student_form.querySelector('#middlename').value.trim()
    let birth_date = student_form.querySelector('#birth_date').value.trim()
    let study_start = parseInt(student_form.querySelector('#study_start').value.trim())
    let faculty = student_form.querySelector('#faculty').value.trim()
    let curr_date = new Date();
    let _birth_date = new Date(birth_date);
    if (_birth_date >= curr_date || new Date(1990, 0, 0) >= _birth_date) {
      addAlert(student_form, `Дата рождения не может быть позже текущей даты и раньше 1990 года`)
      return false
    }
    if (study_start >= curr_date.getFullYear() || 2000 >= study_start) {
      addAlert(student_form, `Год начала обучения не может быть больше ${new Date().getFullYear()} и меньше 2000`)
      return false
    }
    // Возраст
    let age = Math.abs(new Date(Date.now() - _birth_date).getFullYear() - 1970)
    age = agetostr(age)
    // birth_date = 
    // Вычисление номера курса
    let curr_course = curr_date.getFullYear() - study_start
    if (curr_date >= new Date(curr_date.getFullYear(), 8, 1)) {
      curr_course += 1
    } else if (curr_date >= new Date(study_start + 4, 8, 1)) {
      curr_course = 'закончил'
    }
    // Запись в словарь
    let student = {
      full_name: `${surname} ${name} ${middlename}`,
      birth_date: `${birth_date} (${(age)})`,
      study_years: `${study_start}-${study_start + 4} (${curr_course})`,
      faculty: faculty,
    }
    return student
  }

  function createRow(data) {
    let row = document.createElement('tr');
    let td
    for (let elem in data) {
      if (data.hasOwnProperty(elem)) {
        td = document.createElement('td')
        td.innerHTML = data[elem]
        row.append(td)
      }
    }
    return row
  }

  function agetostr(age) {
    let txt;
    count = age % 100;
    if (count >= 5 && count <= 20) {
      txt = 'лет';
    } else {
      count = count % 10;
      if (count == 1) {
        txt = 'год';
      } else if (count >= 2 && count <= 4) {
        txt = 'года';
      } else {
        txt = 'лет';
      }
    }
    return age + " " + txt;
  }

  function storageSave(data) {
    let items = JSON.parse(localStorage.getItem('students'))
    if (items == null) {
      items = [{
        'fullname': data.full_name,
        'birth_date': data.birth_date,
        'study_years': data.study_years,
        'faculty': data.faculty,
      }]
    } else {
      items.push({
        'fullname': data.full_name,
        'birth_date': data.birth_date,
        'study_years': data.study_years,
        'faculty': data.faculty,
      })
    }
    let serialObj = JSON.stringify(items);
    localStorage.setItem('students', serialObj);
  }

  function loadStorage(data) {
    if (data) {
      for (let item of data) {
        if (item.hasOwnProperty('fullname') && item.name != '') {
          let table = document.getElementById('student_table_body')
          let row = createRow(item)
          table.append(row)
        }
      }
    }
  }
  window.loadStorage = loadStorage;
  window.addStudent = addStudent;
  window.filterTable = filterTable;

})();
