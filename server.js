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

// URL will be http://localhost:3000/all/in_stock=false
app.get('/in_stock=:in_stock', function(req,res){
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

const min_price = app.get('/min_price=:product_price', function(req,res){
  const price = req.params.product_price;
  if ((price > 0) && (price <= 10)) {
    let filteredData = [];
    for (var i = 0; i < data.length; i++) {
      if (data[i].product_price.toString()===price) {
        filteredData.push(data[i]);
      }
    }
    res.send(filteredData);
  } else {
    res.send('Invalid')
  }
  // res.send(Math.min(`${filteredData}`));
});

const max_price = app.get('/max_price=:product_price',function(req,res){
  const price = req.params.product_price;
  if ((price == 100)) {
    let filteredData = [];
    for (var i = 0; i < data.length; i++) {
      if (data[i].product_price.toString()===price) {
        filteredData.push(data[i]);
      }
    }
    res.send(filteredData);
  } else {
    res.send('Invalid')
  }
})

app.get('/min_price=:value/max_price=:value',function(req,res){
  const price = req.params.product_price;
  if (min_price && max_price) {
    let filteredData=[];
    for (var i = 0; i < data.length; i++) {
      if (data[i].product_price.toString()===price) {
        filteredData.push(data[i]);
      }
    }
    res.send(filteredData);
  } else {
    res.send('Invalid')
  }
})
//
// app.get('min_price=:value/max_price=:value', function(req,res){
//   const price = req.params.product_price;
//   const min_price = ((price>0) && (price<=10));
//   const max_price = (price = 100)
//   if (min_price || max_price) {
//     let filteredData=[];
//     for (var i = 0; i < data.length; i++) {
//       if (data[i].product_price.toString()===price) {
//         filteredData.push(data[i]);
//       }
//     }
//     res.send(filteredData);
//   } else {
//     res.send('Invalid')
//   }
// })


app.listen(port, ()=> console.log(`application is running on port ${port}`));
