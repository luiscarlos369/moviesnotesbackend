const express = require("express");
require("dotenv/config");
require("express-async-errors");
const cors = require("cors");
const AppError = require("./Utils/AppError");


const routes = require("./Routes");
const migrationsRun = require("./database/sqlite/migrations");
const uploadConfig = require("./configs/upload");


const app = express();
app.use(cors());
app.use(express.json());

migrationsRun();

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));

app.use(routes);

app.use((error, request, response, next) => {
if(error instanceof AppError){
return response.status(error.statusCode).json({
status: "error",
message: error.message
});
}

console.error(error);

return response.status(500).json({
status: "error",
message: "Internal server error"
})


})




const PORT = process.env.PORT || 3693;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));