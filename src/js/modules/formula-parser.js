
let record = {
	"+": (x, y) => x + y,
	"-": (x, y) => x - y,
	"*": (x, y) => x * y,
	"/": (x, y) => x / y,
};

function calculateFormula(fString) {
	let formula = fString,
		marks = Object.keys(record),
		marksNumber = {},
		index;
	marks.map(val => {
		index = formula.indexOf(val);
		if (index > -1) {
			marksNumber[val] = formula.split(val).length - 1;
		}
	});

	let arr = [],
		tempInt = [],
		formulaL = formula.length;
	formula.split("").map((val, index) => {
		if (marks.indexOf(val) > -1) {
			arr.push(tempInt.join(""));
			arr.push(val);
			tempInt = [];
		} else {
			tempInt.push(val);
		}

		if (tempInt.length > 0 && (formulaL - 1) === index) {;
			arr.push(tempInt.join(""));
			tempInt = [];
		}
	});

	let indexMark = 0,
		n1 = 0,
		n2 = 0,
		result = 0;
	for (let key in marksNumber) {
		for (let i=0; i<marksNumber[key]; i++) {
			n1 = 0;
			n2 = 0;
			result = 0;
			indexMark = arr.indexOf(key);

			if (indexMark) {
				n1 = parseInt(arr[indexMark - 1]);
				n2 = parseInt(arr[indexMark + 1]);
				result = record[key](n1, n2);
				arr.splice(indexMark - 1, 3, result + "");
			}
		}
	}
	return arr[0];
}

function calculate(fString) {
	var str = fString,
		brackets = [],
		j = 0,
		N = str.length,
		subStr = "",
		newStr = "",
		result = "",
		signBefore;

	while(true) {
		switch (str[j]) {
			case "(":
				brackets[brackets.length] = { "open": j };
				break;
			case ")":
				for (var i=brackets.length-1; i>-1; i--) {
					if (!brackets[i].close) {
						brackets[i].close = j;
						subStr = str.substring(brackets[i].open + 1, brackets[i].close);
						result = calculateFormula(subStr);
						signBefore = str.substring(brackets[i].open - 1, brackets[i].open);

						if (result >= 0 && (signBefore === "+" || signBefore === "-")) {
							newStr = str.substring(0, brackets[i].open) + result + str.substring(brackets[i].close + 1);
						} else if (result < 0 && signBefore === "-") {
							result = Math.abs(result);
							newStr = str.substring(0, brackets[i].open - 1) + "+" + result + str.substring(brackets[i].close + 1);
						} else {
							newStr = str.substring(0, brackets[i].open - 1) + Math.abs(result) + str.substring(brackets[i].close + 1);
						}
						str = newStr;
						N = str.length;
						j = brackets[i].open - 1;
						i = -1;
					}
				}
				break;
		}
		if (j === N) break;
		else j++;
	}

	return calculateFormula(str)
}

let data = {
		"A1": 2,
		"A2": 3,
		"A3": 4,
	},
	formula = "23+(7*3)-5";

let value = calculate(formula);

console.log(value);

