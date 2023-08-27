export type Category = "self-care" | "maintenance" | "activity" | "learning" | "creativity";

export interface TaskInfo {
  name: string;
  category: Category;
  complete: boolean;
  key: number;
}

function categoryColor(category: Category): [string, string] {
    switch (category) {
        case "self-care": return ["text-green-500", "bg-green-500"];
        case "maintenance": return ["text-gray-500", "bg-gray-500"];
        case "activity": return ["text-orange-500", "bg-orange-500"];
        case "learning": return ["text-blue-500", "bg-blue-500"];
        case "creativity": return ["text-indigo-500", "bg-indigo-500"];
        default: return ["", ""];
    }
}
