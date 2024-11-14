import express from 'express';
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(function(req,res,next){
//     next();
// });
// app.set("view engine", "ejs")
// app.get("/", function (req, res) {
//     res.render("index");
// });
// app.get("/", function (req: Request, res: Response) {
//     res.send(`<h1>hey</h1>`);
// });
app.get("/:id", function (req, res) {
    res.send({
        message: "Hello",
        data: req.params.id
    });
});
// app.get("/:username", function (req: Request, res: Response) {
//     res.send(`<h1>hey ${req.params.username}</h1>`);
// });
app.post('/', (req, res) => {
    res.send({
        data: req.body
    });
});
app.listen(3000);
