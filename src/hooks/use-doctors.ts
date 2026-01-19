"use client"

import { createDoctor, getDoctors, updateDoctor } from "@/lib/actions/doctors.action"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export function useGetDoctors(){
    const result = useQuery({
        queryKey: ["getDoctors"],
        queryFn: getDoctors
    })
    return result
}

export function useCreateDoctor(){
    const queryClient = useQueryClient()
    const result = useMutation({
        mutationFn: createDoctor,
        // on success refetch getDoctors query
        onSuccess:()=> {
            // invalidate related queries to refresh data
            queryClient.invalidateQueries({queryKey: ["getDoctors"]})
        } ,
        onError:()=> console.log("Failed to create doctor")

    })
    return result
}

export function useUpdateDoctor(){
    const queryClient = useQueryClient()
    const result = useMutation({
        mutationFn: updateDoctor,
        // on success refetch getDoctors query
        onSuccess:()=> {
            // invalidate related queries to refresh data
            queryClient.invalidateQueries({queryKey: ["getDoctors"]})
        } ,
        onError:()=> console.log("Failed to update doctor")

    })
    return result
}
