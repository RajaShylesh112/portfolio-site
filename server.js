import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const uri = "mongodb+srv://23z356_db_user:KlFn7tPH13e38Ny8@cluster0.nbcru6w.mongodb.net/?appName=Cluster0";
const client = new MongoClient(uri);

let db;
async function connectDB() {
  await client.connect();
  db = client.db("portfolio");
  console.log("Connected to MongoDB");
}

app.get('/api/projects', async (req, res) => {
  try {
    const projects = await db.collection("projects").find({}).toArray();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

app.post('/api/projects', async (req, res) => {
  try {
    const project = req.body;
    if (!project.id) project.id = new ObjectId().toString();
    delete project._id;
    await db.collection("projects").updateOne({ id: project.id }, { $set: project }, { upsert: true });
    res.json({ success: true, project });
  } catch (error) {
    res.status(500).json({ error: "Failed to save project" });
  }
});

app.delete('/api/projects/:id', async (req, res) => {
  try {
    await db.collection("projects").deleteOne({ id: req.params.id });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete project" });
  }
});

app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await db.collection("blogs").find({}).toArray();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
});

app.post('/api/blogs', async (req, res) => {
  try {
    const blog = req.body;
    if (!blog.id) blog.id = new ObjectId().toString();
    delete blog._id;
    await db.collection("blogs").updateOne({ id: blog.id }, { $set: blog }, { upsert: true });
    res.json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ error: "Failed to save blog" });
  }
});

app.delete('/api/blogs/:id', async (req, res) => {
  try {
    await db.collection("blogs").deleteOne({ id: req.params.id });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete blog" });
  }
});

app.get('/api/placeholder/:width/:height', (req, res) => {
  res.redirect(`https://placehold.co/${req.params.width}x${req.params.height}`);
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist/public')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/public', 'index.html'));
  });
}

const PORT = process.env.PORT || 3001;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(console.error);
