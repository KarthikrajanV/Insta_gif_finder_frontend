import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { GifsComponent } from './gifs/gifs.component';

const routes: Routes = [
  {path:'' , component: GifsComponent} ,
  {path:'admin-panel' , component: AdminPanelComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
