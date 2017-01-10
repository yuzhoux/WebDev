(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.dishes = "";

  $scope.LunchCheck = function () {
    var output = calculateNumDishes();
    $scope.message=output;
  };

  function calculateNumDishes() {
    var l=0;
    var string =$scope.dishes.split(",");
    for (var i = 0; i < string.length; i++) {
      l += string[i].length;
    }
    if (l<1){
      return "Please enter data first";
    } else if (l<=3){
      return "Enjoy!";
    } else if (3<l){
      return "Too Much!";
    };
  };
}

})();
