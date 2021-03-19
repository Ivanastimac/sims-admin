import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { MemberDialogComponent } from '../member-dialog/member-dialog.component';
import { Member } from '../member';
import { DialogDto } from '../dialogDto';
import { MemberService }  from '../member.service';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})

export class MemberDetailsComponent implements OnInit, AfterViewInit, OnDestroy {
  member: Member;
  members: Member[] = [];
  families: string[] = [];
  dataSource = new MatTableDataSource<Member>();
  displayedColumns: string[] = ['id', 'name', 'surname', 'birthday', 'years', 'school', 'work', 'status', 'familyId'];
  emptyMember: Member = { name: '', id: -1, surname: '', birthday: '', work: false, school: '', houseId: -1, familyId: -1, status: '', reasonOfRemoval: '', years: '', family: '' }
  getMembersSub;
  afterClosedSub;

  @ViewChild('table') table: MatTable<Member>;
  @ViewChild(MatSort) sort: MatSort;

  constructor( private memberService: MemberService, public dialog: MatDialog ) { }

  ngOnInit(): void {
    this.families[0] = 'The Meznicks';
    this.memberService.setFamilies(this.families);
    this.getMembers();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  getMembers(): void {
    this.getMembersSub = this.memberService.getMembers().subscribe(members => {
      this.members = members;
      this.getYears(this.members);
      this.dataSource.data = this.members;
      this.getFamily(this.members);
      });
  }

  openDialog(member: Member, type: String): void {

    let data: DialogDto = { member: this.emptyMember, type: '', members: [], families: [] };
    data.member = member;
    data.members = this.members;
    data.type = type;
    data.families = this.families;

    const dialogRef = this.dialog.open(MemberDialogComponent, {
      height: '400px',
      width: '600px',
      data
    });

    this.afterClosedSub = dialogRef.afterClosed().subscribe(result =>
      {
        if (result) {
          if (result.data.reasonOfRemoval !== '') {
            let id = result.data.id;
            this.members = this.members.filter(member => member.id !== id);
          } else {
            this.members[result.data.id] = result.data;
          }
          this.table.dataSource = this.members;
          this.getYears(this.members);
          this.memberService.setFamilies(this.families);
          this.table.renderRows();
        }
      }
    )
  }

  getYears(members: Member[]): void {
    for (let member of members) {
      let years;
      if (member.birthday) {
        let today: Date = new Date();
        let birthday: Date = new Date(member.birthday);
        years = today.getFullYear() - birthday.getFullYear();
        if ( (today.getMonth() < birthday.getMonth()) || ( (today.getMonth() === birthday.getMonth()) && (today.getDay() < birthday.getDay()) ) ) {
          years -= 1;
        }
        member.years = years;
      } else {
        member.years = 'unknown';
      }
    }
  }

  getFamily(members: Member[]): void {
    for (let member of members) {
      member.family = this.families[member.familyId];
    }
  }

  ngOnDestroy(): void {
    if (this.getMembersSub) {
      this.getMembersSub.unsubscribe();
    }
    if (this.afterClosedSub) {
      this.afterClosedSub.unsubscribe();
    }
  }

}
