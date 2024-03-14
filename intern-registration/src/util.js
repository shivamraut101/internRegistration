const getStates= ()=>{
    const indianStates = [
"Andhra Pradesh",
"Arunachal Pradesh",
"Assam",
"Bihar",
"Chhattisgarh",
"Goa",
"Gujarat",
"Haryana",
"Himachal Pradesh",
"Jharkhand",
"Karnataka",
"Kerala",
"Madhya Pradesh",
"Maharashtra",
"Manipur",
"Meghalaya",
"Mizoram",
"Nagaland",
"Odisha",
"Punjab",
"Rajasthan",
"Sikkim",
"Tamil Nadu",
"Telangana",
"Tripura",
"Uttar Pradesh",
"Uttarakhand",
"West Bengal",
"Andaman and Nicobar Islands",
"Chandigarh",
"Dadra and Nagar Haveli and Daman and Diu",
"Lakshadweep",
"Delhi",
"Puducherry"
];

// Using map to transform the array elements
return indianStates.map(i => ({label: i, value: i}))
}

const getWellKnownCountries= ()=> {
    const wellKnownCountries = [
      "United States",
      "United Kingdom",
      "Canada",
      "Australia",
      "Germany",
      "France",
      "Italy",
      "Spain",
      "Japan",
      "China",
      "India",
      "Brazil",
      "South Africa",
      "Mexico",
      "Russia",
      "Saudi Arabia",
      "United Arab Emirates",
      "South Korea",
      "Singapore",
      "New Zealand",
      "Netherlands",
      "Switzerland",
      "Sweden",
      "Norway",
      "Denmark",
      "Finland",
      "Ireland",
      "Austria",
      "Belgium",
      "Portugal",
      "Greece",
      "Turkey",
      "Argentina",
      "Chile",
      "Colombia",
      "Peru",
      "Egypt",
      "Nigeria",
      "Kenya",
      "Morocco",
      "South Sudan",
      "Pakistan",
      "Bangladesh",
      "Thailand",
      "Vietnam",
      "Indonesia",
      "Malaysia",
      "Philippines",
      "Hong Kong",
      "Taiwan",
      "Israel"
      // ... Add more countries as needed
    ];
    return wellKnownCountries.map(i => ({label: i, value: i}))
   
  }

 const appliedFor= ()=>{
    const options = ["Web Development", "Cloud Computing", "Android Development", "IT Security","Recruitment","Analytics","Offline Sales","Marketing","Digital Marketing","Business Managemen","Public Relations", "Team Leader", "Process Trainer", "Business Analytics", "Misscellaneous","Basic Content Writer", "Legal Content Writer","Voice Artist", "Video Artist","Graphic Design", "UI/UX Design"];
    return options.map( i => ({label:i, value: i}))
}

const intershipDepartment= () =>{
    const options =["IT Department", "Human Resource","Sales and Marketing", "Operations", "Content Management", "Voice/Video Artist", "Designing"]
    return options.map( i => ({label:i, value: i}))
}

  export { getStates, getWellKnownCountries, appliedFor, intershipDepartment };

