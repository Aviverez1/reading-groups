import { Component, EventEmitter, Output } from '@angular/core';

export interface SearchCriteria {
  searchTerm: string;
  searchType: 'groupName' | 'currentBook';
}

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html', //the problem
  styleUrls: ['./search-modal.component.css']
})
export class SearchModalComponent {
  @Output() onSearch = new EventEmitter<SearchCriteria>();
  @Output() onClose = new EventEmitter<void>();

  searchTerm: string = '';
  searchType: 'groupName' | 'currentBook' = 'groupName';

  search() {
    if (this.searchTerm.trim()) {
      this.onSearch.emit({
        searchTerm: this.searchTerm.trim(),
        searchType: this.searchType
      });
    }
  }

  close() {
    this.onClose.emit();
  }
}