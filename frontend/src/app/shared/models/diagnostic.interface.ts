export interface DiagnosticResult {
  id: number;
  userId: number;
  totalScore: number;
  category: string;
  resultText: string;
  createdAt: Date | string;
}

export interface DiagnosticQuestion {
  id: number;
  eventName: string;
  points: number;
  order: number;
  isActive: boolean;
}

export interface DiagnosticConfig {
  id: number;
  minScoreLow: number;
  maxScoreLow: number;
  minScoreMedium: number;
  maxScoreMedium: number;
  minScoreHigh: number;
  maxScoreHigh: number;
  textLow: string;
  textMedium: string;
  textHigh: string;
}
