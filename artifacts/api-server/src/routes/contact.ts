import { Router } from "express";
import nodemailer from "nodemailer";

const router = Router();

router.post("/contact", async (req, res) => {
  const { name, email, interest, message } = req.body;

  if (!name || !email || !message) {
    res.status(400).json({ error: "Name, email, and message are required." });
    return;
  }

  const gmailUser = process.env["GMAIL_USER"];
  const gmailPass = process.env["GMAIL_APP_PASSWORD"];

  if (!gmailUser || !gmailPass) {
    req.log.error("Gmail credentials not configured");
    res.status(500).json({ error: "Email service not configured." });
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: gmailUser, pass: gmailPass },
  });

  const interestLabel =
    interest === "creator"
      ? "Creator seeking management"
      : interest === "brand"
        ? "Brand seeking partnerships"
        : "Other inquiry";

  try {
    await transporter.sendMail({
      from: `"MOI Website" <${gmailUser}>`,
      to: gmailUser,
      replyTo: email,
      subject: `New Inquiry from ${name} — MOI Website`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0d0d0d;color:#fff;padding:32px;border-radius:12px;border:1px solid #222">
          <h2 style="margin:0 0 24px;font-size:22px;background:linear-gradient(90deg,#0066FF,#FF0099);-webkit-background-clip:text;-webkit-text-fill-color:transparent">New Contact Form Submission</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:10px 0;color:#888;font-size:13px;width:130px">Name</td><td style="padding:10px 0;color:#fff;font-size:15px">${name}</td></tr>
            <tr><td style="padding:10px 0;color:#888;font-size:13px">Email</td><td style="padding:10px 0;color:#fff;font-size:15px"><a href="mailto:${email}" style="color:#0066FF">${email}</a></td></tr>
            <tr><td style="padding:10px 0;color:#888;font-size:13px">Inquiry Type</td><td style="padding:10px 0;color:#fff;font-size:15px">${interestLabel}</td></tr>
          </table>
          <hr style="border:none;border-top:1px solid #222;margin:20px 0"/>
          <p style="color:#888;font-size:13px;margin-bottom:8px">Message</p>
          <p style="color:#fff;font-size:15px;line-height:1.7;white-space:pre-wrap">${message}</p>
          <hr style="border:none;border-top:1px solid #222;margin:20px 0"/>
          <p style="color:#444;font-size:12px;margin:0">Sent from MOI Agency Website · madeoverinfluence.com</p>
        </div>
      `,
    });

    req.log.info({ name, email }, "Contact form email sent");
    res.json({ success: true });
  } catch (err) {
    req.log.error({ err }, "Failed to send contact email");
    res.status(500).json({ error: "Failed to send email. Please try again." });
  }
});

export default router;
