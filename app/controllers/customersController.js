(function() {

  var CustomersController = function ($scope) {
    $scope.sortBy = 'name';
    $scope.reverse = false;

    $scope.customers = [
    {
      name: 'John',
      city: 'Chandler',
      orderTotal: '9.9956',
      joined: '1965-01-25',
      id: 1
    },
    {
      name: 'Tom',
      city: 'LA',
      orderTotal: '9.9956',
      joined: '1964-11-15',
      id: 2
    },
    {
      name: 'John',
      city: 'Chicago',
      orderTotal: '4.2256',
      joined: '1985-06-05',
      id: 3
    }];

    $scope.doSort = function (propName) {
      $scope.sortBy = propName;
      $scope.reverse = !$scope.reverse;
    };
  };

  angular.module('customersApp').controller('CustomersController', CustomersController);

}());