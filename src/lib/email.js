import nodemailer from 'nodemailer';

export async function sendThankYouEmail(userEmail, userName, carName, rating, reviewTitle) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: false,
        auth: {
          user: process.env.SMTP_USER || 'vehiclechacha@gmail.com',
          pass: (process.env.SMTP_PASS || '').replace(/\s+/g, ''),
        },
      });

    // Email template
    const emailHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; background-color: #0A0A0A; color: #FFFFFF; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; padding: 30px; background-color: #141414; border-radius: 10px; border: 1px solid #292929; }
          .header { text-align: center; margin-bottom: 30px; }
          .logo { font-size: 28px; font-weight: bold; color: #FFC400; }
          .title { font-size: 24px; font-weight: bold; margin: 20px 0; color: #FFFFFF; }
          .content { font-size: 16px; line-height: 1.6; color: #A3A3A3; }
          .rating { text-align: center; margin: 20px 0; }
          .stars { font-size: 30px; color: #FFC400; }
          .car-name { color: #FFC400; font-weight: bold; }
          .button { display: inline-block; background-color: #FFC400; color: #0A0A0A; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #A3A3A3; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">Vehicle<span style="color: #FFFFFF;">Chacha</span></div>
          </div>
          
          <div class="title">Shukriya, ${userName}! 🎉</div>
          
          <div class="content">
            <p>Aapka review submit ho gaya hai!</p>
            <p>Car: <span class="car-name">${carName}</span></p>
          </div>
          
          <div class="rating">
            <div class="stars">${'⭐'.repeat(rating)}</div>
            <p style="color: #A3A3A3;">${rating}/5 Rating</p>
          </div>
          
          ${reviewTitle ? `<p style="color: #FFC400; font-weight: bold;">"${reviewTitle}"</p>` : ''}
          
          <div class="content">
            <p>Aapka review dusre car buyers ki madad karega sahi car choose karne mein!</p>
            <p>Chacha ki taraf se aapko dher saari duayein!</p>
          </div>
          
          <div style="text-align: center;">
            <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://vehiclechacha.vercel.app'}/new-cars" class="button">
              More Cars Dekhein
            </a>
          </div>
          
          <div class="footer">
            <p>VehicleChacha - Budget Batao. Gaari Chacha Dhoondhega.</p>
            <p>© ${new Date().getFullYear()} VehicleChacha. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send email
    const info = await transporter.sendMail({
      from: `"VehicleChacha" <${process.env.SMTP_USER}>`,
      to: userEmail,
      subject: `Shukriya ${userName}! Aapka Review Submit Ho Gaya ✅`,
      html: emailHTML,
    });

    console.log('Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };

  } catch (error) {
    console.error('Email error:', error);
    return { success: false, error: error.message };
  }
}

export async function sendAdminNotificationEmail(userName, userEmail, carName, rating, review) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const emailHTML = `
      <div style="font-family: Arial; background: #0A0A0A; color: #FFF; padding: 20px; border-radius: 10px;">
        <h2 style="color: #FFC400;">🚗 New Review Received!</h2>
        <p><strong>Car:</strong> ${carName}</p>
        <p><strong>User:</strong> ${userName}</p>
        <p><strong>Email:</strong> ${userEmail}</p>
        <p><strong>Rating:</strong> ${'⭐'.repeat(rating)}</p>
        <p><strong>Review:</strong> ${review}</p>
      </div>
    `;

    await transporter.sendMail({
      from: `"VehicleChacha" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
      subject: `New Review: ${carName} - ${rating} Stars`,
      html: emailHTML,
    });

    return { success: true };
  } catch (error) {
    console.error('Admin email error:', error);
    return { success: false };
  }
}