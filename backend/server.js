const express = require('express'); 
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const app = express();
const note = require('./models/note');
app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected to mongoose'))
.catch((err) =>console.error('error connecting to mongoose:',err));

app.get("/",(req,res) => {
    res.send("Notes API running");
});

app.post("/notes", async (req, res) =>{
    try {
        const newNote = new note({
            title: req.body.title,
            content: req.body.content,

        });
        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
    }
    catch(error)
    {
        res.status(500).json({
            message: error.message,
        });
   }});

app.get("/notes", async (req, res) =>
{
    try{
        const notes = await note.find();
        res.json(notes);

    }
catch (error){
    res.status(500).json({
        message: error.message,
    });
}
});

app.delete("/notes/:id", async(req, res) =>
{
    try{
       await note.findByIdAndDelete(req.params.id);
       res.json({message:'Note deleted successfully'});

    }catch(error){
        res.status(500).json({error: 'failed to delete note'});

    }
});

app.put("/notes/:id", async(req, res) =>
{
try {
    const updatednote = await note.findByIdAndUpdate(
        req.params.id,
        {
            title: req.body.title,
            content: req.body.content,

        },
        {new: true }

    );
    res.json(updatednote);

}catch(error){
    res.status(500).json({
        message: error.message,
    });
}
});
  

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`server running on port  ${PORT}`);
});

