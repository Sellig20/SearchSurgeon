import { Component, OnInit } from '@angular/core';
import { SurgeonService, interventionInterface, roomInterface, surgeonInterface } from '../surgeon.service';
import { CommonModule, DecimalPipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-surgeon-list',
  standalone: true,
  imports: [NgFor, NgIf, CommonModule, DecimalPipe, FormsModule],
  templateUrl: 'surgeon-list.component.html',
  styleUrls: ['./surgeon-list.component.css']
})
export class SurgeonListComponent implements OnInit {

  topSurgeonSortedTimes: { key: string, value: number }[] = [];
  favoriteRoomSurgeon: { key: string, value: number }[] = [];

  filteredSurgeons: surgeonInterface[] = [];
  searchText: string = '';

  displayedSurgeons: surgeonInterface[] = [];
  currentPage = 1;
  itemsPerPage = 10;

  surgeonsFinalTab: surgeonInterface[] = [];

  constructor(private surgeonService: SurgeonService) { }

  ngOnInit(): void {
    this.fetchSurgeons();
  }

  fetchSurgeons(): void {
    this.surgeonService.getSurgeons().subscribe({
      next: (data: any) => {

        console.log('Data received from service: ', data.topSurgeonSortedTimes);

        this.surgeonsFinalTab = data.surgeonsVector.map((surgeon: any) => ({
          surgeon: surgeon.surgeon,
          specialty: 'Specialty',
          anesthsiste: 'Anesthesiste',
          nurse1: 'Nurse1',
          nurse2: 'Nurse2',
          roomNumber: surgeon.favoriteRoom,
          intervention: surgeon.interventionNb
        }));

        this.filteredSurgeons = [...this.surgeonsFinalTab];

        this.updateDisplayedSurgeons();
      },
      error: (error) => {
        console.error('Error fetching surgeons', error);
      }
    });
  }
  
  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.updateDisplayedSurgeons();
  }

  updateDisplayedSurgeons(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.displayedSurgeons = this.filteredSurgeons.slice(startIndex, startIndex + this.itemsPerPage);
  }

  search(): void {
    if (this.searchText.trim() === '') {
      this.filteredSurgeons = [...this.surgeonsFinalTab];
    } else {
      this.filteredSurgeons = this.surgeonsFinalTab.filter(surgeon =>
        surgeon.surgeon.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
    this.currentPage = 1;
    this.updateDisplayedSurgeons();
  }

  getPageNumbers(): number[] {
    const pageCount = Math.ceil(this.filteredSurgeons.length / this.itemsPerPage);
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  backToSurgeonsTable(): void {
    this.searchText = '';
    this.search();
  }
}


//   fetchSurgeons(): void {
//     this.surgeonService.getSurgeons().subscribe({
//       next: (data: any) => {
//         console.log('Data received from service:', data);
//         this.favoriteRoomSurgeon = data.favoriteRoomSurgeon;
//         this.topSurgeonSortedTimes = data.topSurgeonSortedTimes;
        
//       },
//       error: (error) => {
//         console.error('Error fetching surgeons', error);
//       }
//     });
//   }
// }
