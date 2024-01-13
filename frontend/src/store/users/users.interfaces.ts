export interface UserState {
    avatar: string;
    nickname: string;
    username: string;
    pjs: string[];
    // Otras propiedades según tus necesidades
}

export interface RootState {
    user: UserState;
    // Otros estados si los tienes
}