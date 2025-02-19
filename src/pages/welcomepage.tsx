import { useStore } from "../store/store";
import { useEffect } from "react";
import UserWelcome from "../components/Welcome";
import { useNavigate } from "react-router-dom";




const WelcomePage:React.FC = () => {
  const userDetails = useStore((state) => state.userDetail);
  const userPerformanceAsync = useStore((state)=>state.userPerformanceAsync);
  const navigate = useNavigate();

  useEffect(() => {
  
    const fetch = async()=>{
      await userPerformanceAsync(userDetails?.email||"")
    }
    fetch();
  }, [userDetails]);

  if (!userDetails) {
    navigate("/signin",{replace:true})
  }
  else{
    return <UserWelcome/>;
  }

};



export default WelcomePage;
