import { Component, inject } from '@angular/core';
import { Users } from '../users';
import { UserServiceService } from '../user-service.service';
import { CommonModule } from '@angular/common';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, UserComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  userList: Users[] = [];
  filteredUserList: Users[] = [];
  userService: UserServiceService = inject(UserServiceService);
  positionFilter = [
    'All',
    'Konzultant',
    'Analitičar',
    'Inženjer',
    'Programer',
    'Dizajner',
    'Manager',
  ];
  sortFilter = ['None', 'First Name', 'Last Name', 'Position'];

  currentPage: number = 1;
  rows: number = 5;

  constructor() {
    this.userService.getAllUsers().then((userList: Users[]) => {
      this.userList = userList;
      this.filteredUserList = userList;
    });
  }

  searchResults(text: string) {
    if (!text) this.filteredUserList = this.userList;

    this.filteredUserList = this.userList.filter(
      (user) =>
        user.firstName.toLowerCase().includes(text.toLowerCase()) ||
        user.lastName.toLowerCase().includes(text.toLowerCase())
    );
  }

  filterPostions(position: string) {
    this.filteredUserList = this.userList.filter((user) =>
      user.jobTitle.toLowerCase().includes(position.toLowerCase())
    );
    if (position === 'All') this.filteredUserList = this.userList;
  }

  sortUsers(sortBy: string) {
    if (sortBy === 'First Name')
      this.filteredUserList = this.userList.sort((a, b) =>
        a.firstName > b.firstName ? 1 : -1
      );
    else if (sortBy === 'Last Name')
      this.filteredUserList = this.userList.sort((a, b) =>
        a.lastName > b.lastName ? 1 : -1
      );
    else if (sortBy === 'Position')
      this.filteredUserList = this.userList.sort((a, b) =>
        a.jobTitle > b.jobTitle ? 1 : -1
      );
    else this.filteredUserList = this.userList;
  }

  paginatedUsers(page: number) {
    const start = this.rows * (page - 1);
    const end = start + this.rows;
    return this.filteredUserList.slice(start, end);
  }

  setPages() {
    const pageCount = Math.ceil(this.filteredUserList.length / this.rows);
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }
}
