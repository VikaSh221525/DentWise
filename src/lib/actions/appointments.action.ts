"use server"

import { auth } from "@clerk/nextjs/server"
import { prisma } from "../prisma"

function transformAppointment(appointment: any){
    return {
        ...appointment,
        patientName: `${appointment.user.firstName || ""} ${appointment.user.lastName || ""}`.trim(),
        patientEmail: appointment.user.email,
        doctorName: appointment.doctor.name,
        doctorImageUrl: appointment.doctor.imageUrl || "",
        date: appointment.date.toISOString().split("T")[0],
    }
}

export async function getAppointments(){
    try{
        const appointments = await prisma.appointment.findMany({
            include:{
                user:{
                    select:{
                        firstName: true,
                        lastName: true,
                        email: true
                    }
                },
                doctor:{
                    select:{
                        name: true,
                        imageUrl: true
                    }
                }
            },
            orderBy:{createdAt: "desc"}
        })
        return appointments
    }catch(error){
        console.log(error)
        throw new Error("Failed to fetch appointments")
    }
}

export async function getUserAppointments(){
    try {
        const {userId} = await auth();
        if(!userId) throw new Error("Unauthorized")
        
        const user = await prisma.user.findUnique({
            where:{
                clerkId:userId
            }
        })

        if(!user) throw new Error("User not found")
        const appointments = await prisma.appointment.findMany({
            where:{userId: user.id},
            include:{
                user:{select:{firstName:true, lastName:true, email:true}},
                doctor:{select:{name:true, imageUrl:true}},
            },
            orderBy:[{date:"asc"}, {time: "asc"}],
        });
        return appointments.map(transformAppointment)
    } catch (error) {
        console.log(error)
        throw new Error("Failed to fetch user appointments")
    }
}

export async function getUserAppointmentStats(){
    try {
        const {userId} = await auth();
        if(!userId) throw new Error("Unauthorized")

        const user = await prisma.user.findUnique({
            where:{
                clerkId:userId
            }
        })
        
        if(!user) throw new Error("User not found")

        // these call will run on parallel, instead of waiting each other 
        const [totalCount, completeCount] = await Promise.all([
            prisma.appointment.count({
                where:{
                    userId: user.id
                }
            }),
            prisma.appointment.count({
                where:{
                    userId: user.id,
                    status: "COMPLETED"
                }
            })
        ])

        return {totalAppointments: totalCount, completedAppointments: completeCount}
        
    } catch (error) {
        console.log("Error fetching user appointment stats: ", error)
        return {totalAppointments: 0, completedAppointments: 0}
    }
}
