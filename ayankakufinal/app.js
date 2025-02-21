import express from 'express';
import cors from 'cors';
import 'dotenv/config'
const app= express();
import sql  from 'mssql';
import bodyParser from 'body-parser';
const PORT = process.env.PORT || 4002;
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cors());

let pool;//configaration  section 
const config = {//DB_SERVER
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER, // e.g., 'localhost' or IP
    database: process.env.DB_NAME,
    options: {
        encrypt: false, // Use if using Azure
        trustServerCertificate: true, // Disable if secure connection is required
    },
};

async function connectToDatabase() {  // connection section 
    try {
        pool = await sql.connect(config);
        console.log("Connected to SQL Server!");
        // Query example
//         const result = await pool.request().query(`
// SELECT NM,RATE FROM SERVICE_MSTR WHERE UNIT_CODE=2 and GRPCD = 
// (SELECT CODE FROM SERVICE_GRP_MSTR WHERE NM = 'PATHOLOGY') and rate >=1 order by NM desc `);
//         console.log(result);
    } catch (err) {
        console.error("Database connection failed!", err);
    }
}

connectToDatabase();



app.post('/add-record', async (req, res) => {  /// adding record
 
   const {
    Name, email,phone,gender,age,address,Refferaldoctor,bookingtime,amount,message,test,bookingdate,alltests} = req.body;
    const singleString = alltests.map(item=>item.NM).join(", "); 
    //console.log( Name, email,phone,gender,age,address,Refferaldoctor,bookingtime,amount,message,test,bookingdate,alltests);
    //const singleString = test.join(", "); // converting test array into a single string
  //console.log(singleString);
   let currid;
   let Refferaldoct = Number(Refferaldoctor);
   try{
  const result = await pool.request().query(`SELECT MAX(BILL_CD)FROM BILL_REF`);
  currid =  Number(result.recordset[0]['']);
  }
 catch(err){
 console.log(err);
 res.send("Last bookingID Not FOUND");
 }
 currid++;
 
const Bookingtimedate = `${bookingdate} 00:00:00.000`; //changing date into sql datetime format 
  try{
         const pool = await sql.connect(config);//Master Data  Insertion 
         const query = (`INSERT INTO BILL_REF(ACD,RECNO,RECTYPE,FYR,CRUSER,MODUSER,ENT_DT,MOD_DT,PC_NM,
  PAT_NO,HMS_NO,PAT_TR_CD,BILL_CD,BILL_NO,AMOUNT,NET,DT,USER_ID,PAT_NM,AGEC,SEX,TM,
     BOOKING_CD,BOOKING_NO,DOCT_CD,CENTRE_CD,MOBNO,ADDR,MAIL_ID,SERVICES, DCDATE ,DCREM )  
        VALUES(1 ,0 ,'NEW' ,'24-25' ,'ADMIN' ,NULL , GETDATE() ,NULL ,'ISERVER' ,
    '1/ID/23-24' ,'1/ID/23-24' ,1 ,${currid} ,'${currid}-BK-24-25' ,${amount} ,${amount},  GETDATE() ,'ADMIN' ,
  '${Name}' ,'${age}' ,'${gender}' , GETDATE() ,${currid} ,'${currid}-BK-24-25' ,
   ${Refferaldoct} ,NULL ,'${phone}' ,'${address}' ,'${email}' , '${singleString}','${Bookingtimedate}','${bookingtime}')`);
   await pool.request().query(query);
  
  }
  catch(err){
    res.send("Please sent the error ");
    console.log(err);
  }


  try{
    let currind = 1;     //SLNO
        const pool = await sql.connect(config);
        for (const test of alltests){
        // console.log(currind,currid,test.testId,test.testPrice);
        const query = (`INSERT INTO BILL_REF_DETL(SLNO,BILL_NO,SERVICE_CD,RATE) VALUES(${currind},'${currid}-BK-24-25',${test.CODE},${test.RATE})`);
        await pool.request().query(query);
        currind++;//BILL_NO
       }
       res.status(201).send({ message: 'Record added successfully'});   
      }
      catch(err){
        res.send("Please sent the error ");
        console.log(err);
     }    
});



app.get('/last-Ind',async (req,res)=>{
   try{
    const result = await pool.request().query(`SELECT DT,PAT_NM,MOBNO,ADDR,BILL_NO,ENT_DT,SERVICES FROM BILL_REF ORDER BY BILL_CD DESC`);
    //console.log(result.recordset);
    res.send(result.recordset);
   }
   catch(err){
   console.log(err);
   res.send("err while fetching");
   }
})

app.get('/modifieddata',async (req,res)=>{   //yupdating data

  try{
   const result = await pool.request().query(`SELECT  DT,PAT_NM,MOBNO,ADDR,BILL_NO,ENT_DT,SERVICES  FROM BILL_REF ORDER BY BILL_CD DESC`);
   //console.log(result.recordset);
   res.send(result.recordset);
  }
  catch(err){
  console.log(err);
  res.send("err while fetching");
  }
})


app.get('/doctors', async (req, res) => {  //doctor detail
  try {
    const result = await pool.request().query('SELECT NM,CODE FROM SERVICE_MSTR WHERE UNIT_CODE=6');
    res.send(result.recordset);
  } catch (err) {
    console.error('Error fetching users:', err.message);
    res.status(500).send({ error: 'Failed to fetch users', details: err.message });
  }
});



app.get('/users', async (req, res) => {  //tests detail
  try {
    const result = await pool.request().query(`SELECT NM,RATE,CODE FROM SERVICE_MSTR WHERE UNIT_CODE=2 AND rate >=1 ORDER BY NM `);
    res.send(result.recordset);
  } catch (err) {
    console.error('Error fetching users:', err.message);
    res.status(500).send({ error: 'Failed to fetch users', details: err.message });
  }
});


