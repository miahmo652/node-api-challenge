const express = require("express");
const action = require("../data/helpers/actionModel");
const router = express.Router()

// get actions
router.get("/", (req, res)=>{
    action.get()
    .then(actions=>{
        res.status(201).json({actions})
    })
    .catch(error =>{
        res.status(500).json({
            message:"Couldn't get data"
        })
    })

})

// post actions
router.post("/",  (req, res) => {
    action.insert(req.body)
      .then(actions => {
        res.status(200).json(actions);
      })
      .catch(error => {
        res.status(500).json({ 
            message: "action could not be added" });
      });
  });
  
  //update actions
  router.put("/:id",  (req, res) => {
    action.update(req.params.id, req.body)
      .then(actions => {
        res.status(200).json(actions);
      })
      .catch(error => {
        res.status(500).json({ message: "Couldn't Update Action" });
      });
  });

  // delete actions
  router.delete("/:id",  (req, res) => {
    action.remove(req.params.id)
      .then(count => {
        if (count > 0) {
          res.status(200).json({ message: "deleted" });
        } else {
          res.status(404).json({ message: "Action Not Found" });
        }
      })
      .catch(error => {
        res.status(500).json({
             message: "error while deleting" });
      });
  });

  module.exports =router;