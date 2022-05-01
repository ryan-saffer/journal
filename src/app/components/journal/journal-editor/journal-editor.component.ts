import { Component, OnInit, Input } from '@angular/core';
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

  constructor() { }

  ngOnInit() {}

  handleEditorCreated() {
    replaceQuillContent(this.journal.htmlContent)
  }

  handleContentChanged(content: ContentChange) {
    this.journal.htmlContent = content.html
    this.journal.content = content.text
  }
}
