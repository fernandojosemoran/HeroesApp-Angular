export interface IHero {
  id: string;
  superhero: string;
  publisher: IPublisher;
  alter_ego: string;
  first_appearance: string;
  characters: string;
  alt_image: string;
}

export enum IPublisher {
  DC_COMIC = "DC Comics",
  MARVEL_COMIC = "Marvel Comics",
}
