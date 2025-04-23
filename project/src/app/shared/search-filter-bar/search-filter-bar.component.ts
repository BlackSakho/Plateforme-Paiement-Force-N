import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-filter-bar',
  templateUrl: './search-filter-bar.component.html',
  styleUrls: ['./search-filter-bar.component.css']
})
export class SearchFilterBarComponent {
  @Input() showStatusFilter: boolean = true;

  @Output() searchQueryChange = new EventEmitter<string>();
  @Output() searchDateChange = new EventEmitter<string>();
  @Output() selectedMonthChange = new EventEmitter<string>();
  @Output() selectedStatusChange = new EventEmitter<string>();

  months = [
    { value: '01', label: 'Janvier' },
    { value: '02', label: 'Février' },
    { value: '03', label: 'Mars' },
    { value: '04', label: 'Avril' },
    { value: '05', label: 'Mai' },
    { value: '06', label: 'Juin' },
    { value: '07', label: 'Juillet' },
    { value: '08', label: 'Août' },
    { value: '09', label: 'Septembre' },
    { value: '10', label: 'Octobre' },
    { value: '11', label: 'Novembre' },
    { value: '12', label: 'Décembre' }
  ];

  onQueryChange(value: string) {
    this.searchQueryChange.emit(value);
  }

  onDateChange(value: string) {
    this.searchDateChange.emit(value);
  }

  onMonthChange(value: string) {
    this.selectedMonthChange.emit(value);
  }

  onStatusChange(value: string) {
    this.selectedStatusChange.emit(value);
  }
}
