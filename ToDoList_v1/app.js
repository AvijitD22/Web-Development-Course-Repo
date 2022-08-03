const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + "/date.js")

const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"))
app.use(bodyParser.urlencoded({
    extended: true
}));

const task = [];
const workList = []

// Home Route
app.get("/", (req, res) => {
    const day = date();
    res.render("list", {
        newTitle: day,
        newTasks: task
    });
});

app.post("/", (req, res) => {
    addTask = req.body.newTask;
    if (req.body.list === "Work List") {
        workList.push(addTask);
        res.redirect("/work");
    } else {
        task.push(addTask);
        res.redirect("/");
    }
});

// Work Route
app.get("/work", (req, res) => {
    res.render("list", {
        newTitle: "Work List",
        newTasks: workList
    });
});

app.post("/work", (req, res) => {
    const task = req.body.newTasks;
    workList.push(task);
    res.redirect("/work")
});

// About Page 
app.get("/about", (req, res) => {
    res.render("about");
});


app.listen(3000, () => {
    console.log("Server has started..");
});