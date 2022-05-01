import { Component, Input, OnInit } from '@angular/core';
import { Journal } from '../../types/Journal';

@Component({
  selector: 'journal-list',
  templateUrl: './journal-list.component.html',
  styleUrls: ['./journal-list.component.scss'],
})
export class JournalListComponent implements OnInit {

  @Input() journals: Journal[]

  constructor() { }

  ngOnInit() {}

}
