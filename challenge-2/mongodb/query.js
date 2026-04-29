db.products.find({
 category:"Electronics"
})
.sort({price:-1})
.skip(0)
.limit(5);

db.products.createIndex({
 category:1,
 price:-1
});