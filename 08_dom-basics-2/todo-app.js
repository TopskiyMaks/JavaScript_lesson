(function() {
    function createAppTitle(title) {
        let appTitle = document.createElement('h2');
        appTitle.innerHTML = title;
        return appTitle;
    }

    function createTodoItemForm() {
        let form = document.createElement('form');
        let input = document.createElement('input');;
        let buttonWrapper = document.createElement('div');;
        let button = document.createElement('button');;

        form.classList.add('input-group', 'mb-3');
        input.classList.add('form-control');
        input.placeholder = 'Введите название нового дела';
        buttonWrapper.classList.add('input-group-append');
        button.classList.add('btn', 'btn-primary');
        button.disabled = true;
        button.textContent = 'Добавить дело';
        input.oninput = checkInput;

        
        buttonWrapper.append(button);
        form.append(input);
        form.append(buttonWrapper);

        return {
            form,
            input,
            button,
        };
    }

    function createTodoList() {
        let list = document.createElement('ul');
        list.classList.add('list-group');
        return list;
    }

    function createTodoItem(name) {
        let item = document.createElement('li');
        
        let buttonGroup = document.createElement('div');
        let doneButtone = document.createElement('button');
        let deleteButtone = document.createElement('button');
    
            item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
            item.textContent = name;

            buttonGroup.classList.add('btn-group', 'btn-group-sm');
            doneButtone.classList.add('btn', 'btn-success');
            doneButtone.textContent = 'Готово';
            deleteButtone.classList.add('btn', 'btn-danger');
            deleteButtone.textContent = 'Удалить';
    
            buttonGroup.append(doneButtone);
            buttonGroup.append(deleteButtone);
            item.append(buttonGroup);
                        
            return {
                item,
                doneButtone,
                deleteButtone,
            };
    }

    function createTodoApp(container, title='Список дел', owner, todos) {
            let todoAppTitle = createAppTitle(title);
            let todoItemForm = createTodoItemForm();
            let todoList = createTodoList();

            container.append(todoAppTitle);
            container.append(todoItemForm.form);
            container.append(todoList);
            if (todos) {
                for (let item of todos) {
                    if (item.hasOwnProperty('name') && item.name != '' && item.hasOwnProperty('done')) { 
                        let todoItem = createTodoItem(item.name);

                        todoItem.doneButtone.addEventListener('click', function() {
                            todoItem.item.classList.toggle('list-group-item-success');
                            changeStatusTodo(owner, item.name, item.done)
                        });
                        todoItem.deleteButtone.addEventListener('click', function() {
                            if (confirm('Вы уверены?')) {
                                todoItem.item.remove();
                                removeTodo(owner, item.name)
                            }
                        });

                        if (item.done) {
                            todoItem.item.classList.toggle('list-group-item-success');
                        }

                        todoList.append(todoItem.item);
                    }
                }    
            }
            todoItemForm.form.addEventListener('submit' , function(e) {
                e.preventDefault();
    
                if (!todoItemForm.input.value) {
                    return;
                }
                let name = todoItemForm.input.value
                let todoItem = createTodoItem(name);
                saveTodo(owner, name, false)
                todoItem.doneButtone.addEventListener('click', function(){
                    todoItem.item.classList.toggle('list-group-item-success');
                    changeStatusTodo(owner, name, true)
                });
                todoItem.deleteButtone.addEventListener('click', function(){
                    if (confirm('Вы уверены?')) {
                        todoItem.item.remove();
                        removeTodo(owner, name)
                    }
                });
             
                todoList.append(todoItem.item);
                todoItemForm.input.value = '';
                checkInput();
            })
    }

    function checkInput () {
        let input = document.getElementsByClassName('form-control')[0];
        let button = document.getElementsByClassName('btn')[0];

        if (input.value) {
            button.disabled = false;
        }
        else {
            button.disabled = true;
        }
    }

    function saveTodo(owner, name, done) {
        let items = JSON.parse(localStorage.getItem(owner))

        if (items == null) {
            items = [{'name': name, 'done': done}]
        }
        else{
            items.push({'name': name, 'done': done})
        }

        for (let i = 0; i < items.length; i++) {
            if (items[i].name == name) {
                items.splice(i, 1)
            }
        }
        items.push({'name': name, 'done': done})

        let serialObj = JSON.stringify(items);
        localStorage.setItem(owner, serialObj);
    }

    function changeStatusTodo(owner, name, done) {
        let items = JSON.parse(localStorage.getItem(owner))
        
        for (let i = 0; i < items.length; i++) {
            if (items[i].name == name) {
                if (items[i].done == true) {
                    items[i].done = false
                }
                else {
                    items[i].done = true
                }
            }
        }

        let serialObj = JSON.stringify(items);
        localStorage.setItem(owner, serialObj);

    }


    function removeTodo(owner, name) {
                let items = JSON.parse(localStorage.getItem(owner))

                for (let i = 0; i < items.length; i++) {
                    if (items[i].name == name) {
                        items.splice(i, 1)
                    }
                }
                console.log(items)
                let serialObj = JSON.stringify(items);
                localStorage.setItem(owner, serialObj); //теперь у вас в localStorage хранится ключ "myKey" cо значением "myValue"
    }

    window.createTodoApp = createTodoApp;
})();

