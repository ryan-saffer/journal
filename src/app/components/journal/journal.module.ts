import { EditsHistoryListComponent } from './edits-history-list/edits-history-list.component';
import { RouterModule } from '@angular/router';
import { QuillModule } from 'ngx-quill';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { JournalRootComponent } from './journal-root/journal-root.component';
import { JournalEditorComponent } from './journal-editor/journal-editor.component';
import { JournalListComponent } from './journal-list/journal-list.component';
import { JournalListItemComponent } from './journal-list-item/journal-list-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuillModule.forRoot(),
    RouterModule.forChild([
      {
        path: '',
        component: JournalRootComponent
      }
    ])
  ],
  declarations: [
    JournalRootComponent,
    JournalEditorComponent,
    JournalListComponent,
    JournalListItemComponent,
    EditsHistoryListComponent
  ]
})
export class JournalModule {}
