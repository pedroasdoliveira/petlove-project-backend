export class Result {
  id?: string;
  nextRole: string;
  system: number;
  person: number;
  process: number;
  technology?: number;
  influence?: number;
  isValided?: 'Sim' | 'Não';
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
