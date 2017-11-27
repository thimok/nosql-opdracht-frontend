/**
 * Created by twanv on 24-11-2017.
 */
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { environment } from '../../environments/environment'
import 'rxjs/Rx';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import {ShoppingListService} from "../shopping-list/shopping-list.service";
import {Ingredient} from "./ingredient.model";

@Injectable()
export class DataStorageService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private serverUrl = environment.serverUrl + '/recipes'; // URL to web api
    private serverUrl2 = environment.serverUrl + '/shopping-list/';

  constructor(private http: Http, private recipeService: RecipeService, private shoppingListService: ShoppingListService) {}

    storeRecipes() {
        return this.http.put(this.serverUrl, this.recipeService.getRecipes());
    }


    storeShoppingList() {
        return this.http.put(this.serverUrl2, this.shoppingListService.getIngredients());
    }

    getRecipes() {
        this.http.get(this.serverUrl)
            .map(
                (response) => {
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
                (recipes: Recipe[]) =>
                    this.recipeService.setRecipes(recipes)

            );
    }

    getShoppingList() {
        this.http.get(this.serverUrl2)
            .map(
                (response) => {
                    const shopping_list = response.json();
                    return shopping_list;
                }
            )
            .subscribe(
                (shopping_list) =>
                    this.shoppingListService.setIngredients(shopping_list)

            );
    }

    updateShoppingList(ingredient) {

      const amount = ingredient.amount;
      const name = ingredient.name;

      console.log(ingredient._i);
      ingredient = this.shoppingListService.getIngredient(1)
        
        const body = {'name': name, 'amount': amount};
        this.http.put(this.serverUrl2 + ingredient._id, body)
            .map(
                (response) => {
                    const shopping_list = response.json();
                    console.log(shopping_list);
                    return shopping_list;
                }
            )
            .subscribe((shopping_list) => {
            this.shoppingListService.updateIngredient(1, shopping_list);
            })
    }
}

