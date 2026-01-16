import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'
import AdminDashboardClient from './AdminDashboardClient'

async function AdminPage() {
    const user = await currentUser()
    if (!user) return redirect('/')

    const adminEmail = process.env.ADMIN_EMAIL
    // user is not the admin
    if (user.emailAddresses[0].emailAddress !== adminEmail) return redirect('/dashboard')


    return (
        <AdminDashboardClient/>
    )  
}

export default AdminPage