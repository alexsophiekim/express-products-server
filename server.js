const port = 3000;
const express = require('express');
const app = express();

const data = require('./products.json');

app.use(function(req,res,next){
  console.log(`${req.method} request for ${req.url}`);
  next();
})

app.get('/all',function(req,res){
  res.json(data);
});

app.get('/all/in_stock=:in_stock', function(req,res){
  const stock = req.params.in_stock;
  if ((stock === "true") || (stock === "false")) {
    let filteredData =[];
    for (var i = 0; i < data.length; i++) {
      if (stock === data[i].in_stock.toString()) {
        filteredData.push(data[i]);
      }
    }
    res.send(filteredData);
  } else {
    res.send('Invalid')
  }

});

app.get('/all/min_price=:value', function(req,res){
  const price = req.params.product_price;
  let filteredData = [];
  for (var i = 0; i < data.length; i++) {
    if (price === data[i].product_price.toString()) {
      filteredData.push(data[i]);
    }
  }
  res.send(Math.min(`${filteredData}`));

})


app.listen(port, ()=> console.log(`application is running on port ${port}`));
