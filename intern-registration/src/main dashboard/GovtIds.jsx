import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
export const GovtIds = () => {
  const { user } = useAuth0();
  const navigate = useNavigate();

  const [info, setInfo] = useState({
    aadharNumber: "",
    panNumber: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/govt-id", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        aadharNumber: info.aadharNumber,
        panNumber: info.panNumber,
      }),
    });

    const json = await response.json();
    console.log(json);
    if (!json.internEmail) {
      alert("Fill your Personal info first");
      navigate("/personal-info");
    } else {
      if(json.message){
        alert(json.message)
      }else{
        if (json.success) {
          alert("Enter Valid Details",json.success);
        } else {
          alert("data uploaded succesfully", json.success);
        }
      }
      
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
    console.log("Handle on changed clicked", info);
  };

  return (
    <div className=" m-16 p-4 md:p-6 lg:p-8 xl:p-10">
      <form onSubmit={handleSubmit}>
        {/* aadharNumber */}
        <div className="mb-3">
          <label htmlFor="aadharNumber" className="form-label">
            Aadhar Number
          </label>
          <input
            type="text"
            className="form-control"
            id="aadharNumber"
            name="aadharNumber"
            value={info.aadharNumber}
            onChange={handleOnChange}
          />
        </div>

        {/* panNumber */}
        <div className="mb-3">
          <label htmlFor="panNumber" className="form-label">
            Pan Number
          </label>
          <input
            type="text"
            className="form-control"
            id="panNumber"
            name="panNumber"
            onChange={handleOnChange}
          />
        </div>

        <button type="submit" className="btn btn-primary text-dark">
          Submit
        </button>
      </form>
    </div>
  );
};
