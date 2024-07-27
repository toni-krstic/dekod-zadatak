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
}
