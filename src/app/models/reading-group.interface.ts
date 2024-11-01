export interface ReadingGroup {
    id: string;
    name: string;
    description: string;
    memberCount: number;
    currentBook?: {
      title: string;
      imageUrl: string;
    };
    nextMeeting?: Date;
}