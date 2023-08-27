export type Category = "self-care" | "maintenance" | "activity" | "learning" | "creativity";

export interface TaskInfo {
  name: string;
  category: Category;
  complete: boolean;
}
