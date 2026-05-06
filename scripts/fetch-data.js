import { MongoClient } from 'mongodb';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uri = "mongodb+srv://23z356_db_user:KlFn7tPH13e38Ny8@cluster0.nbcru6w.mongodb.net/?appName=Cluster0";

async function run() {
  const client = new MongoClient(uri);

  try {
    console.log("Connecting to MongoDB to fetch static data...");
    await client.connect();
    const db = client.db("portfolio");

    const projects = await db.collection("projects").find({}).toArray();
    const blogs = await db.collection("blogs").find({}).toArray();

    const apiDir = path.join(__dirname, '../dist/public/api');
    await fs.mkdir(apiDir, { recursive: true });

    // Save as both with and without .json extension for compatibility
    await fs.writeFile(path.join(apiDir, 'projects'), JSON.stringify(projects));
    await fs.writeFile(path.join(apiDir, 'projects.json'), JSON.stringify(projects));
    
    await fs.writeFile(path.join(apiDir, 'blogs'), JSON.stringify(blogs));
    await fs.writeFile(path.join(apiDir, 'blogs.json'), JSON.stringify(blogs));

    console.log(`Successfully fetched ${projects.length} projects and ${blogs.length} blogs for the static build.`);
  } catch (error) {
    console.error("Error fetching data from MongoDB:", error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

run();
