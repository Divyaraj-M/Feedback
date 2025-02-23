// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect, useRef } from "react";
import * as echarts from "echarts";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
const App: React.FC = () => {
  const [dateRange, setDateRange] = useState("last7days");
  const [channel, setChannel] = useState("all");
  const [sentiment, setSentiment] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalData, setModalData] = useState<any>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const pieChartRef = useRef<HTMLDivElement>(null);
  const chart = useRef<echarts.ECharts | null>(null);
  const pieChart = useRef<echarts.ECharts | null>(null);
  const kpiData = [
    {
      title: "Response Time",
      value: "85%",
      trend: "+5%",
      isPositive: true,
      icon: "fa-solid fa-clock",
      subtext: "2.1h avg time",
    },
    {
      title: "Satisfaction",
      value: "4.2/5",
      trend: "+0.3",
      isPositive: true,
      icon: "fa-solid fa-star",
      subtext: "92% positive",
    },
    {
      title: "Open Cases",
      value: "24",
      trend: "-12%",
      isPositive: true,
      icon: "fa-solid fa-ticket",
      subtext: "8 priority",
    },
    {
      title: "Retention",
      value: "89%",
      trend: "+3%",
      isPositive: true,
      icon: "fa-solid fa-users",
      subtext: "4 accounts",
    },
  ];
  const tableData = [
    {
      id: "1",
      date: "2025-02-23",
      channel: "Email",
      sentiment: "positive",
      customer: "Emily Thompson",
      comment:
        "Excellent customer service experience! The team was very helpful.",
    },
    {
      id: "2",
      date: "2025-02-23",
      channel: "SMS",
      sentiment: "neutral",
      customer: "Michael Anderson",
      comment: "Product works as expected. Standard experience.",
    },
    {
      id: "3",
      date: "2025-02-22",
      channel: "In-app",
      sentiment: "negative",
      customer: "Sarah Williams",
      comment: "Having issues with the latest update. Need urgent assistance.",
    },
    {
      id: "4",
      date: "2025-02-22",
      channel: "Email",
      sentiment: "positive",
      customer: "David Martinez",
      comment:
        "The new features are amazing! Very intuitive and user-friendly.",
    },
    {
      id: "5",
      date: "2025-02-21",
      channel: "In-app",
      sentiment: "positive",
      customer: "Jennifer Parker",
      comment:
        "Great improvements in the latest version. Keep up the good work!",
    },
  ];
  useEffect(() => {
    // Initialize line chart
    if (chartRef.current) {
      chart.current = echarts.init(chartRef.current);
      const option = {
        animation: false,
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
        },
        legend: {
          data: ["Feedback Volume", "Sentiment Score"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: [
          {
            type: "value",
            name: "Volume",
            position: "left",
          },
          {
            type: "value",
            name: "Score",
            position: "right",
            max: 5,
          },
        ],
        series: [
          {
            name: "Feedback Volume",
            type: "line",
            data: [120, 132, 101, 134, 90, 230, 210],
            smooth: true,
            lineStyle: {
              color: "#007BFF",
            },
          },
          {
            name: "Sentiment Score",
            type: "line",
            yAxisIndex: 1,
            data: [4.2, 4.1, 4.3, 4.0, 4.4, 4.2, 4.3],
            smooth: true,
            lineStyle: {
              color: "#28A745",
            },
          },
        ],
      };
      chart.current.setOption(option);
    }
    // Initialize pie chart
    if (pieChartRef.current) {
      pieChart.current = echarts.init(pieChartRef.current);
      const pieOption = {
        animation: false,
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          orient: "horizontal",
          bottom: "5%",
          left: "center",
          itemGap: 20,
          textStyle: {
            fontSize: 13,
            color: "#666",
            padding: [3, 0, 3, 0],
          },
          itemWidth: 14,
          itemHeight: 14,
          data: ["Email", "SMS", "In-app", "Social Media", "Phone"],
        },
        series: [
          {
            name: "Channel Distribution",
            type: "pie",
            center: ["50%", "40%"],
            radius: ["45%", "65%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 20,
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 35, name: "Email", itemStyle: { color: "#4299E1" } },
              { value: 25, name: "SMS", itemStyle: { color: "#48BB78" } },
              { value: 20, name: "In-app", itemStyle: { color: "#ED8936" } },
              {
                value: 15,
                name: "Social Media",
                itemStyle: { color: "#9F7AEA" },
              },
              { value: 5, name: "Phone", itemStyle: { color: "#F56565" } },
            ],
          },
        ],
      };
      pieChart.current.setOption(pieOption);
    }
    return () => {
      chart.current?.dispose();
      pieChart.current?.dispose();
    };
  }, []);
  const handleActionClick = (type: string, data: any) => {
    setModalType(type);
    setModalData(data);
    setShowModal(true);
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50">
      {/* Profile Section */}
      <div className="bg-white shadow-sm border-b bg-gradient-to-r from-blue-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <i className="fa-solid fa-user text-white text-xl"></i>
              </div>
            </div>
            <div>
              <div className="flex items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Sarah Mitchell
                </h2>
                <span className="ml-3 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800">
                  Enterprise CSM
                </span>
              </div>
              <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <i className="fa-solid fa-building mr-1"></i>
                  <span>78 Active Accounts</span>
                </div>
                <div className="flex items-center">
                  <i className="fa-solid fa-chart-line mr-1"></i>
                  <span>92% Retention Rate</span>
                </div>
                <div className="flex items-center">
                  <i className="fa-regular fa-clock mr-1"></i>
                  <span>Avg Response: 4.2h</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">
                Customer Feedback Insights
              </h1>
              <div className="relative">
                <button
                  className="!rounded-button bg-white border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none flex items-center whitespace-nowrap"
                  onClick={() => setShowDatePicker(!showDatePicker)}
                >
                  <i className="fa-regular fa-calendar mr-2"></i>
                  Last 7 Days
                  <i className="fa-solid fa-chevron-down ml-2"></i>
                </button>
                {showDatePicker && (
                  <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <div className="py-1">
                      <button
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        onClick={() => setShowDatePicker(false)}
                      >
                        Last 7 Days
                      </button>
                      <button
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        onClick={() => setShowDatePicker(false)}
                      >
                        Last 30 Days
                      </button>
                      <button
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        onClick={() => setShowDatePicker(false)}
                      >
                        Custom Range
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="!rounded-button bg-white border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center whitespace-nowrap"
                >
                  <i className="fa-solid fa-file-export mr-1"></i>
                  Export Report
                  <i className="fa-solid fa-chevron-down ml-2"></i>
                </button>
                {showFilters && (
                  <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <div className="py-1">
                      <button
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        onClick={() => {
                          setShowFilters(false);
                          // Handle PDF export
                        }}
                      >
                        Export as PDF
                      </button>
                      <button
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        onClick={() => {
                          setShowFilters(false);
                          // Handle CSV export
                        }}
                      >
                        Export as CSV
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <button className="!rounded-button bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700 flex items-center whitespace-nowrap">
                <i className="fa-solid fa-plus mr-1"></i>
                Schedule Review
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPI Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {kpiData.map((kpi, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm p-6 cursor-pointer transform transition-transform hover:scale-102 hover:shadow-md relative group"
              title={`${kpi.title}\n${kpi.value} (${kpi.trend})\n${kpi.subtext}\n\n${
                kpi.title === "Response Time"
                  ? "Last month: 2.8h\nTarget: 2.0h"
                  : kpi.title === "Satisfaction"
                    ? "Last month: 3.9/5\nTarget: 4.5/5"
                    : kpi.title === "Open Cases"
                      ? "Critical: 3\nHigh: 5\nMedium: 12\nLow: 4"
                      : "Churned: 2\nAt Risk: 6\nHealthy: 70"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <i className={`${kpi.icon} text-blue-600 text-xl mr-3`}></i>
                  <span className="text-gray-600">{kpi.title}</span>
                </div>
                <span
                  className={`text-sm font-medium ${kpi.isPositive ? "text-green-600" : "text-red-600"}`}
                >
                  <i
                    className={`fa-solid ${kpi.isPositive ? "fa-arrow-up" : "fa-arrow-down"} mr-1`}
                  ></i>
                  {kpi.trend}
                </span>
              </div>
              <div className="mt-4">
                <span className="text-3xl font-bold text-gray-900">
                  {kpi.value}
                </span>
                <p className="text-sm text-gray-500 mt-1">{kpi.subtext}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Charts Section */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* Trend Graph */}
          <div className="col-span-2 bg-white rounded-lg shadow-sm p-6 bg-gradient-to-br from-white to-blue-50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Feedback Trends
              </h2>
              <div className="flex space-x-4">
                <select
                  className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm"
                  value={channel}
                  onChange={(e) => setChannel(e.target.value)}
                >
                  <option value="all">All Channels</option>
                  <option value="email">Email</option>
                  <option value="sms">SMS</option>
                  <option value="in-app">In-app</option>
                </select>
              </div>
            </div>
            <div ref={chartRef} style={{ height: "400px" }}></div>
          </div>
          {/* Channel Distribution Pie Chart */}
          <div className="bg-white rounded-lg shadow-sm p-6 bg-gradient-to-br from-white to-blue-50">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Channel Distribution
            </h2>
            <div ref={pieChartRef} style={{ height: "400px" }}></div>
          </div>
        </div>
        {/* Response Table */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Recent Responses
              </h2>
              <div className="flex space-x-3">
                <div className="relative">
                  <select
                    className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm appearance-none pr-8"
                    defaultValue="all"
                  >
                    <option value="all">All Channels</option>
                    <option value="email">Email</option>
                    <option value="sms">SMS</option>
                    <option value="in-app">In-app</option>
                  </select>
                  <i className="fa-solid fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs"></i>
                </div>
                <div className="relative">
                  <select
                    className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm appearance-none pr-8"
                    defaultValue="all"
                  >
                    <option value="all">All Sentiment</option>
                    <option value="positive">Positive</option>
                    <option value="neutral">Neutral</option>
                    <option value="negative">Negative</option>
                  </select>
                  <i className="fa-solid fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs"></i>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm pr-8"
                  />
                  <i className="fa-solid fa-search absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-sm"></i>
                </div>
                <button className="!rounded-button bg-gray-100 hover:bg-gray-200 px-3 py-2 text-sm text-gray-600 flex items-center whitespace-nowrap">
                  <i className="fa-solid fa-filter mr-2"></i>
                  More Filters
                </button>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Channel
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sentiment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Comment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tableData.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {row.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {row.channel}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
${
  row.sentiment === "positive"
    ? "bg-green-100 text-green-800"
    : row.sentiment === "negative"
      ? "bg-red-100 text-red-800"
      : "bg-gray-100 text-gray-800"
}`}
                      >
                        {row.sentiment}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {row.customer}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {row.comment}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleActionClick("reply", row)}
                        className="!rounded-button text-blue-600 hover:text-blue-900 mr-3 whitespace-nowrap"
                      >
                        <i className="fa-solid fa-reply mr-1"></i>
                        Reply
                      </button>
                      <button
                        onClick={() => handleActionClick("resolve", row)}
                        className="!rounded-button text-green-600 hover:text-green-900 whitespace-nowrap"
                      >
                        <i className="fa-solid fa-check mr-1"></i>
                        Resolve
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">5</span> of{" "}
              <span className="font-medium">20</span> results
            </div>
            <div className="flex space-x-2">
              <button className="!rounded-button bg-white border border-gray-300 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50 whitespace-nowrap">
                Previous
              </button>
              <button className="!rounded-button bg-blue-600 border border-transparent px-3 py-1 text-sm font-medium text-white hover:bg-blue-700 whitespace-nowrap">
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
      {/* Footer with Logo */}
      <div className="fixed bottom-4 right-4 flex items-center space-x-2">
        <img
          src="https://static.readdy.ai/image/de3d01137030cd85f61220f23bb7db23/998c9172a642f5f261428da6bb6d3f0d.jpeg"
          alt="SurveySparrow Logo"
          className="h-8 w-8 object-contain"
        />
        <span className="text-gray-500 text-sm font-medium">
          powered by SurveySparrow
        </span>
      </div>
      {/* Modal */}
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {modalType === "reply"
                        ? "Reply to Customer"
                        : "Resolve Issue"}
                    </h3>
                    <div className="mt-2">
                      {modalType === "reply" && (
                        <textarea
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          rows={4}
                          placeholder="Type your response..."
                        ></textarea>
                      )}
                      {modalType === "resolve" && (
                        <p className="text-sm text-gray-500">
                          Are you sure you want to mark this issue as resolved?
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="!rounded-button w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm whitespace-nowrap"
                  onClick={() => setShowModal(false)}
                >
                  {modalType === "reply" ? "Send Reply" : "Confirm"}
                </button>
                <button
                  type="button"
                  className="!rounded-button mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm whitespace-nowrap"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default App;
