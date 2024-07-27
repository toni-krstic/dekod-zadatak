import { Injectable } from '@angular/core';
import { Users } from './users';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  url = 'https://api.test.ulaznice.hr/paganini/api/job-interview/employees';
  constructor() {}

  async getAllUsers(): Promise<Users[]> {
    const data = await fetch(this.url, { method: 'GET' });
    const res = await data.json();
    return res.data ?? [];
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
