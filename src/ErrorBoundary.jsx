import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

// Error functionality to handle if any error occur
export default function ErrorBoundary(){
    const navigate=useNavigate();
    useEffect(()=>{
        setTimeout(()=>{
            navigate("/");
        },2000);
    },[])

    return(
        <div className="textDispley">
            <h1>Error, Something went wrong !!!</h1>
            <p>redirecting to homepage... </p>
        </div>

    )
}
