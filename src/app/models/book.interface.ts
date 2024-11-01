export interface Book {
    id: string;
    title: string;
    authors: string[];
    description?: string;
    publishedDate?: string;
    pageCount?: number;
    imageLinks?: {
      thumbnail: string;
      smallThumbnail: string;
    };
    categories?: string[];
  }