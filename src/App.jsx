import React, { useEffect, useRef, useState } from "react";

function App() {
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredDevelopers, setFilteredDevelopers] = useState([]);
  const genderRef = useRef();

  useEffect(() => {
    fetch("https://json-api.uz/api/project/11-dars/developers")
      .then((res) => res.json())
      .then((data) => {
        setDevelopers(data.data);
        setFilteredDevelopers(data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function handleFilter(e) {
    e.preventDefault();
    const selectedGender = genderRef.current.value;

    if (selectedGender) {
      const copied = developers.filter(
        (value) => value.gender === selectedGender
      );
      setFilteredDevelopers(copied);
    } else {
      setFilteredDevelopers(developers);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <form className="mb-6">
        <div className="flex space-x-4">
          <select
            ref={genderRef}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <button
            onClick={handleFilter}
            className="bg-blue-500 text-white rounded-lg px-4 py-2 transition duration-200 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Filter
          </button>
        </div>
      </form>

      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="w-16 h-16 border-8 border-t-8 border-gray-200 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredDevelopers.map((developer) => (
            <div
              key={developer.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-lg font-semibold mb-2">
                <strong>Name: </strong>
                {developer.fullName}
              </h3>
              <h3 className="text-md mb-2">
                <strong>Age: </strong>
                {developer.age}
              </h3>
              <h3 className="text-md mb-2">
                <strong>Gender: </strong>
                {developer.gender}
              </h3>
              <h3 className="text-md">
                <strong>Major: </strong>
                {developer.major}
              </h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
