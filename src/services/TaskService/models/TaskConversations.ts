
export interface TaskConversations {
    id: string;
    title: string;
    description: string;
    createDateTime: string;
    status: string;
    category: string;
    offers: Offers[];
}

export interface Offers {
    chatId: string;
    userId: string;
    score: number;
    pictureId: number;
    firstName: string;
}