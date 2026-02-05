import axios from "axios";

export const verifyOTP1 = async (sessionId, otp) => {
  const url = `https://2factor.in/API/V1/${process.env.TWOFACTOR_API_KEY}/SMS/VERIFY/${sessionId}/${otp}`;
  const res = await axios.get(url);

  return res.data.Status === "Success";
};
