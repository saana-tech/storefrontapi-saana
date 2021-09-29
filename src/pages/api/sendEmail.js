import sgMail from "@sendgrid/mail";

export default async (req, res) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const { body, method } = req;
  try {
    if (method === "POST") {
      await sgMail.send(body.msg);
      res.status(200).json({ msn: "sent successfully" });
    }
  } catch (error) {
    if (error.response) {
      console.error(error.response.body);
    }
    res.status(500).json({ error });
  }
};
