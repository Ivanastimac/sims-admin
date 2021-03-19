import { Component, OnInit, OnDestroy } from '@angular/core';

import { Member } from '../member';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {

 members: Member[];
 selectedM: Member;
 getMembersSub;

  constructor(private memberService: MemberService) { }

  ngOnInit(): void {
    this.getMembers();
  }

  getMembers(): void {
    this.getMembersSub = this.memberService.getMembers().subscribe(members => this.members = members);
  }

  chosenMemberChanged(): void {
    this.memberService.setChosenMember(this.selectedM);
    }

  ngOnDestroy(): void {
    this.getMembersSub.unsubscribe();
  }

}
