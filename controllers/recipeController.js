exports.index = function (req, res) {
  res.render("index", {
    title: "Dashi",
  });
};

// Display list of all recipes
exports.recipe_list = function (req, res) {
  res.send("NOT IMPLEMENTED: Recipe list GET");
};

//Display recipe create form on GET
exports.recipe_create_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Recipe create GET");
};

//Handle recipe create on POST
exports.recipe_create_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Recipe create POST");
};
