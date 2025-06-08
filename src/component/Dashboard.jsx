"use client";

import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({});
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weather] = useState({
    temp: 72,
    condition: "Sunny",
    icon: "☀️",
  });

  const notificationRef = useRef(null);

  const [stats, setStats] = useState({
    totalUsers: 12345,
    revenue: 98765,
    orders: 1234,
    growth: 12.5,
  });

  const [tasks] = useState([
    { id: 1, title: "Review Q4 Reports", completed: true, priority: "high" },
    { id: 2, title: "Team Meeting", completed: false, priority: "medium" },
    { id: 3, title: "Update Documentation", completed: false, priority: "low" },
    { id: 4, title: "Client Presentation", completed: true, priority: "high" },
  ]);

  const [upcomingEvents] = useState([
    { id: 1, title: "Team Standup", time: "9:00 AM", date: "Today" },
    { id: 2, title: "Client Call", time: "2:00 PM", date: "Today" },
    { id: 3, title: "Project Review", time: "10:00 AM", date: "Tomorrow" },
  ]);

  const [teamMembers] = useState([
    {
      id: 1,
      name: "Alice Johnson",
      status: "online",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 2,
      name: "Bob Smith",
      status: "away",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 3,
      name: "Carol Davis",
      status: "online",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 4,
      name: "David Wilson",
      status: "offline",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ]);

  const [recentActivities] = useState([
    {
      id: 1,
      user: "John Smith",
      action: "Created new project",
      time: "2 minutes ago",
      type: "create",
    },
    {
      id: 2,
      user: "Sarah Johnson",
      action: "Updated user profile",
      time: "15 minutes ago",
      type: "update",
    },
    {
      id: 3,
      user: "Mike Wilson",
      action: "Deleted old files",
      time: "1 hour ago",
      type: "delete",
    },
    {
      id: 4,
      user: "Emily Davis",
      action: "Completed task #123",
      time: "2 hours ago",
      type: "complete",
    },
  ]);

  const [chartData] = useState([
    { month: "Jan", revenue: 400, users: 240 },
    { month: "Feb", revenue: 300, users: 180 },
    { month: "Mar", revenue: 600, users: 320 },
    { month: "Apr", revenue: 800, users: 450 },
    { month: "May", revenue: 500, users: 280 },
    { month: "Jun", revenue: 900, users: 520 },
  ]);

  const [performanceMetrics] = useState([
    { label: "Server Uptime", value: 99.9, color: "#10b981" },
    { label: "Response Time", value: 85, color: "#f59e0b" },
    { label: "User Satisfaction", value: 92, color: "#3b82f6" },
  ]);

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
        { title: "Sales Analytics", path: "/analytics/sales", icon: "📊" },
        {
          title: "Customer Insights",
          path: "/analytics/customers",
          icon: "👤",
        },
      ],
    },
    {
      title: "E-Commerce",
      path: "/ecommerce",
      icon: "🛒",
      shortcut: "Ctrl+E",
      submenu: [
        { title: "Products", path: "/ecommerce/products", icon: "📦" },
        { title: "Categories", path: "/ecommerce/categories", icon: "🏷️" },
        { title: "Orders", path: "/ecommerce/orders", icon: "📋", badge: 12 },
        { title: "Customers", path: "/ecommerce/customers", icon: "👥" },
        { title: "Coupons", path: "/ecommerce/coupons", icon: "🎫" },
        { title: "Reviews", path: "/ecommerce/reviews", icon: "⭐" },
      ],
    },
    {
      title: "Inventory",
      path: "/inventory",
      icon: "📋",
      shortcut: "Ctrl+I",
      submenu: [
        { title: "Stock Overview", path: "/inventory/overview", icon: "📊" },
        { title: "Stock Management", path: "/inventory/stock", icon: "📦" },
        {
          title: "Low Stock Alerts",
          path: "/inventory/alerts",
          icon: "⚠️",
          badge: 5,
        },
        { title: "Suppliers", path: "/inventory/suppliers", icon: "🏭" },
        {
          title: "Purchase Orders",
          path: "/inventory/purchase-orders",
          icon: "📄",
        },
        { title: "Stock Reports", path: "/inventory/reports", icon: "📈" },
      ],
    },
    {
      title: "Stock Management",
      path: "/stock",
      icon: "📦",
      shortcut: "Ctrl+S",
      submenu: [
        { title: "Current Stock", path: "/stock/current", icon: "📊" },
        { title: "Stock Movements", path: "/stock/movements", icon: "🔄" },
        { title: "Stock Adjustments", path: "/stock/adjustments", icon: "⚖️" },
        { title: "Warehouse Management", path: "/stock/warehouse", icon: "🏢" },
        { title: "Stock Transfers", path: "/stock/transfers", icon: "🚚" },
        { title: "Barcode Scanner", path: "/stock/scanner", icon: "📱" },
      ],
    },
    {
      title: "Website Admin",
      path: "/website",
      icon: "🌐",
      shortcut: "Ctrl+W",
      submenu: [
        { title: "Landing Page", path: "/website/landing", icon: "🏠" },
        { title: "Header Settings", path: "/website/header", icon: "📄" },
        { title: "Footer Settings", path: "/website/footer", icon: "📋" },
        { title: "Hero Section", path: "/website/hero", icon: "🎯" },
        { title: "About Page", path: "/website/about", icon: "ℹ️" },
        { title: "Contact Info", path: "/website/contact", icon: "📞" },
        { title: "Address Management", path: "/website/address", icon: "📍" },
        { title: "SEO Settings", path: "/website/seo", icon: "🔍" },
      ],
    },
    {
      title: "Content Management",
      path: "/content",
      icon: "📝",
      shortcut: "Ctrl+C",
      submenu: [
        { title: "Pages", path: "/content/pages", icon: "📄" },
        { title: "Blog Posts", path: "/content/blog", icon: "📰" },
        { title: "Media Library", path: "/content/media", icon: "🖼️" },
        { title: "Banners", path: "/content/banners", icon: "🎨" },
        { title: "Testimonials", path: "/content/testimonials", icon: "💬" },
        { title: "FAQ", path: "/content/faq", icon: "❓" },
      ],
    },
    {
      title: "Users",
      path: "/users",
      icon: "👥",
      shortcut: "Ctrl+U",
      submenu: [
        { title: "All Users", path: "/users/all", icon: "👤" },
        { title: "Customers", path: "/users/customers", icon: "🛍️" },
        { title: "Admins", path: "/users/admins", icon: "👨‍💼" },
        { title: "User Roles", path: "/users/roles", icon: "🎭" },
        { title: "Permissions", path: "/users/permissions", icon: "🔐" },
        { title: "User Activity", path: "/users/activity", icon: "📊" },
      ],
    },
    {
      title: "Orders",
      path: "/orders",
      icon: "📋",
      shortcut: "Ctrl+O",
      badge: 8,
      submenu: [
        { title: "All Orders", path: "/orders/all", icon: "📋" },
        {
          title: "Pending Orders",
          path: "/orders/pending",
          icon: "⏳",
          badge: 3,
        },
        {
          title: "Processing",
          path: "/orders/processing",
          icon: "⚙️",
          badge: 2,
        },
        { title: "Shipped", path: "/orders/shipped", icon: "🚚" },
        { title: "Delivered", path: "/orders/delivered", icon: "✅" },
        { title: "Cancelled", path: "/orders/cancelled", icon: "❌" },
        { title: "Returns", path: "/orders/returns", icon: "↩️", badge: 1 },
      ],
    },
    {
      title: "Marketing",
      path: "/marketing",
      icon: "📢",
      submenu: [
        { title: "Campaigns", path: "/marketing/campaigns", icon: "🎯" },
        { title: "Email Marketing", path: "/marketing/email", icon: "📧" },
        { title: "Social Media", path: "/marketing/social", icon: "📱" },
        { title: "Promotions", path: "/marketing/promotions", icon: "🎁" },
        { title: "Newsletters", path: "/marketing/newsletters", icon: "📰" },
        { title: "Analytics", path: "/marketing/analytics", icon: "📊" },
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
        { title: "Customer Support", path: "/messages/support", icon: "🎧" },
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
        { title: "Product Images", path: "/files/products", icon: "📸" },
        { title: "Shared", path: "/files/shared", icon: "🔗" },
      ],
    },
    {
      title: "Reports",
      path: "/reports",
      icon: "📊",
      submenu: [
        { title: "Sales Report", path: "/reports/sales", icon: "💹" },
        { title: "Inventory Report", path: "/reports/inventory", icon: "📦" },
        { title: "User Report", path: "/reports/users", icon: "👥" },
        { title: "Financial Report", path: "/reports/financial", icon: "💰" },
        { title: "Performance", path: "/reports/performance", icon: "⚡" },
        { title: "Custom Reports", path: "/reports/custom", icon: "🔧" },
      ],
    },
    {
      title: "Settings",
      path: "/settings",
      icon: "⚙️",
      submenu: [
        { title: "General", path: "/settings/general", icon: "🔧" },
        { title: "Store Settings", path: "/settings/store", icon: "🏪" },
        { title: "Payment Gateway", path: "/settings/payment", icon: "💳" },
        { title: "Shipping", path: "/settings/shipping", icon: "🚚" },
        { title: "Tax Settings", path: "/settings/tax", icon: "🧾" },
        { title: "Security", path: "/settings/security", icon: "🔒" },
        { title: "Integrations", path: "/settings/integrations", icon: "🔌" },
        { title: "Backup", path: "/settings/backup", icon: "💾" },
        { title: "Billing", path: "/settings/billing", icon: "💳" },
      ],
    },
  ];

  const quickActions = [
    {
      title: "Add User",
      icon: "👤",
      color: "#3b82f6",
      action: () => console.log("Add User"),
    },
    {
      title: "New Project",
      icon: "📁",
      color: "#10b981",
      action: () => console.log("New Project"),
    },
    {
      title: "Send Message",
      icon: "💬",
      color: "#f59e0b",
      action: () => console.log("Send Message"),
    },
    {
      title: "Generate Report",
      icon: "📊",
      color: "#8b5cf6",
      action: () => console.log("Generate Report"),
    },
    {
      title: "Upload File",
      icon: "📤",
      color: "#ef4444",
      action: () => console.log("Upload File"),
    },
    {
      title: "Schedule Meeting",
      icon: "📅",
      color: "#06b6d4",
      action: () => console.log("Schedule Meeting"),
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const statsTimer = setTimeout(() => {
      setStats({
        totalUsers: 12567,
        revenue: 102340,
        orders: 1289,
        growth: 15.2,
      });
    }, 1000);

    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      clearInterval(timer);
      clearTimeout(statsTimer);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    console.log("Logging out...");
    navigate("/login");
  };

  const isActive = (path) => {
    return (
      location.pathname === path || location.pathname.startsWith(path + "/")
    );
  };

  const toggleSubmenu = (title) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case "create":
        return "➕";
      case "update":
        return "✏️";
      case "delete":
        return "🗑️";
      case "complete":
        return "✅";
      default:
        return "📝";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "online":
        return "#10b981";
      case "away":
        return "#f59e0b";
      case "offline":
        return "#6b7280";
      default:
        return "#6b7280";
    }
  };

  const completedTasks = tasks.filter((task) => task.completed).length;
  const taskCompletionRate = (completedTasks / tasks.length) * 100;

  const themeStyles = isDarkMode ? darkTheme : lightTheme;

  // Navigation Component
  const Navigation = () => (
    <div
      style={{
        ...styles.sidebar,
        ...themeStyles.sidebar,
        width: isNavCollapsed ? "80px" : "320px",
      }}
    >
      {/* Header */}
      <div style={{ ...styles.header, ...themeStyles.header }}>
        <div style={styles.logo}>
          {!isNavCollapsed && (
            <>
              <img
                src="/placeholder.svg?height=32&width=32"
                alt="Logo"
                style={styles.logoImage}
              />
              <span style={{ ...styles.logoText, ...themeStyles.logoText }}>
                DashBoard Pro
              </span>
            </>
          )}
          {isNavCollapsed && (
            <span style={{ ...styles.logoCollapsed, ...themeStyles.logoText }}>
              DP
            </span>
          )}
        </div>
        <div style={styles.headerActions}>
          <button
            style={{ ...styles.collapseButton, ...themeStyles.iconButton }}
            onClick={() => setIsNavCollapsed(!isNavCollapsed)}
          >
            {isNavCollapsed ? "→" : "←"}
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
                    ...(isActive(item.path)
                      ? {
                          ...styles.menuLinkActive,
                          ...themeStyles.menuLinkActive,
                        }
                      : {}),
                  }}
                  title={
                    isNavCollapsed ? `${item.title} ${item.shortcut || ""}` : ""
                  }
                  onClick={(e) => {
                    if (item.submenu) {
                      e.preventDefault();
                      toggleSubmenu(item.title);
                    }
                  }}
                >
                  <span style={styles.menuIcon}>{item.icon}</span>
                  {!isNavCollapsed && (
                    <>
                      <span style={styles.menuText}>{item.title}</span>
                      <div style={styles.menuRight}>
                        {item.badge && (
                          <span style={styles.menuBadge}>{item.badge}</span>
                        )}
                        {item.submenu && (
                          <span
                            style={{
                              ...styles.submenuArrow,
                              transform: expandedMenus[item.title]
                                ? "rotate(90deg)"
                                : "rotate(0deg)",
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
                {item.submenu &&
                  !isNavCollapsed &&
                  expandedMenus[item.title] && (
                    <ul style={{ ...styles.submenu, ...themeStyles.submenu }}>
                      {item.submenu.map((subItem) => (
                        <li key={subItem.path} style={styles.submenuItem}>
                          <Link
                            to={subItem.path}
                            style={{
                              ...styles.submenuLink,
                              ...themeStyles.submenuLink,
                              ...(isActive(subItem.path)
                                ? {
                                    ...styles.submenuLinkActive,
                                    ...themeStyles.submenuLinkActive,
                                  }
                                : {}),
                            }}
                          >
                            <span style={styles.submenuIcon}>
                              {subItem.icon}
                            </span>
                            <span style={styles.submenuText}>
                              {subItem.title}
                            </span>
                            {subItem.badge && (
                              <span style={styles.submenuBadge}>
                                {subItem.badge}
                              </span>
                            )}
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
            <img
              src="/placeholder.svg?height=40&width=40"
              alt="User Avatar"
              style={styles.avatarImage}
            />
            <div style={styles.onlineStatus}></div>
          </div>
          {!isNavCollapsed && (
            <div style={styles.userInfo}>
              <div style={{ ...styles.userName, ...themeStyles.text }}>
                John Doe
              </div>
              <div style={{ ...styles.userEmail, ...themeStyles.subText }}>
                john@example.com
              </div>
              <div style={styles.userStatus}>🟢 Online</div>
            </div>
          )}
          {!isNavCollapsed && (
            <span style={{ ...styles.dropdownIcon, ...themeStyles.subText }}>
              {showUserMenu ? "▲" : "▼"}
            </span>
          )}
        </div>

        {/* User Dropdown Menu */}
        {showUserMenu && !isNavCollapsed && (
          <div style={{ ...styles.userMenu, ...themeStyles.panel }}>
            <Link
              to="/profile"
              style={{ ...styles.userMenuItem, ...themeStyles.menuItem }}
            >
              👤 Profile
            </Link>
            <Link
              to="/account"
              style={{ ...styles.userMenuItem, ...themeStyles.menuItem }}
            >
              🔧 Account Settings
            </Link>
            <Link
              to="/preferences"
              style={{ ...styles.userMenuItem, ...themeStyles.menuItem }}
            >
              🎨 Preferences
            </Link>
            <Link
              to="/billing"
              style={{ ...styles.userMenuItem, ...themeStyles.menuItem }}
            >
              💳 Billing
            </Link>
            <div style={styles.divider}></div>
            <Link
              to="/help"
              style={{ ...styles.userMenuItem, ...themeStyles.menuItem }}
            >
              ❓ Help & Support
            </Link>
            <div style={styles.divider}></div>
            <button
              style={{ ...styles.logoutButton, ...themeStyles.logoutButton }}
              onClick={handleLogout}
            >
              🚪 Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div style={{ ...styles.container, ...themeStyles.container }}>
      <Navigation />

      <div
        style={{
          ...styles.mainContent,
          ...themeStyles.mainContent,
          marginLeft: isNavCollapsed ? "80px" : "320px",
        }}
      >
        {/* Enhanced Header */}
        <header style={{ ...styles.dashboardHeader, ...themeStyles.header }}>
          <div style={styles.headerLeft}>
            <h1 style={{ ...styles.pageTitle, ...themeStyles.pageTitle }}>
              Dashboard
            </h1>
            <p style={{ ...styles.pageSubtitle, ...themeStyles.pageSubtitle }}>
              Welcome back, John Doe! Here's what's happening today.
            </p>
            <div style={styles.headerInfo}>
              <span style={styles.currentTime}>
                🕐 {currentTime.toLocaleTimeString()}
              </span>
              <span style={styles.currentDate}>
                📅{" "}
                {currentTime.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span style={styles.weather}>
                {weather.icon} {weather.temp}°F {weather.condition}
              </span>
            </div>
          </div>
          <div style={styles.headerActions}>
            <div style={styles.searchContainer}>
              <input
                type="text"
                placeholder="Search dashboard..."
                style={{ ...styles.searchInput, ...themeStyles.searchInput }}
              />
              <button style={styles.searchButton}>🔍</button>
            </div>
            <div style={styles.notificationIcon}>
              🔔<span style={styles.notificationBadge}>3</span>
            </div>
            <button
              style={{ ...styles.actionButton, ...themeStyles.actionButton }}
            >
              📊 Generate Report
            </button>
            <button style={{ ...styles.actionButton, ...styles.primaryButton }}>
              ➕ Add New
            </button>
            <button
              style={{ ...styles.themeToggle, ...themeStyles.themeToggle }}
              onClick={() => setIsDarkMode(!isDarkMode)}
              title="Toggle theme"
            >
              {isDarkMode ? "☀️" : "🌙"}
            </button>
          </div>
        </header>

        {/* Enhanced Stats Cards */}
        <div style={styles.statsGrid}>
          <div
            style={{
              ...styles.statCard,
              ...styles.userCard,
              ...themeStyles.statCard,
            }}
          >
            <div style={styles.statHeader}>
              <div style={styles.statIcon}>👥</div>
              <div style={styles.trendUp}>📈 +{stats.growth}%</div>
            </div>
            <div style={styles.statContent}>
              <h3 style={{ ...styles.statValue, ...themeStyles.statValue }}>
                {stats.totalUsers.toLocaleString()}
              </h3>
              <p style={{ ...styles.statLabel, ...themeStyles.statLabel }}>
                Total Users
              </p>
              <div style={styles.userDetails}>
                <div style={styles.userBreakdown}>
                  <span style={styles.userStat}>Active: 8,234</span>
                  <span style={styles.userStat}>New: 1,234</span>
                  <span style={styles.userStat}>Premium: 3,099</span>
                </div>
                <div style={styles.userGrowth}>
                  <span style={styles.growthIndicator}>↗️ +15% this month</span>
                </div>
              </div>
              <div style={styles.progressBar}>
                <div style={{ ...styles.progressFill, width: "75%" }}></div>
              </div>
            </div>
          </div>

          <div
            style={{
              ...styles.statCard,
              ...styles.revenueCard,
              ...themeStyles.statCard,
            }}
          >
            <div style={styles.statHeader}>
              <div style={{ ...styles.statIcon, backgroundColor: "#dbeafe" }}>
                💰
              </div>
              <div style={styles.trendUp}>📈 +8.2%</div>
            </div>
            <div style={styles.statContent}>
              <h3
                style={{
                  ...styles.statValue,
                  ...styles.revenueValue,
                  ...themeStyles.statValue,
                }}
              >
                ${(stats.revenue / 1000).toFixed(1)}K
              </h3>
              <p style={{ ...styles.statLabel, ...themeStyles.statLabel }}>
                Total Revenue
              </p>
              <div style={styles.revenueDetails}>
                <span style={styles.revenueFullAmount}>
                  Full: ${stats.revenue.toLocaleString()}
                </span>
                <div style={styles.revenueBreakdown}>
                  <span style={styles.quarterStat}>Q1: $25,000</span>
                  <span style={styles.quarterStat}>Q2: $23,000</span>
                  <span style={styles.quarterStat}>Q3: $27,000</span>
                  <span style={styles.quarterStat}>Q4: $23,765</span>
                </div>
                <div style={styles.revenueGrowth}>
                  <span style={styles.growthIndicator}>📊 Target: $120K</span>
                  <span style={styles.growthIndicator}>🎯 85% achieved</span>
                </div>
              </div>
            </div>
          </div>

          <div style={{ ...styles.statCard, ...themeStyles.statCard }}>
            <div style={styles.statHeader}>
              <div style={styles.statIcon}>📦</div>
              <div style={styles.trendUp}>📈 +5.1%</div>
            </div>
            <div style={styles.statContent}>
              <h3 style={{ ...styles.statValue, ...themeStyles.statValue }}>
                {stats.orders.toLocaleString()}
              </h3>
              <p style={{ ...styles.statLabel, ...themeStyles.statLabel }}>
                Orders
              </p>
              <div style={styles.progressBar}>
                <div style={{ ...styles.progressFill, width: "60%" }}></div>
              </div>
            </div>
          </div>

          <div style={{ ...styles.statCard, ...themeStyles.statCard }}>
            <div style={styles.statHeader}>
              <div style={styles.statIcon}>📈</div>
              <div style={styles.trendUp}>📈 +2.3%</div>
            </div>
            <div style={styles.statContent}>
              <h3 style={{ ...styles.statValue, ...themeStyles.statValue }}>
                {stats.growth}%
              </h3>
              <p style={{ ...styles.statLabel, ...themeStyles.statLabel }}>
                Growth Rate
              </p>
              <div style={styles.progressBar}>
                <div style={{ ...styles.progressFill, width: "85%" }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Section */}
        <div
          style={{
            ...styles.quickActionsSection,
            ...themeStyles.quickActionsSection,
          }}
        >
          <h2 style={{ ...styles.sectionTitle, ...themeStyles.sectionTitle }}>
            Quick Actions
          </h2>
          <div style={styles.dashboardQuickActionsGrid}>
            {quickActions.map((action, index) => (
              <button
                key={index}
                style={{
                  ...styles.quickActionCard,
                  ...themeStyles.quickActionCard,
                  borderLeft: `4px solid ${action.color}`,
                }}
                onClick={action.action}
              >
                <div style={styles.quickActionIcon}>{action.icon}</div>
                <span style={styles.quickActionText}>{action.title}</span>
                <div style={styles.quickActionArrow}>→</div>
              </button>
            ))}
          </div>
        </div>

        {/* Enhanced Content Grid */}
        <div style={styles.contentGrid}>
          {/* Enhanced Chart Section */}
          <div style={{ ...styles.chartSection, ...themeStyles.chartSection }}>
            <div style={styles.sectionHeader}>
              <h2
                style={{ ...styles.sectionTitle, ...themeStyles.sectionTitle }}
              >
                Revenue & Users Overview
              </h2>
              <div style={styles.chartControls}>
                <select
                  style={{
                    ...styles.selectDropdown,
                    ...themeStyles.selectDropdown,
                  }}
                >
                  <option>Last 6 months</option>
                  <option>Last year</option>
                  <option>All time</option>
                </select>
                <div style={styles.chartLegend}>
                  <span style={styles.legendItem}>
                    <span
                      style={{
                        ...styles.legendColor,
                        backgroundColor: "#3b82f6",
                      }}
                    ></span>
                    Revenue
                  </span>
                  <span style={styles.legendItem}>
                    <span
                      style={{
                        ...styles.legendColor,
                        backgroundColor: "#10b981",
                      }}
                    ></span>
                    Users
                  </span>
                </div>
              </div>
            </div>
            <div style={styles.chartContainer}>
              <div style={styles.chart}>
                {chartData.map((item, index) => (
                  <div key={index} style={styles.chartBar}>
                    <div style={styles.barGroup}>
                      <div
                        style={{
                          ...styles.chartBarFill,
                          backgroundColor: "#3b82f6",
                          height: `${(item.revenue / 1000) * 100}%`,
                        }}
                      ></div>
                      <div
                        style={{
                          ...styles.chartBarFill,
                          backgroundColor: "#10b981",
                          height: `${(item.users / 600) * 100}%`,
                          marginLeft: "4px",
                        }}
                      ></div>
                    </div>
                    <span
                      style={{
                        ...styles.chartLabel,
                        ...themeStyles.chartLabel,
                      }}
                    >
                      {item.month}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tasks & Calendar Section */}
          <div style={styles.rightColumn}>
            {/* Tasks Section */}
            <div
              style={{ ...styles.tasksSection, ...themeStyles.tasksSection }}
            >
              <div style={styles.sectionHeader}>
                <h2
                  style={{
                    ...styles.sectionTitle,
                    ...themeStyles.sectionTitle,
                  }}
                >
                  Tasks
                </h2>
                <span style={styles.taskProgress}>
                  {completedTasks}/{tasks.length}
                </span>
              </div>
              <div style={styles.tasksList}>
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    style={{ ...styles.taskItem, ...themeStyles.taskItem }}
                  >
                    <input
                      type="checkbox"
                      checked={task.completed}
                      style={styles.taskCheckbox}
                      readOnly
                    />
                    <span
                      style={{
                        ...styles.taskText,
                        ...themeStyles.taskText,
                        textDecoration: task.completed
                          ? "line-through"
                          : "none",
                        opacity: task.completed ? 0.6 : 1,
                      }}
                    >
                      {task.title}
                    </span>
                    <span
                      style={{
                        ...styles.priorityBadge,
                        backgroundColor:
                          task.priority === "high"
                            ? "#ef4444"
                            : task.priority === "medium"
                            ? "#f59e0b"
                            : "#10b981",
                      }}
                    >
                      {task.priority}
                    </span>
                  </div>
                ))}
              </div>
              <div style={styles.progressBar}>
                <div
                  style={{
                    ...styles.progressFill,
                    width: `${taskCompletionRate}%`,
                  }}
                ></div>
              </div>
            </div>

            {/* Calendar Section */}
            <div
              style={{
                ...styles.calendarSection,
                ...themeStyles.calendarSection,
              }}
            >
              <div style={styles.sectionHeader}>
                <h2
                  style={{
                    ...styles.sectionTitle,
                    ...themeStyles.sectionTitle,
                  }}
                >
                  Upcoming Events
                </h2>
                <button style={styles.viewAllButton}>View All</button>
              </div>
              <div style={styles.eventsList}>
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    style={{ ...styles.eventItem, ...themeStyles.eventItem }}
                  >
                    <div style={styles.eventTime}>
                      <span style={styles.eventDate}>{event.date}</span>
                      <span
                        style={{
                          ...styles.eventTimeText,
                          ...themeStyles.eventTimeText,
                        }}
                      >
                        {event.time}
                      </span>
                    </div>
                    <span
                      style={{
                        ...styles.eventTitle,
                        ...themeStyles.eventTitle,
                      }}
                    >
                      {event.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics & Team Section */}
        <div style={styles.bottomGrid}>
          {/* Performance Metrics */}
          <div
            style={{
              ...styles.performanceSection,
              ...themeStyles.performanceSection,
            }}
          >
            <h2 style={{ ...styles.sectionTitle, ...themeStyles.sectionTitle }}>
              Performance Metrics
            </h2>
            <div style={styles.metricsGrid}>
              {performanceMetrics.map((metric, index) => (
                <div key={index} style={styles.metricItem}>
                  <div style={styles.circularProgress}>
                    <svg width="90" height="90" style={styles.progressSvg}>
                      <circle
                        cx="45"
                        cy="45"
                        r="38"
                        stroke="#e5e7eb"
                        strokeWidth="8"
                        fill="none"
                      />
                      <circle
                        cx="45"
                        cy="45"
                        r="38"
                        stroke={metric.color}
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${(metric.value / 100) * 238} 238`}
                        strokeLinecap="round"
                        transform="rotate(-90 45 45)"
                      />
                    </svg>
                    <span
                      style={{
                        ...styles.progressValue,
                        ...themeStyles.progressValue,
                      }}
                    >
                      {metric.value}%
                    </span>
                  </div>
                  <span
                    style={{
                      ...styles.metricLabel,
                      ...themeStyles.metricLabel,
                    }}
                  >
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Team Members */}
          <div style={{ ...styles.teamSection, ...themeStyles.teamSection }}>
            <div style={styles.sectionHeader}>
              <h2
                style={{ ...styles.sectionTitle, ...themeStyles.sectionTitle }}
              >
                Team Members
              </h2>
              <button style={styles.viewAllButton}>View All</button>
            </div>
            <div style={styles.teamGrid}>
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  style={{ ...styles.teamMember, ...themeStyles.teamMember }}
                >
                  <div style={styles.memberAvatar}>
                    <img
                      src={member.avatar || "/placeholder.svg"}
                      alt={member.name}
                      style={styles.avatarImage}
                    />
                    <div
                      style={{
                        ...styles.statusDot,
                        backgroundColor: getStatusColor(member.status),
                      }}
                    ></div>
                  </div>
                  <div style={styles.memberInfo}>
                    <span
                      style={{
                        ...styles.memberName,
                        ...themeStyles.memberName,
                      }}
                    >
                      {member.name}
                    </span>
                    <span
                      style={{
                        ...styles.memberStatus,
                        ...themeStyles.memberStatus,
                      }}
                    >
                      {member.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div
            style={{
              ...styles.activitySection,
              ...themeStyles.activitySection,
            }}
          >
            <div style={styles.sectionHeader}>
              <h2
                style={{ ...styles.sectionTitle, ...themeStyles.sectionTitle }}
              >
                Recent Activity
              </h2>
              <button style={styles.viewAllButton}>View All</button>
            </div>
            <div style={styles.activityList}>
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  style={{
                    ...styles.activityItem,
                    ...themeStyles.activityItem,
                  }}
                >
                  <div
                    style={{
                      ...styles.activityIcon,
                      ...themeStyles.activityIcon,
                    }}
                  >
                    {getActivityIcon(activity.type)}
                  </div>
                  <div style={styles.activityContent}>
                    <p
                      style={{
                        ...styles.activityText,
                        ...themeStyles.activityText,
                      }}
                    >
                      <strong>{activity.user}</strong> {activity.action}
                    </p>
                    <span
                      style={{
                        ...styles.activityTime,
                        ...themeStyles.activityTime,
                      }}
                    >
                      {activity.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  // Navigation Styles
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
  collapseButton: {
    fontSize: "1.1rem",
    cursor: "pointer",
    padding: "0.6rem",
    borderRadius: "6px",
    transition: "background-color 0.2s ease",
    background: "none",
    border: "none",
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
  // Dashboard Styles
  mainContent: {
    flex: 1,
    padding: "2rem",
    transition: "margin-left 0.3s ease",
    minHeight: "100vh",
  },
  dashboardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "2.5rem",
    paddingBottom: "2rem",
    borderBottom: "1px solid #e2e8f0",
    padding: "2rem",
    borderRadius: "16px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
  },
  headerLeft: {
    flex: 1,
  },
  pageTitle: {
    fontSize: "2.5rem",
    fontWeight: "700",
    margin: "0 0 0.75rem 0",
    letterSpacing: "-0.025em",
  },
  pageSubtitle: {
    fontSize: "1.1rem",
    margin: "0 0 1.5rem 0",
    fontWeight: "400",
  },
  headerInfo: {
    display: "flex",
    gap: "1.5rem",
    flexWrap: "wrap",
  },
  currentTime: {
    fontSize: "0.95rem",
    color: "#3b82f6",
    fontWeight: "600",
    backgroundColor: "#eff6ff",
    padding: "0.6rem 1.2rem",
    borderRadius: "25px",
    border: "1px solid #dbeafe",
  },
  currentDate: {
    fontSize: "0.95rem",
    color: "#10b981",
    fontWeight: "500",
    backgroundColor: "#ecfdf5",
    padding: "0.6rem 1.2rem",
    borderRadius: "25px",
    border: "1px solid #d1fae5",
  },
  weather: {
    fontSize: "0.95rem",
    color: "#f59e0b",
    fontWeight: "500",
    backgroundColor: "#fffbeb",
    padding: "0.6rem 1.2rem",
    borderRadius: "25px",
    border: "1px solid #fed7aa",
  },
  searchContainer: {
    position: "relative",
  },
  searchInput: {
    padding: "0.8rem 3rem 0.8rem 1.2rem",
    border: "1px solid #e2e8f0",
    borderRadius: "30px",
    fontSize: "0.95rem",
    width: "280px",
    outline: "none",
    transition: "all 0.2s ease",
  },
  searchButton: {
    position: "absolute",
    right: "1rem",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    color: "#3b82f6",
    cursor: "pointer",
    fontSize: "1.1rem",
  },
  notificationIcon: {
    position: "relative",
    fontSize: "1.6rem",
    cursor: "pointer",
    padding: "0.6rem",
  },
  notificationBadge: {
    position: "absolute",
    top: "0",
    right: "0",
    backgroundColor: "#ef4444",
    color: "white",
    borderRadius: "50%",
    width: "22px",
    height: "22px",
    fontSize: "0.75rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "600",
  },
  actionButton: {
    padding: "0.8rem 1.8rem",
    border: "1px solid #3b82f6",
    borderRadius: "30px",
    fontSize: "0.95rem",
    cursor: "pointer",
    transition: "all 0.2s ease",
    fontWeight: "500",
    boxShadow: "0 2px 8px rgba(59, 130, 246, 0.2)",
    backgroundColor: "#3b82f6",
    color: "white",
  },
  primaryButton: {
    backgroundColor: "#1d4ed8",
    color: "white",
    border: "1px solid #1d4ed8",
    boxShadow: "0 4px 12px rgba(29, 78, 216, 0.3)",
  },
  themeToggle: {
    padding: "0.8rem",
    border: "1px solid #e2e8f0",
    borderRadius: "50%",
    fontSize: "1.2rem",
    cursor: "pointer",
    transition: "all 0.2s ease",
    fontWeight: "500",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
    width: "48px",
    height: "48px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
    gap: "2rem",
    marginBottom: "3rem",
  },
  statCard: {
    padding: "2.5rem",
    borderRadius: "16px",
    boxShadow: "0 8px 25px rgba(59, 130, 246, 0.15)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    background:
      "linear-gradient(135deg, #eff6ff 0%, #dbeafe 50%, #bfdbfe 100%)",
    border: "1px solid #93c5fd",
  },
  userCard: {
    minHeight: "280px",
    background:
      "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #bae6fd 100%)",
    border: "1px solid #7dd3fc",
  },
  revenueCard: {
    minHeight: "280px",
    backgroundColor: "#f0fdfa",
    border: "1px solid #d1fae5",
  },
  statHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
  },
  statIcon: {
    fontSize: "2.5rem",
    padding: "1.5rem",
    backgroundColor: "#f8fafc",
    borderRadius: "16px",
    border: "1px solid #e2e8f0",
  },
  trendUp: {
    fontSize: "0.9rem",
    color: "#10b981",
    fontWeight: "600",
    backgroundColor: "#ecfdf5",
    padding: "0.5rem 1.2rem",
    borderRadius: "20px",
    border: "1px solid #d1fae5",
  },
  statContent: {
    flex: 1,
  },
  statValue: {
    fontSize: "2.8rem",
    fontWeight: "700",
    margin: "0 0 0.5rem 0",
    letterSpacing: "-0.025em",
  },
  revenueValue: {
    fontSize: "3rem",
    color: "#065f46",
  },
  statLabel: {
    fontSize: "1.1rem",
    margin: "0 0 1.5rem 0",
    fontWeight: "500",
  },
  progressBar: {
    width: "100%",
    height: "8px",
    backgroundColor: "#e5e7eb",
    borderRadius: "4px",
    overflow: "hidden",
    marginTop: "1rem",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#3b82f6",
    borderRadius: "4px",
    transition: "width 0.3s ease",
  },
  userDetails: {
    marginBottom: "1rem",
  },
  userBreakdown: {
    display: "flex",
    gap: "1rem",
    marginBottom: "0.8rem",
    flexWrap: "wrap",
  },
  userStat: {
    fontSize: "0.85rem",
    color: "#374151",
    backgroundColor: "#f8fafc",
    padding: "0.4rem 0.8rem",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
  },
  userGrowth: {
    display: "flex",
    gap: "0.5rem",
  },
  growthIndicator: {
    fontSize: "0.8rem",
    color: "#10b981",
    fontWeight: "500",
  },
  revenueDetails: {
    marginBottom: "1rem",
  },
  revenueFullAmount: {
    fontSize: "0.9rem",
    color: "#374151",
    backgroundColor: "#f8fafc",
    padding: "0.5rem 1rem",
    borderRadius: "8px",
    display: "inline-block",
    border: "1px solid #e2e8f0",
    marginBottom: "0.8rem",
  },
  revenueBreakdown: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "0.5rem",
    marginBottom: "0.8rem",
  },
  quarterStat: {
    fontSize: "0.8rem",
    color: "#374151",
    backgroundColor: "#f8fafc",
    padding: "0.4rem 0.8rem",
    borderRadius: "6px",
    border: "1px solid #e2e8f0",
    textAlign: "center",
  },
  revenueGrowth: {
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap",
  },
  quickActionsSection: {
    padding: "2rem",
    borderRadius: "16px",
    boxShadow: "0 6px 20px rgba(59, 130, 246, 0.1)",
    marginBottom: "3rem",
    background: "linear-gradient(135deg, #fefbff 0%, #f8fafc 100%)",
    border: "1px solid #e2e8f0",
  },
  dashboardQuickActionsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "1.5rem",
    marginTop: "1.5rem",
  },
  quickActionCard: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    padding: "1.5rem",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    fontSize: "0.95rem",
    fontWeight: "500",
    border: "1px solid #60a5fa",
    position: "relative",
    background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
    boxShadow: "0 4px 12px rgba(96, 165, 250, 0.1)",
  },
  quickActionArrow: {
    fontSize: "1.2rem",
    color: "#6b7280",
    transition: "transform 0.2s ease",
  },
  contentGrid: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "2.5rem",
    marginBottom: "3rem",
  },
  chartSection: {
    padding: "2rem",
    borderRadius: "16px",
    boxShadow: "0 6px 20px rgba(59, 130, 246, 0.1)",
    background: "linear-gradient(135deg, #fefbff 0%, #f8fafc 100%)",
    border: "1px solid #e2e8f0",
  },
  rightColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
  },
  sectionTitle: {
    fontSize: "1.4rem",
    fontWeight: "600",
    margin: 0,
  },
  chartControls: {
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
  },
  selectDropdown: {
    padding: "0.6rem 1rem",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    fontSize: "0.9rem",
  },
  chartLegend: {
    display: "flex",
    gap: "1.5rem",
  },
  legendItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.6rem",
    fontSize: "0.85rem",
    color: "#6b7280",
    fontWeight: "500",
  },
  legendColor: {
    width: "14px",
    height: "14px",
    borderRadius: "3px",
  },
  chartContainer: {
    height: "320px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  chart: {
    display: "flex",
    alignItems: "end",
    gap: "1.5rem",
    height: "220px",
    width: "100%",
  },
  chartBar: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
  },
  barGroup: {
    display: "flex",
    alignItems: "end",
    height: "100%",
    width: "100%",
    justifyContent: "center",
  },
  chartBarFill: {
    width: "24px",
    borderRadius: "4px 4px 0 0",
    transition: "height 0.3s ease",
    minHeight: "20px",
  },
  chartLabel: {
    fontSize: "0.85rem",
    marginTop: "0.8rem",
    fontWeight: "500",
  },
  tasksSection: {
    padding: "2rem",
    borderRadius: "16px",
    boxShadow: "0 6px 20px rgba(59, 130, 246, 0.1)",
    background: "linear-gradient(135deg, #fefbff 0%, #f8fafc 100%)",
    border: "1px solid #e2e8f0",
  },
  taskProgress: {
    fontSize: "0.9rem",
    color: "#3b82f6",
    fontWeight: "600",
    backgroundColor: "#eff6ff",
    padding: "0.4rem 1rem",
    borderRadius: "20px",
    border: "1px solid #dbeafe",
  },
  tasksList: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    marginBottom: "1.5rem",
  },
  taskItem: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    padding: "1rem",
    borderRadius: "10px",
    border: "1px solid #e2e8f0",
  },
  taskCheckbox: {
    width: "18px",
    height: "18px",
    accentColor: "#3b82f6",
  },
  taskText: {
    flex: 1,
    fontSize: "0.95rem",
    fontWeight: "500",
  },
  priorityBadge: {
    fontSize: "0.7rem",
    color: "white",
    padding: "0.3rem 0.6rem",
    borderRadius: "12px",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  calendarSection: {
    padding: "2rem",
    borderRadius: "16px",
    boxShadow: "0 6px 20px rgba(59, 130, 246, 0.1)",
    background: "linear-gradient(135deg, #fefbff 0%, #f8fafc 100%)",
    border: "1px solid #e2e8f0",
  },
  eventsList: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  eventItem: {
    display: "flex",
    alignItems: "center",
    gap: "1.2rem",
    padding: "1rem",
    borderRadius: "10px",
    border: "1px solid #e2e8f0",
  },
  eventTime: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minWidth: "70px",
  },
  eventDate: {
    fontSize: "0.7rem",
    color: "#3b82f6",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  eventTimeText: {
    fontSize: "0.85rem",
    fontWeight: "500",
  },
  eventTitle: {
    fontSize: "0.95rem",
    fontWeight: "500",
  },
  viewAllButton: {
    padding: "0.6rem 1.2rem",
    border: "none",
    backgroundColor: "#2563eb",
    color: "white",
    borderRadius: "8px",
    fontSize: "0.85rem",
    cursor: "pointer",
    fontWeight: "500",
    transition: "all 0.2s ease",
    boxShadow: "0 2px 6px rgba(37, 99, 235, 0.2)",
  },
  bottomGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "2.5rem",
  },
  performanceSection: {
    padding: "2rem",
    borderRadius: "16px",
    boxShadow: "0 6px 20px rgba(59, 130, 246, 0.1)",
    background: "linear-gradient(135deg, #fefbff 0%, #f8fafc 100%)",
    border: "1px solid #e2e8f0",
  },
  metricsGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    marginTop: "1.5rem",
  },
  metricItem: {
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
  },
  circularProgress: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  progressSvg: {
    transform: "rotate(-90deg)",
  },
  progressValue: {
    position: "absolute",
    fontSize: "1rem",
    fontWeight: "700",
  },
  metricLabel: {
    fontSize: "0.95rem",
    fontWeight: "500",
  },
  teamSection: {
    padding: "2rem",
    borderRadius: "16px",
    boxShadow: "0 6px 20px rgba(59, 130, 246, 0.1)",
    background: "linear-gradient(135deg, #fefbff 0%, #f8fafc 100%)",
    border: "1px solid #e2e8f0",
  },
  teamGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "1.2rem",
  },
  teamMember: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    padding: "1rem",
    borderRadius: "10px",
    border: "1px solid #e2e8f0",
  },
  memberAvatar: {
    position: "relative",
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    overflow: "hidden",
  },
  statusDot: {
    position: "absolute",
    bottom: "2px",
    right: "2px",
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    border: "2px solid white",
  },
  memberInfo: {
    display: "flex",
    flexDirection: "column",
  },
  memberName: {
    fontSize: "0.95rem",
    fontWeight: "600",
  },
  memberStatus: {
    fontSize: "0.8rem",
    textTransform: "capitalize",
    fontWeight: "500",
  },
  activitySection: {
    padding: "2rem",
    borderRadius: "16px",
    boxShadow: "0 6px 20px rgba(59, 130, 246, 0.1)",
    background: "linear-gradient(135deg, #fefbff 0%, #f8fafc 100%)",
    border: "1px solid #e2e8f0",
  },
  activityList: {
    display: "flex",
    flexDirection: "column",
    gap: "1.2rem",
  },
  activityItem: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    padding: "1rem",
    borderRadius: "10px",
    border: "1px solid #e2e8f0",
  },
  activityIcon: {
    fontSize: "1.3rem",
    padding: "0.6rem",
    borderRadius: "50%",
    border: "1px solid #e2e8f0",
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: "0.95rem",
    margin: "0 0 0.3rem 0",
    fontWeight: "500",
  },
  activityTime: {
    fontSize: "0.8rem",
    fontWeight: "500",
  },
};

const lightTheme = {
  container: {
    backgroundColor: "#f8fafc",
  },
  mainContent: {
    backgroundColor: "#f8fafc",
  },
  sidebar: {
    backgroundColor: "#ffffff",
    color: "#1f2937",
    borderRight: "1px solid #e2e8f0",
  },
  header: {
    backgroundColor: "white",
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
  pageTitle: {
    color: "#1f2937",
  },
  pageSubtitle: {
    color: "#6b7280",
  },
  searchInput: {
    backgroundColor: "#f8fafc",
    color: "#1f2937",
  },
  actionButton: {
    backgroundColor: "#dbeafe",
    color: "#1d4ed8",
  },
  themeToggle: {
    backgroundColor: "white",
    color: "#374151",
    border: "1px solid #e2e8f0",
  },
  statCard: {
    background:
      "linear-gradient(135deg, #eff6ff 0%, #dbeafe 50%, #bfdbfe 100%)",
    border: "1px solid #93c5fd",
  },
  statValue: {
    color: "#1f2937",
  },
  statLabel: {
    color: "#6b7280",
  },
  quickActionsSection: {
    background: "linear-gradient(135deg, #fefbff 0%, #f8fafc 100%)",
  },
  quickActionCard: {
    background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
    border: "1px solid #60a5fa",
  },
  sectionTitle: {
    color: "#1f2937",
  },
  chartSection: {
    background: "linear-gradient(135deg, #fefbff 0%, #f8fafc 100%)",
  },
  selectDropdown: {
    backgroundColor: "white",
    color: "#374151",
  },
  chartLabel: {
    color: "#6b7280",
  },
  tasksSection: {
    background: "linear-gradient(135deg, #fefbff 0%, #f8fafc 100%)",
  },
  taskItem: {
    backgroundColor: "#f8fafc",
  },
  taskText: {
    color: "#1f2937",
  },
  calendarSection: {
    background: "linear-gradient(135deg, #fefbff 0%, #f8fafc 100%)",
  },
  eventItem: {
    backgroundColor: "#f8fafc",
  },
  eventTimeText: {
    color: "#6b7280",
  },
  eventTitle: {
    color: "#1f2937",
  },
  performanceSection: {
    background: "linear-gradient(135deg, #fefbff 0%, #f8fafc 100%)",
  },
  progressValue: {
    color: "#1f2937",
  },
  metricLabel: {
    color: "#6b7280",
  },
  teamSection: {
    background: "linear-gradient(135deg, #fefbff 0%, #f8fafc 100%)",
  },
  teamMember: {
    backgroundColor: "#f8fafc",
  },
  memberName: {
    color: "#1f2937",
  },
  memberStatus: {
    color: "#6b7280",
  },
  activitySection: {
    background: "linear-gradient(135deg, #fefbff 0%, #f8fafc 100%)",
  },
  activityItem: {
    backgroundColor: "#f8fafc",
  },
  activityIcon: {
    color: "#6b7280",
  },
  activityText: {
    color: "#1f2937",
  },
  activityTime: {
    color: "#6b7280",
  },
  viewAllButton: {
    backgroundColor: "#3b82f6",
  },
};

const darkTheme = {
  container: {
    backgroundColor: "#0f172a",
  },
  mainContent: {
    backgroundColor: "#0f172a",
  },
  sidebar: {
    backgroundColor: "#1e293b",
    color: "white",
    borderRight: "1px solid #334155",
  },
  header: {
    backgroundColor: "#1e293b",
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
  pageTitle: {
    color: "white",
  },
  pageSubtitle: {
    color: "#cbd5e1",
  },
  searchInput: {
    backgroundColor: "#334155",
    color: "white",
    border: "1px solid #475569",
  },
  actionButton: {
    backgroundColor: "#334155",
    color: "#cbd5e1",
    border: "1px solid #475569",
  },
  themeToggle: {
    backgroundColor: "#334155",
    color: "#cbd5e1",
    border: "1px solid #475569",
  },
  statCard: {
    backgroundColor: "#1e293b",
    border: "1px solid #334155",
  },
  statValue: {
    color: "white",
  },
  statLabel: {
    color: "#cbd5e1",
  },
  quickActionsSection: {
    backgroundColor: "#1e293b",
    border: "1px solid #334155",
  },
  quickActionCard: {
    backgroundColor: "#334155",
    color: "#cbd5e1",
    border: "1px solid #475569",
  },
  sectionTitle: {
    color: "white",
  },
  chartSection: {
    backgroundColor: "#1e293b",
    border: "1px solid #334155",
  },
  selectDropdown: {
    backgroundColor: "#334155",
    color: "#cbd5e1",
    border: "1px solid #475569",
  },
  chartLabel: {
    color: "#cbd5e1",
  },
  tasksSection: {
    backgroundColor: "#1e293b",
    border: "1px solid #334155",
  },
  taskItem: {
    backgroundColor: "#334155",
    border: "1px solid #475569",
  },
  taskText: {
    color: "#cbd5e1",
  },
  calendarSection: {
    backgroundColor: "#1e293b",
    border: "1px solid #334155",
  },
  eventItem: {
    backgroundColor: "#334155",
    border: "1px solid #475569",
  },
  eventTimeText: {
    color: "#cbd5e1",
  },
  eventTitle: {
    color: "white",
  },
  performanceSection: {
    backgroundColor: "#1e293b",
    border: "1px solid #334155",
  },
  progressValue: {
    color: "white",
  },
  metricLabel: {
    color: "#cbd5e1",
  },
  teamSection: {
    backgroundColor: "#1e293b",
    border: "1px solid #334155",
  },
  teamMember: {
    backgroundColor: "#334155",
    border: "1px solid #475569",
  },
  memberName: {
    color: "white",
  },
  memberStatus: {
    color: "#cbd5e1",
  },
  activitySection: {
    backgroundColor: "#1e293b",
    border: "1px solid #334155",
  },
  activityItem: {
    backgroundColor: "#334155",
    border: "1px solid #475569",
  },
  activityIcon: {
    backgroundColor: "#1e293b",
    border: "1px solid #475569",
  },
  activityText: {
    color: "#cbd5e1",
  },
  activityTime: {
    color: "#94a3b8",
  },
  viewAllButton: {
    backgroundColor: "#3b82f6",
  },
};

export default Dashboard;
