import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Services{
    client = new Client()
    databases;
    bucket;

    constructor() {
        this.client.setEndpoint(conf.appWriteUrl)
        .setProject(conf.appWriteProjectId)
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    // create a post
    async createPost({title, slug, content, featuredImage, status, userId}) {
        try {
            return await this.databases.createDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug,
                {title, content, featuredImage, status, userId}
            ) 
        } catch (error) {
            console.log('Appwrite service :: createPost :: error ', error );
        }
    }

    // update a post
    async updatePost(slug, {title, content, featuredImage, status}) {
        try {
            return await this.databases.updateDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug,
                {title, content, featuredImage, status}
            ) 
        } catch (error) {
            console.log('Appwrite service :: updatePost :: error ', error );
        }
    }

    // delete a post
    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug,
            )
            return true; 
        } catch (error) {
            console.log('Appwrite service :: deletePost :: error ', error );
            return false;
        }
    }

    // get a particluar post
    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug
            )
        } catch (error) {
            console.log('Appwrite service :: getPost :: error ', error );
        }
    }

    // get all posts
    async getPosts() {
        try {
            return await this.databases.listDocuments(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                [
                    Query.equal("status", "active")
                ]
            )
        } catch (error) {
            console.log('Appwrite service :: getPosts :: error ', error );
            return false;
        }
    }

    // upload file
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appWriteBucketId,
                ID.unique(), 
                file
            );
        } catch (error) {
            console.log('Appwrite service :: uploadFile :: error ', error );
            return false;
        }
    }

    // delete file
    async deleteFile(fileId) {
        try {
            return await this.bucket.deleteFile(
                conf.appWriteBucketId,
                fileId
            );
            return true;
        } catch (error) {
            console.log('Appwrite service :: deleteFile :: error ', error );
            return false;
        }
    }

    // file preview
    filePreview(fileId) {
        return this.bucket.getFilePreview(conf.appWriteBucketId,fileId);
    }
}

    

const service = new Services();
export default service;