import { Component, OnInit, Input } from '@angular/core';
import { ContentChange } from 'ngx-quill';
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
    document.getElementsByClassName('ql-editor ql-blank')[0].innerHTML = `<p>Looks like this is my only way to do this..</p>`
  }

  handleContentChanged(content: ContentChange) {
    this.journal.content = content.html
  }
}
