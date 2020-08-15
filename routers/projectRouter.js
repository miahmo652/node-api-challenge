const express = require("express");
const router = express.Router();

const projects = require("../data/helpers/projectModel")

// get projects
router.get("/", (req, res)=>{
    projects.get()
    .then(project=>{
        res.status(200).json(project)
    })
    .catch(error=>
        res.status(500).json({
            message:"Could not retrieve projects"
        })
        
        );
});

// get project by id

router.get("/:id", ProjectId(), (req, res)=>{
    projects.get(req.params.id)
    .then(project=>{
        res.status(200).json(project)

    })
    .catch(error =>{
        res.status(500).json({
            message: "Project doesn't exist"
        })
    })
})

// get project actions

router.get("/:id/actions", ProjectId(), (req, res)=>{
    projects.getProjectActions(req.params.id, req.body)
            .then(project =>{
                res.status(201).json({project})
            })
            .catch(error =>{
                res.status(500).json({
                    message: "there was an error getting the actions"
                })
            })
})

// adding a new project
 router.post("/",  (req, res)=>{
     projects.insert(req.body)
            .then(project=>{
                res.status(201).json(project);
            })
            .catch(error=>{
                res.status(500).json({
                    message:"Project could not be added"
                })
            })
 })

// updating project
router.put("/:id", ProjectId(), (req, res) => {

    projects
        .update(req.params.id, req.body)
        .then(project => {
            res.json(project);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: "There was an error updating your project"
            });
        });
});

// delete
router.delete("/:id",  (req, res) => {
    projects.remove(req.params.id)
      .then(count => {
        if (count > 0) {
          res.status(200).json(count);
        } else {
          res.status(404).json({
            message: "The project with the specified ID does not exist."
          });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ error: "The project could not be removed" });
      });
  });

// Middleware functions
function ProjectId() {
    return (req, res, next) => {
        projects
            .get(req.params.id)
            .then(project => {
                if (project) {
                    next();
                } else {
                    res.status(404).json({
                        message: "The project does not exist"
                    });
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    message: "There was an error retrieving the project."
                });
            });
    };
}


module.exports = router;