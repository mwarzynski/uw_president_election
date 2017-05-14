
export class Person {
  votes: number;
  name: string;
  percentage: number;
}

export class Voivodeship {
  name: string;
  id: number;
  code: string;
  votes: number;
}

export class Page {
  name: string;
  link: string;
}

export class Circuit {
  address: string;
  id: number;
  votes: number[];
}

export class ResultsResponse {
  people: Person[];
}

export class PagesResponse {
  pages: Page[];
}

export class VoivodeshipsResponse {
  voivodeships: Voivodeship[];
}

export class CircuitsResponse {
  candidates: string[];
  circuits: Circuit[];
}

