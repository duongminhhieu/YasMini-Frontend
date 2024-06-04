export type Notification = {
    description: any;
    id: string;
    title: string;
    content: string;
    thumbnail: string;
    link: string | null;
    isRead: boolean;
    createdBy: string;
    createdDate: Date;
    lastModifiedBy: string;
    lastModifiedDate: Date;
}
