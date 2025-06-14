// Import necessary modules from Appwrite SDK
import { Client, Databases, Query, ID } from "appwrite";

// Load environment variables for database, collection, and project IDs
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;

// Initialize the Appwrite client with endpoint and project ID
const client = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject(PROJECT_ID);

  // Create a Databases instance using the configured client
const database = new Databases(client);


/**
 * Updates the count of a specific search term in the database.
 * If the search term already exists, increment its count.
 * If it doesn't exist, create a new document with count = 1.
 *
 * @param {string} searchTerm - The term searched by the user
 * @param {object} movie - The movie object related to the search term
 */

export const updateSearchCount = async (searchTerm, movie) => {
  // Check if the search term already exists in the database
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", searchTerm),
    ]);


    if (result.documents.length > 0) {
      // If the term exists, increment the count
      const doc = result.documents[0];

      await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
        count: doc.count + 1,
      });
    } else {
      // If the term doesn't exist, create a new document with count = 1
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm,
        count: 1,
        movie_id: movie.id,
        poster_url: `http://image.tmdb.org/t/p/w500/${movie.poster_path}`,
      });
    }
  } catch (error) {
    console.error(error);
  }
};

/**
 * Retrieves the top 5 most searched movies based on count.
 * Returns an array of documents sorted in descending order of search count.
 */
export const getTrendingMovies = async () => {
  try {
    // Fetch the top 5 documents ordered by descending search count
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc("count"),
    ])

    return result.documents
    
  } catch (error) {
    console.error(error);
  }
};
