import React, { useState } from "react";
import signup from "../assest/login-animation.gif";
import { BiHide, BiShow } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import {imageToBase64} from "../utility/imageToBase64";
import toast, { Toaster } from 'react-hot-toast';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
    image:''
  });

  console.log(data);

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

    const { firstname, lastname, email, password, confirmpassword } = data;

    if (firstname && email && password && confirmpassword) {
      if (password === confirmpassword) {

        const fetchData =await fetch(`http://localhost:4000/user/signup`,{
          method: "POST",
          headers :{
            "content-type":'application/json'
          },
          body :JSON.stringify(data)

        });

        const dataRes =await fetchData.json();
        console.log(dataRes);

        // alert(dataRes);
        toast(dataRes.message)
        if(dataRes.alert){

          navigate("/login");
        }
      } else {
        alert("password does not match");
      }
    } else {
      alert("all fields are mandatory");
    }
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handelUploadeImage = async(e) => {
    
    const data =await imageToBase64(e.target.files[0]);
    console.log(data);
    setData((prev)=>{
      return {
        ...prev,
        image:data
      }
    })
  };

  return (
    <div className="p-3 md:p-4">
      <div className="w-full max-w-sm bg-white m-auto flex  flex-col p-4">
        {/* <h1 className='text-center text-2xl font-o=bold'>signUp</h1> */}

        <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative">
          <img src={data.image ? data.image :signup  } alt="sign" className="w-full h-full" />

          <label htmlFor="profileImage">
            <div className="absolute bottom-0 h-1/3 bg-slate-500 bg-opacity-50 w-full text-center cursor-pointer">
              <p className="text-sm p-1 text-white">Upload</p>
            </div>
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              className="hidden"
              onChange={handelUploadeImage}
            />
          </label>
        </div>

        <form className="w-full py-3 flex flex-col" onSubmit={formHandle}>
          <label htmlFor="firstname" className="">
            First Name
          </label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
            value={data.firstname}
            onChange={handleSubmit}
          />
          <label htmlFor="lastname" className="">
            Last Name
          </label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
            value={data.lastname}
            onChange={handleSubmit}
          />

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

          <label htmlFor="confirmpassword">Confirm Password</label>
          <div className="flex px-2 py-1  bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmpassword"
              name="confirmpassword"
              className=" w-full bg-slate-200  rounded border-none outline-none"
              value={data.confirmpassword}
              onChange={handleSubmit}
            />
            <span
              className="flex text-xl cursor-pointer"
              onClick={handleConfirmPassword}
            >
              {showConfirmPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>
          <button className="w-full max-w-[150px] m-auto bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4">
            Sign Up
          </button>
        </form>

        <p className="text-left text-sm mt-2">
          Already have the acocunt ?{" "}
          <Link to="/login" className="text-red-600 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
