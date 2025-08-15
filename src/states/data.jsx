// Dashboard Data
export const statCards = [
  {
    title: "Customer Quick Stats",
    description: "Overview of your customer base and engagement.",
    stats: [
      {
        value: "1,250",
        label: "Total Customers",
        color: "text-blue-500 text-2xl font-bold",
      },
      { value: "980", label: "Active Now", color: "text-lg text-gray-800" },
    ],
    button: { text: "View Customers", variant: "secondary" },
  },
  {
    title: "Transaction Overview",
    description: "Summary of loyalty points and transaction activity.",
    stats: [
      {
        value: "4,820",
        label: "Total Transactions",
        color: "text-orange-500 text-2xl font-bold",
      },
      {
        value: "95,000",
        label: "Points Awarded",
        color: "text-lg text-gray-800",
      },
    ],
    button: { text: "Process Transaction", variant: "secondary" },
  },
];

export const quickLinks = [
  {
    icon: "FaMoneyBill1Wave",
    text: "Manage Subscription",
  },
  {
    icon: "FaNetworkWired",
    text: "Update Points Manually",
  },
  {
    icon: "FaBuildingCircleArrowRight",
    text: "Business Profile Settings",
  },
];

// Navigation Data
export const navigationItems = [
  {
    to: "/",
    icon: "FaHome",
    label: "Dashboard"
  },
  {
    to: "/card-design",
    icon: "FaPalette",
    label: "Card Design"
  },
  {
    to: "/customers",
    icon: "FaUsers",
    label: "Customers"
  },
  {
    to: "/transactions",
    icon: "FaExchangeAlt",
    label: "Transactions"
  },
  {
    to: "/settings",
    icon: "FaCog",
    label: "Settings"
  }
];

// Route Configuration
export const ROUTES = [
  {
    path: "/",
    element: "Dashboard",
    showNavbar: true,
  },
  {
    path: "/card-design",
    element: "CardDesign",
    showNavbar: true,
  },
  {
    path: "/customers",
    element: "Customers",
    showNavbar: true,
  },
  {
    path: "/join/:vendor_id",
    element: "CustomerForm",
    showNavbar: false,
    showSidebar: false,
  },
  {
    path: "/transactions",
    element: "Transactions",
    showNavbar: true,
  },
  {
    path: "/settings",
    element: "Settings",
    showNavbar: true,
  },
  {
    path: "/process",
    element: "ProcessTransaction",
    showNavbar: true,
  },
  {
    path: "/signup",
    element: "Auth",
    showNavbar: false,
  },
];

export const routes = [
  {
    path: '/',
    component: 'Dashboard'
  },
  {
    path: '/customers',
    component: 'Customers'
  },
  {
    path: '/transactions',
    component: 'Transactions'
  },
  {
    path: '/process',
    component: 'ProcessTransaction'
  },
  {
    path: '/card-design',
    component: 'CardDesign'
  },
  {
    path: '/settings',
    component: 'Settings'
  }
];

// Layout Configuration
export const hideNavbarRoutes = ['/signup', '/login', '/forgot-password'];
export const hideSidebarRoutes = ['/join', '/signup', '/login', '/forgot-password'];

// Card Design Data
export const headerFieldOptions = [
  { id: "cardNumber", label: "Card Number" },
  { id: "customerName", label: "Customer Name" },
  { id: "points", label: "Points" }
];

export const secondaryFieldOptions = [
  { id: "cardNumber", label: "Card Number" },
  { id: "customerName", label: "Customer Name" },
  { id: "points", label: "Points" },
  { id: "email", label: "Email" },
  { id: "phone", label: "Phone" },
  { id: "joinDate", label: "Join Date" }
];

