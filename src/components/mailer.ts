import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

async function SendEmail({ email, emailType, userId, fullname }: any) {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    const randomNumbers = Array.from(
      { length: 4 },
      () => Math.floor(Math.random() * 9) + 1
    );
    const randomNumbersString = randomNumbers.join("");

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 86400000,
      });
    }

    if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 7200000,
      });
    }

    if (emailType === "SEND") {
      await User.findByIdAndUpdate(userId, {
        faToken: randomNumbersString,
        faTokenExpiry: Date.now() + 7200000,
      });
    }

    const adminEmail = process.env.EMAIL!;
    const adminEmailKey = process.env.EMAIL_KEY!;

    // // Email configuration
    // const senderEmail = "contact@betfundr.com";
    // const senderPassword = "Prosper12#";

    // // SMTP (sending) server details
    // const smtpServer = "smtp.titan.email";
    // const smtpPort = 465;

    // const transport = nodemailer.createTransport({
    //   host: smtpServer,
    //   port: smtpPort,
    //   auth: {
    //     user: senderEmail,
    //     pass: senderPassword,
    //   },
    // });

    var transport = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "jj4570391@gmail.com",
        pass: "rtkxckiinmijdkay",
      },
    });

    const mailOptions = {
      from: adminEmail,
      to: email,
      subject: "Reset your Password",
      html: `<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            text-align: center;
            width: 100%;
            height: 100%;
            background-color: #f0f0f0;
            font-family: Arial, sans-serif;
        }

        .container {
            text-align: center;
            width: 100%;
            height: auto;
            align-self: center;
            margin: 0px auto;
            background: rgba(128, 128, 128, 0.8)
        }

        .image {
            text-align: center;
            align-self: center;
        }

        .content {
            width: 100%;
            height: 420px;
            background-color: white;

            align-self: center;
            margin: 35px auto;
        }

        h3 {
            text-align: center;
            color: black;
            font-size: 24px;
        }

        p {
            font-size: 18px;
            font-family: Arial, sans-serif;
            color: #999999;
        }

        .reset-link {
            font-weight: bold;
            color: white;
            text-decoration: none;
            width: 100%;
             display: flex;
             justify-content: center;

        }

         .reset-link-inner {
  width: 300px;
   padding: 17px 37px;
   background-color: black;
        border-radius: 8px;
        align-self: center;
     
         }

         .reset-link a {
            text-decoration: none;
            color: white;
            font-weight: bold;
              margin: 0px auto
        }

        .url {
            color: black;
            font-size: 15px;
            line-height: 23px;

        }

        .url > p {
          color: blue;
          text-decoration: none;
        }

        .expiration {
            color: #afafaf;
            font-size: 15px;
            color: black;

        }

        .footer {
                 text-align: center;
            font-size: 12px;
            font-family: Arial, sans-serif;

            color: black;
            text-decoration: none;
        }

        .footer1 {
            text-align: center;
            font-size: 12px;
            font-family: Arial, sans-serif;
            color: black;
            text-decoration: none;
            margin-top: 30px; /* Space added here */
        }

        .footer-links {
                 text-align: center;
            font-size: 12px;
            font-family: Arial, sans-serif;
            color: black;
        }
    </style>
</head>

<body>
    <div class="container">

        <div class="content">
         <div class="image">
            <img src="https://firebasestorage.googleapis.com/v0/b/my-app-a50eb.appspot.com/o/Logo.webp?alt=media&token=b73992cc-662f-4fe9-a414-f16ae3d24d32" alt="Firebase Image" width="380" height="120">
        </div>
            <h3>Hello ${fullname}</h3>
            <p>Forgot your password?</p>
            <p>To reset your password, please click on the button below</p>
            <div class="reset-link">

                <a href="${process.env
                  .DOMAIN!}/resetpassword?token=${hashedToken}">
                              <div class="reset-link-inner">
                              RESET YOUR PASSWORD
                                          </div>
                              </a>

               </div>
            <p class="expiration">
                This link will expire in 2 hours.
            </p>
        </div>
    </div>
    <p class="footer1">© Betfundr | Address here</p>

    <p class="footer">
        If you have any questions, please contact us
        <a href="" style="color: black;">contact@betfundr.com</a>
    </p>

</body>
</html>

          `
                }

    console.log(mailOptions, "mailOptions");
    const mailresponse = await transport.sendMail(mailOptions);
    console.log(mailresponse, "mailresponse");
    return mailresponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export default SendEmail;
