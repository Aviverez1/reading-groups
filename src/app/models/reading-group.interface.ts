// export interface ReadingGroup {
//     id: string;
//     name: string;
//     description: string;
//     memberCount: number;
//     currentBook?: {
//       title: string;
//       imageUrl: string;
//     };
//     nextMeeting?: Date;
// }
export interface ReadingGroup {
  id?: string;
  name: string;
  description: string;
  coverImage?: string;
  adminId: string;
  memberIds: string[];  // Changed from any to string[]
  memberCount: number;
  currentBook?: {
    id: string;
    title: string;
    imageUrl?: string;
  };
  createdAt: Date;
  meetingDay?: string;
  meetingTime?: string;
  maxMembers?: number;
  tags?: string[];
  lastUpdated?: Date;
  nextMeeting?: Date;
}