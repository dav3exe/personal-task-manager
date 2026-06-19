import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getTaskById, getTasks, deleteTask, updateTask, createTask, registerUser, loginUser, getCurrentUser, verifyEmail, forgotPassword } from "../services/api";
// import { useTaskActivePage } from "../context/ActivePageContext";
type Task = {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  tag: string
}

export const useGetTaskById = (id: string) => {
    return useQuery({
        queryKey: ["task", id],
        queryFn: () => getTaskById(id),
        enabled: !!id,
    })
}

export const useGetTasks = () => {
    return useQuery<Task[]>({
        queryKey: ["tasks"],
        // nested array, this is how to reach what i need
        queryFn: () => getTasks().then((res) => res.task),
        
    })
}

export const useCreateTask = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: {
            title: string;
            description?: string;
            completed?: boolean;
            tag?: string;
        }) => createTask(data),
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['tasks'] })
        },
        
        onError(error) {
            console.error(error)
        },
    })
}        

export const useUpdateTask = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (variables: {
            _id: string;
            data: {
            title: string;
            description?: string;
            completed?: boolean;
            tag?: string;
        }
    }) => updateTask(variables._id, variables.data),
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['tasks'] })
        }

    })
}

export const useDeleteTask = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (_id:string) => deleteTask(_id),
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['tasks'] })
        },

        onError(error) {
            console.error(error)
        },
    })
}

export const useRegisterUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: registerUser,
        onSuccess:(data)=>{
            localStorage.setItem(
                "taskduty_token",
                data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            queryClient.setQueryData(
                ["current-user"],
                data.user
            );
        }
    })
}

export const useLoginUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:loginUser,
        onSuccess:(data)=>{
            localStorage.setItem(
                "taskduty_token",
                data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            queryClient.setQueryData(
                ["current-user"],
                data.user
            );
        }
    });
};

export const useGetCurrentUser = () => {
    return useQuery({

        queryKey:["current-user"],

        queryFn:getCurrentUser,

        retry:false,

        staleTime:Infinity

    });
}

export const useVerifyEmail = (token: string) => {
    return useQuery({
        queryKey: ["verify-email", token],

        queryFn: () => verifyEmail(token),

        enabled: !!token,

        retry: false,
    });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPassword,
  });
};