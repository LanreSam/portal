import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';


import { Navbar, Footer, SideBar,ThemeSettings } from '../../../components/agencyDashboardComponent/index';
import {
  Properties, 
  Profile,
  Orders, 
  Calendar, 
  AgentApplication, 
  Overview,
  Stacked, 
  Pyramid, 
  Customers,
  Line, 
  Kanban, 
  Area,
  Bar, 
  Pie, 
  Financial, 
  ColorPicker, 
  ColorMapping, 
  AddProperty,
  Agents,
} from '../../Dashboards/agencyDashboard/index';

import { useStateContext } from '../../../contexts/ContextProvider';


const AgencyDashboard = () => {
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
                        <Route path="listings" element={<Properties />} />
                        <Route path="overview" element={<Overview />} />
                        <Route path="profile" element={<Profile />} />

                        {/* Pages */}
                        <Route path="orders" element={<Orders />} />
                        <Route path="agents-application" element={<AgentApplication />} />
                        <Route path="agents" element={<Agents />} />
                        <Route path="customers" element={<Customers />} />

                        {/* Apps */}
                        <Route path="kanban" element={<Kanban />} />
                        <Route path="add-property" element={<AddProperty />} />
                        <Route path="calendar" element={<Calendar />} />
                        <Route path="color-picker" element={<ColorPicker />} />

                        {/* charts */}
                        <Route path="line" element={<Line />} />
                        <Route path="area" element={<Area />} />
                        <Route path="bar" element={<Bar />} />
                        <Route path="pie" element={<Pie />} />
                        <Route path="financial" element={<Financial />} />
                        <Route path="color-mapping" element={<ColorMapping />} />
                        <Route path="pyramid" element={<Pyramid />} />
                        <Route path="stacked" element={<Stacked />} /> 
                        
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

export default AgencyDashboard;