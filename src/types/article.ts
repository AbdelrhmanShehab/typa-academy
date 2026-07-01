export interface Article {
  id: string;
  title: string;
  image: string;
  category: string;
  tags: string[];
  content: string;
  author: string;
  publishDate: string;
  featured: boolean;
}

export type CreateArticleInput = Omit<Article, 'id'>;
export type UpdateArticleInput = Partial<CreateArticleInput>;
