window.onload=function(){
	//двовимірний масив користувачів
	var users=[
		["Petro",23,20000],
		["Ivan",34,18000],
		["Andriy",22,16000],
		["Iryna",30,19000],
		["Volodymyr",22,26000]
	];
	//створюємо таблицю, передаєм в параметрах тег body і двовимірний масив користувачів
	createTable(document.body,users);
	//створюємо форму вводу, передаєм в параметрах тег body
	createForm(document.body);

	
	//функція - додає новий рядок з даними користувача в таблицю
	//параметри: table-таблиця(тег table), user-одновимірний масив з даними про користувача
	function addRowTable(table,user){
		//створюємо елемент tr і додаєм його в елемент table
		var tr=document.createElement('tr');
		tr.classList.add('tr');
		table.appendChild(tr);
		//створюємо елемент input (кнопку для видалення рядка)
		var del=document.createElement('input');
		del.setAttribute('type','button');
		del.setAttribute('value','Delete');
		del.classList.add('del');
		//створюємо циклічно елементи td і додаємо їх до текучого елемента tr
		for(var i=0;i<=user.length;i++){
			var td=document.createElement('td');
			td.classList.add('td');
			tr.appendChild(td);
			// в останній td рядка додаєм створену кнопку del
			if(i<user.length)
				td.innerHTML=user[i];
			else
				td.appendChild(del);
		}
		// додаєм функцію-обробник на кнопку
		del.onclick=function(){
			var tr=this.parentElement.parentElement;
			table.removeChild(tr);
		}
	}

	//функція - створює таблицю
	//параметри: container-батьківський тег для таблиці, 
	//masusers-двовимірний масив з даними про користувачів
	function createTable(container,masusers){
		var table=document.createElement('table');
		table.classList.add('table');
		table.setAttribute('id','table');
		container.appendChild(table);
		//викликаєм в циклі функцію addRowTable
		for(var i=0;i<masusers.length;i++){
			addRowTable(table,masusers[i]);
		}
	}
	
	//функція-обробник для додавання нового користувача з форми
	//параметри: table - таблиця(елемент table), 
	//firstname, age, salary-елементи input, які характеризують
	//ім'я, вік та зарплату користувача
	function addNewUser(table,firstname,age,salary){
		//зчитуєм дані з форми і заносим їх в масив
		var mas=[];
		var namevalue=firstname.value;
		if(!namevalue) return;
		mas.push(namevalue);
		var agevalue=age.value;
		if(!agevalue) return;
		mas.push(age.value);
		var salaryvalue=salary.value;
		if(!salaryvalue) return;
		mas.push(salaryvalue);
		//викликаєм функцію addRowTable
		addRowTable(table,mas);
		firstname.value='';
		age.value='';
		salary.value='';
	}

	//функція - створює форму для вводу даних
	//параметри: container-батьківський тег для форми 
	function createForm(container){
		var mas=["firstname","age","salary","add"];
		var form=document.createElement('form');
		form.classList.add('form');
		container.appendChild(form);
		//створюємо в циклі елементи input і додаєм їх в тег form
		for(var i=0;i<mas.length;i++){
			var input=document.createElement('input');
			input.classList.add('input');
			form.appendChild(input);
			input.setAttribute("id",mas[i]);
			//останній input повинен бути кнопкою і мати функцію обробник на
			//подію onclick
			if(i==mas.length-1){
				input.setAttribute('type','button');
				input.setAttribute('value','addUser');
				input.onclick=function(){
					//виклик функції addNewUser
					addNewUser(table,firstname,age,salary);
				}
			}
			else
				input.setAttribute('placeholder','input '+mas[i]);
		}
	}
}