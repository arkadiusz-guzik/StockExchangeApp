import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-correct-transaction',
  templateUrl: './correct-transaction.component.html',
  styleUrls: ['./correct-transaction.component.scss']
})
export class CorrectTransactionComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
