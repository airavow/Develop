"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    user_name: "",
    email_id: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState({
    user_name: "",
    email_id: "",
    password: "",
    confirmPassword: "",
  })
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = () => {
    let valid = true
    const newErrors = { ...errors }

    // Validate username
    if (!formData.user_name.trim()) {
      newErrors.user_name = "Username is required"
      valid = false
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email_id.trim()) {
      newErrors.email_id = "Email is required"
      valid = false
    } else if (!emailRegex.test(formData.email_id)) {
      newErrors.email_id = "Please enter a valid email address"
      valid = false
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = "Password is required"
      valid = false
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
      valid = false
    }

    // Validate confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
      valid = false
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
      valid = false
    }

    setErrors(newErrors)
    return valid
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      // Here you would typically send the data to your backend
      console.log("Form submitted:", formData)

      // Show success message
      setFormSubmitted(true)

      // Redirect after successful signup (in a real app)
      // setTimeout(() => router.push("/login"), 2000)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold mb-2">Create an account</h2>
          <p className="text-gray-600">Enter your details below to create your account</p>
        </div>

        {formSubmitted ? (
          <div className="flex flex-col items-center justify-center py-4 space-y-4">
            <div className="text-green-500 text-4xl mb-2">✓</div>
            <p className="text-center text-lg font-medium">Account created successfully!</p>
            <p className="text-center text-gray-600">You can now log in with your credentials.</p>
            <button
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
              onClick={() => router.push("/login")}
            >
              Go to Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-4">
              <label htmlFor="user_name" className="block text-sm font-medium mb-1">
                Username
              </label>
              <input
                id="user_name"
                name="user_name"
                placeholder="johndoe"
                value={formData.user_name}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${errors.user_name ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.user_name && <div className="text-red-500 text-sm mt-1">⚠️ {errors.user_name}</div>}
            </div>

            <div className="mb-4">
              <label htmlFor="email_id" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                id="email_id"
                name="email_id"
                type="email"
                placeholder="john.doe@example.com"
                value={formData.email_id}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${errors.email_id ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.email_id && <div className="text-red-500 text-sm mt-1">⚠️ {errors.email_id}</div>}
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${errors.password ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.password && <div className="text-red-500 text-sm mt-1">⚠️ {errors.password}</div>}
            </div>

            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${errors.confirmPassword ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.confirmPassword && <div className="text-red-500 text-sm mt-1">⚠️ {errors.confirmPassword}</div>}
            </div>

            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
              Sign Up
            </button>
          </form>
        )}

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 font-medium hover:underline">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
