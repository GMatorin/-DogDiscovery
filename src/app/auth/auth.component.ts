import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {
    console.log('BUILD AUTH');
  }

  ngOnInit(): void {}

  openDogSearch() {
    this.router.navigate(['dog-search'], { relativeTo: this.route });
  }
}
