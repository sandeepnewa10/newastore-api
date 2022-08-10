import nodemailer from 'nodemailer'

// email configuration and send email



// email template

const emailProcesser = async (emailBody) =>{
    try{


        // 1 
                
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: process.env.EMAIL_SMTP,
            port: process.env.EMAIL_PORT,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER, // generated ethereal user
                pass: process.env.EMAIL_PASSWORD, // generated ethereal password
            },
        });

        // 2
        // send mail with defined transport object
            let info = await transporter.sendMail(emailBody);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    } catch(error){
        console.log(error)
    }
}


export const verificationEmail = emailData =>{
    const emailBody = {
    from: '"Newastore 👻" <myemail@newastore.com>', // sender address
    to: emailData.email, // list of receivers
    subject: "Email verification instruction", // Subject line
    text: `Hi ${emailData.fName}, please follow the link to verify your email: ${emailData.url}`, // plain text body
    html: `
    <p>Hi ${emailData.fName}</p>
    <br />
    <br />
    <p> please follow the link to verify your email</p>
    <br/>
    <br/>
    <p>: ${emailData.url}
    Regards, <br />
    Sandeep Prajapati
    </p>
    `, // html body
   }
   emailProcesser(emailBody)
    
}