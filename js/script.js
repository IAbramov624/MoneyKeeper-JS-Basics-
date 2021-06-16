let start = document.getElementById("start"),
	budgetValue = document.getElementsByClassName("budget-value")[0],	
	daybudgetValue = document.getElementsByClassName("daybudget-value")[0],	
	levelValue = document.getElementsByClassName("level-value")[0],	
	expensesValue = document.getElementsByClassName("expenses-value")[0],
	optionalExpensesValue = document.getElementsByClassName("optionalexpenses-value")[0],
	incomeValue = document.getElementsByClassName("income-value")[0],
	monthSavingsValue = document.getElementsByClassName("monthsavings-value")[0],
	yearSavingsValue = document.getElementsByClassName("yearsavings-value")[0],
	expensesItem = document.getElementsByClassName("expenses-item"),
	expensesItemBtn = document.querySelectorAll("button")[0],
	optionalExpensesBtn = document.getElementsByTagName("button")[1],
	countBudgetBtn = document.getElementsByTagName("button")[2],
	optionalExpensesItem = document.querySelectorAll(".optionalexpenses-item"),
	chooseIncome = document.querySelector(".choose-income"),
	savings = document.querySelector("#savings"),
	chooseSum = document.querySelector("#sum"),
	choosePercent = document.querySelector(".choose-percent"),
	yearValue = document.querySelector(".year-value"),
	monthValue = document.querySelector(".monthsavings-value"),
	dayValue = document.querySelector(".day-value"),
	money, 
	time;

let askMoney = function() {
	time = prompt("Введите дату в формате YYYY-MM-DD");
	money = +prompt("Ваш бюджет на месяц?");

	while (isNaN(money) || money =="" || money == null) {
		money = +prompt("Ваш бюджет на месяц?");
	}

	appData.budget = money;
	appData.timeData = time;
	budgetValue.textContent = money.toFixed();

	yearValue.value = new Date(Date.parse(time)).getFullYear();
	monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
	dayValue.value = new Date(Date.parse(time)).getDate();
};
let funcExpenses = function() {
	let sum = 0;

	for (let i = 0; i < expensesItem.length; i++) {
				let a = expensesItem[i].value,
				    b = expensesItem[++i].value;
			
					if ( (typeof(a)) === "string" && (typeof(a) != null) && a != "" 
					    && b != null && b != "") {
						appData.expenses[a] = b;
						sum += +b;
						expensesValue.textContent = sum;
					} else {
						i--
						console.log(sum);
					}
	} 
};
let optExp = function() {

	for (i = 0; i < optionalExpensesItem.length; i++) {
		let opt = optionalExpensesItem[i].value;
		appData.optionalExpenses[i] = opt;
		optionalExpensesValue.textContent += optionalExpensesItem[i].value + "," + " ";
	};
};
let countFunc = function() {
	let outcomes = 0;
		for (i of Object.values(appData.expenses)) {
			outcomes = outcomes + i;
		};

		appData.outcomes = outcomes;
		appData.moneyPerDay = (((appData.budget - appData.outcomes) / 30).toFixed());
		daybudgetValue.textContent = appData.moneyPerDay;

		if (appData.moneyPerDay < 100) {
		levelValue.textContent = "Минимальный уровень достатка";
		} else if (appData.moneyPerDay >= 100 && appData.moneyPerDay < 2000) {
		levelValue.textContent = "Средний уровень достатка";
		} else if (appData.moneyPerDay > 2000) {
		levelValue.textContent = "Высокий уровень достатка";
		} else {
		levelValue.textContent = "Ошибка"}
};
let chooseIncomeFunc = function() {

	let items = chooseIncome.value;

	incomeValue.textContent = items;
	appData.income = items.split(", ");
	appData.income.sort();
}
let chooseSumFunc = function() {
	if (appData.savings === true) {
			let sum = +chooseSum.value;
			let percent = +choosePercent.value;
			appData.monthIncome = sum / 100 / 12 * percent;
			appData.yearIncome = sum / 100 * percent;
			yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
			monthValue.textContent = appData.monthIncome.toFixed(1);
		}
};
let clickFunc = function() {
	if (appData.savings === true) {
		appData.savings = false;
	} else {
		appData.savings = true;	
	}
};
let choosePercentFunc = function() {
	if (appData.savings === true) {
		let sum = +chooseSum.value;
		let percent = +choosePercent.value;
		appData.monthIncome = sum / 100 / 12 * percent;
		appData.yearIncome = sum / 100 * percent;
		yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
		monthValue.textContent = appData.monthIncome.toFixed(1);
	}
}

