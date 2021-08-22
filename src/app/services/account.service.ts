import { Injectable } from '@angular/core';
import { Account } from 'src/shared/models/account.model';
import { MockDbService } from './mock-db.service';

@Injectable({ providedIn: 'root' })
export class AccountService {
  constructor(private mockDbService: MockDbService) {}

  saveAccount(account: Account): void {}
}
