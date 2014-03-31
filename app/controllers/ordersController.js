(function() {

  var OrdersController = function ($scope, $routeParams) {
    var customerId = $routeParams.customerId;
    $scope.orders = null;

    function init() {
      // search customers for custonerid
      for (var i=0, len=$scope.customers.length;i<len;i++) {
        if ($scope.customers[i].id === parseInt(customerId)) {
          $scope.orders = $scope.customers[i].orders;
          break;
        }
      }
    }

    $scope.customers = [
      {
        id: 1,
        name: 'John',
        city: 'Chandler',
        orderTotal: '9.9956',
        joined: '1965-01-25',
        orders: [
          {
            id: 1,
            product: 'Basketball',
            total: 15.995
          }
        ]
      },

      {
        id: 2,
        name: 'Tom',
        city: 'LA',
        orderTotal: '9.9956',
        joined: '1964-11-15',
        orders: [
          {
            id: 2,
            product: 'Baseball',
            total: 9.995
          }
        ]
      },
      {
        id: 3,
        name: 'John',
        city: 'Chicago',
        orderTotal: '4.2256',
        joined: '1985-06-05',
        orders: [
          {
            id: 3,
            product: 'Soccer ball',
            total: 12.995
          }
        ]
      }];

      init();
    };

  OrdersController.$inject = ['$scope', '$routeParams'];
  angular.module('customersApp').controller


  angular.module('customersApp').controller('OrdersController', OrdersController);

}());