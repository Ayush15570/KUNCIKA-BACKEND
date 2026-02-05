import axios from "axios";

export const sendOTP = async (phoneNumber) => {
  const url = `https://2factor.in/API/V1/${process.env.TWOFACTOR_API_KEY}/SMS/${phoneNumber}/AUTOGEN`;
  const res = await axios.get(url);

  if (res.data.Status !== "Success") {
    throw new Error("2Factor OTP send failed");
  }

  return res.data.Details; // sessionId
};
