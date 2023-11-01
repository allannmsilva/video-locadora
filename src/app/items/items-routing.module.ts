import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ItemFormComponent } from './containers/item-form/item-form.component';
import { ItemsComponent } from './containers/items/items.component';
import { itemResolver } from './guards/item.resolver';

const routes: Routes = [
  { path: '', component: ItemsComponent },
  { path: 'new', component: ItemFormComponent, resolve: { item: itemResolver } },
  { path: 'edit/:_id', component: ItemFormComponent, resolve: { item: itemResolver } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemsRoutingModule { }
