import { Component, OnInit } from '@angular/core';
import { SurgeonService } from '../surgeon.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-surgeon-list',
  standalone: true,
  imports: [NgFor, NgIf, CommonModule],
  templateUrl: 'surgeon-list.component.html',
  styleUrls: ['./surgeon-list.component.css']
})
export class SurgeonListComponent implements OnInit {
  surgeons: any[] = [];

  constructor(private surgeonService: SurgeonService) { }

  ngOnInit(): void {
    console.log("-------- avant fetchsurgeon -------------");
    this.fetchSurgeons();
    console.log("-------- apres fetchsurgeon -------------");
  }

  fetchSurgeons(): void {
    this.surgeonService.getSurgeons().subscribe({
      next: (data) => {
        this.surgeons = data;
        console.log("tableau : ", this.surgeons);
      },
      error: (error) => {
        console.error('Error fetching surgeons', error);
      }
  });
  }
}
