/**
 * Created by twanv on 24-11-2017.
 */
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { environment } from '../../environments/environment'
import 'rxjs/Rx';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable()
export class DataStorageService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private serverUrl = environment.serverUrl + '/recipes/'; // URL to web api

  constructor(private http: Http, private recipeService: RecipeService) {}

  storeRecipes() {
    return this.http.put(this.serverUrl, this.recipeService.getRecipes());
  }

  getRecipes() {
    this.http.get(this.serverUrl)
      .map(
        (response: Response) => {
          const recipes: Recipe[] = response.json();
          for (let recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      )
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }

  addRecipe(recipe: Recipe) {
    this.http.post(this.serverUrl, recipe)
      .map(
        (response) => {
          return response.json();
        }
      )
      .subscribe(
        (recipe: Recipe) => {
          this.recipeService.addRecipe(recipe);
        }
      );
  }

  updateRecipe(recipe: Recipe) {
    this.http.put(this.serverUrl + recipe._id, recipe)
      .map(
        (response) => {
          return response.json();
        }
      )
      .subscribe(
        (recipe: Recipe) => {
          this.recipeService.updateRecipe(recipe);
        }
      );
  }

  deleteRecipe(id: string) {
    this.http.delete(this.serverUrl + id)
      .map(
        (response) => {
          return response.json();
        }
      )
      .subscribe(
        (recipe: Recipe) => {
          this.recipeService.deleteRecipe(recipe._id);
        }
      );
  }
}
