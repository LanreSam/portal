import React, { useEffect } from 'react';

import { Header } from '../../../components/dashboardComponents';
import { GoHomeFill, GoLocation } from 'react-icons/go';
import UsePropertyLogic from '../methods';
import { BsMarkdown, BsPhone } from 'react-icons/bs';
import { MdOutlineEmail } from 'react-icons/md';
import { BiPin, BiUser } from 'react-icons/bi';
import { useStateContext } from '../../../contexts/ContextProvider';


const Profile = () => {
    
    const { currentColor } = useStateContext();

    const {
        profile
    } = UsePropertyLogic('https://realestate.api.sites.name.ng/customers/profile/')

    console.log("User data:", profile)

    return (
        <div className="mt-16">
            <div className="m-6 md:m-10 p-6 md:p-10 rounded-3xl bg-white">
                <Header category="Page" title="Profile" />
                
                <div className="w-full mt-10">
                    <div className="text-center space-y-9">
                        <img
                            src={profile.profile_picture !== null ? profile.profile_picture : "https://media.istockphoto.com/id/1316420668/vector/user-icon-human-person-symbol-social-profile-icon-avatar-login-sign-web-user-symbol.jpg?s=612x612&w=0&k=20&c=AhqW2ssX8EeI2IYFm6-ASQ7rfeBWfrFFV4E87SaFhJE="}
                            alt="profile"
                            className="rounded-full w-40 h-40 hover:shadow-lg m-auto"
                        />
                        <h4 className="font-semibold text-3xl mt-10">{profile.last_name} {profile.first_name}</h4>
                        <div className="flex items-center justify-center">
                            <GoLocation className="mr-2" />
                            <p>{profile.address && (profile.address.state || profile.address.city)}, {profile.address && profile.address.country}</p>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between my-10 p-4 rounded-xl text-white space-y-9"
                        style={{ backgroundColor: currentColor }}>
                        <div className="space-y-3 md:w-1/2 md:mr-2">
                            <div className="flex items-center space-x-2">
                                <BsMarkdown />
                                <span className="font-medium text-sm">Address:</span>
                            </div>
                            <h4 className="font-semibold text-lg">{profile.address && profile.address.street_address}, {profile.address && profile.address.city}, {profile.address && profile.address.state}, {profile.address && profile.address.country}.</h4>
                        </div>
                        <div className="space-y-3 md:w-1/2 md:ml-2">
                            <div className="flex items-center space-x-2">
                                <BiPin />
                                <span className="font-medium text-sm">Id:</span>
                            </div>
                            <h4 className="font-semibold text-lg">{profile.id}</h4>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-around items-center mt-10 p-4 space-y-9">
                        <div className="space-y-3 md:w-1/3">
                            <div className="flex items-center space-x-2">
                                <BiUser />
                                <span className="font-medium text-sm">Role:</span>
                            </div>
                            <h4 className="font-semibold text-lg">{profile.object}</h4>
                        </div>
                        <div className="space-y-3 md:w-1/3">
                            <div className="flex items-center space-x-2">
                                <MdOutlineEmail />
                                <span className="font-medium text-sm">Email:</span>
                            </div>
                            <a href={`mailto:${profile.email}`} className="font-semibold text-lg">{profile.email}</a>
                        </div>
                        <div className="space-y-3 md:w-1/3">
                            <div className="flex items-center space-x-2">
                                <BsPhone />
                                <span className="font-medium text-sm">Phone Number</span>
                            </div>
                            <a href={`tel:+234${profile.phone_number}`} className="font-semibold text-lg">{profile.phone_number}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;