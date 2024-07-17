import { RouterModule, Routes } from '@angular/router';
import { SurgeonListComponent } from './surgeon-list/surgeon-list.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    { path: 'searchAllSurgeons', component: SurgeonListComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
export class AppRoutingModule { }
