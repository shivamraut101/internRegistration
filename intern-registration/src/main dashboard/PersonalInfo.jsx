import React, { useState } from "react";
import { getStates, getWellKnownCountries } from "../util";
import { useAuth0 } from "@auth0/auth0-react";
export const PersonalInfo = () => {

  const [info, setInfo] = useState({
    name: "",
    passportSizePhoto: null,
    dob: "",
    fatherName: "",
    motherName: "",
    whatsappNumber: "",
    address: "",
    city: "",
    pincode: "",
    state: "",
    country: ""
  })

  const handleOnChange = (e) => {
    const { name, value, files } = e.target;
  
    // For file input, check if it's passportSizePhoto and handle it accordingly
    if (name === "passportSizePhoto") {
      const file = files[0]; // Get the first selected file
      setInfo((prevInfo) => ({
        ...prevInfo,
        [name]: file // Set the file directly
      }));
    } else {
      setInfo((prevInfo) => ({
        ...prevInfo,
        [name]: value
      }));
    }
    console.log("Handle on changed clicked",info)
  };
  
  

  const states = getStates();
  const countries = getWellKnownCountries();
  const {user} = useAuth0()
  return (
    <div className=" m-16 p-4 md:p-6 lg:p-8 xl:p-10">
      <form>
        {/* Name */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={info.name !== "" ? info.name : (user ? user.name : "")}
            onChange={handleOnChange}
          />
        </div>

        {/* passport photo */}
        <div className="mb-3">
          <label htmlFor="passportSizePhoto" className="form-label">
            Passport Photo
          </label>
          <input type="file" className="form-control" id="passportSizePhoto" name="passportSizePhoto" onChange={handleOnChange} />
        </div>

        {/* DOB */}
        <div className="mb-3">
          <label htmlFor="dob" className="form-label">
            Date Of Birth
          </label>
          <input type="date" className="form-control" id="dob" value={info.dob} name="dob" onChange={handleOnChange}/>
        </div>

        {/* Father Name */}
        <div className="mb-3">
          <label htmlFor="fatherName" className="form-label">
            Father Name
          </label>
          <input type="text" className="form-control" id="fatherName" name="fatherName" value={info.fatherName} onChange={handleOnChange}/>
        </div>

        {/* Mother Name */}
        <div className="mb-3">
          <label htmlFor="motherName" className="form-label">
            Mother Name
          </label>
          <input type="text" className="form-control" id="motherName" name="motherName" value={info.motherName} onChange={handleOnChange}/>
        </div>

        {/* Whatapp Number */}
        <div className="mb-3">
          <label htmlFor="whatappNumber" className="form-label">
            Whatapp Number
          </label>
          <input type="number" className="form-control" id="whatappNumber" name="whatsappNumber" value={info.whatsappNumber} onChange={(e)=>setInfo(e.target.value)} />
        </div>

        {/* Address */}
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input type="text" className="form-control" id="address" value={info.address} name="address" onChange={handleOnChange}/>
        </div>

        {/* City */}
        <div className="mb-3">
          <label htmlFor="city" className="form-label">
            City
          </label>
          <input type="text" className="form-control" id="city" name="city" value={info.city} onChange={handleOnChange} />
        </div>

        {/* Pincode */}
        <div className="mb-3">
          <label htmlFor="pincode" className="form-label">
            Pincode
          </label>
          <input
            type="number"
            className="form-control"
            id="pincode"
            name="pincode"
            value={info.pincode}
            onChange={handleOnChange}
          />
        </div>

        {/* State */}
        <div className="mb-3">
          <label htmlFor="stateSelect">Select a state:</label>
          <select id="stateSelect" className="form-control" name="state" onChange={handleOnChange}>
            <option value="">Select a state</option>
            {states.map((state) => (
              <option key={state.value} value={state.value}>
                {state.label}
              </option>
            ))}
          </select>
        </div>

        {/* Country */}
        <div className="mb-3">
          <label htmlFor="stateSelect">Select a Country:</label>
          <select id="stateSelect" className="form-control" name="country" onChange={handleOnChange}>
            <option value="India">India</option>
            {countries.map((country) => (
              <option key={country.value} value={country.value}>
                {country.label}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary text-dark">
          Submit
        </button>
      </form>
    </div>
  );
};
