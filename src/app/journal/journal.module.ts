import { RouterModule } from '@angular/router';
import { QuillModule } from 'ngx-quill';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { JournalComponent } from './journal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuillModule.forRoot({
      modules: {
        syntax: true
      }
    }),
    RouterModule.forChild([
      {
        path: '',
        component: JournalComponent
      }
    ])
  ],
  declarations: [JournalComponent]
})
export class JournalModule {}
