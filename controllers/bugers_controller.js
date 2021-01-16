const express = require("express");
const router = express.Router();

const buger = require("../models/burger");

router.get("/", (req, res) => {
  buger.all((data) => {
    let hbsObject = {
      burger: data,
    };
    console.log(hbsObjct);
    res.render("index", hbsObject);
  });
});

router.post("/api/burgers", (req, res) => {
  buger.create(
    ["burger", "consumed"],
    [req.body.burger, req.body.consumed],
    (result) => {
      res.json({ id: result.insertId });
    }
  );
});

router.put("/api/burgers/:id", (req, res) => {
  let condition = `id =${req.params.id}`;
  console.log;
  "condition", condition;

  burger.update(
    {
      consumed: req.body.sleepy,
    },
    condition,
    (result) => {
      if (result.changedRows == 0) {
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    }
  );
});

router.delete("/api/cats/:id", (req, res) => {
  let condition = `id = ${req.params.id}`;

  burger.delete(condition, (result) => {
      if (result.affectedRows == 0) {
          return res.status(404).end();
      }else{
          res.status(200).end();
      }
  });
});
module.exports = router;