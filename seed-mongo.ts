import { MongoClient } from 'mongodb';
import { defaultProjects } from './client/src/lib/project-store.ts';
import { defaultBlogEntries } from './client/src/lib/blog-store.ts';

const uri = "mongodb+srv://23z356_db_user:KlFn7tPH13e38Ny8@cluster0.nbcru6w.mongodb.net/?appName=Cluster0";

async function run() {
  const client = new MongoClient(uri);

  try {
    console.log("Connecting to MongoDB...");
    await client.connect();
    
    const db = client.db("portfolio");
    
    // Projects
    const projectsCollection = db.collection("projects");
    console.log(`Clearing existing projects...`);
    await projectsCollection.deleteMany({});
    console.log(`Inserting ${defaultProjects.length} projects...`);
    const projectResult = await projectsCollection.insertMany(defaultProjects);
    console.log(`${projectResult.insertedCount} projects successfully inserted.`);
    
    // Blogs
    const blogsCollection = db.collection("blogs");
    console.log(`Clearing existing blogs...`);
    await blogsCollection.deleteMany({});
    console.log(`Inserting ${defaultBlogEntries.length} blogs...`);
    const blogResult = await blogsCollection.insertMany(defaultBlogEntries);
    console.log(`${blogResult.insertedCount} blogs successfully inserted.`);
    
  } catch (error) {
    console.error("Error storing data in MongoDB:", error);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