app.delete("/delete_route/:BILL_NO", async (req, res) => {
  const { BILL_NO } = req.params;
  console.log(BILL_NO);
  try {
    const pool = await sql.connect(config);
    const query = `
      DELETE FROM BILL_REF_DETL
      WHERE BILL_NO = @BILL_NO;
    `;

    const result = await pool
      .request()
      .input("BILL_NO", sql.NVarChar(20), BILL_NO)
      .query(query);

   
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error deleting product", error: err });
  }

  try {
    const pool = await sql.connect(config);
    const query = `
      DELETE FROM BILL_REF
      WHERE BILL_NO = @BILL_NO;
    `;

    const result = await pool
      .request()
      .input("BILL_NO", sql.NVarChar(20), BILL_NO)
      .query(query);

    res.status(200).send({
      message: "Product deleted successfully",
      rowsAffected: result.rowsAffected,
    });
  }
   catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error deleting product", error: err });
  }
});


app.get('/get-billdata/:BILL_NO',async(req,res)=>{  //getting single data 
  const { BILL_NO } = req.params;
  console.log(BILL_NO);
  try{
    const pool = await sql.connect(config);//MOBNO,ADDR,MAIL_ID
     const result = await pool.request()
     .input('BILL_NO', sql.NVarChar(20), BILL_NO) 
     .query(`SELECT BILL_NO, DT, PAT_NM, MOBNO,DOCT_CD,MAIL_ID, ADDR, ENT_DT, SERVICES, DCDATE,DCREM,AGEC,SEX,AMOUNT FROM BILL_REF WHERE BILL_NO = @BILL_NO`);
     const result1 = await pool.request()
     .input('BILL_NO', sql.NVarChar(20), BILL_NO) 
     .query(`SELECT SERVICE_CD AS CODE,RATE,
(SELECT NM FROM SERVICE_MSTR WHERE CODE= SERVICE_CD ) AS NM
 FROM BILL_REF_DETL WHERE BILL_NO =  @BILL_NO`);   //with getting
      
     const data1 = result.recordset[0];
     const testdata = result1.recordset;
     const data3 = {
      ...data1,
      testdata
     }
     res.send(data3);
    }
catch(error){
  console.log(error);
}

})


app.put('/update-bill',async(req,res)=>{
  const {
    BILL_NO, Name, email,phone,gender,age,address,Refferaldoctor,bookingtime,amount,bookingdate,alltests} = req.body;
    console.log(alltests);
    const singleString = alltests.map(item=>item.NM).join(", "); // converting test array into a single string
    //const singleString = SERVICE;
    
    console.log(singleString)
   let Refferaldoct = Number(Refferaldoctor);
   const Bookingtimedate = `${bookingdate} 00:00:00.000`; 
   console.log(BILL_NO); 
   try{
      const result = await pool
      .request()
      .input("BILL_NO", sql.NVarChar, BILL_NO) // Ensure BILL_NO is an integer
      .query(`
        DELETE FROM BILL_REF_DETL
        WHERE BILL_NO = @BILL_NO;
      `);
    
    //console.log(result);
    
     }
    catch(err){
    console.log(err);
    }

   
   try{
   await sql.connect(config);
   const query = `UPDATE BILL_REF SET PAT_NM = @Name,AGEC = @age,AMOUNT = @amount,MAIL_ID = @email  ,MOBNO = @phone,SEX=@gender,DCREM =@bookingtime,DCDATE = @Bookingtimedate,
  SERVICES = @singleString,ADDR = @address, DOCT_CD = @Refferaldoct WHERE BILL_NO = @BILL_NO;`
  const request = new sql.Request();
  request.input('Name', sql.NVarChar,Name);//d
  request.input('address', sql.NVarChar, address);
  request.input('phone', sql.NVarChar, phone);
  request.input('age', sql.NVarChar, age);
  request.input('gender', sql.NVarChar, gender);
  request.input('amount', sql.Float, amount);
  request.input('email',sql.NVarChar,email);
  request.input('singleString',sql.VarChar,singleString);
  request.input('bookingtime',sql.NVarChar,bookingtime);
  request.input('Bookingtimedate',sql.DateTime,Bookingtimedate);  
  request.input('Refferaldoct',sql.BigInt,Refferaldoct);
  request.input('BILL_NO',sql.NVarChar,BILL_NO)
  const result = await request.query(query);

        // Check if the update was successful
   console.log(result);       
}

   catch(error){
    console.error('Error updating record:', error);
    res.status(500).json({ message: 'An error occurred while updating the record' });
   }
     

     try{
      let currind = 1;     //SLNO
        const pool = await sql.connect(config);
          for (const test of alltests){
          // console.log(currind,currid,test.testId,test.testPrice);
          const query = (`INSERT INTO BILL_REF_DETL(SLNO,BILL_NO,SERVICE_CD,RATE) VALUES(${currind},'${BILL_NO}',${test.CODE},${test.RATE})`);
          await pool.request().query(query);
          currind++;//BILL_NO 
         }
         res.status(201).send({ message: 'Record added successfully'});   
        }
        catch(err){
          res.send("Please sent the error ");
          console.log(err);
       }
      
        
  })



app.get('/get-bill/:BILL_NO',async(req,res)=>{   

  const { BILL_NO } = req.params;
  console.log(BILL_NO);
  try{
    const pool = await sql.connect(config);
  
     const result = await pool.request().query(`SELECT  DT,PAT_NM,MOBNO,ADDR,BILL_NO,ENT_DT,SERVICES  FROM BILL_REF ORDER BY BILL_CD DESC`);
       
  }
catch(error){
   
  console.log(error);
}

})


app.listen(PORT,(req,res)=>{
  console.log("hello Guys");
})
