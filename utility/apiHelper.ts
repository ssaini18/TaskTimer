import { LoginSuccessResponse } from "@/constants/interfaces";
import * as SecureStore from 'expo-secure-store';

const BASE_URL = 'https://mavehiringserver.azurewebsites.net';

export const get = async <T>(url: string, token?: string | null): Promise<T> => {
    try {
        let uri = BASE_URL + url;

        let header = new Headers();
        if(token) {
            header.append("Authorization", "Bearer "+token);
        }
        let response = await fetch(uri, {headers: header});
        
        if(response.ok) {
            let data: T = await response.json();
            return data; 
        } else if(response.status == 401) {
            let refreshToken = await SecureStore.getItemAsync("refreshToken");
            const newToken = await getFreshToken(refreshToken);

            return get<T>(url, newToken.access_token); 
        } else {
            throw new Error(`Failed get request: ${response.statusText}`);
        }

    } catch (error) {
        throw error;
    }
}

export const post = async <T, R>(url: string, body?: T): Promise<R> => {
    try {

        let uri = BASE_URL+url;
        
        let response = await fetch(uri, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
        
        let data: R = await response.json();
        return data;

    } catch (error) {
        throw error;
    }
}

async function getFreshToken(refreshToken: string|null): Promise<LoginSuccessResponse> {
    try {
        const response = await fetch(BASE_URL+'/api/auth/refresh', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refresh_token: refreshToken }),
        });

        if(response.ok) {
            const data: LoginSuccessResponse = await response.json();
            return data;
        } else if (response.status == 401) {
            throw new Error(`Invalid refresh token`);
        } else {
            throw new Error(`Failed to refresh token: ${response.statusText}`);
        }
      } catch (error) {
        throw error;
      }
}