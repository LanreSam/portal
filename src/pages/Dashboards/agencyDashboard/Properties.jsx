import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosMore } from 'react-icons/io';
import { LuBedDouble } from "react-icons/lu";
import { LuShowerHead } from "react-icons/lu";
import { SlSizeFullscreen } from "react-icons/sl";
import { IoFilter } from "react-icons/io5";
import { GrLinkPrevious } from "react-icons/gr";
import { GrLinkNext } from "react-icons/gr";
import { IoSearchOutline } from "react-icons/io5";



import { Button } from '../../../components/agencyDashboardComponent';
import { useStateContext } from '../../../contexts/ContextProvider';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';


const Properties = () => {
  const { currentColor } = useStateContext();
  const [properties, setProperties] = useState([]);
  const [paginationLinks, setPaginationLinks] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Add current page state

  
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  

  const handleClick = () => {
    return navigate(`/${role}/add-property`);
  }
  

  const accessToken = localStorage.getItem('token');
  // Fetch properties from your API here
  const fetchProperties = async (page = 1) => {
    try {
      const response = await fetch(`https://realestate.api.sites.name.ng/properties/`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();
      
      console.log('API response:', data); // Log the response

      setProperties(data.results);

      console.log(data.links);
      setPaginationLinks(data.links);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };


  const handlePagination = () => {
    // setCurrentPage() // Parse the next page as an integer
    console.log('next page');
  };

  useEffect(() => {
    fetchProperties(currentPage); // Fetch properties for the initial page
  }, [currentPage]);


  return (
    <div className="mt-16">
      <div
        className=" rounded-2xl w-500 p-4 m-4 shadow-lg"
        style={{ backgroundColor: currentColor }}
      >
        <div className="text-center text-white space-y-4 mt-8">
          <p className="font-bold text-5xl">Your Properties</p>
          <p className=' tracking-widest'>View your listed properties here.</p>
        </div>

        <div className="flex justify-between items-center ">

          
        </div>
        
        <div className="flex justify-center items-center my-10 w-full">
          <div className="bg-white p-4 m-auto rounded-xl lg:w-3/4">
            <div className="flex outline-none border-solid border-2 border-[#8840E6]-500 rounded-lg">
              <input type="text" name="" id="" className='w-full outline-none p-2 text-slate-700' placeholder='Filter your properties...'/>

              <button 
                type="button" 
                className={`p-4 text-white font-semibold outline-none hover:opacity-75 bg-[${currentColor}] flex items-center`}
              >
                <IoSearchOutline className=' text-2xl mr-2'/>
                Search
              </button>
            </div>
          </div>

          <div>
            <TooltipComponent content="Filter" position='Top'>
              <IoFilter className='text-white text-2xl hover:opacity-80 lg:mr-12'/>
            </TooltipComponent>
          </div>
        </div>

      </div>

      <div className='flex flex-wrap flex-1 justify-around'>
        {properties && properties.length > 0 ? (
          properties.map(property => (
            <div key={property.id} className="w-500 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
              <div className="flex justify-between">
                <p className="text-lg font-medium">{property.agency.name}</p>
                <button type="button" className="text-xl font-semibold text-gray-500">
                  <IoIosMore />
                </button>
              </div>
              <div className="mt-10">
                {/* Used a container with a fixed height */}
                <div className="image-container" style={{ height: '200px', overflow: 'hidden' }}>
                  <img
                    className="md:w-96 h-full w-full object-cover transform transition-transform duration-600 ease-in-out hover:scale-110"
                    src={property.images[0].image}
                    alt="Property"
                  />
                </div>
                <div className="mt-8">
                  <p className="font-bold text-xl hover:text-gray-600 w-80"> {property.type}</p>
                  <p className="py-4 font-normal">
                    Added: 
                    <span className="ml-2 text-gray-400">
                      {
                        new Date(property.availability).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                      }
                    </span>
                  </p>

                  <div className="py-2">
                    <div className="flex items-center space-x-6">
                      <div>
                        <p className='font-semibold'>Bedrooms</p>
                        <div className='flex items-center space-x-4 py-3'>
                          <LuBedDouble className='text-3xl'/>
                          <span>{property.bedrooms}</span>
                        </div>
                      </div>

                      <div>
                        <p className='font-semibold'>Bathrooms</p>
                        <div className='flex items-center space-x-4 py-3'>
                          <LuShowerHead className='text-3xl'/>
                          <span>{property.bathrooms}</span>
                        </div>
                      </div>

                      <div>
                        <p className='font-semibold'>Size</p>
                        <div className='flex items-center space-x-4 py-3'>
                          <SlSizeFullscreen className='text-2xl'/>
                          <span>{property.square_footage} sqft</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='py-3'>
                    <p className='text-base'>For {property.transaction_type}</p>
                    <p className="text-xl font-medium text-gray-800 dark:text-gray-200">
                      {new Intl.NumberFormat('en-NG', {
                        style: 'currency',
                        currency: 'NGN',
                      }).format(property.price)}
                    </p>
                  </div>

                  <div className="py-4">
                    <Button
                      color="white"
                      bgColor={currentColor}
                      text="View Property"
                      borderRadius="10px"
                    />
                  </div>
                </div>
              </div>
            </div>
          )) 
        ) : (
            <div className='flex items-center justify-center h-screen w-full -mt-16'>
              <div className="text-center">
                <p className="mb-4 text-xl dark:text-gray-200">No properties available.</p>
                <button
                  className=' w-full'
                  style={{
                    color: 'white',
                    backgroundColor: currentColor,
                    borderRadius: '10px',
                    padding: '15px',
                  }}
                  onClick={handleClick}
                >
                  Add Property
                </button>
              </div>
            </div>
        )}
      </div>

      <div>
        {paginationLinks && (
          <div className="flex justify-center my-10 space-x-4">
            <button 
              onClick={() => handlePagination()} disabled={!paginationLinks.previous}
              className={`text-white cursor-pointer p-4 font-semibold rounded-lg shadow-md bg-[${currentColor}] hover:opacity-80 flex items-center`}
            >
              <GrLinkPrevious className='mr-4'/>
              Previous
            </button>
            
            <button 
              onClick={() => handlePagination()} disabled={!paginationLinks.next}
              className={`text-white cursor-pointer p-4 font-semibold rounded-lg shadow-md bg-[${currentColor}] hover:opacity-80 flex items-center`}
            >
              Next
              <GrLinkNext className='ml-4'/>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Properties