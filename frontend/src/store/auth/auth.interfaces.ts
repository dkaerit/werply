export interface AuthState {
    token: String | null
}

export interface LoginPayload {
    identifier: string;
    password: string;
}

export interface EndpointWithPayload { 
    endpoint: string, 
    payload: LoginPayload 
}