export interface AuthState {
    token: String | null
}

export interface LoginPayload {
    identifier: string;
    passwd: string;
}

export interface EndpointWithPayload { 
    endpoint: string, 
    payload: LoginPayload 
}