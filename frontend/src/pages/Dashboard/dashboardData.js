import {
  FiPackage,
  FiCheckCircle,
  FiUsers,
  FiTool,
  FiClock,
  FiUser
} from "react-icons/fi";

export const defaultDashboardData = {
  kpiData: [
    {
      title: "Total Assets",
      value: 0,
      icon: FiPackage,
      subtitle: "Registered assets"
    },
    {
      title: "Available Assets",
      value: 0,
      icon: FiCheckCircle,
      iconColor: "#10b981",
      subtitle: "Ready for allocation"
    },
    {
      title: "Allocated Assets",
      value: 0,
      icon: FiUsers,
      iconColor: "#3b82f6",
      subtitle: "Currently assigned"
    },
    {
      title: "Under Maintenance",
      value: 0,
      icon: FiTool,
      iconColor: "#db2777",
      subtitle: "Maintenance requests"
    },
    {
      title: "Pending Requests",
      value: 0,
      icon: FiClock,
      iconColor: "#f59e0b",
      subtitle: "Awaiting approval"
    },
    {
      title: "Active Employees",
      value: 0,
      icon: FiUser,
      iconColor: "#6366f1",
      subtitle: "Registered employees"
    }
  ],
  categories: [],
  statusStats: [],
  recentActivities: [],
  pendingActions: []
};
