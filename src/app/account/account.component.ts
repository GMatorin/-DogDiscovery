import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from 'src/shared/models/account.model';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'account',
  templateUrl: 'account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent {
  account$: Observable<Account | null> = this.accountService.getAccount();

  constructor(private accountService: AccountService) {}
}
