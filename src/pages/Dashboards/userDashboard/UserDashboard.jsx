import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';


import { Navbar, Footer, SideBar,ThemeSettings } from '../../../components/dashboardComponents/index';
import {
  Properties, 
  Profile,
  Orders,
  Calendar,
  Agencies, 
  Overview,
  Line, 
  Bar, 
  Pie, 
  Financial, 
} from './index';

import { useStateContext } from '../../../contexts/ContextProvider';

const UserDashboard = () => {
  const { activeMenu, themeSettings, setThemeSettings, currentColor, currentMode } = useStateContext();

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
        <div className="flex relative dark:bg-main-dark-bg">
            <div className="fixed right-4 bottom-4" style={{zIndex: '1000'}}>
                <TooltipComponent content="Settings" position='Top' onClick={() => setThemeSettings(true)}>
                    <button 
                        type='button'
                        className='text-3xl p-3 
                        hover:drop-shadow-xl
                        hover:bg-light-gray
                        text-white'
                        style={{
                            background: currentColor,
                            borderRadius: '50%',
                        }}
                    >
                        <FiSettings/>
                    </button>
                </TooltipComponent>
            </div>
            {activeMenu ? (
                <div className='w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white'>
                    <SideBar />
                </div>
            ) : (
                <div className='w-0 dark:bg-secondary-dark-bg'>
                    <SideBar />
                </div>
            )}
            <div className={
                `dark:bg-main-dark-bg bg-main-bg min-h-screen w-full
                ${activeMenu ? ' md:ml-72' :  'flex-2'}`
            }>
                <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
                    <Navbar />
                </div> 
                <div>
                    {themeSettings && <ThemeSettings />}

                    <Routes>
                        {/* Dashboard */}
                        <Route path="properties" element={<Properties />} />
                        <Route path="overview" element={<Overview />} />
                        <Route path="profile" element={<Profile />} />

                        {/* Pages */}
                        <Route path="orders" element={<Orders />} />
                        <Route path="agencies" element={<Agencies />} />

                        {/* Apps */}
                        <Route path="calendar" element={<Calendar />} />

                        {/* charts */}
                        <Route path="line" element={<Line />} />
                        <Route path="bar" element={<Bar />} />
                        <Route path="pie" element={<Pie />} />
                        <Route path="financial" element={<Financial />} />
                        
                        {/* Default route */}
                        <Route index element={<Navigate to="overview" />} />
                    </Routes>
                </div>

                <Footer />
            </div>
        </div>
    </div>
  )
}

export default UserDashboard