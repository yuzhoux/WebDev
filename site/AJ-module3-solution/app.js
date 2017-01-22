(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);


function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'listItem.html',
    scope: {
      restrict: 'AE',
      found: '<',
      onRemove: '&'
    }
  };
  return ddo;
}


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var menu = this;
  menu.searchTerm="";

  menu.get = function(){
  var promise = MenuSearchService.getMatchedMenuItems(menu.searchTerm);

  promise.then(function (response) {
    menu.found=response;
    console.log(response);
  })
  .catch(function (error) {
    console.log("Something went terribly wrong.");
  })
  };


  // menu.logMenuItems = function (shortName) {
  //   var promise = MenuSearchService.getMenuForCategory(shortName);

  //   promise.then(function (response) {
  //     console.log(response.data);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   })
  // };

}


MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;
  // service.getMenuCategories = function () {
  //   var response = $http({
  //     method: "GET",
  //     url: (ApiBasePath + "/categories.json")
  //   });

  //   return response;
  // };


  // service.getMenuForCategory = function (shortName) {
  //   var response = $http({
  //     method: "GET",
  //     url: (ApiBasePath + "/menu_items.json"),
  //     params: {
  //       category: shortName
  //     }
  //   });
  //   return response;
  // };

  service.getMatchedMenuItems= function (searchTerm){
    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    }).then(function (result) {
    var foundItems=[];
    for (var i = 0; i < result.data.menu_items.length; i++) {
      if (result.data.menu_items[i].name.toLowerCase().indexOf(searchTerm)>0){
        foundItems.push(result.data.menu_items[i].name)
      };
    };
    return foundItems;
  });
};
  service.removeItem = function (itemIndex) {
    found.splice(itemIndex, 1);
  };

}

})();
