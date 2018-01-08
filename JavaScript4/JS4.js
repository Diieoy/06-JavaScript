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


function PricePurchase(name, price, number, discount) {
	Purchase.apply(this, arguments);
	this.discount = discount;

	this.parentGetCost = Purchase.prototype.getCost;
	this.getCost = function() {
		var cost = this.parentGetCost();
		var result = Math.round((cost * (1 - this.discount / 100)) * 100) / 100;
		return result;
	}

	this.parentToString = Purchase.prototype.toString;
	this.toString = function() {
		var result = this.parentToString();
		var data = result.split(';');
		data[4] = data[3];
		data[3] = this.discount;
		var result = data.join(';');

		return result;
	}
}


function FixedDiscountPurchase(name, price, number, discountInRub) {
	Purchase.apply(this, arguments);
	this.discountInRub = discountInRub;
}

FixedDiscountPurchase.prototype = Object.create(Purchase.prototype);
FixedDiscountPurchase.prototype.constructor = FixedDiscountPurchase;

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

//1
var purchases = [
	new Purchase("bread", 1, 1),
	new Purchase("milk", 0.8, 2),
	new Purchase("salt", 3.2222, 5),
	new PricePurchase("candy", 10, 2, 0.1),
	new PricePurchase("choco", 5, 4, 2),
	new PricePurchase("cheese", 15, 3, 4.1),
	new FixedDiscountPurchase("popcorn", 15, 10, 5),
	new FixedDiscountPurchase("olives", 8, 10, 10),
	new FixedDiscountPurchase("soda", 20, 10, 2),
];

//2
function Show(value) {
	document.write("<p>" + value + "</p>");
}
purchases.forEach(Show);

//3
document.write("<br/>");

function CheckCost(value) {
	if (value.getCost() > 20) {
		return value;
	}
}
var newArrPurchases = purchases.filter(CheckCost);
newArrPurchases.forEach(Show);

//4
document.write("<br/>");

function ChangeBasePurchase(value) {
	if (value.discount == undefined) {
		return new PricePurchase(value.name, value.price, value.number, value.number * 2);
	} else {
		return value;
	}
}
var newArrPurchases2 = purchases.map(ChangeBasePurchase);
newArrPurchases2.forEach(Show);

//5
document.write("<br/>");

function isMoreThan_50(value) {
	return (value.getCost() > 50);
}
document.write("<p>" + "Все ли покупки с итоговой стоимостью, более 50? - " + purchases.every(isMoreThan_50) + "</p>");
document.write("<p>" + "Есть ли покупки со стоимостью, более 50? - " + purchases.some(isMoreThan_50) + "</p>");

//6
document.write("<br/>");
var maxPurchase = purchases.reduce(function(prev, curr) {
	if (prev.getCost() > curr.getCost()) {
		return prev;
	} else {
		return curr;
	}
});
document.write("<p>" + maxPurchase + "</p>");

//7
document.write("<br/>");

var maxName = purchases[purchases.length - 1].name;
var maxPrice = purchases[purchases.length - 1].price;
var minNumber = purchases[purchases.length - 1].number;

purchases.reduceRight(function(prev, curr) {
	if (curr.name.length > maxName.length) {
		maxName = curr.name;
	}

	if (curr.price > maxPrice) {
		maxPrice = curr.price;
	}

	if (curr.number < minNumber) {
		minNumber = curr.number;
	}

	return curr;
});

var newPurch = new Purchase(maxName, maxPrice, minNumber);
document.write("<p>" + newPurch + "</p>");