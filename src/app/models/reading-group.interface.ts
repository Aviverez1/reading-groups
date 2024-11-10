// reading-group.interface.ts
import { Book } from './book.interface';

export interface ReadingGroup {
  id?: string;
  name: string;
  description: string;
  coverImage?: string;
  adminId: string;
  memberIds: string[];
  memberEmails: string[];
  memberCount: number;
  currentBook?: Book;
  createdAt: Date;
  meetingDay?: string;
  meetingTime?: string;
  maxMembers?: number;
  tags?: string[];
  lastUpdated?: Date;
  nextMeeting?: Date;
  comments?: {
    username: string;
    content: string;
  }[];
}