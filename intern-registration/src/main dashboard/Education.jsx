import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
export const Education = () => {
  const { user } = useAuth0();
  const navigate = useNavigate()

  const [info, setInfo] = useState({
    class_10th_marks: "",
    board_10th_name: "",
    // class_10_marksheet_file :"",
    class_12th_marks: "",
    board_12th_name: "",
    // class_12_marksheet_file: "",
    university_college_name: "",
    degree: "",
    currentYear_or_sem: "",
    expected_graduation_date: "",
    portfolio_link: "",
    // resume_file:""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "http://localhost:3000/api/educational-background",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          class_10th_marks: info.class_10th_marks,
          class_12th_marks: info.class_12th_marks,
          board_10th_name: info.board_10th_name,
          board_12th_name: info.board_12th_name,
          university_college_name: info.university_college_name,
          degree: info.degree,
          currentYear_or_sem: info.currentYear_or_sem,
          expected_graduation_date: info.expected_graduation_date,
          portfolio_link: info.portfolio_link,
        }),
      }
    );

    const json = await response.json();
    console.log(json);
    if(!json.internEmail){
      alert("Fill your Personal info first")
      navigate("/personal-info")
    }else{
      if (!json.success) {
        alert("Enter Valid Details");
      } else {
        alert("data uploaded succesfully");
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
        {/* class_10th_marks */}
        <div className="mb-3">
          <label htmlFor="board_10th_marks" className="form-label">
            Class 10 Marks
          </label>
          <input
            type="text"
            className="form-control"
            id="class_10th_marks"
            name="class_10th_marks"
            value={info.class_10th_marks}
            onChange={handleOnChange}
          />
        </div>

        {/* board_10th_name */}
        <div className="mb-3">
          <label htmlFor="board_10th_name" className="form-label">
            Class 10 Board
          </label>
          <input
            type="text"
            className="form-control"
            id="board_10th_name"
            name="board_10th_name"
            onChange={handleOnChange}
          />
        </div>

        {/* class_12th_marks */}
        <div className="mb-3">
          <label htmlFor="class_12th_marks" className="form-label">
            Class 12 Marks
          </label>
          <input
            type="text"
            className="form-control"
            id="class_12th_marks"
            name="class_12th_marks"
            onChange={handleOnChange}
          />
        </div>

        {/* board_12th_name */}
        <div className="mb-3">
          <label htmlFor="board_12th_name" className="form-label">
            Class 12 Board
          </label>
          <input
            type="text"
            className="form-control"
            id="board_12th_name"
            name="board_12th_name"
            onChange={handleOnChange}
          />
        </div>

        {/* university_college_name */}
        <div className="mb-3">
          <label htmlFor="university_college_name" className="form-label">
            University / College
          </label>
          <input
            type="text"
            className="form-control"
            id="university_college_name"
            name="university_college_name"
            onChange={handleOnChange}
          />
        </div>

        {/* degree */}
        <div className="mb-3">
          <label htmlFor="degree" className="form-label">
            Degree
          </label>
          <input
            type="text"
            className="form-control"
            id="degree"
            name="degree"
            onChange={handleOnChange}
          />
        </div>

        {/* currentYear_or_sem */}
        <div className="mb-3">
          <label htmlFor="currentYear_or_sem" className="form-label">
            Current Year / Semester
          </label>
          <input
            type="text"
            className="form-control"
            id="currentYear_or_sem"
            name="currentYear_or_sem"
            onChange={handleOnChange}
          />
        </div>

        {/* expected_graduation_date */}
        <div className="mb-3">
          <label htmlFor="expected_graduation_date" className="form-label">
            Expected Graduation Date
          </label>
          <input
            type="date"
            className="form-control"
            id="expected_graduation_date"
            name="expected_graduation_date"
            onChange={handleOnChange}
          />
        </div>

        {/* portfolio_link */}
        <div className="mb-3">
          <label htmlFor="portfolio_link" className="form-label">
            Protfolio Link
          </label>
          <input
            type="text"
            className="form-control"
            id="portfolio_link"
            name="portfolio_link"
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
