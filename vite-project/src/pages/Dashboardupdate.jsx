import React,{useState,useEffect} from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import axios from 'axios';
import UpdateFormComponent from './DetailComponent';
import { Button } from '@/components/ui/button';
export default function PatientTable3() {
const [value,setValue] = useState([]);
const [filterdata,setFilterdata] = useState([]);
const [getval,setGetval] = useState([]);
useEffect(() => {
  fetchDetail();
}, []); // Dependency array ensures it runs only once after the component mounts.

//delete route //${import.meta.env.VITE_APP_API_BASE_URL}/last-ind
const handleDelete = async (testId) => {
  try {
    await axios.delete(`${import.meta.env.VITE_APP_API_BASE_URL}/delete_route/${testId}`); // Your DELETE API
    fetchDetail(); // Refresh data by calling GET API again
  } catch (error) {
    //console.error("Error deleting test:", error);
  }
};

const getdetail = async(billno) =>{     //// **********Fetching the data and pass to the next component for UPDATING  *********  
 //console.log(billno);
 try {
  const response = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/get-billdata/${billno}`);
  setGetval(response.data);
 //console.log(response.data);
} catch (error) {

  console.log(error);
  alert("error happen while fetching");
}
}
//fetching the all data 
const  fetchDetail = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/last-ind`);
    setValue(response.data);
  // console.log(response.data);

  } catch (error) {

    //console.log(error);
    alert("error happen while fetching");
  }
};

  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    if (!searchTerm) {
      // Show all data if searchTerm is empty
      setFilterdata(value);
    } else {
      // Filter data based on searchTerm
      const lowercasedTerm = searchTerm.toLowerCase();
      const filtered = value.filter(patient => {
        const PAT_NM = patient?.PAT_NM?.toLowerCase() || '';
        const MOBNO = patient?.MOBNO || '';
        const BILL_NO = patient?.BILL_NO || '';
        return (
          PAT_NM.includes(lowercasedTerm) ||
          MOBNO.includes(searchTerm)||
          BILL_NO.includes(searchTerm)
        );
      });
      setFilterdata(filtered);
    }
  }, [searchTerm, value]);


  const navigate = useNavigate();

  const handelnavigate = () => {
    navigate("/");
  };
  return (
    <div>
      {getval && Object.keys(getval).length > 0  ?(
        // New Component or Container
        <UpdateFormComponent data={getval}/>
      ): (
        // Main Container
        <Card className="w-full">
      <CardHeader className="bg-indigo-50">
        <CardTitle className="text-xl text-indigo-900">Patient Records</CardTitle>
                  <div className="flex items-center gap-4 mt-4 w-full">
            <Button onClick={handelnavigate} className="shrink-0">BACK</Button>
            <Input 
              placeholder="Search patients by name, phone, or bill number"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
          </div>
        
        <div className="flex flex-wrap gap-4 mt-4">
        
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
        <Table className="min-w-full border-collapse border border-gray-200 shadow-md rounded-lg">
          <TableHeader className="bg-indigo-200">
    <TableRow>
      <TableHead className="text-indigo-900 font-semibold border-b border-gray-300 py-2 px-4">
        Bill Date
      </TableHead>
      
      <TableHead className="text-indigo-900 font-semibold border-b border-gray-300 py-2 px-4">
        Update Bill
      </TableHead>
      <TableHead className="text-indigo-900 font-semibold border-b border-gray-300 py-2 px-4">
        Delete Bill
      </TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {filterdata.map((row, i) => (
      <TableRow
        key={i}
        className={`hover:bg-indigo-50 ${
          i % 2 === 0 ? "bg-white" : "bg-gray-100"
        }`}
      >
        <TableCell className="py-1 px-1 border-b border-gray-300  text-lg font-medium text-black-600">
          {row.PAT_NM} {row.MOBNO} {row.ADDR} {row.BILL_NO} {row.ENT_DT.substring(0,10)}
          {row.SERVICES}
        </TableCell>
       
        <TableCell className="py-1 px-1 border-b border-gray-300">
          <button className="text-blue-600 hover:text-blue-800 font-semibold underline" onClick={()=>getdetail(row.BILL_NO)}>
            Update
          </button>
        </TableCell>
        <TableCell className="py-2 px-1 border-b border-gray-300">
          <button
           onClick = {()=>handleDelete(row.BILL_NO)}
           className="text-blue-600 hover:text-blue-800 font-semibold underline">
            Delete
          </button>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>

        </div>
      </CardContent>
    </Card>
      )}
    </div>
  );
};


// function UpdateFormComponent({ data }) {
//   return (
//     <Card className="w-full">
//       <CardHeader className="bg-green-50">
//         <CardTitle className="text-xl text-green-900">Update Form</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <p>Editing record for Bill No: {data.BILL_NO}</p>
//         <p>Patient Name: {data.PAT_NM}</p>
//         <p>Services: {data.SERVICES}</p>
//         {/* Add your form or additional fields here */}
//       </CardContent>
//     </Card>
//   );
// }