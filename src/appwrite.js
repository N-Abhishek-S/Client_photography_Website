// src/appwrite.js
import { Client, Databases, Storage, ID, Query } from 'appwrite';

const client = new Client()
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const databases = new Databases(client);
const storage = new Storage(client);

// Database and Bucket IDs
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID;

// Collection IDs
const MAIN_SERVICES_COLLECTION_ID = import.meta.env.VITE_MAIN_SERVICES_COLLECTION_ID;
const COURSES_COLLECTION_ID = import.meta.env.VITE_COURSES_COLLECTION_ID;
const PORTFOLIO_SERVICES_COLLECTION_ID = import.meta.env.VITE_PORTFOLIO_SERVICES_COLLECTION_ID;
const PSD_FILES_COLLECTION_ID = import.meta.env.VITE_PSD_FILES_COLLECTION_ID;

// Generic function to get all documents from any collection
export const getAllDocuments = async (collectionId, queries = []) => {
    try {
        console.log(`Fetching from collection: ${collectionId}`);
        
        const response = await databases.listDocuments(
            DATABASE_ID,
            collectionId,
            queries
        );
        
        console.log(`Got ${response.documents.length} documents from ${collectionId}`);
        return response.documents;
        
    } catch (error) {
        console.error(`Error fetching from ${collectionId}:`, error);
        throw error;
    }
};

// Specific functions for each collection

// MAIN SERVICES
export const getMainServices = async () => {
    return await getAllDocuments(MAIN_SERVICES_COLLECTION_ID);
};

// COURSES
export const getCourses = async () => {
    return await getAllDocuments(COURSES_COLLECTION_ID);
};

// PORTFOLIO SERVICES
export const getPortfolioServices = async () => {
    return await getAllDocuments(PORTFOLIO_SERVICES_COLLECTION_ID);
};

// PSD FILES
export const getPsdFiles = async () => {
    return await getAllDocuments(PSD_FILES_COLLECTION_ID);
};

// Get single document by ID from any collection
export const getDocumentById = async (collectionId, documentId) => {
    try {
        const response = await databases.getDocument(
            DATABASE_ID,
            collectionId,
            documentId
        );
        return response;
    } catch (error) {
        console.error(`Error fetching document ${documentId} from ${collectionId}:`, error);
        throw error;
    }
};

// Create document in any collection
export const createDocument = async (collectionId, data) => {
    try {
        const response = await databases.createDocument(
            DATABASE_ID,
            collectionId,
            ID.unique(),
            data
        );
        return response;
    } catch (error) {
        console.error(`Error creating document in ${collectionId}:`, error);
        throw error;
    }
};

// Update document in any collection
export const updateDocument = async (collectionId, documentId, data) => {
    try {
        const response = await databases.updateDocument(
            DATABASE_ID,
            collectionId,
            documentId,
            data
        );
        return response;
    } catch (error) {
        console.error(`Error updating document in ${collectionId}:`, error);
        throw error;
    }
};

// Delete document from any collection
export const deleteDocument = async (collectionId, documentId) => {
    try {
        await databases.deleteDocument(
            DATABASE_ID,
            collectionId,
            documentId
        );
        return true;
    } catch (error) {
        console.error(`Error deleting document from ${collectionId}:`, error);
        throw error;
    }
};

// Get file preview URL
export const getFilePreviewUrl = (fileId) => {
    if (!fileId) return null;
    
    const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT;
    const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;
    
    return `${endpoint}/storage/buckets/${BUCKET_ID}/files/${fileId}/preview?project=${projectId}&width=800&height=600`;
};

// Get file view URL (for direct access)
export const getFileViewUrl = (fileId) => {
    if (!fileId) return null;
    
    const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT;
    const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;
    
    return `${endpoint}/storage/buckets/${BUCKET_ID}/files/${fileId}/view?project=${projectId}`;
};

// Upload file to storage
export const uploadFile = async (file) => {
    try {
        const response = await storage.createFile(
            BUCKET_ID,
            ID.unique(),
            file
        );
        return response;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
};

// Check if collection exists
export const checkCollectionStatus = async (collectionId) => {
    try {
        const response = await databases.listDocuments(
            DATABASE_ID,
            collectionId,
            [Query.limit(1)]
        );
        
        return {
            exists: true,
            count: response.total,
            hasDocuments: response.documents.length > 0
        };
    } catch (error) {
        console.error(`Error checking collection ${collectionId}:`, error);
        return {
            exists: false,
            error: error.message
        };
    }
};

// Export all constants and instances
export { 
    databases, 
    storage,
    DATABASE_ID,
    BUCKET_ID,

    COURSES_COLLECTION_ID,
    PORTFOLIO_SERVICES_COLLECTION_ID,
    PSD_FILES_COLLECTION_ID
};