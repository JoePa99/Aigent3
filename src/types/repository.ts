interface Repository {
  id: string;
  clientId: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Document {
  id: string;
  repositoryId: string;
  fileName: string;
  fileType: string;
  content: string;
  metadata: {
    uploadedBy: string;
    tags?: string[];
  };
  embeddings?: number[];
} 