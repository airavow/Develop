"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

function Signup() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  })
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleCheckboxChange = (e) => {
    setFormData((prev) => ({ ...prev, agreeToTerms: e.target.checked }))
    if (errors.agreeToTerms) {
      setErrors((prev) => ({ ...prev, agreeToTerms: "" }))
    }
  }

  const validateForm = () => {
    let valid = true
    const newErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: "",
    }

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
      valid = false
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters"
      valid = false
    }

    if (!formData.email) {
      newErrors.email = "Email is required"
      valid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
      valid = false
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
      valid = false
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
      valid = false
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password must contain uppercase, lowercase, and number"
      valid = false
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
      valid = false
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
      valid = false
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions"
      valid = false
    }

    setErrors(newErrors)
    return valid
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log("Signup successful", formData)
      alert("Account created successfully!")
      navigate("/dashboard")
    } catch (error) {
      console.error("Signup failed", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={styles.container}>
      {/* Left side - Decorative Panel (hidden on mobile) */}
      <div style={styles.leftPanel}>
        <div style={styles.leftPanelContent}>
          <div style={styles.leftPanelText}>
            <h1 style={styles.leftPanelTitle}>Join Our Community</h1>
            <p style={styles.leftPanelSubtitle}>
              Create your account and start your journey with us. Join thousands of users who trust our platform.
            </p>
          </div>
          <div style={styles.decorativeCircles}>
            <div style={{ ...styles.circle, ...styles.circle1 }}></div>
            <div style={{ ...styles.circle, ...styles.circle2 }}></div>
            <div style={{ ...styles.circle, ...styles.circle3 }}></div>
          </div>
        </div>
      </div>

      {/* Right side - Signup Form */}
      <div style={styles.rightPanel}>
        <div style={styles.card}>
          <img src="vite.png" alt="Logo" style={{ width: "100%" }} />
        </div>
        <div style={styles.formContainer}>
          <div style={styles.formHeader}>
            <h2 style={styles.formTitle}>Create your account</h2>
            <p style={styles.formSubtitle}>Fill in your details to get started</p>
          </div>

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
              <label htmlFor="name" style={styles.label}>
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                disabled={isLoading}
                style={{
                  ...styles.input,
                  ...(errors.name ? styles.inputError : {}),
                }}
              />
              {errors.name && <p style={styles.errorText}>{errors.name}</p>}
            </div>

            <div style={styles.inputGroup}>
              <label htmlFor="email" style={styles.label}>
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
                style={{
                  ...styles.input,
                  ...(errors.email ? styles.inputError : {}),
                }}
              />
              {errors.email && <p style={styles.errorText}>{errors.email}</p>}
            </div>

            <div style={styles.inputGroup}>
              <label htmlFor="password" style={styles.label}>
                Password
              </label>
              <div style={styles.passwordContainer}>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                  style={{
                    ...styles.input,
                    ...(errors.password ? styles.inputError : {}),
                  }}
                />
                <button
                  type="button"
                  style={styles.eyeButton}
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
              {errors.password && <p style={styles.errorText}>{errors.password}</p>}
            </div>

            <div style={styles.inputGroup}>
              <label htmlFor="confirmPassword" style={styles.label}>
                Confirm Password
              </label>
              <div style={styles.passwordContainer}>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={isLoading}
                  style={{
                    ...styles.input,
                    ...(errors.confirmPassword ? styles.inputError : {}),
                  }}
                />
                <button
                  type="button"
                  style={styles.eyeButton}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  tabIndex={-1}
                >
                  {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
              {errors.confirmPassword && <p style={styles.errorText}>{errors.confirmPassword}</p>}
            </div>

            <div style={styles.checkboxContainer}>
              <input
                type="checkbox"
                id="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleCheckboxChange}
                disabled={isLoading}
                style={styles.checkbox}
              />
              <label htmlFor="agreeToTerms" style={styles.checkboxLabel}>
                I agree to the{" "}
                <Link to="/terms" style={styles.link}>
                  Terms and Conditions
                </Link>{" "}
                and{" "}
                <Link to="/privacy" style={styles.link}>
                  Privacy Policy
                </Link>
              </label>
            </div>
            {errors.agreeToTerms && <p style={styles.errorText}>{errors.agreeToTerms}</p>}

            <button
              type="submit"
              style={{
                ...styles.button,
                ...(isLoading ? styles.buttonLoading : {}),
              }}
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Create account"}
            </button>

            <div style={styles.signupContainer}>
              Already have an account?{" "}
              <Link to="/login" style={styles.signupLink}>
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

// Add keyframe animation for the circles
const keyframes = `
@keyframes pulse {
  0% { transform: scale(1); opacity: 0.7; }
  50% { transform: scale(1.05); opacity: 0.9; }
  100% { transform: scale(1); opacity: 0.7; }
}
`

// Add the keyframes to the document
const styleElement = document.createElement("style")
styleElement.textContent = keyframes
document.head.appendChild(styleElement)

// Styles object
const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    width: "100%",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  leftPanel: {
    display: "none",
    width: "50%",
    background: "linear-gradient(135deg, #8a2be2, #4a00e0)",
    color: "white",
    "@media (min-width: 992px)": {
      display: "block",
    },
  },
  leftPanelContent: {
    display: "flex",
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "1rem",
  },
  leftPanelText: {
    textAlign: "center",
    marginBottom: "2rem",
  },
  leftPanelTitle: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "1rem",
  },
  leftPanelSubtitle: {
    fontSize: "1.1rem",
    opacity: "0.9",
  },
  decorativeCircles: {
    position: "relative",
    height: "250px",
    width: "250px",
  },
  circle: {
    position: "absolute",
    borderRadius: "50%",
    animation: "pulse 3s infinite ease-in-out",
  },
  circle1: {
    top: "0",
    left: "0",
    height: "250px",
    width: "250px",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  circle2: {
    top: "30px",
    left: "30px",
    height: "190px",
    width: "190px",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    animationDelay: "0.5s",
  },
  circle3: {
    top: "60px",
    left: "60px",
    height: "130px",
    width: "130px",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    animationDelay: "1s",
  },
  rightPanel: {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "1.5rem",
  },
  formContainer: {
    maxWidth: "450px",
    width: "100%",
    margin: "0 auto",
  },
  formHeader: {
    marginBottom: "2rem",
  },
  formTitle: {
    fontSize: "1.875rem",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "0.5rem",
  },
  formSubtitle: {
    fontSize: "1rem",
    color: "#666",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  label: {
    fontSize: "0.875rem",
    fontWeight: "500",
    color: "#333",
  },
  input: {
    padding: "0.75rem 1rem",
    fontSize: "1rem",
    border: "1px solid #ddd",
    borderRadius: "0.375rem",
    width: "100%",
    transition: "border-color 0.2s",
    outline: "none",
  },
  inputError: {
    borderColor: "#e53e3e",
  },
  errorText: {
    color: "#e53e3e",
    fontSize: "0.875rem",
    marginTop: "0.25rem",
  },
  passwordContainer: {
    position: "relative",
  },
  eyeButton: {
    position: "absolute",
    right: "1rem",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "1rem",
    color: "#666",
  },
  checkboxContainer: {
    display: "flex",
    alignItems: "flex-start",
    gap: "0.5rem",
  },
  checkbox: {
    width: "1rem",
    height: "1rem",
    marginTop: "0.125rem",
  },
  checkboxLabel: {
    fontSize: "0.875rem",
    color: "#333",
    lineHeight: "1.4",
  },
  link: {
    color: "#8a2be2",
    textDecoration: "none",
    fontWeight: "500",
  },
  button: {
    padding: "0.75rem 1rem",
    backgroundColor: "#8a2be2",
    color: "white",
    border: "none",
    borderRadius: "0.375rem",
    fontSize: "1rem",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  buttonLoading: {
    backgroundColor: "#6b24b2",
    cursor: "not-allowed",
  },
  signupContainer: {
    textAlign: "center",
    fontSize: "0.875rem",
    color: "#666",
  },
  signupLink: {
    color: "#8a2be2",
    textDecoration: "none",
    fontWeight: "500",
  },
  card: {
    position: "relative",
    height: "6rem",
    padding: "0.75rem 1rem",
    maxWidth: "450px",
    width: "15rem",
    margin: "0 auto",
  },
}

// Media query for the left panel
if (window.matchMedia("(min-width: 992px)").matches) {
  styles.leftPanel.display = "block"
}

export default Signup
