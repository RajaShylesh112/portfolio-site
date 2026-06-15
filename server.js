import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';

config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("MONGODB_URI environment variable is not set");
  process.exit(1);
}
const client = new MongoClient(uri);

let db;
async function connectDB() {
  await client.connect();
  db = client.db("portfolio");
  console.log("Connected to MongoDB");
}

app.get('/api/projects', async (req, res) => {
  try {
    const projects = await db.collection("projects").find({}).sort({ order: 1 }).toArray();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

app.post('/api/projects', async (req, res) => {
  console.log("Received POST request to /api/projects");
  try {
    const project = req.body;
    console.log("Project payload size:", JSON.stringify(project).length);
    if (!project.id) project.id = new ObjectId().toString();
    delete project._id;
    const result = await db.collection("projects").updateOne({ id: project.id }, { $set: project }, { upsert: true });
    console.log("MongoDB update result:", result);
    res.json({ success: true, project });
  } catch (error) {
    console.error("Error in POST /api/projects:", error);
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

app.put('/api/projects/reorder', async (req, res) => {
  try {
    const { orderedIds } = req.body;
    if (!Array.isArray(orderedIds)) {
      return res.status(400).json({ error: "orderedIds must be an array" });
    }
    
    const bulkOps = orderedIds.map((id, index) => ({
      updateOne: {
        filter: { id },
        update: { $set: { order: index } },
      }
    }));
    
    await db.collection("projects").bulkWrite(bulkOps);
    res.json({ success: true });
  } catch (error) {
    console.error("Error in PUT /api/projects/reorder:", error);
    res.status(500).json({ error: "Failed to reorder projects" });
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
