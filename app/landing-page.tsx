"use client"

import type React from "react"

import Link from "next/link"

export default function LandingPage() {
  const styles = {
    container: {
      minHeight: "100vh",
      backgroundColor: "#1a2332",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "1rem",
    },
    content: {
      maxWidth: "48rem",
      textAlign: "center",
    },
    title: {
      fontSize: "3rem",
      fontWeight: "bold",
      marginBottom: "1.5rem",
    },
    blueText: {
      color: "#3b82f6",
    },
    whiteText: {
      color: "white",
    },
    description: {
      color: "#d1d5db",
      fontSize: "1.125rem",
      marginBottom: "3rem",
      maxWidth: "36rem",
      marginLeft: "auto",
      marginRight: "auto",
    },
    buttonContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      justifyContent: "center",
    },
    button: {
      backgroundColor: "#3b82f6",
      color: "white",
      fontWeight: "500",
      padding: "0.75rem 2rem",
      borderRadius: "0.375rem",
      transition: "background-color 0.2s",
      textDecoration: "none",
      display: "inline-block",
    },
  }

  // Add media query for button container
  if (typeof window !== "undefined" && window.innerWidth >= 640) {
    styles.buttonContainer = {
      ...styles.buttonContainer,
      flexDirection: "row",
    }
  }

  return (
    <div style={styles.container as React.CSSProperties}>
      <div style={styles.content as React.CSSProperties}>
        <h1 style={styles.title as React.CSSProperties}>
          <span style={styles.blueText}>Slope Deflection</span> <span style={styles.whiteText}>Calculator</span>
        </h1>

        <p style={styles.description as React.CSSProperties}>
          The Slope Deflection Calculator analyzes continuous beams via slope deflection, calculating member end moments
          and displaying solutions step-by-step.
        </p>

        <div style={styles.buttonContainer as React.CSSProperties}>
          <Link href="/calculator?type=beams" style={styles.button as React.CSSProperties}>
            Calculate Beams
          </Link>
          <Link href="/frames" style={styles.button as React.CSSProperties}>
            Calculate Frames
          </Link>
        </div>
      </div>
    </div>
  )
}

