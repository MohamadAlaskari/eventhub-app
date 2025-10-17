import { useMutation } from "@tanstack/react-query"
import { useAuth } from "./useAuth"
import type { User } from "@/types/user"
import { userService } from "@/services/user.service"
import { toast } from "sonner"

export const useUser = () => {
    const { user, refreshUser } = useAuth()

    const updateUserMutation = useMutation({
        mutationFn: (updatedUser: Partial<User>) => {
            if (!user?.id) throw new Error("User ID missing")
            return userService.updateUser(user.id, updatedUser)
        },
        onSuccess: async () => {
            toast.success('User updated successfully')
            // Refresh user data after successful update
            await refreshUser()
        },
        onError: (error) => {
            toast.error('Error', {
                description: error instanceof Error ? error.message : 'Failed to update user'
            })
        }
    })

    const deleteUserMutation = useMutation({
        mutationFn: () => {
            if (!user?.id) throw new Error("User ID missing")
            return userService.deleteUser(user.id)
        },
        onSuccess: () => {
            toast.success('User deleted successfully')
        },
        onError: (error) => {
            toast.error('Error', {
                description: error instanceof Error ? error.message : 'Failed to delete user'
            })
        }
    })

    return {
        user,
        updateUser: updateUserMutation.mutate,
        isUpdating: updateUserMutation.isPending,
        deleteUser: deleteUserMutation.mutate,
        isDeleting: deleteUserMutation.isPending,
        updateError: updateUserMutation.error,
        deleteError: deleteUserMutation.error
    }
}