import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JournalRootComponent } from './components/journal/journal-root/journal-root.component';

const routes: Routes = [
  { path: '', component: JournalRootComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
