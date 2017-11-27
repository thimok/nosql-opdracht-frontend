import { Component } from '@angular/core';
import {DataStorageService} from "../shared/data-storage.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(private dataStorageService: DataStorageService) {}

  onSaveData() {
    this.dataStorageService.storeRecipes()
      .subscribe(
        (response: any) => {
          console.log(response);
        }
      );

    this.dataStorageService.storeShoppingList()
        .subscribe(
            (response: any) => {
              console.log(response);
            }
        );
  }

  onFetchData() {
    this.dataStorageService.getRecipes();
    this.dataStorageService.getShoppingList();
  }

}
