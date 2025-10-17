import { httpAuth } from "@/config/api";
import { API_ENDPOINTS } from "@/constants/endpoints";
import type { User } from "@/types/user";

class UserService {
    constructor() {}

    async getUser( id: string ): Promise<User> {
        try {
            const response = await httpAuth.get<User>(`${API_ENDPOINTS.USER.GET_BY_ID(id)}`);
            return response.data;
        } catch (error) {
            throw new Error(`Failed to fetch user ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    async updateUser( id: string, user: User ): Promise<User> {
        try {
            const response = await httpAuth.put<User>(`${API_ENDPOINTS.USER.UPDATE(id)}`, user);
            return response.data;
        } catch (error) {
            throw new Error(`Failed to update user ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    async deleteUser( id: string ): Promise<void> {
        try {
            await httpAuth.delete(`${API_ENDPOINTS.USER.DELETE(id)}`);
        } catch (error) {
            throw new Error(`Failed to delete user ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
}

export const userService = new UserService();