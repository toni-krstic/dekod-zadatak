import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  url = 'https://api.test.ulaznice.hr/paganini/api/job-interview/employees';
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any> {
    return this.http.get(this.url, { headers: { Accept: 'application/json' } });
  }

  submitApplication(
    firstName: string,
    lastName: string,
    position: string,
    dateOfBirth: string
  ) {
    console.log(firstName, lastName, position, dateOfBirth);
  }
}
