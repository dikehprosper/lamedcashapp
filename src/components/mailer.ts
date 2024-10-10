import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import AWS from "aws-sdk";

async function SendEmail({email, emailType, userId, fullname}: any) {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    const encodedHash = encodeURIComponent(hashedToken);

    const randomNumbers = Array.from(
      {length: 4},
      () => Math.floor(Math.random() * 9) + 1
    );
    const randomNumbersString = randomNumbers.join("");

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: encodedHash,
        verifyTokenExpiry: Date.now() + 86400000,
      });
    }

    console.log(encodedHash, "hashedToken 1");

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
    // Set up Nodemailer transport
    const transporter = nodemailer.createTransport({
      service: "gmail", // or another email service
      auth: {
        user: "betfundrinc@gmail.com", // your email
        pass: "ckjyirprqaeoyeza", // your email password or app password
      },
    });

    let mailOptions = {
      from: adminEmail,
      to: email,
      subject: "",
      html: "",
    };

    if (emailType === "RESET") {
      mailOptions.subject = `Bonjour ${fullname},  Réinitialisez votre mot de passe`;
      mailOptions.html = `
   <html>
<head>
    <style>
        body {
            text-align: center;
            width: 100%;
            height: 100%;
            background-color: white;
            font-family: Arial, sans-serif;
        }

        .container {
            text-align: center;
            width: 100%;
            height: auto;
            align-self: center;
            margin: 0px auto;

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
   background-color: rgba(73, 166, 106, 1);
        border-radius: 8px;
        align-self: center;
     color: white;
     fontSize: 13px
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
        
            <h3>Bonjour ${fullname}</h3>
            <p>Mot de passe oublié?</p>
            <p>Pour réinitialiser votre mot de passe, veuillez cliquer sur le bouton ci-dessous</p>
            <div class="reset-link">

                <a href="https://betfundr.com/resetpassword?token=${encodedHash}">
                              <div class="reset-link-inner">
                             RÉINITIALISEZ VOTRE MOT DE PASSE
                                          </div>
                              </a>

               </div>
            <p class="expiration">
              Ce lien expirera dans 2 heures.
            </p>
        </div>
    </div>
    <p class="footer1">© Betfundr | Address here</p>

    <p class="footer">
      Si vous avez des questions, veuillez nous contacter au
        <a href="" style="color: black;">contact@betfundr.com</a>
    </p>

</body>
</html>`;
    } else if (emailType === "WELCOME") {
      mailOptions.subject = `Bonjour, ${fullname}, Bienvenue sur Betfundr`;
      mailOptions.html = `
      <html>
      <head>
          <style>
              body {
                  text-align: center;
                  width: 100%;
                  height: 100%;
                  background-color: white;
                  font-family: Arial, sans-serif;
              }

              .container {
                  text-align: center;
                  width: 100%;
                  height: auto;
                  align-self: center;
                  margin: 0px auto;

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
        width: 100%;
         height: 47px;

              border-radius: 8px;
              align-self: center;
           color: black;
           fontSize: 23px;
           letter-spacing: 10px
               }

               .reset-link a {
                  text-decoration: none;
                  color: white;
                  font-weight: bold;
                    margin: 0px auto
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
                  <p>Commencez à effectuer des transactions sur l'application ou le site Web pour gagner des bonus et parrainez également vos amis pour gagner plus.</p>
                   <p class="footer1">© Betfundr | Benin</p>

          <p class="footer">
            Si vous avez des questions, veuillez nous contacter au
              <a href="" style="color: black;">betfundrinc@gmail.com</a>
          </p>
              </div>
             
          </div>
         

      </body>
      </html>`;
    }

    const mailresponse = await transporter.sendMail(mailOptions);
    console.log(mailresponse, "Email has been Sent");
    return mailresponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
export default SendEmail;
