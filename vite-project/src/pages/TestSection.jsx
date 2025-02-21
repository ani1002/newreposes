import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
const TestsSection = ({ tests, selectedTests, onTestSelection, errors,testdetail,totalAmount }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTests, setFilteredTests] = useState(tests);
  const [currentPage, setCurrentPage] = useState(1);
  const testsPerPage = 10; // Number of tests per page
  const maxPaginationButtons = 7; // Maximum number of pagination buttons to display

  // Pagination logic
  const indexOfLastTest = currentPage * testsPerPage;
  const indexOfFirstTest = indexOfLastTest - testsPerPage;
  const currentTests = filteredTests.slice(indexOfFirstTest, indexOfLastTest);

  const totalPages = Math.ceil(filteredTests.length / testsPerPage);

  // Handle Search Input Change
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter tests whose names start with the query
    const filtered = tests.filter((test) =>
      test.NM.toLowerCase().startsWith(query)
    );
    setFilteredTests(filtered);
    setCurrentPage(1); // Reset to the first page after a search
  };

  // Handle Checkbox Click
  const handleCheckboxChange = (testName) => {
    //console.log(testName);
    onTestSelection(testName);
  };

  // Handle Pagination
  const handlePageChange = (pageNumber, event) => {
    event.preventDefault(); // Prevent full page refresh
    setCurrentPage(pageNumber);
  };
   
  // Determine pagination button range
  const startPage = Math.max(1, currentPage - Math.floor(maxPaginationButtons / 2));
  const endPage = Math.min(totalPages, startPage + maxPaginationButtons - 1);
  const paginationButtons = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <div className="mt-6 p-4 border rounded-lg bg-gray-50">
      <h3 className="text-lg font-semibold mb-4">Available Tests</h3>
      {errors?.test && <p className="text-red-500 text-sm mb-2">{errors.test}</p>}

      {/* Suggestions Section */}
      <div className="space-y-2 mb-4">
        <Label htmlFor="test-search">Search Tests</Label>
        <Input
          id="test-search"
          placeholder="Search for a test..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full"
        />
      </div>

      {/* Available Tests with Pagination */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          {currentTests.map((test) => (
            <div key={test.NM} className="flex items-center space-x-2 py-2">
              <Checkbox
                id={`test-${test.NM}`}
                checked={testdetail.some(item=> item.NM === test.NM)}
                onCheckedChange={() => handleCheckboxChange(test.NM)}
              />
              <Label htmlFor={`test-${test.NM}`}>
                {test.NM} - ₹{test.RATE}
              </Label>
            </div>
          ))}

          {/* Pagination Controls */}
          <div className="flex justify-center mt-4 space-x-1">
            {paginationButtons.map((page) => (
              <button
                key={page}
                onClick={(e) => handlePageChange(page, e)}
                className={`px-4 py-2 rounded ${
                  currentPage === page
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>

        {/* Total Price */}
        <div className="col-span-1">
          <p className="text-lg font-semibold mb-4">Total Price:</p>
          <p className="text-2xl font-bold">₹{totalAmount}</p>
        </div>
      </div>

      {/* Selected Tests Table */}
      <div className="mt-6">
        <h4 className="text-lg font-semibold mb-4">Selected Tests</h4>
        {testdetail.length > 0 ? (
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Test Name</th>
                <th className="border px-4 py-2">Price</th>
                <th className="border px-4 py-2">Delete</th>
              </tr>
            </thead>
            <tbody>
              {testdetail.map((test) => {
                //const test = tests.find((t) => t.NM === testId);
               
                return (
                  <tr key={test?.CODE}>
                    <td className="border px-4 py-2">{test?.NM}</td>
                    <td className="border px-4 py-2">₹{test?.RATE}</td>
                    {/* <Button onClick={()=>handleCheckboxChange(test.NM)}> DElete</Button> */}
                   <td className='border px-2 py-2'><Trash2 className="mx-auto text-red-500 mb-4 cursor-pointer" onClick={()=>handleCheckboxChange(test.NM)} size={20} /></td> 
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p>No tests selected yet.</p>
        )}
      </div>
    </div>
  );
};

export default TestsSection;