// Customer Data
export const customerData = [
  {
    id: 'CUST001',
    name: 'Alice Smith',
    email: 'alice.s@example.com',
    points: 1250,
    joinDate: '2024-01-15',
    updatedAt: '2024-07-28',
    status: 'active'
  },
  {
    id: 'CUST002',
    name: 'Bob Johnson',
    email: 'bob.j@example.com',
    points: 3400,
    joinDate: '2024-02-01',
    updatedAt: '2024-07-29',
    status: 'vip'
  },
  {
    id: 'CUST003',
    name: 'Charlie Brown',
    email: 'charlie.b@example.com',
    points: 500,
    joinDate: '2023-12-10',
    updatedAt: '2024-07-20',
    status: 'inactive'
  },
  {
    id: 'CUST004',
    name: 'Diana Prince',
    email: 'diana.p@example.com',
    points: 780,
    joinDate: '2024-03-05',
    updatedAt: '2024-07-27',
    status: 'active'
  },
  {
    id: 'CUST005',
    name: 'Eve Adams',
    email: 'eve.a@example.com',
    points: 100,
    joinDate: '2024-07-20',
    updatedAt: '2024-07-25',
    status: 'new'
  },
  {
    id: 'CUST006',
    name: 'Frank White',
    email: 'frank.w@example.com',
    points: 2100,
    joinDate: '2024-01-30',
    updatedAt: '2024-07-26',
    status: 'vip'
  }
];

export const customerHeaders = [
  { label: 'Customer ID', key: 'id', width: '15%' },
  { label: 'Name', key: 'name', width: '15%' },
  { label: 'Email', key: 'email', width: '20%', ellipsis: true },
  { 
    label: 'Loyalty Points', 
    key: 'points', 
    width: '15%',
    align: 'center',
    render: (value) => (
      <div className="text-center">
        <span className="text-blue-600 font-medium">
          {value.toLocaleString()}
        </span>
      </div>
    )
  },
  { 
    label: 'Joined Date', 
    key: 'joinDate', 
    width: '12%', 
    render: (date) => new Date(date).toLocaleDateString() 
  },
  { 
    label: 'Updated At', 
    key: 'updatedAt', 
    width: '12%', 
    render: (date) => new Date(date).toLocaleDateString() 
  },
  {
    label: 'Actions',
    key: 'actions',
    width: '10%',
    render: (_, record) => (
      <div className="flex gap-3">
        <button className="text-blue-600 hover:text-blue-800">Edit</button>
        <button className="text-red-600 hover:text-red-800">Delete</button>
      </div>
    )
  }
];

// Transaction Data
export const transactionData = [
  {
    id: 'TXN001',
    date: '2024-07-20',
    customerName: 'Alice Johnson',
    pointsChange: 150,
    paymentReceived: 25.00,
    type: 'Earned'
  },
  {
    id: 'TXN002',
    date: '2024-07-19',
    customerName: 'Bob Williams',
    pointsChange: -200,
    paymentReceived: 0,
    type: 'Redeemed'
  },
  {
    id: 'TXN003',
    date: '2024-07-18',
    customerName: 'Alice Johnson',
    pointsChange: 50,
    paymentReceived: 10.00,
    type: 'Earned'
  },
  {
    id: 'TXN004',
    date: '2024-07-17',
    customerName: 'Charlie Brown',
    pointsChange: 75,
    paymentReceived: 15.00,
    type: 'Earned'
  },
  {
    id: 'TXN005',
    date: '2024-07-16',
    customerName: 'Diana Prince',
    pointsChange: 100,
    paymentReceived: 20.00,
    type: 'Earned'
  }
];

export const transactionHeaders = [
  { 
    label: 'Transaction ID', 
    key: 'id', 
    width: '15%' 
  },
  { 
    label: 'Date', 
    key: 'date', 
    width: '15%',
    render: (date) => new Date(date).toLocaleDateString()
  },
  { 
    label: 'Customer Name', 
    key: 'customerName', 
    width: '25%' 
  },
  { 
    label: 'Points Change', 
    key: 'pointsChange', 
    width: '20%',
    align: 'center',
    render: (value) => (
      <div className={`text-center ${value > 0 ? 'text-green-600' : 'text-red-600'}`}>
        <span className="font-medium">
          {value > 0 ? `+${value}` : value}
        </span>
      </div>
    )
  },
  { 
    label: 'Payment Received', 
    key: 'paymentReceived', 
    width: '15%',
    align: 'right',
    render: (value) => (
      <div className="text-right">
        <span className="font-medium">
          ${value.toFixed(2)}
        </span>
      </div>
    )
  }
];
