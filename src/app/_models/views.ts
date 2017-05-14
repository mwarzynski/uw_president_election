export enum Views {
  COUNTRY,
  VOIVODESHIP,
  PRECINCT,
  BOROUGH
}

export function parseView(text: string): Views {
  switch (text.toLowerCase()) {
    case 'voivodeship':
      return Views.VOIVODESHIP;
    case 'precinct':
      return Views.PRECINCT;
    case 'borough':
      return Views.BOROUGH;
  }
  return Views.COUNTRY;
}

export function viewToString(view: Views): string {
  switch (view) {
    case Views.COUNTRY:
      return 'country';
    case Views.VOIVODESHIP:
      return 'voivodeship';
    case Views.PRECINCT:
      return 'precinct';
    case Views.BOROUGH:
      return 'borough';
  }
  return '';
}
