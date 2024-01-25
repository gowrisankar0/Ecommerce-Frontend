import React, { useReducer } from "react";
import { useState } from "react";
import signup from "../assest/login-animation.gif";
import { BiHide, BiShow } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Slices/userSlice";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch =useDispatch();

  const [data, setData] = useState({
    
    email: "",
    password: "",
    
  });

  console.log(data);
  const navigate =useNavigate();

  const userData =useSelector((state)=>state);


  const handleSubmit = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const formHandle = async(e) => {
    e.preventDefault();

    const {  email, password } = data;

    if ( email && password) {
      
      const fetchData =await fetch(`http://localhost:4000/user/login`,{
        method: "POST",
        headers :{
          "content-type":'application/json'
        },
        body :JSON.stringify(data)

      });

      const dataRes =await fetchData.json();
      console.log(dataRes);
    
      
      toast(dataRes.message);


      // const reducer 

      if(dataRes.alert){
        dispatch(login(dataRes))
        console.log(dataRes);
        setTimeout(()=>{

          navigate("/")
        },1000)

     
 
      }
      console.log(userData);
   
    } else {
      alert("all fields are mandatory");
    }
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

 
  return (
    <div className="p-3 md:p-4">
      <div className="w-full max-w-sm bg-white m-auto flex  flex-col p-4">
        {/* <h1 className='text-center text-2xl font-o=bold'>signUp</h1> */}

        <div className="w-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto">
          <img src={signup} alt="sign" className="w-full" />
        </div>

        <form className="w-full py-3 flex flex-col" onSubmit={formHandle}>
        
          

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
            value={data.email}
            onChange={handleSubmit}
          />

          <label htmlFor="password">Password</label>
          <div className="flex px-2 py-1  bg-slate-200 rounded mt-1 mb-2  focus-within:outline focus-within:outline-blue-300">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className=" w-full bg-slate-200  rounded border-none outline-none"
              value={data.password}
              onChange={handleSubmit}
            />
            <span
              className="flex text-xl cursor-pointer"
              onClick={handleShowPassword}
            >
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <button className="w-full max-w-[150px] m-auto bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4">
            Login
          </button>
        </form>

        <p className="text-left text-sm mt-2">
          Dont't have the account ?{" "}
          <Link to="/signup" className="text-red-600 underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
