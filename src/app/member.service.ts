import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

import { Member } from './member';
import { House } from './house';
import { OwnedPet } from './ownedPet';
import { AllowedPet } from './allowedPet';


@Injectable({
  providedIn: 'root'
})

export class MemberService {

  private membersUrl = 'https://my-json-server.typicode.com/Ivanastimac/simsDemo/familymembers';
  private housesUrl = 'https://my-json-server.typicode.com/Ivanastimac/simsDemo/house';
  private ownedPetsUrl = 'https://my-json-server.typicode.com/Ivanastimac/simsDemo/ownedpets';
  private allowedPetsUrl = 'https://my-json-server.typicode.com/Ivanastimac/simsDemo/allowedpets';
  members: Member[];
  houses: House[];
  emptyMember: Member = { name: '', id: -1, surname: '', birthday: '', work: false, school: '', houseId: -1, familyId: -1, status: '', reasonOfRemoval: '', years: '', family: '' }
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private chosenMember = new BehaviorSubject<Member>(this.emptyMember);
  sharedMember = this.chosenMember.asObservable();

  private families = new BehaviorSubject<string[]>([]);
  sharedFamilies = this.families.asObservable();

  private ownedPets = new BehaviorSubject<OwnedPet[]>([]);
  sharedOwnedPets = this.ownedPets.asObservable();

  constructor(private http: HttpClient) { }

  setChosenMember(member: Member) {
    this.chosenMember.next(member);
  }

  setFamilies(families: string[]) {
    this.families.next(families);
  }

  setOwnedPets(pets: OwnedPet[]) {
    this.ownedPets.next(pets);
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.membersUrl).pipe(catchError(this.handleError<Member[]>()));
  }

  updateMember(member: Member): Observable<any> {
    const url = `${this.membersUrl}/${member.id}`;
    return this.http.put(url, member, this.httpOptions).pipe(catchError(this.handleError<any>()));
  }

  addMember(member: Member): Observable<any> {
    return this.http.post(this.membersUrl, member, this.httpOptions).pipe(catchError(this.handleError<any>()));
  }

  deleteMember(member: Member): Observable<any> {
    const url = `${this.membersUrl}/${member.id}`;
    return this.http.delete(url, this.httpOptions).pipe(catchError(this.handleError<any>()));
  }

  getHouses(): Observable<House[]> {
    return this.http.get<House[]>(this.housesUrl).pipe(catchError(this.handleError<House[]>()));
  }

  getOwnedPets(): Observable<OwnedPet[]> {
    return this.http.get<OwnedPet[]>(this.ownedPetsUrl).pipe(catchError(this.handleError<OwnedPet[]>()));
  }

  updatePet(pet: OwnedPet): Observable<any> {
    const url = `${this.ownedPetsUrl}/${pet.id}`;
    return this.http.put(url, pet, this.httpOptions).pipe(catchError(this.handleError<any>()));
  }

  deletePet(pet: OwnedPet): Observable<any> {
    const url = `${this.ownedPetsUrl}/${pet.id}`;
    return this.http.delete(url).pipe(catchError(this.handleError<any>()));
  }

  getAllowedPets(): Observable<AllowedPet[]> {
    return this.http.get<AllowedPet[]>(this.allowedPetsUrl).pipe(catchError(this.handleError<AllowedPet[]>()));
  }

  adoptPet(pet: OwnedPet): Observable<any> {
    return this.http.post(this.ownedPetsUrl, pet, this.httpOptions).pipe(catchError(this.handleError<any>()));
  }

}
