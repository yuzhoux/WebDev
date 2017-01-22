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
      items: '<',
      onRemove: '&'
    },
    controller: NarrowItDownController,
    controllerAs: 'narrow',
    bindToController: true
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
  menu.removeItem = function (itemIndex) {
    menu.found.splice(itemIndex, 1);
  };

}


MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

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
  }).catch(function (error) {
            console.log(error);
          });
};

}

})();
