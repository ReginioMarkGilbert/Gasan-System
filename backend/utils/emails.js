import bcrypt from "bcryptjs";
import crypto from "crypto";
import nodemailer from "nodemailer";
import UserVerification from "../models/user.verification.model.js";

export const sendVerificationEmail = async (user, res) => {
    const userId = user._id;
    const uniqueString = crypto.randomBytes(15).toString("hex");
    const hashedString = await bcrypt.hash(uniqueString, 10);

    const verification = new UserVerification({
        userId,
        uniqueString: hashedString,
        createdAt: new Date(),
        expireAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
    });

    try {
        // Save the verification record in the database
        const savedVerification = await verification.save();

        // Construct the verification URL
        const url = `http://localhost:5000/api/auth/verify/${uniqueString}/${userId}`;

        // Create email options
        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: user.email,
            subject: "Account Verification",
            html: `
        <!DOCTYPE html>
          <html>
          <head>
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap"
            rel="stylesheet"
          />
              <style>
                  body {
                      font-family: "Poppins", sans-serif;
                      background-color: #f9f9f9;
                      margin: 0;
                      padding: 0;
                      color: #333;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      min-height: 100vh;
                  }

                  .container {
                      max-width: 600px;
                      margin: 20px;
                      padding: 20px;
                      background-color: #ffffff;
                      border-radius: 10px;
                      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                      text-align: center;
                      width: 90%;
                  }

                  h1 {
                      color: #007bff;
                      font-size: 24px;
                      margin-bottom: 20px;
                  }

                  h2 {
                      color: #555;
                      font-size: 20px;
                      margin-bottom: 20px;
                  }

                  p {
                      font-size: 16px;
                      line-height: 1.6;
                      margin-bottom: 20px;
                  }

                  .button-link {
                      display: inline-block;
                      text-decoration: none;
                      background-color: #e0e0e0;
                      color: black;
                      padding: 12px 25px;
                      font-size: 16px;
                      font-weight: bold;
                      border-radius: 5px;
                      transition: background-color 0.3s ease;
                  }

                  .button-link:hover {
                      background-color: #c7c7c7;
                  }

                  @media (max-width: 600px) {
                      h1 {
                          font-size: 20px;
                      }

                      h2 {
                          font-size: 18px;
                      }

                      p {
                          font-size: 14px;
                      }

                      .button-link {
                          font-size: 14px;
                          padding: 10px 20px;
                      }
                  }
              </style>
          </head>
          <body>
              <div class="container">
                  <h1>Email Verification</h1>
                  <h2>Hello ${user.name}</h2>
                  <p>Thank you for registering on our website. Please click on the link below to verify your account:</p>
                  <a href="${url}" class="button-link">Verify Your Account</a>
                  <p>If you did not register on our website, please ignore this email.</p>
              </div>
          </body>
        </html>
      `,
        };

        // Create a Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: "gmail", // Use your email provider
            auth: {
                user: process.env.AUTH_EMAIL,
                pass: process.env.AUTH_PASSWORD,
            },
        });

        // Send the email
        await transporter.sendMail(mailOptions);

        // Respond with success only after email is sent
        return res.status(201).json({ message: "Verification email sent successfully." });
    } catch (error) {
        console.error("Error sending verification email:", error);

        // Clean up if saving or email fails
        try {
            await UserVerification.deleteOne({ userId, uniqueString: hashedString });
        } catch (cleanupError) {
            console.error("Error during cleanup:", cleanupError);
        }

        // Ensure only one response is sent
        return res.status(500).json({ message: "Failed to send verification email." });
    }
};

export const sendOTPVerificationEmail = async (user, otp, res, token) => {
    try {
        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: user.email,
            subject: "Password Reset OTP",
            html: `
      <!DOCTYPE html>
        <html>
        <head>
        <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap"
        rel="stylesheet"
        />
          <style>
            body {
              font-family: "Poppins", sans-serif;
              background-color: #f9f9f9;
              margin: 0;
              padding: 0;
              color: #333;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
            }

            .container {
              max-width: 600px;
              margin: 20px;
              padding: 20px;
              background-color: #ffffff;
              border-radius: 10px;
              box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
              text-align: center;
              width: 90%;
            }

            h1 {
              color: #007bff;
              font-size: 24px;
              margin-bottom: 20px;
            }

            h2 {
              color: #555;
              font-size: 20px;
              margin-bottom: 20px;
            }

            p {
              font-size: 16px;
              line-height: 1.6;
              margin-bottom: 20px;
            }

            .button-link {
              display: inline-block;
              text-decoration: none;
              background-color: #e0e0e0;
              color: black;
              padding: 12px 25px;
              font-size: 16px;
              font-weight: bold;
              border-radius: 5px;
              transition: background-color 0.3s ease;
            }

            .button-link:hover {
              background-color: #c7c7c7;
            }

            @media (max-width: 600px) {
              h1 {
                font-size: 20px;
              }

              h2 {
                font-size: 18px;
              }

              p {
                font-size: 14px;
              }

              .button-link {
                font-size: 14px;
                padding: 10px 20px;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Password Reset OTP</h1>
            <h2>Hello ${user.name}</h2>
            <p>Your OTP is: <strong>${otp}</strong></p>
            <p>This OTP will expire in 5 minutes.</p>
            <p>If you did not request this OTP, please ignore this email.</p>
          </div>
        </body>
      </html>
      `,
        };

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.AUTH_EMAIL,
                pass: process.env.AUTH_PASSWORD,
            },
        });

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.status(500).json({ message: "An error occured while sending email" });
            } else {
                res.status(200).json({ message: "OTP sent successfully", token });
            }
        });
    } catch (error) {
        console.error("Error sending OTP verification email:", error);
        return res.status(500).json({ message: "Failed to send OTP verification email." });
    }
};

