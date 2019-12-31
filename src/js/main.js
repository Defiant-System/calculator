
// import * as math from "./modules/math.js"
// console.log( math.subtract(7, 3) );

let tape = [];
let resetDisplay = true;

const calculator = {
	init() {
		// fast references
		this.body = window.find("content");
		this.display = window.find(".display");

		// bind css3 event handler
		this.body.bind("animationend", this.dispatch);
	},
	dispatch(event) {
		let self = calculator,
			el,
			value,
			result;
		switch (event.type) {
			// native events
			case "view-basic":
			case "window.restore":
				window.width = 242;
				this.body.removeClass("extended");
				return false;
			case "view-scientific":
			case "window.maximize":
				window.width = 602;
				this.body.addClass("extended");
				return false;
			case "keystroke":
				if (event.char.match(/\d/) !== null) {
					el = window.find(`.button[data-click="${event.char}"]`).addClass("down");

					self.dispatch({
						type: "enter-digit",
						el
					})
				}
				break;
			case "animationend":
				window.find('.button.down').removeClass("down");
				break;
			// custom events
			case "reset-display":
				self.display.html("0");

				tape = [];
				resetDisplay = true;
				break;
			case "enter-digit":
				value = self.display.html();
				value = resetDisplay ? "" : value;
				value += event.el.attr("data-char");

				self.display.html(value);
				resetDisplay = false;
				break;
			case "operand":
				tape.push(self.display.html());
				tape.push(event.el.attr("data-char"));

				resetDisplay = true;
				break;
			case "equals":
				tape.push(self.display.html());
				console.log(tape);

				resetDisplay = true;
				
				result = self.calculate();
				console.log(result);
				self.display.html(result);
				break;
		}
	},
	calculate() {
		let value = 0;
		let operand = "add";

		tape.map(item => {
			const operands = ["add", "subtract", "multiply", "divide"];

			if (operands.indexOf(item) > -1) {
				return operand = item;
			}

			switch (operand) {
				case "subtract": value -= +item; break;
				case "multiply": value *= +item; break;
				case "divide":   value /= +item; break;
				case "add":
				default:
					value += +item;
			}
		});

		return value;
	}
};

window.exports = calculator;
