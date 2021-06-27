export class Breed {
  bred_for: string;
  breed_group: string;
  height: {
    imperial: string;
    metric: string;
  };
  id: number;
  life_span: string;
  name: string;
  reference_image_id: string;
  temperament: string;
  weight: {
    imperial: string;
    metric: string;
  };

  constructor(
    bred_for: string,
    breed_group: string,
    height: {
      imperial: string;
      metric: string;
    },
    id: number,
    life_span: string,
    name: string,
    reference_image_id: string,
    temperament: string,
    weight: {
      imperial: string;
      metric: string;
    }
  ) {
    this.bred_for = bred_for;
    this.breed_group = breed_group;
    this.height = height;
    this.id = id;
    this.life_span = life_span;
    this.name = name;
    this.reference_image_id = reference_image_id;
    this.temperament = temperament;
    this.weight = weight;
  }
}
