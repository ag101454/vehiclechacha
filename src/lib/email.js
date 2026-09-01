import nodemailer from 'nodemailer';

export async function sendThankYouEmail(userEmail, userName, carName, rating, reviewTitle) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER || 'abdulghani4920@gmail.com',
        pass: (process.env.SMTP_PASS || '').replace(/\s+/g, ''),
      },
    });

    const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);

    const emailHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;900&display=swap');
          
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Inter', Arial, sans-serif;
            background-color: #000000;
            color: #FFFFFF;
            line-height: 1.6;
          }
          
          .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: #0A0A0A;
            position: relative;
            overflow: hidden;
          }
          
          /* Cinematic Vignette */
          .vignette {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%);
            pointer-events: none;
            z-index: 1;
          }
          
          .header {
            background: linear-gradient(180deg, #0A0A0A 0%, #141414 100%);
            padding: 60px 40px 40px;
            text-align: center;
            position: relative;
            border-bottom: 1px solid rgba(255,196,0,0.2);
          }
          
          .golden-line {
            width: 60px;
            height: 2px;
            background: linear-gradient(90deg, transparent, #FFC400, transparent);
            margin: 0 auto 30px;
          }
          
          .logo-text {
            font-size: 36px;
            font-weight: 900;
            letter-spacing: -1px;
            color: #FFFFFF;
          }
          
          .logo-text span {
            color: #FFC400;
          }
          
          .est-text {
            font-size: 10px;
            letter-spacing: 6px;
            text-transform: uppercase;
            color: rgba(255,255,255,0.3);
            margin-top: 8px;
          }
          
          .content {
            padding: 50px 40px;
            text-align: center;
            position: relative;
            z-index: 2;
          }
          
          .greeting {
            font-size: 28px;
            font-weight: 700;
            color: #FFFFFF;
            margin-bottom: 10px;
          }
          
          .subtitle {
            font-size: 15px;
            color: #A3A3A3;
            margin-bottom: 30px;
          }
          
          .car-card {
            background: #141414;
            border: 1px solid rgba(255,196,0,0.3);
            border-radius: 16px;
            padding: 30px;
            margin: 30px 0;
            position: relative;
            overflow: hidden;
          }
          
          .car-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, #FFC400, #FFD700, #FFC400);
          }
          
          .car-name {
            font-size: 22px;
            font-weight: 700;
            color: #FFFFFF;
            margin-bottom: 15px;
          }
          
          .rating-stars {
            font-size: 28px;
            letter-spacing: 6px;
            color: #FFC400;
            margin-bottom: 10px;
            text-shadow: 0 0 20px rgba(255,196,0,0.5);
          }
          
          .rating-text {
            font-size: 13px;
            color: #A3A3A3;
          }
          
          .review-title {
            font-size: 16px;
            font-weight: 600;
            color: #FFC400;
            font-style: italic;
            margin-top: 15px;
          }
          
          .message {
            font-size: 15px;
            color: #A3A3A3;
            line-height: 1.8;
            margin: 20px 0;
          }
          
          .button {
            display: inline-block;
            background: linear-gradient(135deg, #FFC400, #FFD700);
            color: #0A0A0A;
            padding: 16px 40px;
            text-decoration: none;
            border-radius: 50px;
            font-weight: 700;
            font-size: 15px;
            letter-spacing: 0.5px;
            margin: 20px 0;
            transition: all 0.3s;
            box-shadow: 0 0 30px rgba(255,196,0,0.3);
          }
          
          .button:hover {
            box-shadow: 0 0 50px rgba(255,196,0,0.5);
            transform: translateY(-2px);
          }
          
          .footer {
            padding: 40px;
            text-align: center;
            border-top: 1px solid rgba(255,196,0,0.1);
            position: relative;
            z-index: 2;
          }
          
          .footer-tagline {
            font-size: 13px;
            color: #A3A3A3;
            font-style: italic;
            margin-bottom: 10px;
          }
          
          .footer-copyright {
            font-size: 11px;
            color: rgba(255,255,255,0.3);
            letter-spacing: 1px;
          }
          
          .golden-divider {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            margin: 20px 0;
          }
          
          .golden-divider .line {
            width: 60px;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(255,196,0,0.5));
          }
          
          .golden-divider .diamond {
            width: 6px;
            height: 6px;
            background: #FFC400;
            transform: rotate(45deg);
          }
      </style>
      </head>
      <body>
        <div class="email-container">
          <div class="vignette"></div>
          
          <!-- Header -->
          <div class="header">
            <div class="golden-line"></div>
            <div class="logo-text">VEHICLE<span>CHACHA</span></div>
            <div class="est-text">Est. 2026</div>
          </div>
          
          <!-- Content -->
          <div class="content">
            <div class="greeting">Shukriya, ${userName}! 🎉</div>
            <p class="subtitle">Aapka review successfully submit ho gaya hai</p>
            
            <!-- Car Card -->
            <div class="car-card">
              <div class="car-name">${carName}</div>
              <div class="rating-stars">${stars}</div>
              <div class="rating-text">${rating}/5 Rating</div>
              ${reviewTitle ? `<div class="review-title">"${reviewTitle}"</div>` : ''}
            </div>
            
            <p class="message">
              Aapka review dusre car buyers ki madad karega sahi car choose karne mein.
              Chacha ki taraf se aapko dher saari duayein!
            </p>
            
            <div class="golden-divider">
              <div class="line"></div>
              <div class="diamond"></div>
              <div class="line" style="background: linear-gradient(270deg, transparent, rgba(255,196,0,0.5));"></div>
            </div>
            
            <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://vehiclechacha.vercel.app'}/new-cars" class="button">
              More Cars Dekhein
            </a>
          </div>
          
          <!-- Footer -->
          <div class="footer">
            <div class="footer-tagline">"Budget Batao. Gaari Chacha Dhoondhega."</div>
            <div class="footer-copyright">© ${new Date().getFullYear()} VEHICLECHACHA. ALL RIGHTS RESERVED.</div>
          </div>
        </div>
      </body>
      </html>
    `;

    const info = await transporter.sendMail({
      from: `"VehicleChacha" <${process.env.SMTP_USER || 'abdulghani4920@gmail.com'}>`,
      to: userEmail,
      subject: `✦ Shukriya ${userName}! Aapka Review Submit Ho Gaya`,
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
        user: process.env.SMTP_USER || 'abdulghani4920@gmail.com',
        pass: (process.env.SMTP_PASS || '').replace(/\s+/g, ''),
      },
    });

    const emailHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background: #0A0A0A;
            color: #FFFFFF;
            padding: 30px;
          }
          .container {
            max-width: 500px;
            margin: 0 auto;
            background: #141414;
            border: 1px solid rgba(255,196,0,0.3);
            border-radius: 16px;
            padding: 30px;
          }
          .header {
            border-bottom: 1px solid rgba(255,196,0,0.2);
            padding-bottom: 20px;
            margin-bottom: 20px;
          }
          h1 {
            color: #FFC400;
            font-size: 24px;
            margin: 0;
          }
          .badge {
            display: inline-block;
            background: rgba(255,196,0,0.1);
            border: 1px solid rgba(255,196,0,0.3);
            color: #FFC400;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            margin-top: 10px;
          }
          .info {
            margin: 15px 0;
          }
          .label {
            color: #A3A3A3;
            font-size: 12px;
            margin-bottom: 2px;
          }
          .value {
            color: #FFFFFF;
            font-size: 14px;
            font-weight: 600;
          }
          .rating {
            color: #FFC400;
            font-size: 20px;
            margin: 10px 0;
          }
          .review-text {
            background: #0A0A0A;
            border-radius: 8px;
            padding: 15px;
            margin: 15px 0;
            color: #A3A3A3;
            font-size: 13px;
            line-height: 1.6;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🚗 New Review Received</h1>
            <div class="badge">Review Notification</div>
          </div>
          
          <div class="info">
            <div class="label">CAR</div>
            <div class="value">${carName}</div>
          </div>
          
          <div class="info">
            <div class="label">USER</div>
            <div class="value">${userName} (${userEmail})</div>
          </div>
          
          <div class="rating">${'★'.repeat(rating)}${'☆'.repeat(5 - rating)} ${rating}/5</div>
          
          <div class="review-text">${review}</div>
        </div>
      </body>
      </html>
    `;

    await transporter.sendMail({
      from: `"VehicleChacha" <${process.env.SMTP_USER || 'abdulghani4920@gmail.com'}>`,
      to: process.env.ADMIN_EMAIL || 'abdulghani4920@gmail.com',
      subject: `⭐ New Review: ${carName} - ${rating} Stars`,
      html: emailHTML,
    });

    return { success: true };
  } catch (error) {
    console.error('Admin email error:', error);
    return { success: false };
  }
}