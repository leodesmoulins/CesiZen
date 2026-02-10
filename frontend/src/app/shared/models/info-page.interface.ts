export interface InfoPage {
  id: number;
  title: string;
  slug: string;
  content: string;
  published: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
  menuId?: number | null;
}
