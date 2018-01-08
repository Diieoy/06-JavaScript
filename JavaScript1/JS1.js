function Purchase(name, price, number) {
	this.name = name;
	this.price = price;
	this.number = number;

	this.getCost = function() {
		var result = Math.round((this.price * this.number) * 100) / 100;
		return result;
	}

	this.toString = function() {
		return (this.name + ';' + this.price + ';' + this.number + ';' + this.getCost() + ';');
	}
}

var purchases = [
	new Purchase("bread", 1, 1),
	new Purchase("milk", 0.8, 2),
	new Purchase("salt", 3.2222, 5),
	new Purchase("sugar", 3, 3)
];

function showPurchases(purch) {
	for (var i = 0; i < purch.length; i++) {
		document.write("<p>" + purch[i] + "</p>");
	}
}

showPurchases(purchases);


function makeSumm(purch) {
	var totalCost = 0;

	return function(purch) {

		if (typeof purch == "undefined") {
			return totalCost;
		} else {
			return totalCost += purch.getCost();
		}
	}
}

var makeS = makeSumm();

for (var i = 0; i < purchases.length; i++) {
	makeS(purchases[i]);
}

document.writeln("<h2>Итого: " + makeS() + "</h2>");