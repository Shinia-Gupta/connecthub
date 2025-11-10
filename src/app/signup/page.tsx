"use client";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Box, Button, TextField, Typography, Card, CardContent, Divider } from "@mui/material";
import { useRouter } from "next/navigation";
import { registerUser } from "@/src/lib/actions/auth";
import { showToast } from "@/src/app/components/toasts";
import Link from "next/link";

const SignUpSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Must be at least 6 characters").required("Password is required"),
});

export default function SignupPage() {
  const router = useRouter();

  const handleSubmit = async (values: { name: string; email: string; password: string }) => {
    try {
      await registerUser(values.name, values.email, values.password);
      showToast("success", "Account created successfully!");
      router.push("/login");
    } catch (err: any) {
      showToast("error", err.message);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#f5f5f5" }}>
      <Card sx={{ width: 380, boxShadow: 3, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h5" fontWeight={600} textAlign="center" mb={2}>
            Sign Up
          </Typography>

          <Formik
            initialValues={{ name: "", email: "", password: "" }}
            validationSchema={SignUpSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <Form>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />

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
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />

                <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
                  Sign Up
                </Button>
                <Divider sx={{ my: 3 }} />

                <Typography
                  variant="body2"
                  textAlign="center"
                  sx={{ color: "text.secondary" }}
                >
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    style={{
                      textDecoration: "none",
                      color: "#1976d2",
                      fontWeight: 600,
                    }}
                  >
                    Login here
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
