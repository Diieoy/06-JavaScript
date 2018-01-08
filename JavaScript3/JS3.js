function Purchase(name, price, number) {
	this.name = name;
	this.price = Math.round(price * 100) / 100;
	this.number = number;
}

Purchase.prototype.getCost = function() {
	return (Math.round((this.price * this.number) * 100) / 100);
}

Purchase.prototype.toString = function() {
	return (this.name + ';' + this.price + ';' + this.number + ';' + this.getCost());
}


function FixedDiscountPurchase(name, price, number, discountInRub) {
	Purchase.apply(this, arguments);
	this.discountInRub = discountInRub;
}

FixedDiscountPurchase.prototype.getCost = function() {
	var cost = Purchase.prototype.getCost.apply(this, arguments);

	if (cost >= 100) {
		return (cost - this.discountInRub);
	} else {
		return cost;
	}
}

FixedDiscountPurchase.prototype.toString = function() {
	var result = Purchase.prototype.toString.apply(this, arguments);
	var data = result.split(';');
	data[4] = data[3];
	data[3] = this.discountInRub;
	var result = data.join(';');

	return result;
}

var purchases = [
	new Purchase("bread", 1, 1),
	new Purchase("milk", 0.8, 2),
	new Purchase("salt", 3.2222, 5),
	new Purchase("sugar", 3, 3)
];

purchases[4] = new FixedDiscountPurchase("candy", 15, 10, 5);
purchases[5] = new FixedDiscountPurchase("choco", 8, 10, 10);
purchases[6] = new FixedDiscountPurchase("cheese", 20, 10, 2);

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