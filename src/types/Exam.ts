import { Question } from "./Question";

export interface Exam {
  id: string;
  name: string;
  timeStart: string;
  timeEnd: string;
  time: number;
  questions?: Question[];
  createdAt: string
}
