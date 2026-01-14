export interface WisdomData {
  quote: string;
  source: string;
  interpretation: string;
  keywords: string[];
}

export enum AppState {
  LANDING = 'LANDING',
  INPUT = 'INPUT',
  LOADING = 'LOADING',
  RESULT = 'RESULT',
  ERROR = 'ERROR'
}