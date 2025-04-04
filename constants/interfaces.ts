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