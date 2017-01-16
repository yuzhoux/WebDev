(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ShoppingListCheckOffToBuy', ShoppingListCheckOffToBuy)
.controller('ShoppingListCheckOffBought', ShoppingListCheckOffBought)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ShoppingListCheckOffToBuy.$inject = ['ShoppingListCheckOffService'];
function ShoppingListCheckOffToBuy(ShoppingListCheckOffService) {
  var ToBuyController = this;

  ToBuyController.items = ShoppingListCheckOffService.getItems();

  ToBuyController.removeItem = function (itemIndex) {
   ShoppingListCheckOffService.addItem(itemIndex);
    ShoppingListCheckOffService.removeItem(itemIndex);
    ToBuyController.show = ToBuyController.items.length==0;
  };
}


ShoppingListCheckOffBought.$inject = ['ShoppingListCheckOffService'];
function ShoppingListCheckOffBought(ShoppingListCheckOffService) {
  var AlreadyBoughtController = this;

  AlreadyBoughtController.items = ShoppingListCheckOffService.getItemsTwo();

  AlreadyBoughtController.addItem = function (itemIndex) {
    ShoppingListCheckOffService.addItem(itemIndex);
  }

  AlreadyBoughtController.removeItem = function (itemIndex) {
    ShoppingListCheckOffService.removeItem(itemIndex);
  };
}


function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var tobuy = [];
  var item = {
    name: "cookies", 
    quantity: 1 , 
  };
  tobuy.push(item);
  var item = {
    name: "apples", 
    quantity: 5 , 
  };
  tobuy.push(item);
    var item = {
    name: "eggs", 
    quantity: 12 , 
  };
  tobuy.push(item);
    var item = {
    name: "milk", 
    quantity: 3 , 
  };
  tobuy.push(item);
    var item = {
    name: "Oil", 
    quantity: 2 , 
  };
  tobuy.push(item);

  var bought = [];

  service.addItem = function (itemIndex) {
    bought.push(tobuy[itemIndex]);
  };

  service.removeItem = function (itemIndex) {
    tobuy.splice(itemIndex, 1);
  };

  service.getItems = function () {
    return tobuy;
  };
    service.getItemsTwo = function () {
    return bought;
  };
}

})();
