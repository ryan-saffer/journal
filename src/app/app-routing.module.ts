import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JournalRootComponent } from './components/journal/journal-root/journal-root.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { AuthGuard } from './guard/auth.guard';
import { NegateAuthGuard } from './guard/negate-auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent, canActivate: [NegateAuthGuard] },
  { path: 'journals', component: JournalRootComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
