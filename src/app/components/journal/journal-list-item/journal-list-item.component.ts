import { DateTime } from 'luxon';
import { Journal } from '../../types/Journal';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'journal-list-item',
  templateUrl: './journal-list-item.component.html',
  styleUrls: ['./journal-list-item.component.scss'],
})
export class JournalListItemComponent implements OnInit {

  @Input() journal: Journal
  @Output() onJournalClicked = new EventEmitter<Journal>()

  constructor() { }

  ngOnInit() {}

  onClick(journal: Journal) {
    this.onJournalClicked.emit(journal)
  }

  unixToString(millis: number) {
    let datetime = DateTime.fromMillis(millis)
    return datetime.toLocaleString(DateTime.DATETIME_MED)
  }
}
