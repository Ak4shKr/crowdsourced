import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
// import service from "../http/service";
import axios from "axios";

export const GoogleAuth = () => {
  const [params] = useSearchParams();
  useEffect(() => {
    const code = params.get("code");
    if (code) {
      // You can use this code to request the token from your backend
      const fetchGoogleToken = async () => {
        try {
          const tokenResponse = await axios.post(
            "https://oauth2.googleapis.com/token",
            {
              code,
              client_id:
                "221664733783-9lnk0s9559f85cd5aot6fg76uao2jtri.apps.googleusercontent.com",
              client_secret: "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",
              redirect_uri: `https://crowdsourced.vercel.app/google-auth`,
              grant_type: "authorization_code",
            }
          );

          console.log("tokenResponse", tokenResponse);
          // const { access_token } = tokenResponse.data;

          // Assuming your backend sends the JWT token and user details
          console.log("responce from token oauth", tokenResponse);
          localStorage.setItem("token", tokenResponse.data.token);
          // localStorage.setItem("user", JSON.stringify(response.data.user));
          window.location.href = "/"; // Redirect to the home page or desired page after login
        } catch (error) {
          console.error("Error during token exchange:", error);
          // Handle error, maybe show a message to the user
        }
      };

      fetchGoogleToken();
    }
  }, [params]); // Only run effect when searchParams change

  return (
    <div>
      <h3>Processing to login ....</h3>
    </div>
  );
};
