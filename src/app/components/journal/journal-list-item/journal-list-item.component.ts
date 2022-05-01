import { Journal } from '../../types/Journal';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'journal-list-item',
  templateUrl: './journal-list-item.component.html',
  styleUrls: ['./journal-list-item.component.scss'],
})
export class JournalListItemComponent implements OnInit {

  @Input() journal: Journal

  constructor() { }

  ngOnInit() {}

  onClick(journal: Journal) {
    console.log(journal)
  }

}
