// reading-group.interface.ts
export interface ReadingGroup {
  id?: string;
  name: string;
  description: string;
  coverImage?: string;
  adminId: string;
  memberIds: string[];
  memberEmails: string[];
  memberCount: number;
  currentBook?: {
    id: string;
    title: string;
    imageUrl?: string;
    authors: string[];
    description?: string;
    publishedDate?: string;
    pageCount?: number;
  };
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