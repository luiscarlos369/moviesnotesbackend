const { Router } = require("express");
const tagsRoutes = Router();
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const TagsController = require("../Controllers/TagsController");


const tagsController = new TagsController();

tagsRoutes.get("/", ensureAuthenticated,  tagsController.index);



module.exports = tagsRoutes;