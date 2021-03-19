import { Component, OnInit, OnDestroy } from '@angular/core';

import { House } from '../house';
import { MemberService }  from '../member.service';

@Component({
  selector: 'app-houses',
  templateUrl: './houses.component.html',
  styleUrls: ['./houses.component.css']
})

export class HousesComponent implements OnInit, OnDestroy {

  houses: House[] = [];
  displayedColumns: string[] = ['surname', 'Address', 'prize'];
  getHousesSub;

  constructor(private memberService: MemberService) { }

  ngOnInit(): void {
    this.getHouses();
  }

  getHouses(): void {
    this.getHousesSub = this.memberService.getHouses().subscribe(houses => this.houses = houses);
  }

  ngOnDestroy(): void {
    if (this.getHousesSub) {
      this.getHousesSub.unsubscribe();
    }
  }

}
