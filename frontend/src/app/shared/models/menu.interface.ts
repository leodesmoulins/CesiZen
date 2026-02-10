export interface Menu {
  id: number;
  title: string;
  slug: string;
  order: number;
  parentId?: number | null;
}
