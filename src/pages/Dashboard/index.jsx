import React, {useState, useEffect} from "react";
import Button from "../../Components/base/Button";
import loyaltyCard from "../../../public/loyalty.jpg";
import { FaNetworkWired } from "react-icons/fa";
import { FaBuildingCircleArrowRight, FaMoneyBill1Wave } from "react-icons/fa6";
import { useUser } from "../../states/contexts/User";
import { loadStatistics } from "../../states/app";
import { useNavigate } from "react-router-dom";
function StatCard({ title, description, stats, button }) {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-50 rounded-lg p-4 h-fit min-w-[220px] flex-1">
      <h2 className="text-lg font-semibold text-gray-800 mb-1">{title}</h2>
      <p className="text-gray-600 text-xs mb-3">{description}</p>
      <div className="space-y-2 mb-4">
        {stats.map((stat, idx) => (
          <div key={idx}>
            <div className={stat.color}>{stat.value}</div>
            <div className="text-gray-600 text-xs">{stat.label}</div>
          </div>
        ))}
      </div>
      <Button variant={button.variant} className="w-full" onClick={() => navigate(button.href)}>
        {button.text}
      </Button>
    </div>
  );
}

const quickLinks = [
  {
    icon: <FaMoneyBill1Wave />,
    text: "Manage Subscription",
    href: "/settings"
  },
  {
    icon: <FaNetworkWired />,
    text: "Update Points Manually",
    href: "/process"
  },
  {
    icon: <FaBuildingCircleArrowRight />,
    text: "Business Profile Settings",
    href: "/settings"
  },
];

function Dashboard() {
  const { user } = useUser();
  const [statistics, setStatistics] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    loadStatistics().then((data) => setStatistics(data.statistics));
  }, []);

  const statCards = [
    {
      title: "Customer Quick Stats",
      description: "Overview of your customer base and engagement.",
      stats: [
        {
          value: statistics?.total_customers,
          label: "Total Customers",
          color: "text-blue-500 text-2xl font-bold",
        },
        { value: statistics?.active_customers, label: "Active Now", color: "text-lg text-gray-800" },
      ],
      button: { text: "View Customers", variant: "secondary", href: "/customers" },
    },
    {
      title: "Transaction Overview",
      description: "Summary of loyalty points and transaction activity.",
      stats: [
        {
          value: statistics?.total_transactions,
          label: "Total Transactions",
          color: "text-orange-500 text-2xl font-bold",
        },
        {
          value: statistics?.points_system.charAt(0).toUpperCase() + statistics?.points_system.slice(1),
          label: "Loyalty System",
          color: "text-lg font-semibold text-gray-800",
        },
        {
          value: statistics?.total_points + " " + (statistics?.points_system),
          label: "Reward At",
          color: "text-lg text-gray-800",
        },
      ],
      button: { text: "Process Transaction", variant: "secondary", href: "/transactions" },
    },
  ];
  

  return (
    <div className="flex items-center justify-center mb-10">
      <div className="flex flex-col gap-4">
        <div className="mb-6">
          <div className="text-2xl font-bold">Welcome to Your Dashboard</div>
          <div className="text-gray-600 text-base">
            Manage your loyalty program, customers, and card designs with ease.
          </div>
        </div>
        <div>
          <div className="text-xl font-bold text-gray-800 mb-4">
            Quick Links & Tools
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            {quickLinks.map((link, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-blue-50 hover:border-blue-200 border border-transparent transition-colors cursor-pointer flex-1"
                onClick={() => navigate(link.href)}
              >
                <div className="text-lg text-blue-600">{link.icon}</div>
                <span className="text-gray-800 font-medium text-sm">
                  {link.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4 my-8">
          <div className="bg-blue-50 w-64 rounded-lg p-4 border border-blue-200">
            <div className="text-lg font-semibold text-blue-800 mb-1">
              Loyalty Card Overview
            </div>
            <div className="text-gray-600 text-xs mb-3">
              Get a quick glimpse of your current loyalty card design.
            </div>
            <div className="flex justify-center rounded-lg overflow-hidden mb-3">
              <img src={loyaltyCard} alt="Loyalty Card" />
            </div>
            <div className="text-gray-600 text-xs mb-3 text-justify">
              Your digital loyalty card as seen by your customers in their
              mobile wallets. Ensure it reflects your brand perfectly.
            </div>
            <Button onClick={() => navigate("/card-design")} variant="primary" className="mt-20">
              View/Edit Design
            </Button>
          </div>

          {statCards.map((card, idx) => (
            <StatCard key={idx} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
