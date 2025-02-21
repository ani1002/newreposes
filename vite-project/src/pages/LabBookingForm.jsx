import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AlertMessage from './AlertMessage';
import FormSection from './FormSection';
import TestSelection from './TestSection.jsx';
import axios from 'axios';
import DoctorSection from './DoctorsSection';
import { useNavigate } from 'react-router-dom';
//import { env } from 'process';
//import PDFGenerator from './Pdf';
const LabBookingForm = () => {
  const [formData, setFormData] = useState({
    Name: '',
    email: '',
    phone: '',
    gender: '',
    age: '',
    address: '',
    Refferaldoctor: '',
    bookingdate: 0,
    bookingtime: '',
    message: '',
    test: [],
    amount: 0,
   alltests: []
  });

  const [tests, setTests] = useState([]);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState({ type: '', message: '' });
  const[doctors,setDoctors] = useState([]);
  useEffect(() => {
    fetchTests();
    fetchDoctors();
  }, []);

   const fetchTests = async () => {
     try {
       const response = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/users`);
      //`${process.env.REACT_APP_API_BASE_URL}/data`
       setTests(response.data);
     } catch (error) {
       setAlertMessage({
         type: 'error',
         message: 'Failed to load available tests. Please try again later.',
       });
     }
   };
  const fetchDoctors = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/doctors`);
      setDoctors(response.data);
    //  console.log(response.data);
    } catch (error) {
      setAlertMessage({
        type: 'error',
        message: 'Failed to load available tests. Please try again later.',
      });
    }
  };


  
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    //console.log(name,value);
    setFormData((prev) => ({ ...prev, [name]: value }));
    // console.log(formData);
  };

  
    const handleDoctorSelection =(doctor)=> {
    //  console.log(doctor);
      setFormData((prev) => ({ ...prev, ["Refferaldoctor"]: doctor }));
      //console.log(formData)
    }    

   
    const handleTestSelection = (testId) => {
      setFormData((prev) => {
       const selectedTest = tests.find((t) => t.NM === testId); // Ensure testData is defined
       const isSelected = prev.alltests.some((test) => test.NM === testId);
       const newAllTests = isSelected
         ? prev.alltests.filter((test) => test.NM !== testId) // Filter out the selected test
         : [
             ...prev.alltests,
             {
               CODE: selectedTest.CODE,
               NM: selectedTest.NM,
               RATE: selectedTest.RATE,
             },
           ];
   
        const newAmount = newAllTests.reduce((sum, test) => sum + test.RATE, 0);
   
        return { ...prev, alltests: newAllTests, amount: newAmount };
      });
    };
    const generatePDF = (formData) => {
      const docDefinition = {
          content: [
              { text: 'Medical Test Booking Confirmation', style: 'header' },
              { text: `Name: ${formData.Name}` },
              { text: `Email: ${formData.email}` },
              { text: `Phone: ${formData.phone}` },
              { text: `Gender: ${formData.gender}` },
              { text: `Age: ${formData.age}` },
              { text: `Address: ${formData.address}` },
              { text: `Referral Doctor: ${formData.Refferaldoctor}` },
              { text: `Test: ${formData.alltests.map(item=>item.NM).join(", ")}` },
              { text: `Date: ${formData.bookingdate}` },
              { text: `Time: ${formData.bookingtime}` },
              { text: `Amount: ₹ ${formData.amount}` },
          ],
          styles: {
              header: {
                  fontSize: 18,
                  bold: true,
                  margin: [0, 20, 0, 20] // top, right, bottom, left
              }
          }
      };
  
      pdfMake.createPdf(docDefinition).download(`medical-booking-${Date.now()}.pdf`);
  };
      

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      
      'Name',
      'email',
      'phone',
      'gender',
      'age',
      'address',
      'Refferaldoctor',
      'bookingdate',
      'bookingtime',
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) newErrors[field] = 'This field is required';
    });

     if (formData.alltests.length === 0) {
       newErrors.test = 'Please select at least one test';
     }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
     
      try {
        const response = await axios.post(
          'https://backend-spue.onrender.com/add-record',
          formData
        );

       // generatePDF(formData);
        setAlertMessage({ type: 'success', message: response.data.message });
        generatePDF(formData);
        // <PDFGenerator formData={formData}/>
        setFormData({
          Name: '',
          email: '',
          phone: '',
          gender: '',
          age: '',
          address: '',
          Refferaldoctor: '',
           bookingdate: Date.now(),
          bookingtime: '',
          amount: 0,
          alltests: []
        });
      } catch (err){
        setAlertMessage({
          type: 'error',
          message: 'Failed to submit booking. Please try again.',
        });
     //   console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const navigate = useNavigate();
  const handelnavigate = () =>{
    navigate("/");
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
    <Card className="w-full max-w-4xl mx-auto bg-white/80 backdrop-blur-sm border border-purple-100 shadow-lg">
      <CardHeader className="border-b border-purple-100">
        <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Test Booking
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Button 
          onClick={handelnavigate}
          className="mb-6 bg-purple-100 hover:bg-purple-200 text-purple-700 transition-all duration-200"
        >
          BACK
        </Button>
        
        <AlertMessage alertMessage={alertMessage} />
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormSection 
            formData={formData} 
            errors={errors} 
            onInputChange={handleInputChange}
            className="text-gray-700"
          />
          
          <DoctorSection 
            error={errors.doctors}
            onDoctSelection={handleDoctorSelection}
            doctors={doctors}
            doct=""
            className="bg-purple-50/50 rounded-lg p-4 border border-purple-100"
          />

          <TestSelection
            tests={tests}
            selectedTests={formData.test}
            totalAmount={formData.amount}
            onTestSelection={handleTestSelection}
            testdetail={formData.alltests}
            error={errors.test}
            className="bg-blue-50/50 rounded-lg p-4 border border-blue-100"
          />

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <span className="animate-pulse">Submitting...</span>
              </span>
            ) : (
              'Submit Booking'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  </div>
  );
};

export default LabBookingForm;
