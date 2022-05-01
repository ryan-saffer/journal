import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ContentChange } from 'ngx-quill';
import { replaceQuillContent } from 'src/app/utilities';
import { Journal } from '../../types/Journal';

@Component({
  selector: 'journal-editor',
  templateUrl: './journal-editor.component.html',
  styleUrls: ['./journal-editor.component.scss'],
})
export class JournalEditorComponent implements OnInit {

  @Input() journal: Journal
  @Output() onSave = new EventEmitter()

  constructor() { }

  ngOnInit() {}

  handleEditorCreated() {
    replaceQuillContent(this.journal.htmlContent)
  }

  handleContentChanged(content: ContentChange) {
    this.journal.htmlContent = content.html
    this.journal.content = content.text
    this.journal.lastEdit = Date.now()
    this.journal.saved = false
  }

  save() {
    this.onSave.emit(this.journal)
  }
}