export const sendVerificationConfirmationEmail = async (user) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.AUTH_EMAIL,
                pass: process.env.AUTH_PASSWORD,
            },
        });

        const mailOptions = {
            from: {
                name: "GASAN BMS",
                address: process.env.AUTH_EMAIL,
            },
            to: user.email,
            subject: "Account Verified - GASAN BMS",
            html: `
                <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
                    <div style="background-color: #166534; padding: 20px; text-align: center;">
                        <h1 style="color: white; margin: 0;">GASAN BMS</h1>
                    </div>
                    <div style="padding: 20px; border: 1px solid #e5e7eb;">
                        <h2>Account Verified Successfully!</h2>
                        <p>Dear ${user.name},</p>
                        <p>Your account has been successfully verified by the barangay secretary/chairman. You now have full access to all features of the Barangay Management System.</p>
                        <div style="margin: 30px 0; text-align: center;">
                            <a href="${process.env.CLIENT_URL}/sign-in" 
                               style="background-color: #166534; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">
                                Login to Your Account
                            </a>
                        </div>
                        <p>If you have any questions or concerns, please don't hesitate to contact your barangay office.</p>
                        <p>Best regards,<br>GASAN BMS Team</p>
                    </div>
                    <div style="background-color: #f3f4f6; padding: 20px; text-align: center; font-size: 12px; color: #6b7280;">
                        <p>This is an automated message, please do not reply.</p>
                    </div>
                </div>
            `,
        };

        await transporter.verify();
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        return false;
    }
};

export const sendDeactivationEmail = async (user, reason) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.AUTH_EMAIL,
                pass: process.env.AUTH_PASSWORD,
            },
        });

        const mailOptions = {
            from: {
                name: "GASAN BMS",
                address: process.env.AUTH_EMAIL,
            },
            to: user.email,
            subject: "Account Deactivated - GASAN BMS",
            html: `
                <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
                    <div style="background-color: #991b1b; padding: 20px; text-align: center;">
                        <h1 style="color: white; margin: 0;">GASAN BMS</h1>
                    </div>
                    <div style="padding: 20px; border: 1px solid #e5e7eb;">
                        <h2>Account Deactivated</h2>
                        <p>Dear ${user.name},</p>
                        <p>Your account has been deactivated by the barangay administrator.</p>
                        <p><strong>Reason for deactivation:</strong></p>
                        <p style="padding: 10px; background-color: #fee2e2; border-radius: 4px;">${reason}</p>
                        <p>If you believe this is a mistake or would like to reactivate your account, please contact your barangay office.</p>
                        <p>Best regards,<br>GASAN BMS Team</p>
                    </div>
                    <div style="background-color: #f3f4f6; padding: 20px; text-align: center; font-size: 12px; color: #6b7280;">
                        <p>This is an automated message, please do not reply.</p>
                    </div>
                </div>
            `,
        };

        await transporter.verify();
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        return false;
    }
};

export const sendActivationEmail = async (user) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.AUTH_EMAIL,
                pass: process.env.AUTH_PASSWORD,
            },
        });

        const mailOptions = {
            from: {
                name: "GASAN BMS",
                address: process.env.AUTH_EMAIL,
            },
            to: user.email,
            subject: "Account Activated - GASAN BMS",
            html: `
                <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
                    <div style="background-color: #166534; padding: 20px; text-align: center;">
                        <h1 style="color: white; margin: 0;">GASAN BMS</h1>
                    </div>
                    <div style="padding: 20px; border: 1px solid #e5e7eb;">
                        <h2>Account Activated Successfully!</h2>
                        <p>Dear ${user.name},</p>
                        <p>Your account has been reactivated by the barangay administrator. You can now log in to your account.</p>
                        <div style="margin: 30px 0; text-align: center;">
                            <a href="${process.env.CLIENT_URL}/sign-in" 
                               style="background-color: #166534; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">
                                Login to Your Account
                            </a>
                        </div>
                        <p>Best regards,<br>GASAN BMS Team</p>
                    </div>
                    <div style="background-color: #f3f4f6; padding: 20px; text-align: center; font-size: 12px; color: #6b7280;">
                        <p>This is an automated message, please do not reply.</p>
                    </div>
                </div>
            `,
        };

        await transporter.verify();
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        return false;
    }
};
