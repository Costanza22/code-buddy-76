/** Espelho dos tipos em `src/data/lessons.ts` para o servidor não importar ficheiros fora de `server/`. */
export type Lesson = {
  id: string;
  title: string;
  description: string;
  content: string[];
  codeTemplate: string;
  expectedOutput: string;
  hint: string;
};

export type Track = {
  id: string;
  tag: string;
  name: string;
  desc: string;
  lessons: Lesson[];
};
