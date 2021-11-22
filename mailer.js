const nodemailer=require('nodemailer');
const cron = require('node-cron');



const transporter =nodemailer.createTransport({
    service:'gmail',
    auth: {
      user : 'sanjeevpadma2323@gmail.com',
      pass : 'S@njeev123'
    }
  });
  
  const mailOptions={
    from:'sanjeevpadma2323@gmail.com',
    to: 'sanjeevreddy414@gmail.com',
    subject:'hi all this is a system genrateg email',
    text: 'payment to be paid on or before 5 th of the month'
  };
  
  


  cron.schedule(' * * * * *',()=>{
    transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
            console.log(error);
        }
        else{
            console.log("email sent"+info.response);
        }
      })
  })