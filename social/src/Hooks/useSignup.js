import { useState } from "react";
import { useAuthContext } from "./useAuthContext";


export const useSignupContext = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const {dispatch} = useAuthContext();

    const signup = async(email, password, first_name, last_name, age, birthdate) =>{
        setLoading(true);
        setError(null);

        const response = await fetch('http://localhost:4000/api/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password,first_name, last_name, age, birthdate}),
        });

        const data = await response.json();

        if(!response.ok){
            setLoading(false);
            setError(data.error);
        }
        if(response.ok){
            // LOCAL STORAGE FOR SESSION
            localStorage.setItem('token', JSON.stringify(data));
            // update AuthContext
            dispatch({type: 'LOGIN', payload: data});


            setLoading(false);
        }
    }

    return {error, loading, signup};
}