import nodemailer from "nodemailer";

const emailPort = process.env.EMAIL_PORT as unknown as number;

const createTransporter = () => {
  const transporter = nodemailer.createTransport(
    process.env.EMAIL_SERVICE === "gmail"
      ? {
          service: "gmail",
          port: emailPort,
          secure: false,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
          },
          tls: { rejectUnauthorized: false },
        }
      : {
          host: process.env.EMAIL_HOST,
          port: emailPort,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
          },
          debug: true,
          ignoreTLS: true,
        }
  );
  return transporter;
};

export const sendEmail = async (
  to: any,
  subject: any,
  html: any,
  attachments = []
) => {
  const transporter = createTransporter();

  if (!to || !subject || !html) throw new Error("Missing parameters");

  try {
    const additional =
      attachments && Array.isArray(attachments) && attachments.length
        ? { attachments }
        : {};

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
      ...additional,
    });

    console.log("Message sent: %s ", info.messageId);
    return info;
  } catch (error) {
    console.error(error);
  }

  return {};
};
