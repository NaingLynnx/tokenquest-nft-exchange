
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const SITE_URL = Deno.env.get("SITE_URL") || "http://localhost:5173";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, resetToken } = await req.json();

    if (!email || !resetToken) {
      return new Response(
        JSON.stringify({ error: "Email and reset token are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log(`Sending reset email to ${email} with token ${resetToken}`);

    const { data, error } = await resend.emails.send({
      from: "Password Reset <onboarding@resend.dev>",
      to: [email],
      subject: "Reset Your Password",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h1 style="color: #333; font-size: 24px;">Reset Your Password</h1>
          <p style="color: #666; font-size: 16px; line-height: 1.5;">
            You've requested to reset your password. Use the verification code below to complete the process:
          </p>
          <div style="background-color: #f4f7fb; padding: 15px; border-radius: 6px; margin: 20px 0; text-align: center;">
            <p style="font-size: 24px; font-weight: bold; letter-spacing: 5px; margin: 0; color: #1a1a1a;">${resetToken}</p>
          </div>
          <p style="color: #666; font-size: 16px; line-height: 1.5;">
            This code will expire in 15 minutes. If you didn't request a password reset, you can safely ignore this email.
          </p>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #999; font-size: 14px;">
            <p>© 2023 MintToken. All rights reserved.</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Email sending error:", error);
      return new Response(
        JSON.stringify({ error: "Failed to send email" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Reset email sent" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error) {
    console.error("Error in send-reset-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
