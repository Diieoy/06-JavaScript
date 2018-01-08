function Purchase(name, price, number) {
	this.name = name;
	this.price = Math.round(price * 100) / 100;
	this.number = number;

	this.getCost = function() {
		var result = Math.round((this.price * this.number) * 100) / 100;
		return result;
	}

	this.toString = function() {
		return (this.name + ';' + this.price + ';' + this.number + ';' + this.getCost() + ';');
	}
}

function PricePurchase(name, price, number, discount) {
	Purchase.apply(this, arguments);
	this.discount = discount;

	this.getCost = function() {
		var result = Math.round((this.price * this.number * (1 - this.discount / 100)) * 100) / 100;
		return result;
	}

	var parentToString = this.toString;
	this.toString = function() {
		var result = parentToString.call(this);
		var data = result.split(';');
		data[4] = data[3];
		data[3] = this.discount;
		var result = "";
		for (var i = 0; i < data.length; i++) {
			result += data[i] + ';';
		}

		return result;
	}
}

var purchases = [
	new Purchase("bread", 1, 1),
	new Purchase("milk", 0.8, 2),
	new Purchase("salt", 3.2222, 5),
	new Purchase("sugar", 3, 3)
];

purchases[4] = new PricePurchase("candy", 10, 2, 0.1);
purchases[5] = new PricePurchase("choco", 5, 4, 2);
purchases[6] = new PricePurchase("cheese", 15, 3, 4.1);

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