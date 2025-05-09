const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected');
}).catch((err) => {
    console.log(err);
});

// Task schema and model
const TaskSchema = new mongoose.Schema({
    title: String,
    description: String,
});

const Task = mongoose.model('Task', TaskSchema);

// Routes
app.post('/tasks', async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.send(task);
});

app.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.send(tasks);
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(Server running on http://localhost:${PORT});
});