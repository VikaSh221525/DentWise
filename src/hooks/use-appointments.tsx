"use client"

import { bookAppointment, getAppointments, getBookedTimeSlots, getUserAppointments } from "@/lib/actions/appointments.action"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export function useGetAppointments(){
    const reslut = useQuery({
        queryKey: ["getAppointments"],
        queryFn: () => getAppointments()
    })
    return reslut
}

export function useBookedTimeSlots(doctorId: string, date: string){
    const result = useQuery({
        queryKey: ["getBookedTimeSlots"],
        queryFn: () => getBookedTimeSlots(doctorId, date),
        enabled: !!doctorId && !!date   //only run query if doctorId and date are provided
    })
    return result
}

export function useBookAppointment(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn : bookAppointment,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["getUserAppointments"]})
        },
        onError: (error) => {
            console.error("Error booking appointment: ", error)
        }
    })
}

// Get user specific appointments
export function useUserAppointments(){
    return useQuery({
        queryKey: ["getUserAppointments"],
        queryFn: () => getUserAppointments(),
    })
}

