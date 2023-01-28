export interface ISelectCountry {
  setLocale: (value: string) => void;
  country: string;
  setCountry: (value: string) => void;
  setCounterRender: (value: number) => void;
  setCountMistakes: (value: number) => void;
}
