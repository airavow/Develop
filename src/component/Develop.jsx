import { Link } from "react-router-dom"

function Develop() {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>NanoDx Site Under Construction</h1>
        <Link to="/login"><button style={styles.button}>
              Login 
            </button>
        </Link>    
        {/* Added image container and image */}
        <div style={styles.imageContainer}>
          <img src="src/assets/image.png" alt="Construction" style={styles.image} />
        </div>
        <p style={styles.text}>We're working hard to bring you an amazing experience.</p>
        <p style={styles.text}>Please check back soon!</p>
        <div style={styles.progressContainer}>
          <div style={styles.progressBar}></div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "92vh",
    backgroundColor: "#f5f5f5",
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    padding: "1rem", // Added padding for better mobile display
  },
  content: {
    width: "100%", // Added for better responsiveness
    maxWidth: "500px",
    padding: "0.5rem",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  title: {
    color: "#333",
    fontSize: "2.5rem",
    marginBottom: "1rem",
    wordWrap: "break-word", // Added for text wrapping on small screens
  },

    login: {
    color: "#333",
    fontSize: "2.5rem",
    marginBottom: "1rem",
  },
  // Added styles for image container and image
  imageContainer: {
    margin: "2rem auto",
    maxWidth: "100%",
  },
  image: {
    maxWidth: "100%",
    height: "auto",
    borderRadius: "4px",
  },
  text: {
    color: "#666",
    fontSize: "1.2rem",
    marginBottom: "1rem",
  },
  progressContainer: {
    height: "10px",
    backgroundColor: "#e0e0e0",
    borderRadius: "5px",
    marginTop: "2rem",
    overflow: "hidden",
    width: "100%", // Added to ensure full width
  },
  progressBar: {
    height: "100%",
    width: "60%",
    backgroundColor: "#4CAF50",
    borderRadius: "5px",
    animation: "progress 2s ease-in-out infinite",
  },
}

// Add keyframe animation for the progress bar
const styleElement = document.createElement("style")
styleElement.textContent = `
  @keyframes progress {
    0% { width: 30%; }
    50% { width: 70%; }
    100% { width: 30%; }
  }
  
  /* Added media queries for responsiveness */
  @media (max-width: 768px) {
    .title {
      font-size: 2rem !important;
    }
    .text {
      font-size: 1rem !important;
    }
  }
  
  @media (max-width: 480px) {
    .title {
      font-size: 1.75rem !important;
    }
    .text {
      font-size: 0.9rem !important;
    }
    .progress-container {
      height: 8px !important;
    }
  }
`
document.head.appendChild(styleElement)

export default Develop
