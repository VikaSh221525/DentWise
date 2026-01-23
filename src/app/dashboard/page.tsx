import ActivityOverview from '@/components/dashboardCompo/ActivityOverview'
import MainActions from '@/components/dashboardCompo/MainActions'
import WelcomeSection from '@/components/dashboardCompo/WelcomeSection'
import Navbar from '@/components/Navbar'
import React from 'react'

function DashboardPage() {
  return (
    <>
      <Navbar/>
      <div className='max-w-7xl mx-auto px-6 py-8 pt-24'>
        <WelcomeSection/>
        <MainActions/>
        <ActivityOverview/>

      </div>
    </>
  )
}

export default DashboardPage