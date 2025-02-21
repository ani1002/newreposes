import React,{useState,useEffect} from 'react'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import FormSection from './FormSection';
import TestSelection from './TestSection.jsx';
import axios from 'axios';
import DoctorSection from './DoctorsSection';
import AlertMessage from './AlertMessage';
import { Button } from '@/components/ui/button';
//import { error } from 'console';
import { useNavigate } from 'react-router-dom';
const UpdateFormComponent = (data) => {
    const val = data;
//  console.log(data.data.PAT_NM);   MOBNO,ADDR,MAIL_ID 
const [formData, setFormData] = useState({
     Name: data.data.PAT_NM,
     email:  data.data.MAIL_ID,
     phone: data.data.MOBNO,
     gender: data.data.SEX,
     age: data.data.AGEC,
     address: data.data.ADDR,
     Refferaldoctor: data.data.DOCT_CD,
     bookingdate: data.data.DCDATE.slice(0,10),
     bookingtime: data.data.DCREM,
     amount: data.data.AMOUNT,
    alltests: data.data.testdata,
    BILL_NO : data.data.BILL_NO
  });
 
const[doctors,setDoctors] = useState([]);
const fetchTests = async () => {     // FETCHING the tests   ${import.meta.env.VITE_APP_API_BASE_URL}/last-ind  
     try {
       const response = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/users`);
       setTests(response.data);
     } catch (error) {
       setAlertMessage({
         type: 'error',
         message: 'Failed to load available tests. Please try again later.',
       });
     }
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

  const fetchDoctors = async () => {  //fetching all the doctors Detail for getting doctor data   ${import.meta.env.VITE_APP_API_BASE_URL} 
    try {
      const response = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/doctors`);
      setDoctors(response.data);
     
    } catch (error) {
      setAlertMessage({
        type: 'error',
        message: 'Failed to load available tests. Please try again later.',
      });
    }
  };
 
     useEffect(() => {
      fetchTests();
      fetchDoctors();
    }, []); 
    const [tests, setTests] = useState(formData.alltests);//test data
    const [errors, setErrors] = useState({});//Errors data
    const [isLoading, setIsLoading] = useState(false);//loading for formsubmission 
    const [alertMessage, setAlertMessage] = useState({ type: '', message: '' });//alert data

const handleInputChange = (e) => {
  const { name, value } = e.target;
  //console.log(name,value);
  setFormData((prev) => ({ ...prev, [name]: value }));
   //console.log(formData);
};
const handleDoctorSelection =(doctor)=> {
   
    setFormData((prev) => ({ ...prev, ["Refferaldoctor"]: doctor }));
   // console.log(formData);
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
      const response = await axios.put(
        `${import.meta.env.VITE_APP_API_BASE_URL}/update-bill`,
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
     // console.log(err);
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
          
          <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">Test Booking</CardTitle>
             <Button onClick={handelnavigate} className="shrink-0">BACK</Button>
            </CardHeader>
            <CardContent>
              
              <AlertMessage alertMessage={alertMessage} />
              <form onSubmit={handleSubmit} className="space-y-6">
                <FormSection formData={formData} errors={errors} onInputChange={handleInputChange}  />
                
           <DoctorSection error={errors.doctors} onDoctSelection={handleDoctorSelection} doctors ={doctors} doct= {formData.Refferaldoctor} /> 
      
                   <TestSelection
                  tests={tests}
                  selectedTests={formData.test}
                  totalAmount={formData.amount}
                  testdetail={formData.alltests}   
                  onTestSelection={handleTestSelection}
                  error={errors.test} 
                />   
          
                <Button type="submit" className="w-full" disabled={isLoading} >
                  {isLoading ? 'Submitting...' : 'Submit Booking'}
                </Button>
              </form>
            </CardContent>
          </Card>
        );
}

export default UpdateFormComponent