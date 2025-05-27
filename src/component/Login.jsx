 "use client"

import { useState } from "react"

function Login() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [errors, setErrors] = useState({
    email: "",
    password: "",
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
    setFormData((prev) => ({ ...prev, rememberMe: e.target.checked }))
  }

  const validateForm = () => {
    let valid = true
    const newErrors = { email: "", password: "" }

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
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
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
      console.log("Login successful", formData)
      // Redirect or handle successful login here
      alert("Login successful! (This is a demo)")
    } catch (error) {
      console.error("Login failed", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={styles.container}>
      {/* Left side - Image/Design (hidden on mobile) */}
      <div style={styles.leftPanel}>
        <div style={styles.leftPanelContent}>
          <div style={styles.leftPanelText}>
            <h1 style={styles.leftPanelTitle}>Welcome Back</h1>
            <p style={styles.leftPanelSubtitle}>Log in to access your dashboard and continue your journey with us.</p>
          </div>
          <div style={styles.decorativeCircles}>
            <div style={{ ...styles.circle, ...styles.circle1 }}></div>
            <div style={{ ...styles.circle, ...styles.circle2 }}></div>
            <div style={{ ...styles.circle, ...styles.circle3 }}></div>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div style={styles.rightPanel}>
            <div style={styles.card}>
              <img src="vite.png" alt="Image" style={{width: '100%'}} />
            </div>
        <div style={styles.formContainer}>
          <div style={styles.formHeader}>
            <h2 style={styles.formTitle}>Sign in to your account</h2>
            <p style={styles.formSubtitle}>Enter your credentials to access your account</p>
          </div>

          <form onSubmit={handleSubmit} style={styles.form}>
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
              <div style={styles.passwordHeader}>
                <label htmlFor="password" style={styles.label}>
                  Password
                </label>
                <a href="#forgot-password" style={styles.forgotPassword}>
                  Forgot password?
                </a>
              </div>
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

            <div style={styles.checkboxContainer}>
              <input
                type="checkbox"
                id="remember"
                checked={formData.rememberMe}
                onChange={handleCheckboxChange}
                disabled={isLoading}
                style={styles.checkbox}
              />
              <label htmlFor="remember" style={styles.checkboxLabel}>
                Remember me
              </label>
            </div>

            <button
              type="submit"
              style={{
                ...styles.button,
                ...(isLoading ? styles.buttonLoading : {}),
              }}
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>

            <div style={styles.signupContainer}>
              Don't have an account?{" "}
              <a href="#signup" style={styles.signupLink}>
                Sign up
              </a>
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
    padding: "1 1rem",
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
  passwordHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  forgotPassword: {
    fontSize: "0.875rem",
    color: "#8a2be2",
    textDecoration: "none",
    fontWeight: "500",
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
    alignItems: "center",
    gap: "0.5rem",
  },
  checkbox: {
    width: "1rem",
    height: "1rem",
  },
  checkboxLabel: {
    fontSize: "0.875rem",
    color: "#333",
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
    ppadding: "0.75rem 1rem",
    maxWidth: "450px",
    width: "15rem",
    margin: "0 auto"
  },
}

// Media query for the left panel
if (window.matchMedia("(min-width: 992px)").matches) {
  styles.leftPanel.display = "block"
}

export default Login
