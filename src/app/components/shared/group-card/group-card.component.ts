// src/app/components/shared/group-card/group-card.component.ts
import { Component, Input } from '@angular/core';
import { ReadingGroup } from '../../../models/reading-group.interface';

@Component({
  selector: 'app-group-card',
  templateUrl: './group-card.component.html',
  styleUrls: ['./group-card.component.css']
})
export class GroupCardComponent {
  @Input() group!: ReadingGroup;
}