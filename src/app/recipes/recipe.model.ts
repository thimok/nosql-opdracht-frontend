import { Ingredient } from '../shared/ingredient.model';

export class Recipe {
  public _id: string;
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: Ingredient[];



  constructor(name: string, description: string, imagePath: string, ingredients: Ingredient[], id?: string) {
    this._id = id || "";
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
  }
}
