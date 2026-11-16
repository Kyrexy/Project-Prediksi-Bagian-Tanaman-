export type ClassScore = {
  label: string;
  confidence: number;
};

export type Prediction = {
  label: string;
  confidence: number;
  scores: ClassScore[];
};
