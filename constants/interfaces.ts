export interface Task {
    id: string;
    room: TaskRoom;
    title: string;
    created_at: string; // ISO 8601 datetime string
    starts_at: string; // ISO 8601 datetime string
    starts_in: {
        seconds: number;
        minutes: number;
        hours: number;
        days: number;
    };
}

export interface TaskRoom {
    id: string
}

export interface AuthContextType {
    loading: boolean,
    isAuthenticated: boolean,
    signIn: () => void,
    signOut: () => void
}

export interface LoginRequestBody {
    username: string;
    password: string;
}

export interface LoginSuccessResponse {
    access_token: string;
    refresh_token: string;
}

export interface LoginFailResponse {
    detail: string
}