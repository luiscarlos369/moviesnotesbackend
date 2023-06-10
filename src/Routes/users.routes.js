const { Router } = require("express");
const multer = require("multer");

const UsersController = require("../Controllers/UsersController");
const UserAvatarController = require("../Controllers/UserAvatarController");

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");  
const uploadConfig = require("../configs/upload");

const userRoutes = Router();
const upload = multer(uploadConfig.MULTER);

 



const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

userRoutes.post("/", usersController.create );
userRoutes.put("/", ensureAuthenticated, usersController.update);
userRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update);




module.exports = userRoutes;