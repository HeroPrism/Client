export interface GetUserResponse {
    pictureId: number;
    firstName: string;
    lastName: string;
    userType: string;
    score: number;
    chatToken: ChatToken;
}

export interface ChatToken {
    token: string;
    expiration: string;
}