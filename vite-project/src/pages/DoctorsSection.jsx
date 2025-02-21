import React, { useState,useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const DoctorSection = ({ onDoctSelection  , errors,doctors, doct }) => {  //onDoctSelection
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

//  console.log(doctors);
  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.NM.toLowerCase().includes(searchQuery.toLowerCase()) );
      //console.log(typeof doct);
      const updatingdoctorname = doctors.find((doctor) => Number(doctor.CODE) === Number(doct));

      //console.log("doct:", doct);
      //console.log("doctors:", doctors);
      //console.log("Filtered doctor:", updatingdoctorname);
      
      // If a doctor is found, show their name; otherwise, show default text
      const placeholderText = updatingdoctorname ? updatingdoctorname.NM : "Please write doctor name or ID";
      
      

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setShowSuggestions(query.length > 0); // Show suggestions only when there's input
  };

  // Handle Doctor Selection
  const handleDoctorClick = (doctor) => {
    onDoctSelection(doctor.CODE); // Update the selected doctor
    setSearchQuery(doctor.NM); // Set the selected doctor's name in the input field
    setShowSuggestions(false); // Hide suggestions
  };

  return (
    <div className="mt-6 p-4 border rounded-lg bg-gray-50">
      <h3 className="text-lg font-semibold mb-4"> Referred By Doctor</h3>
      {errors?.Refferaldoctor && (
        <p className="text-red-500 text-sm mb-2">{errors.Refferaldoctor}</p>
      )}

      {/* Search Box */}
      <div className="space-y-2 mb-4 relative">
        <Label htmlFor="doctor-search"></Label>
        <div className="relative">
        <Input
  id="doctor-search"
  placeholder={placeholderText} // Shows only one doctor name
  value={searchQuery}
  onChange={handleSearchChange}
  onFocus={() => setShowSuggestions(true)}
  className="w-full"
/>

          {/* Suggestion List */}
          {showSuggestions && filteredDoctors.length > 0 && (
            <div className="absolute z-10 bg-white border border-gray-300 rounded shadow-md mt-1 max-h-40 overflow-auto w-full">
              {filteredDoctors.map((doctor) => (
                <div
                  key={doctor.CODE}
                  onClick={() => handleDoctorClick(doctor)}
                  className="cursor-pointer py-2 px-4 hover:bg-gray-100"
                >
                  {doctor.NM} ({doctor.CODE})
                </div>
              ))}
            </div>
          )}
        </div>
        {showSuggestions && filteredDoctors.length === 0 && (
          <div className="absolute z-10 bg-white border border-gray-300 rounded shadow-md mt-1 w-full text-center py-2 text-gray-500">
            No doctors found
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorSection;