start.addEventListener("click", askMoney);
expensesItemBtn.addEventListener("click", funcExpenses);
optionalExpensesBtn.addEventListener("click", optExp);
countBudgetBtn.addEventListener("click", countFunc);
chooseIncome.addEventListener("input", chooseIncomeFunc);
savings.addEventListener("click", clickFunc);
chooseSum.addEventListener("input", chooseSumFunc);
choosePercent.addEventListener("input", choosePercentFunc);

let appData = {
	budget: money,
	timeData: time,
	optionalExpenses: {},
	income: [],
	savings: false,
	expenses: {},
	// chooseExpenses: function() {
	
	// 	for (let i = 0; i < 2; i++) {
	// 			let a = prompt("Введите обязательную статью расходов в этом месяце", "")
	// 			    b = +prompt("Во сколько обойдется?", "")
			
	// 				if ( (typeof(a)) === "string" && (typeof(a) != null) && a != "" 
	// 				   && (typeof(b) === "number") && b != null && b != "") {
	// 					appData.expenses[a] = b;
	// 				} else {
	// 					i--
	// 				}
	// 	} 				
	// },
	// detectDayBudget: function() {
	// 	let outcomes = 0;
	
	// 	for (i of Object.values(appData.expenses)) {
	// 		outcomes = outcomes + i;
	// 	}
	
	// 	appData.outcomes = outcomes;
	// 	appData.moneyPerDay = (((appData.budget - appData.outcomes) / 30).toFixed());
	// 	alert(`Ваш бюджет на месяц ${appData.moneyPerDay}`);
	// },
	// detectLevel: function() {
	
	// 	if (appData.moneyPerDay < 100) {
	// 	console.log("Минимальный уровень достатка")
	// 	} else if (appData.moneyPerDay >= 100 && appData.moneyPerDay < 2000) {
	// 	console.log("Средний уровень достатка")
	// 	} else if (appData.moneyPerDay > 2000) {
	// 	console.log("Высокий уровень достатка")
	// 	} else {
	// 	console.log("Ошибка")}
	// },
	// checkSavings: function () {
	// 	if (appData.savings === true) {
	// 		let save = +prompt("Введите сумму накоплений"),
	// 			percent = +prompt("Под какой процент?");
	
	// 		appData.monthIncome = save / 100 / 12 * percent;
	// 		alert(`Доход в месяц с Вашего депозита: ${appData.monthIncome}`);
	// 	}
	// },
	// chooseOptExpenses: function () {
	
	// 	for (i = 0; i < 3; i++) {
	// 		let chooseOptExpenses = prompt("Статья необязательных расходов");
	
	// 		if ((typeof chooseOptExpenses === "string") && chooseOptExpenses != null
	// 			&& chooseOptExpenses != "") {
	
	// 		appData.optionalExpenses[i + 1] = chooseOptExpenses;
	// 	} else {
	// 		i--
	// 	}
	// 	}
	// },
	// chooseIncome: function() {
	
	// 	let items = prompt("Дополнительный доход, перечислите через запятую", "");
		
	// 	while (isNaN(items) !== true || items === "") {
	// 		items = prompt("Дополнительный доход, перечислите через запятую", "");
	// 	}
	
	// 		appData.income = items.split(", ");
	// 		appData.income.push(prompt("Еще какие-либо виды доходов?"));
	// 	appData.income.sort();
	// }	
};

// appData.chooseExpenses();
// appData.detectDayBudget();
// appData.detectLevel();
// appData.checkSavings();
// appData.chooseOptExpenses();
// appData.chooseIncome();	

// appData.income.forEach(function(item, index) {
// 	console.log(`Способ доп. заработка ${index + 1} : ${item}`)
// });

// for (i in appData) {
// 	console.log(`Наша программа включает в себя данные: ${i}: ${appData[i]}`);
// }

