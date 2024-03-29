import React, { useEffect, useState } from "react";
import { getStates, getWellKnownCountries } from "../util";
import { useAuth0 } from "@auth0/auth0-react";
import { useUserInfo } from "../context api/UserInfoContext";

export const PersonalInfo = () => {
  const { user } = useAuth0();
  const {userInfo,imgUrl} = useUserInfo()
  const [editMode, setEditMode] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [passportSizePhotoData, setPassportSizePhotoData] = useState(false);

  const [info, setInfo] = useState({
    name: user.nickname,
    passportSizePhoto: null,
    dob: "",
    fatherName: "",
    motherName: "",
    whatsappNumber: "",
    address: "",
    city: "",
    pincode: "",
    state: "",
    country: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert the date to dd/mm/yy format
    // const formattedDate = info.dob ? `${new Date(info.dob).getDate()}/${new Date(info.dob).getMonth() + 1}/${new Date(info.dob).getFullYear() % 100}` : '';
    const formattedDate = info.dob
      ? `${new Date(info.dob).getFullYear()}-${
          new Date(info.dob).getMonth() + 1
        }-${new Date(info.dob).getDate()}`
      : "";

    const formData = new FormData();
    formData.append("name", info.name);
    formData.append("email", user.email);
    formData.append("dob", formattedDate);
    formData.append("fatherName", info.fatherName);
    formData.append("motherName", info.motherName);
    formData.append("whatsappNumber", info.whatsappNumber);
    formData.append("address", info.address);
    formData.append("city", info.city);
    formData.append("pincode", info.pincode);
    formData.append("state", info.state);
    formData.append("country", info.country);
    formData.append("passportSizePhoto", info.passportSizePhoto);

    const endpoint = editMode
      ? `http://localhost:3000/api/personal-info/${user.email}`
      : "http://localhost:3000/api/personal-info";

    const method = editMode ? "PUT" : "POST";

    const response = await fetch(endpoint, {
      method: method,
      body: formData,
    });

    const json = await response.json();
    console.log(json);
    if (json.message) {
      alert(json.message);
    } else {
      if (!json.success) {
        alert("Enter Valid Credintials");
      } else {
        alert(editMode ? "Updated Successfully" : "Registered Successfully");
      }
    }
  };

  // To fetch all data from personal info
  const fetchUserInfo = async () => {
    // Fetch user information from the server
    if (initialLoad) {
      try {
        // If data exists for the user, set it to the state
        if (userInfo.message) {
          console.log(userInfo);
        } else {
          setInfo(userInfo.personalInfo);
          setEditMode(true); // Enable edit mode to show update option
        }

      } catch (error) {
        console.error("Error fetching user information:", error);
      }
      setInitialLoad(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, [initialLoad]);

  const handleOnChange = (e) => {
    const { name, value, files } = e.target;

    // For file input, check if it's passportSizePhoto and handle it accordingly
    if (name === "passportSizePhoto") {
      const file = files[0]; // Get the first selected file
      setInfo((prevInfo) => ({
        ...prevInfo,
        [name]: file, // Set the file directly
      }));
    } else {
      setInfo((prevInfo) => ({
        ...prevInfo,
        [name]: value,
      }));
    }
    console.log("Handle on changed clicked", info);
  };

  const states = getStates();
  const countries = getWellKnownCountries();

  return (
    <div className=" m-16 p-4 md:p-6 lg:p-8 xl:p-10">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
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
            value={info.name !== "" ? info.name : user ? user.name : ""}
            onChange={handleOnChange}
          />
        </div>

        {/* passport photo */}
        {!editMode && (
          <div className="mb-3">
            <label htmlFor="passportSizePhoto" className="form-label">
              Passport Photo
            </label>
            <input
              type="file"
              className="form-control"
              id="passportSizePhoto"
              name="passportSizePhoto"
              onChange={handleOnChange}
              accept="image/*" // Allow all image types
            />
          </div>
        )}
        {/* Display the image if it exists */}
        {imgUrl && (
          <div className="mb-3">
            <label>Passport Size Photo:</label>
            <img
              src={imgUrl}
              alt="passport-size"
              style={{ maxWidth: "100%", maxHeight: "138px" }} // Set max width and height for the image
            />
          </div>
        )}

        {/* DOB */}
        <div className="mb-3">
          <label htmlFor="dob" className="form-label">
            Date Of Birth
          </label>
          <input
            type="date"
            className="form-control"
            id="dob"
            value={info.dob ? info.dob.toString().substring(0, 10) : ""}
            name="dob"
            onChange={handleOnChange}
          />
        </div>

        {/* Father Name */}
        <div className="mb-3">
          <label htmlFor="fatherName" className="form-label">
            Father Name
          </label>
          <input
            type="text"
            className="form-control"
            id="fatherName"
            name="fatherName"
            value={info.fatherName}
            onChange={handleOnChange}
          />
        </div>

        {/* Mother Name */}
        <div className="mb-3">
          <label htmlFor="motherName" className="form-label">
            Mother Name
          </label>
          <input
            type="text"
            className="form-control"
            id="motherName"
            name="motherName"
            value={info.motherName}
            onChange={handleOnChange}
          />
        </div>

        {/* Whatapp Number */}
        <div className="mb-3">
          <label htmlFor="whatappNumber" className="form-label">
            Whatapp Number
          </label>
          <input
            type="number"
            className="form-control"
            id="whatappNumber"
            name="whatsappNumber"
            value={info.whatsappNumber}
            onChange={handleOnChange}
          />
        </div>

        {/* Address */}
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            value={info.address}
            name="address"
            onChange={handleOnChange}
          />
        </div>

        {/* City */}
        <div className="mb-3">
          <label htmlFor="city" className="form-label">
            City
          </label>
          <input
            type="text"
            className="form-control"
            id="city"
            name="city"
            value={info.city}
            onChange={handleOnChange}
          />
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
          <select
            id="stateSelect"
            className="form-control"
            name="state"
            onChange={handleOnChange}
          >
            <option value="">{editMode ? info.state : "Select State"}</option>
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
          <select
            id="stateSelect"
            className="form-control"
            name="country"
            onChange={handleOnChange}
          >
            <option value="">
              {editMode ? info.country : "Select Country"}
            </option>
            {countries.map((country) => (
              <option key={country.value} value={country.value}>
                {country.label}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary text-dark">
          {editMode ? <p>Update</p> : <p>Submit</p>}
        </button>
      </form>
    </div>
  );
};
