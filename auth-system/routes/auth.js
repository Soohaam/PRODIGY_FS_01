const auth = require('../middleware/auth');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const express = require('express');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const env = require('dotenv');
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.REACT_APP_EMAIL_USER,
      pass: process.env.REACT_APP_EMAIL_PASS,
    },
  });




router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({ name, email, password });
    await user.save();

    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    res.status(500).send('Server error');
  }
});


  router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
  
    try {
     
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ msg: 'No account with that email address exists' });
  
     
      const resetToken = crypto.randomBytes(32).toString('hex');
      user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
      user.resetPasswordExpires = Date.now() + 3600000;
      await user.save();
  
     
      const resetURL = `${process.env.RESET_PASSWORD_URL}?token=${resetToken}`;
      const mailOptions = {
        to: email,
        from: process.env.EMAIL_USER,
        subject: 'Password Reset Request',
        text: `You requested a password reset. Click the following link to reset your password: ${resetURL}`,
      };
  
      await transporter.sendMail(mailOptions);
      res.status(200).json({ msg: 'Password reset link sent' });
  
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });
  


router.post('/reset-password', async (req, res) => {
    const { token, password} = req.body;
    
    try {
      const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
      const user = await User.findOne({ resetPasswordToken: hashedToken, resetPasswordExpires: { $gt: Date.now() } });
  
      if (!user) return res.status(400).json({ msg: 'Invalid or expired reset token' });
  
     
  
      user.password = password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();
  
      res.status(200).json({ msg: 'Password has been reset' });
    } catch (err) {
      res.status(500).send('Server error');
    }
  });
  
  router.post('/admin/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        console.log(`Attempting login with email: ${email}`);
        
       
        const admin = await User.findOne({ email });
        
     
        if (!admin) {
            console.log('Admin not found');
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        

        if (admin.role !== 'admin') {
            console.log('User is not an admin');
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        
  
        const isMatch = await bcrypt.compare(password, admin.password);
        
        if (!isMatch) {
            console.log('Password does not match');
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        
   
        const payload = { user: { id: admin.id, role: admin.role } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) {
                console.error('Error signing token', err);
                return res.status(500).json({ msg: 'Server error' });
            }
            res.json({ token });
        });
    } catch (err) {
        console.error('Server error', err);
        res.status(500).json({ msg: 'Server error' });
    }
});
  
  
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

  
    const twoFactorCode = crypto.randomBytes(3).toString('hex').toUpperCase(); 
    user.twoFactorCode = twoFactorCode;
    user.twoFactorCodeExpires = Date.now() + 10 * 60 * 1000; 
    await user.save();

    const mailOptions = {
      to: email,
      from: "your-email@gmail.com",
      subject: 'Your 2FA Code',
      text: `Your 2FA code is ${twoFactorCode}. It will expire in 10 minutes.`,
    };
    
    await transporter.sendMail(mailOptions);
    res.status(200).json({ msg: '2FA code sent to email' });

  } catch (err) {
    console.error('Server error', err);
    res.status(500).json({ msg: 'Server error' });
  }
});
  

router.post('/verify-2fa', async (req, res) => {
  const { email, twoFactorCode } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    if (user.isTwoFactorEnabled) {
      if (user.twoFactorCode !== twoFactorCode || user.twoFactorCodeExpires < Date.now()) {
        return res.status(400).json({ msg: 'Invalid or expired 2FA code' });
      }

   
      user.twoFactorCode = undefined;
      user.twoFactorCodeExpires = undefined;
      await user.save();
    }


    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) {
        console.error('Error signing token', err);
        return res.status(500).json({ msg: 'Server error' });
      }
      res.json({ token });
    });

  } catch (err) {
    console.error('Server error', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

router.post('/2fa/enable', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'User not found' });

 
    const secret = speakeasy.generateSecret({ name: 'YourAppName' });
    const code = speakeasy.totp({
      secret: secret.base32,
      encoding: 'base32'
    });

    user.twoFactorSecret = secret.base32;
    user.twoFactorCode = code;
    user.twoFactorCodeExpires = Date.now() + 300000; 
    user.isTwoFactorEnabled = true;
    await user.save();


    const mailOptions = {
      to: email,
      from: process.env.EMAIL_USER,
      subject: 'Your 2FA Code',
      text: `Your 2 Factor Uthentication has been approved. your code: ${code}. Use this 2fa code if you forget your password. CAUTION: DO NOT SHARE THIS CODE WITH ANYONE`,
    };
    await transporter.sendMail(mailOptions);

    res.status(200).json({ msg: '2FA enabled and code sent' });
  } catch (err) {
    console.error('Error enabling 2FA:', err);
    res.status(500).send('Server error');
  }
});



  router.get('/2fa/setup', auth, async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) return res.status(400).json({ msg: 'User not found' });
  
      const secret = speakeasy.generateSecret({ name: 'YourAppName' });
      user.twoFactorSecret = secret.base32;
      await user.save();
  
      qrcode.toDataURL(secret.otpauth_url, (err, dataUrl) => {
        if (err) {
          console.error('Error generating QR code:', err);
          return res.status(500).json({ msg: 'Error generating QR code' });
        }
        res.status(200).json({ qrCodeUrl: dataUrl, secret: secret.base32 });
      });
    } catch (err) {
      console.error('Error setting up 2FA:', err);
      res.status(500).send('Server error');
    }
  });
  
module.exports = router;
