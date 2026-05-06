import { MongoClient } from 'mongodb';
import { defaultProjects } from './client/src/lib/project-store.ts';
import { defaultBlogEntries } from './client/src/lib/blog-store.ts';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uri = "mongodb+srv://23z356_db_user:KlFn7tPH13e38Ny8@cluster0.nbcru6w.mongodb.net/?appName=Cluster0";

function getBase64Image(relativePath) {
  try {
    // Remove /portfolio-site/ prefix if it exists to find local file
    const localPath = relativePath.startsWith('/portfolio-site/') 
      ? relativePath.replace('/portfolio-site/', 'client/public/') 
      : relativePath;
      
    const fullPath = path.join(__dirname, localPath);
    console.log(`Checking file: ${fullPath}, exists: ${fs.existsSync(fullPath)}`);
    if (fs.existsSync(fullPath)) {
      const ext = path.extname(fullPath).substring(1);
      const data = fs.readFileSync(fullPath, { encoding: 'base64' });
      const base64Str = `data:image/${ext === 'png' ? 'png' : 'jpeg'};base64,${data}`;
      console.log(`Successfully converted ${relativePath} to base64!`);
      return base64Str;
    }
  } catch (e) {
    console.error(`Failed to convert ${relativePath} to base64`, e);
  }
  return relativePath;
}

async function run() {
  const client = new MongoClient(uri);

  try {
    console.log("Connecting to MongoDB...");
    await client.connect();
    
    const db = client.db("portfolio");
    
    // Process Projects
    const projectsToInsert = defaultProjects.map(p => ({
      ...p,
      image: p.image ? getBase64Image(p.image) : p.image
    }));
    
    const projectsCollection = db.collection("projects");
    console.log(`Clearing and seeding ${projectsToInsert.length} projects with Base64 images...`);
    await projectsCollection.deleteMany({});
    await projectsCollection.insertMany(projectsToInsert);
    
    // Process Blogs
    const blogsToInsert = defaultBlogEntries;
    
    const blogsCollection = db.collection("blogs");
    console.log(`Clearing and seeding ${blogsToInsert.length} blogs with Base64 images...`);
    await blogsCollection.deleteMany({});
    await blogsCollection.insertMany(blogsToInsert);
    
    console.log("Successfully seeded MongoDB with Base64 encoded images!");
    
  } catch (error) {
    console.error("Error storing data in MongoDB:", error);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
