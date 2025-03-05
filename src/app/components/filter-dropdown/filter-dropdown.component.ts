import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter-dropdown',
  templateUrl: './filter-dropdown.component.html',
  styleUrls: ['./filter-dropdown.component.scss'],
  standalone: false,
})
export class FilterDropdownComponent {
  @Input() categories: string[] = [];
  @Output() categorySelected = new EventEmitter<string>();
  
  isOpen: boolean = false;
  selectedCategory: string = '';
  
  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
  
  selectCategory(category: string) {
    this.selectedCategory = category;
    this.categorySelected.emit(category);
    this.isOpen = false;
  }
}