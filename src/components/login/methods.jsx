import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import UserDashboard from '../../pages/Dashboards/userDashboard/UserDashboard';
//import { useAuth } from '../../contexts/AuthContext';

const useLoginLogic = (apiEndpoint) => { 
    const [error, setError] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);


    // New function to set errors
    const setErrors = (newError) => {
      setError(newError);
    };

    const openPopup = () => {
      setIsPopupOpen(true);
    };
  
    const closePopup = () => {
      setIsPopupOpen(false);
    };
    
    //Hadle form data i.e user input
    const [userInput, setUserInput] = useState({
      email: '',
      password: '',
    });
  
    //Handle change in the values of user's input
    const handleChange = (e) => {
      const { name, value } = e.target;
      setUserInput(
        (prevData) => (
          { ...prevData, [name]: value }
        )
      );
    };


    const password_show_hide = () => {
      var x = document.getElementById("password");
      var show_eye = document.getElementById("show_eye");
      var hide_eye = document.getElementById("hide_eye");
      
      if (x.type === "password") {
        x.type = "text";
        show_eye.style.display = "none";
        hide_eye.style.display = "block";
      } else {
        x.type = "password";
        show_eye.style.display = "block";
        hide_eye.style.display = "none";
      }
    }

    const navigate = useNavigate();
    
    const useHandleLogin = async (e) => {
      e.preventDefault()
      try {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify(userInput);

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
        };

        const response = await fetch(apiEndpoint, requestOptions);
        const responseData = await response.json();
        
        if (!response.ok) {
          // Handle non-successful response (HTTP status code other than 200)
            setErrors(responseData.message);
            openPopup(); // Open the popup

            for (const field in responseData.extra.fields) {
            // Check if the field has a truthy value
                if (responseData.extra.fields[field]) {
                  // Output the value contained in the field
                  setErrors(`${responseData.extra.fields[field]}`)
                  openPopup(); // Open the popup
                  console.log(`${field}: ${responseData.extra.fields[field]}`);
                }
            }
            return;
        }

        navigate('/')
        localStorage.setItem('name', responseData.last_name)
        localStorage.setItem('token', responseData.token)
        console.log('Login successful', responseData);
        
      } catch (error) {
        console.error('Login failed', error);
        setErrors('Login failed', error);
        openPopup(); // Open the popup
      }
    };
  
    return{   
      userInput,
      error,
      isPopupOpen, 
      setIsPopupOpen,
      openPopup,
      closePopup,
      handleChange,
      password_show_hide,
      useHandleLogin
    }
  }

export default useLoginLogic;