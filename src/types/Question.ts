export interface Question {
  id: number;
  quiz: string;
  options: string[];
  answers?: string[];
  rank?: string;
  type: "radio" | "checkbox";
}
