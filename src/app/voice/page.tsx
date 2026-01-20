import Navbar from '@/components/Navbar'
import FeatureCards from '@/components/voiceCompo/FeatureCards';
import ProPlanRequired from '@/components/voiceCompo/ProPlanRequired';
import VapiWidget from '@/components/voiceCompo/VapiWidget';
import WelcomeSection from '@/components/voiceCompo/WelcomeSection';
import { auth } from '@clerk/nextjs/server'
import React from 'react'

async function page() {
    const {has} = await auth();
    const hasProPlan = has({plan:"ai_basic"}) || has({plan:"ai_pro"})

    if(!hasProPlan) return <ProPlanRequired/>

    return(
        <div className='min-h-screen bg-background'>
            <Navbar/>

            {/* main content */}
            <div className='max-w-7xl mx-auto px-6 py-8 pt-24'>
                <WelcomeSection/>
                <FeatureCards/>

            </div>

            <VapiWidget/>

        </div>
    )
}

export default page



