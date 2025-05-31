"use client"

import { useState, useEffect, useRef } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"

function Navigation({ isCollapsed, setIsCollapsed }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [expandedMenus, setExpandedMenus] = useState({})
  const [isDarkMode, setIsDarkMode] = useState(false)

  const notificationRef = useRef(null)

  const menuItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: "📊",
      shortcut: "Ctrl+D",
    },
    {
      title: "Analytics",
      path: "/analytics",
      icon: "📈",
      shortcut: "Ctrl+A",
      submenu: [
        { title: "Overview", path: "/analytics/overview", icon: "📋" },
        { title: "Revenue", path: "/analytics/revenue", icon: "💰" },
        { title: "Users", path: "/analytics/users", icon: "👥" },
        { title: "Traffic", path: "/analytics/traffic", icon: "🚦" },
      ],
    },
    {
      title: "Users",
      path: "/users",
      icon: "👥",
      shortcut: "Ctrl+U",
      submenu: [
        { title: "All Users", path: "/users/all", icon: "👤" },
        { title: "Active Users", path: "/users/active", icon: "🟢" },
        { title: "User Roles", path: "/users/roles", icon: "🎭" },
        { title: "Permissions", path: "/users/permissions", icon: "🔐" },
      ],
    },
    {
      title: "Projects",
      path: "/projects",
      icon: "📁",
      shortcut: "Ctrl+P",
      submenu: [
        { title: "Active Projects", path: "/projects/active", icon: "🚀" },
        { title: "Completed", path: "/projects/completed", icon: "✅" },
        { title: "Templates", path: "/projects/templates", icon: "📋" },
      ],
    },
    {
      title: "Messages",
      path: "/messages",
      icon: "💬",
      badge: 5,
      submenu: [
        { title: "Inbox", path: "/messages/inbox", icon: "📥", badge: 3 },
        { title: "Sent", path: "/messages/sent", icon: "📤" },
        { title: "Drafts", path: "/messages/drafts", icon: "📝", badge: 2 },
      ],
    },
    {
      title: "Calendar",
      path: "/calendar",
      icon: "📅",
    },
    {
      title: "Files",
      path: "/files",
      icon: "📄",
      submenu: [
        { title: "Documents", path: "/files/documents", icon: "📄" },
        { title: "Images", path: "/files/images", icon: "🖼️" },
        { title: "Videos", path: "/files/videos", icon: "🎥" },
        { title: "Shared", path: "/files/shared", icon: "🔗" },
      ],
    },
    {
      title: "Reports",
      path: "/reports",
      icon: "📊",
      submenu: [
        { title: "Sales Report", path: "/reports/sales", icon: "💹" },
        { title: "User Report", path: "/reports/users", icon: "👥" },
        { title: "Performance", path: "/reports/performance", icon: "⚡" },
      ],
    },
    {
      title: "Settings",
      path: "/settings",
      icon: "⚙️",
      submenu: [
        { title: "General", path: "/settings/general", icon: "🔧" },
        { title: "Security", path: "/settings/security", icon: "🔒" },
        { title: "Integrations", path: "/settings/integrations", icon: "🔌" },
        { title: "Billing", path: "/settings/billing", icon: "💳" },
      ],
    },
  ]

  const quickActions = [
    { title: "New User", icon: "👤", action: () => navigate("/users/new") },
    { title: "New Project", icon: "📁", action: () => navigate("/projects/new") },
    { title: "Send Message", icon: "💬", action: () => navigate("/messages/compose") },
    { title: "Generate Report", icon: "📊", action: () => navigate("/reports/generate") },
  ]

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLogout = () => {
    console.log("Logging out...")
    navigate("/login")
  }

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + "/")
  }

  const toggleSubmenu = (title) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }

  const themeStyles = isDarkMode ? darkTheme : lightTheme

  return (
    <div
      style={{
        ...styles.sidebar,
        ...themeStyles.sidebar,
        width: isCollapsed ? "80px" : "320px",
      }}
    >
      {/* Header */}
      <div style={{ ...styles.header, ...themeStyles.header }}>
        <div style={styles.logo}>
          {!isCollapsed && (
            <>
              <img src="/placeholder.svg?height=32&width=32" alt="Logo" style={styles.logoImage} />
              <span style={{ ...styles.logoText, ...themeStyles.logoText }}>DashBoard Pro</span>
            </>
          )}
          {isCollapsed && <span style={{ ...styles.logoCollapsed, ...themeStyles.logoText }}>DP</span>}
        </div>
        <div style={styles.headerActions}>
          {/* Theme Toggle */}
          <button
            style={{ ...styles.iconButton, ...themeStyles.iconButton }}
            onClick={() => setIsDarkMode(!isDarkMode)}
            title="Toggle theme"
          >
            {isDarkMode ? "☀️" : "🌙"}
          </button>

          <button
            style={{ ...styles.collapseButton, ...themeStyles.iconButton }}
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? "→" : "←"}
          </button>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav style={styles.nav}>
        <ul style={styles.menuList}>
          {menuItems.map((item) => (
            <li key={item.path} style={styles.menuItem}>
              <div style={styles.menuItemContainer}>
                <Link
                  to={item.submenu ? "#" : item.path}
                  style={{
                    ...styles.menuLink,
                    ...themeStyles.menuLink,
                    ...(isActive(item.path) ? { ...styles.menuLinkActive, ...themeStyles.menuLinkActive } : {}),
                  }}
                  title={isCollapsed ? `${item.title} ${item.shortcut || ""}` : ""}
                  onClick={(e) => {
                    if (item.submenu) {
                      e.preventDefault()
                      toggleSubmenu(item.title)
                    }
                  }}
                >
                  <span style={styles.menuIcon}>{item.icon}</span>
                  {!isCollapsed && (
                    <>
                      <span style={styles.menuText}>{item.title}</span>
                      <div style={styles.menuRight}>
                        {item.badge && <span style={styles.menuBadge}>{item.badge}</span>}
                        {item.submenu && (
                          <span
                            style={{
                              ...styles.submenuArrow,
                              transform: expandedMenus[item.title] ? "rotate(90deg)" : "rotate(0deg)",
                            }}
                          >
                            ▶
                          </span>
                        )}
                      </div>
                    </>
                  )}
                </Link>

                {/* Submenu */}
                {item.submenu && !isCollapsed && expandedMenus[item.title] && (
                  <ul style={{ ...styles.submenu, ...themeStyles.submenu }}>
                    {item.submenu.map((subItem) => (
                      <li key={subItem.path} style={styles.submenuItem}>
                        <Link
                          to={subItem.path}
                          style={{
                            ...styles.submenuLink,
                            ...themeStyles.submenuLink,
                            ...(isActive(subItem.path)
                              ? { ...styles.submenuLinkActive, ...themeStyles.submenuLinkActive }
                              : {}),
                          }}
                        >
                          <span style={styles.submenuIcon}>{subItem.icon}</span>
                          <span style={styles.submenuText}>{subItem.title}</span>
                          {subItem.badge && <span style={styles.submenuBadge}>{subItem.badge}</span>}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Profile */}
      <div style={{ ...styles.userSection, ...themeStyles.userSection }}>
        <div
          style={{ ...styles.userProfile, ...themeStyles.userProfile }}
          onClick={() => setShowUserMenu(!showUserMenu)}
        >
          <div style={styles.userAvatar}>
            <img src="/placeholder.svg?height=40&width=40" alt="User Avatar" style={styles.avatarImage} />
            <div style={styles.onlineStatus}></div>
          </div>
          {!isCollapsed && (
            <div style={styles.userInfo}>
              <div style={{ ...styles.userName, ...themeStyles.text }}>John Doe</div>
              <div style={{ ...styles.userEmail, ...themeStyles.subText }}>john@example.com</div>
              <div style={styles.userStatus}>🟢 Online</div>
            </div>
          )}
          {!isCollapsed && (
            <span style={{ ...styles.dropdownIcon, ...themeStyles.subText }}>{showUserMenu ? "▲" : "▼"}</span>
          )}
        </div>

        {/* User Dropdown Menu */}
        {showUserMenu && !isCollapsed && (
          <div style={{ ...styles.userMenu, ...themeStyles.panel }}>
            <Link to="/profile" style={{ ...styles.userMenuItem, ...themeStyles.menuItem }}>
              👤 Profile
            </Link>
            <Link to="/account" style={{ ...styles.userMenuItem, ...themeStyles.menuItem }}>
              🔧 Account Settings
            </Link>
            <Link to="/preferences" style={{ ...styles.userMenuItem, ...themeStyles.menuItem }}>
              🎨 Preferences
            </Link>
            <Link to="/billing" style={{ ...styles.userMenuItem, ...themeStyles.menuItem }}>
              💳 Billing
            </Link>
            <div style={styles.divider}></div>
            <Link to="/help" style={{ ...styles.userMenuItem, ...themeStyles.menuItem }}>
              ❓ Help & Support
            </Link>
            <div style={styles.divider}></div>
            <button style={{ ...styles.logoutButton, ...themeStyles.logoutButton }} onClick={handleLogout}>
              🚪 Logout
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

const styles = {
  sidebar: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    transition: "width 0.3s ease",
    position: "fixed",
    left: 0,
    top: 0,
    zIndex: 1000,
    boxShadow: "2px 0 15px rgba(0, 0, 0, 0.1)",
  },
  header: {
    padding: "1.5rem 1rem",
    borderBottom: "1px solid #e2e8f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  },
  logoImage: {
    width: "32px",
    height: "32px",
    borderRadius: "8px",
  },
  logoText: {
    fontSize: "1.4rem",
    fontWeight: "700",
    background: "linear-gradient(135deg, #3b82f6, #1e40af)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  logoCollapsed: {
    fontSize: "1.6rem",
    fontWeight: "700",
  },
  headerActions: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  iconButton: {
    background: "none",
    border: "none",
    fontSize: "1.3rem",
    cursor: "pointer",
    padding: "0.6rem",
    borderRadius: "8px",
    transition: "all 0.2s ease",
    position: "relative",
  },
  collapseButton: {
    fontSize: "1.1rem",
    cursor: "pointer",
    padding: "0.6rem",
    borderRadius: "6px",
    transition: "background-color 0.2s ease",
  },
  quickActionsContainer: {
    padding: "1.2rem",
    borderBottom: "1px solid #e2e8f0",
  },
  quickActionsTitle: {
    fontSize: "0.8rem",
    fontWeight: "600",
    marginBottom: "0.8rem",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  quickActionsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "0.6rem",
  },
  quickActionButton: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.4rem",
    padding: "1.2rem 0.8rem",
    border: "1px solid #e2e8f0",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontSize: "0.8rem",
    fontWeight: "500",
    backgroundColor: "#f8fafc",
  },
  quickActionIcon: {
    fontSize: "1.6rem",
    color: "#3b82f6",
  },
  quickActionText: {
    fontSize: "0.8rem",
    fontWeight: "500",
  },
  nav: {
    flex: 1,
    padding: "1.2rem 0",
    overflowY: "auto",
  },
  menuList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  menuItem: {
    margin: "0.3rem 0",
  },
  menuItemContainer: {
    position: "relative",
  },
  menuLink: {
    display: "flex",
    alignItems: "center",
    gap: "0.8rem",
    padding: "1rem 1.2rem",
    textDecoration: "none",
    transition: "all 0.2s ease",
    borderRadius: "0 30px 30px 0",
    margin: "0 0.6rem 0 0",
    position: "relative",
    fontSize: "0.95rem",
    fontWeight: "500",
  },
  menuLinkActive: {
    backgroundColor: "#3b82f6",
    color: "white",
    boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
  },
  menuIcon: {
    fontSize: "1.3rem",
    minWidth: "26px",
  },
  menuText: {
    fontSize: "0.95rem",
    fontWeight: "500",
    flex: 1,
  },
  menuRight: {
    display: "flex",
    alignItems: "center",
    gap: "0.6rem",
  },
  menuBadge: {
    backgroundColor: "#ef4444",
    color: "white",
    borderRadius: "12px",
    padding: "0.2rem 0.6rem",
    fontSize: "0.7rem",
    fontWeight: "600",
    minWidth: "20px",
    textAlign: "center",
  },
  submenuArrow: {
    fontSize: "0.7rem",
    transition: "transform 0.2s ease",
  },
  submenu: {
    listStyle: "none",
    padding: "0.6rem 0",
    margin: "0",
    marginLeft: "2.2rem",
    borderLeft: "2px solid #e2e8f0",
    paddingLeft: "1.2rem",
  },
  submenuItem: {
    margin: "0.3rem 0",
  },
  submenuLink: {
    display: "flex",
    alignItems: "center",
    gap: "0.6rem",
    padding: "0.6rem 0.8rem",
    textDecoration: "none",
    borderRadius: "8px",
    transition: "all 0.2s ease",
    fontSize: "0.85rem",
    fontWeight: "500",
  },
  submenuLinkActive: {
    backgroundColor: "#3b82f6",
    color: "white",
  },
  submenuIcon: {
    fontSize: "1rem",
    minWidth: "18px",
  },
  submenuText: {
    flex: 1,
  },
  submenuBadge: {
    backgroundColor: "#ef4444",
    color: "white",
    borderRadius: "10px",
    padding: "0.1rem 0.4rem",
    fontSize: "0.6rem",
    fontWeight: "600",
  },
  userSection: {
    padding: "1.2rem",
    borderTop: "1px solid #e2e8f0",
    position: "relative",
  },
  userProfile: {
    display: "flex",
    alignItems: "center",
    gap: "0.8rem",
    cursor: "pointer",
    padding: "0.8rem",
    borderRadius: "12px",
    transition: "background-color 0.2s ease",
  },
  userAvatar: {
    position: "relative",
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    overflow: "hidden",
    border: "2px solid #3b82f6",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  onlineStatus: {
    position: "absolute",
    bottom: "2px",
    right: "2px",
    width: "12px",
    height: "12px",
    backgroundColor: "#10b981",
    borderRadius: "50%",
    border: "2px solid white",
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: "0.95rem",
    fontWeight: "600",
    marginBottom: "0.2rem",
  },
  userEmail: {
    fontSize: "0.75rem",
    marginBottom: "0.2rem",
  },
  userStatus: {
    fontSize: "0.7rem",
    color: "#10b981",
    fontWeight: "500",
  },
  dropdownIcon: {
    fontSize: "0.75rem",
  },
  userMenu: {
    position: "absolute",
    bottom: "100%",
    left: "1.2rem",
    right: "1.2rem",
    borderRadius: "12px",
    padding: "0.6rem 0",
    boxShadow: "0 -8px 25px rgba(0, 0, 0, 0.15)",
    marginBottom: "0.6rem",
    border: "1px solid #e2e8f0",
  },
  userMenuItem: {
    display: "block",
    padding: "0.8rem 1.2rem",
    textDecoration: "none",
    fontSize: "0.9rem",
    transition: "background-color 0.2s ease",
    fontWeight: "500",
  },
  divider: {
    height: "1px",
    backgroundColor: "#e2e8f0",
    margin: "0.6rem 0",
  },
  logoutButton: {
    width: "100%",
    padding: "0.8rem 1.2rem",
    background: "none",
    border: "none",
    fontSize: "0.9rem",
    cursor: "pointer",
    textAlign: "left",
    transition: "background-color 0.2s ease",
    fontWeight: "500",
  },
}

const lightTheme = {
  sidebar: {
    backgroundColor: "#ffffff",
    color: "#1f2937",
    borderRight: "1px solid #e2e8f0",
  },
  header: {
    borderBottom: "1px solid #e2e8f0",
  },
  logoText: {
    background: "linear-gradient(135deg, #3b82f6, #1e40af)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  iconButton: {
    color: "#374151",
    backgroundColor: "transparent",
  },
  panel: {
    backgroundColor: "#ffffff",
    border: "1px solid #e2e8f0",
  },
  text: {
    color: "#1f2937",
  },
  subText: {
    color: "#6b7280",
  },
  link: {
    color: "#3b82f6",
  },
  input: {
    backgroundColor: "#ffffff",
    color: "#1f2937",
    border: "1px solid #e2e8f0",
  },
  button: {
    color: "#3b82f6",
    backgroundColor: "transparent",
  },
  menuLink: {
    color: "#374151",
  },
  menuLinkActive: {
    backgroundColor: "#3b82f6",
    color: "white",
  },
  submenu: {
    borderLeft: "2px solid #e2e8f0",
  },
  submenuLink: {
    color: "#6b7280",
  },
  submenuLinkActive: {
    backgroundColor: "#3b82f6",
    color: "white",
  },
  userSection: {
    borderTop: "1px solid #e2e8f0",
  },
  userProfile: {
    backgroundColor: "transparent",
  },
  menuItem: {
    color: "#374151",
  },
  logoutButton: {
    color: "#dc2626",
  },
  quickActions: {
    borderBottom: "1px solid #e2e8f0",
  },
  quickActionButton: {
    backgroundColor: "#f8fafc",
    color: "#374151",
    border: "1px solid #e2e8f0",
  },
  notificationItem: {
    backgroundColor: "transparent",
    borderBottom: "1px solid #e2e8f0",
  },
  recentItem: {
    color: "#6b7280",
  },
}

const darkTheme = {
  sidebar: {
    backgroundColor: "#1e293b",
    color: "white",
    borderRight: "1px solid #334155",
  },
  header: {
    borderBottom: "1px solid #334155",
  },
  logoText: {
    background: "linear-gradient(135deg, #60a5fa, #3b82f6)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  iconButton: {
    color: "#60a5fa",
    backgroundColor: "transparent",
  },
  panel: {
    backgroundColor: "#334155",
    border: "1px solid #475569",
  },
  text: {
    color: "white",
  },
  subText: {
    color: "#cbd5e1",
  },
  link: {
    color: "#60a5fa",
  },
  input: {
    backgroundColor: "#334155",
    color: "white",
    border: "1px solid #475569",
  },
  button: {
    color: "#60a5fa",
    backgroundColor: "transparent",
  },
  menuLink: {
    color: "#cbd5e1",
  },
  menuLinkActive: {
    backgroundColor: "#3b82f6",
    color: "white",
  },
  submenu: {
    borderLeft: "2px solid #475569",
  },
  submenuLink: {
    color: "#cbd5e1",
  },
  submenuLinkActive: {
    backgroundColor: "#3b82f6",
    color: "white",
  },
  userSection: {
    borderTop: "1px solid #334155",
  },
  userProfile: {
    backgroundColor: "transparent",
  },
  menuItem: {
    color: "#cbd5e1",
  },
  logoutButton: {
    color: "#f87171",
  },
  quickActions: {
    borderBottom: "1px solid #334155",
  },
  quickActionButton: {
    backgroundColor: "#334155",
    color: "#cbd5e1",
    border: "1px solid #475569",
  },
  notificationItem: {
    backgroundColor: "transparent",
    borderBottom: "1px solid #475569",
  },
  recentItem: {
    color: "#cbd5e1",
  },
}

export default Navigation
