
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
  name: string;
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

export class SearchItem {
  id: number;
  name: string;
  code: number;
}

export class SearchResponse {
  data: SearchItem[];
}

export class CandidateResult {
  votes: number;
  candidate: string;
  id: number;
}

export class EditCircuitResponse {
  results: CandidateResult[] = [];
  all_votes: number;
  valid_votes: number;
  name: string = '';
}
