import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { SurgeonListComponent } from './surgeon-list/surgeon-list.component';
import { RouterModule } from '@angular/router';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterModule, SurgeonListComponent],
  standalone: true
  // styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  message: string | undefined;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getHello().subscribe({
      next: (response) => {
        this.message = response;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}