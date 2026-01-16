"use client"

import { getAppointments } from "@/lib/actions/appointments.action"
import { useQuery } from "@tanstack/react-query"

export function useGetAppointments(){
    const reslut = useQuery({
        queryKey: ["getAppointments"],
        queryFn: () => getAppointments()
    })
    return reslut
}