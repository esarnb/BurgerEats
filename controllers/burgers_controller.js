var router = require("express").Router();
var burger = require("../models/burger");

router.get("/", function(req, res) {
  burger.all(function(data) {
    res.render("index", { burgers: data });
  });
});

router.post("/api/burger", function(req, res) {
  burger.create(["name", "ate"], [req.body.name, req.body.ate], function(result) {
    res.json({ id: result.insertId });
  });
});

router.put("/api/burger/:id", function(req, res) {
  var condition = `id = ${req.params.id}`;
  burger.update( { ate: req.body.ate }, condition, function(result) {
      if (!result.changedRows)  return res.status(404).end();
      res.status(200).end();
    }
  );
});

router.delete("/api/burger/:id", function(req, res) {
  var condition = `id = ${req.params.id}`;
  burger.delete(condition, function(result) {
    console.log(result);
    
      if (!result.affectedRows)  return res.status(404).end();
      res.status(200).end();
    }
  );
});

module.exports = router;
