import { Component, OnInit } from '@angular/core';
import { Journal } from '../../types/Journal';
import { JOURNALS } from '../journals';

@Component({
  selector: 'app-journal',
  templateUrl: './journal-root.component.html',
  styleUrls: ['./journal-root.component.scss'],
})
export class JournalRootComponent implements OnInit {

  journals: Journal[]

  constructor() { }

  ngOnInit() {
    this.journals = JOURNALS
  }

}
