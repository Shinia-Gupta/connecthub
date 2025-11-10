"use client";

import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { showToast } from "@/src/app/components/toasts";
import { loginViaInput } from "@/src/lib/actions/auth";
import Link from "next/link";

const LoginSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Must be at least 6 characters")
    .required("Password is required"),
});

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (values: { email: string; password: string }) => {
    setLoading(true);
    const result = await loginViaInput(values.email, values.password);
    setLoading(false);

    if (result?.error) {
      showToast("error", result.error);
    } else {
      showToast("success", "Logged in successfully!");
      router.push("/user-info");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Card
        sx={{
          width: 380,
          boxShadow: 4,
          borderRadius: 3,
          p: 1,
        }}
      >
        <CardContent>
          <Typography variant="h5" fontWeight={600} textAlign="center" mb={3}>
            Welcome Back 👋
          </Typography>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, handleChange, handleBlur, values }) => (
              <Form>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />

                <TextField
                  fullWidth
                  margin="normal"
                  label="Password"
                  name="password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3, py: 1.2, fontWeight: 600 }}
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Login"
                  )}
                </Button>

                <Button
                  fullWidth
                  variant="outlined"
                  color="inherit"
                  sx={{ mt: 2, py: 1.2, fontWeight: 500 }}
                  onClick={() => signIn("github", { callbackUrl: "/user-info" })}
                >
                  Continue with GitHub
                </Button>

                <Divider sx={{ my: 3 }} />

                <Typography
                  variant="body2"
                  textAlign="center"
                  sx={{ color: "text.secondary" }}
                >
                  New to ConnectHub?{" "}
                  <Link
                    href="/signup"
                    style={{
                      textDecoration: "none",
                      color: "#1976d2",
                      fontWeight: 600,
                    }}
                  >
                    Register here
                  </Link>
                </Typography>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </Box>
  );
}
