import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import service from "../http/service";

export const GoogleAuth = () => {
  const params = useSearchParams();
  useEffect(() => {
    const code = params.get("code");
    if (code) {
      // You can use this code to request the token from your backend
      const fetchGoogleToken = async () => {
        try {
          const response = await service.post("/auth/google/callback", {
            code,
          });
          // Assuming your backend sends the JWT token and user details
          console.log("responce from token oauth", response);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
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
