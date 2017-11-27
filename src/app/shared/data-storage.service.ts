/**
 * Created by twanv on 24-11-2017.
 */
import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {environment} from '../../environments/environment'
import {Observable} from 'rxjs/Observable';

import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import {ShoppingListService} from "../shopping-list/shopping-list.service";
import {Ingredient} from "./ingredient.model";

@Injectable()
export class DataStorageService {

    private headers = new Headers({'Content-Type': 'application/json'});
    private serverUrl = environment.serverUrl + '/recipes/'; // URL to web api
    private shoppingListServerUrl = environment.serverUrl + '/shopping-list/';


    constructor(private http: Http, private recipeService: RecipeService, private shoppingListService: ShoppingListService) {
    }

    storeRecipes() {
        return this.http.put(this.serverUrl, this.recipeService.getRecipes());
    }


    storeShoppingList() {
        return this.http.put(this.shoppingListServerUrl, this.shoppingListService.getIngredients());
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
        this.http.get(this.shoppingListServerUrl)
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

    postShoppinglist(ingredient: Ingredient) {

        this.http.post(this.shoppingListServerUrl, ingredient)
            .map(
                (response) => {
                    const shopping_list = response.json();
                    console.log(shopping_list);
                    return shopping_list;
                }
            )
            .subscribe((shopping_list) => {
                this.shoppingListService.addIngredient(shopping_list)
            })
    }

    postShoppingListArray(ingredients: Ingredient[]) {

        for (let ingredient of ingredients) {
            this.http.post(this.shoppingListServerUrl, ingredient)
                .map(
                    (response) => {
                        const shopping_list = response.json();
                        console.log(shopping_list);
                        return shopping_list;
                    }
                )
                .subscribe((shopping_list) => {
                    this.shoppingListService.addIngredients(shopping_list)
                })
        }

    }


    updateShoppingList(ingredient) {

        const amount = ingredient.amount;
        const name = ingredient.name;

        console.log(ingredient._id);

        const body = {'name': name, 'amount': amount};
        this.http.put(this.shoppingListServerUrl + ingredient._id, body)
            .map(
                (response) => {
                    const shopping_list = response.json();
                    console.log(shopping_list);
                    return shopping_list;
                }
            )
            .subscribe((shopping_list) => {
                this.shoppingListService.updateIngredient(shopping_list);
            })
    }

    deleteShoppingList(ingredient) {
        this.http.delete(this.shoppingListServerUrl + ingredient._id)
            .map(
                (response) => {
                    const shopping_list = response.json();
                    console.log(shopping_list);
                    return shopping_list;
                }
            )
            .subscribe((shopping_list) => {
                this.shoppingListService.deleteIngredient(shopping_list)
            })

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

