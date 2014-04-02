var express = require('express'),
    app = express();

app.configure(function (){
  app.use(express.static(__dirname, '/'));
});

app.get('/customers/:id', function(req, res){
  var customerId = parseInt(req.params.id);
  var data = {};
  for (var i=0, len=customers.length;i<len;i++) {
    if (customers[i].id === customerId) {
      data = customers[i];
      break;
    }
  }
  res.json(data);
});

app.get('/customers', function(req, res) {
  res.json(customers);
});

app.get('/orders', function(req, res) {
  var orders = [];
  for (var i=0, len=customers.length; i<len;i++) {
      if (customers[i].orders) {
        for (var j=0, ordersLen=customers[i].orders.length; j<ordersLen; j++) {
          orders.push(customers[i].orders[j]);
        }
      }
  }
  res.json(orders);
});

app.delete('/customers/:id', function(req, res) {
  var customerId = parsInt(req.params.id);
  var data = { status: true};
  for (var i=0, len=customers.length; i<len;i++) {
    if (customers[i].id === customerId){
      customers.splice(i,1);
      data = { status: true};
      break;
    }
  }
  res.json(data);
});

app.listen(8080);

console.log('Express listening on port 8080');

var customers = [
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