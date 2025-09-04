import React, { useState } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { 
  PlusCircle, 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  X,
  PieChart,
  BarChart3,
  CreditCard,
  Wallet,
  Sun,
  Moon,
  Calendar,
  Sparkles
} from 'lucide-react';
import ReactECharts from "echarts-for-react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const FinanceTracker = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [darkMode, setDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    type: 'expense',
    description: ''
  });

  // Dummy data
  const [expenses, setExpenses] = useState([
    { id: 1, amount: 500, category: 'Food', type: 'expense', date: '2024-01-15', description: 'Groceries' },
    { id: 2, amount: 1200, category: 'Rent', type: 'expense', date: '2024-01-01', description: 'Monthly rent' },
    { id: 3, amount: 300, category: 'Transport', type: 'expense', date: '2024-01-10', description: 'Gas and maintenance' },
    { id: 4, amount: 150, category: 'Entertainment', type: 'expense', date: '2024-01-12', description: 'Movies and dining' },
    { id: 5, amount: 3000, category: 'Salary', type: 'income', date: '2024-01-01', description: 'Monthly salary' },
    { id: 6, amount: 200, category: 'Freelance', type: 'income', date: '2024-01-08', description: 'Side project' },
    { id: 7, amount: 80, category: 'Utilities', type: 'expense', date: '2024-01-05', description: 'Electricity bill' },
    { id: 8, amount: 120, category: 'Healthcare', type: 'expense', date: '2024-01-20', description: 'Doctor visit' },
  ]);

  const monthlyData = [
    { month: 'Jan', income: 3200, expenses: 2350 },
    { month: 'Feb', income: 3100, expenses: 2180 },
    { month: 'Mar', income: 3300, expenses: 2420 },
    { month: 'Apr', income: 2900, expenses: 2150 },
    { month: 'May', income: 3400, expenses: 2380 },
    { month: 'Jun', income: 3200, expenses: 2290 },
  ];

  const totalIncome = expenses.filter(e => e.type === 'income').reduce((sum, e) => sum + e.amount, 0);
  const totalExpenses = expenses.filter(e => e.type === 'expense').reduce((sum, e) => sum + e.amount, 0);
  const netBalance = totalIncome - totalExpenses;

  const expensesByCategory = expenses
    .filter(e => e.type === 'expense')
    .reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {});

  const addTransaction = () => {
    if (!formData.amount || !formData.category) {
      alert('Please fill in all required fields');
      return;
    }

    const newTransaction = {
      id: expenses.length + 1,
      amount: parseFloat(formData.amount),
      category: formData.category,
      type: formData.type,
      date: new Date().toISOString().split('T')[0],
      description: formData.description || `${formData.type} transaction`
    };

    setExpenses([...expenses, newTransaction]);
    setFormData({ amount: '', category: '', type: 'expense', description: '' });
    setShowAddModal(false);
  };

  // Chart.js configs with theme support
  const chartTextColor = darkMode ? '#e5e7eb' : '#374151';
  const chartGridColor = darkMode ? '#374151' : '#e5e7eb';

  const barChartData = {
    labels: Object.keys(expensesByCategory),
    datasets: [{
      label: 'Expenses by Category',
      data: Object.values(expensesByCategory),
      backgroundColor: [
        'rgba(236, 72, 153, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(139, 92, 246, 0.8)',
        'rgba(239, 68, 68, 0.8)',
      ],
      borderWidth: 0,
      borderRadius: 12,
    }]
  };

  const pieChartData = {
    labels: Object.keys(expensesByCategory),
    datasets: [{
      data: Object.values(expensesByCategory),
      backgroundColor: [
        '#ec4899',
        '#3b82f6',
        '#10b981',
        '#f59e0b',
        '#8b5cf6',
        '#ef4444',
      ],
      borderWidth: 3,
      borderColor: darkMode ? '#1f2937' : '#ffffff',
    }]
  };

  const lineChartData = {
    labels: monthlyData.map(d => d.month),
    datasets: [
      {
        label: 'Income',
        data: monthlyData.map(d => d.income),
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#10b981',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 3,
        pointRadius: 6,
      },
      {
        label: 'Expenses',
        data: monthlyData.map(d => d.expenses),
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#ef4444',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 3,
        pointRadius: 6,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { 
      legend: { 
        position: 'top',
        labels: {
          color: chartTextColor,
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          font: {
            size: 12,
            weight: '500'
          }
        }
      },
      tooltip: {
        backgroundColor: darkMode ? '#1f2937' : '#ffffff',
        titleColor: chartTextColor,
        bodyColor: chartTextColor,
        borderColor: darkMode ? '#374151' : '#e5e7eb',
        borderWidth: 1,
        cornerRadius: 8,
      }
    },
    scales: {
      x: {
        ticks: { color: chartTextColor },
        grid: { color: chartGridColor }
      },
      y: {
        ticks: { color: chartTextColor },
        grid: { color: chartGridColor }
      }
    }
  };

  // Heatmap data
  const heatmapData = expenses
    .filter(e => e.type === "expense")
    .map(e => ({ date: e.date, count: e.amount }));

  const startDate = "2024-01-01";
  const endDate = "2024-12-31";

  // Sankey Chart Data
  const sankeyData = [
    { name: "Income" },
    ...Object.keys(expensesByCategory).map(cat => ({ name: cat })),
  ];

  const sankeyLinks = Object.keys(expensesByCategory).map(cat => ({
    source: "Income",
    target: cat,
    value: expensesByCategory[cat]
  }));

  const sankeyOption = {
    tooltip: { trigger: "item", triggerOn: "mousemove" },
    backgroundColor: darkMode ? '#1f2937' : '#ffffff',
    series: [
      {
        type: "sankey",
        data: sankeyData,
        links: sankeyLinks,
        emphasis: { focus: "adjacency" },
        lineStyle: { color: "gradient", curveness: 0.5 }
      }
    ]
  };

  const getMonthlyRecap = () => {
    const monthlyExpenses = {};

    expenses.forEach(e => {
      if (e.type === 'expense') {
        const month = new Date(e.date).toLocaleString('default', { month: 'short' });
        if (!monthlyExpenses[month]) monthlyExpenses[month] = { total: 0, categories: {} };
        monthlyExpenses[month].total += e.amount;
        monthlyExpenses[month].categories[e.category] = (monthlyExpenses[month].categories[e.category] || 0) + e.amount;
      }
    });

    return Object.keys(monthlyExpenses).map(month => {
      const categories = Object.keys(monthlyExpenses[month].categories);
      const highestCategory = categories.reduce((a, b) => monthlyExpenses[month].categories[a] > monthlyExpenses[month].categories[b] ? a : b, categories[0]);
      return {
        month,
        spent: monthlyExpenses[month].total,
        topCategory: highestCategory,
        message: `In ${month}, you spent the most on ${highestCategory}!`
      };
    });
  };

  const theme = {
    bg: darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-purple-50',
    card: darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white/70 backdrop-blur-sm border-white/20',
    cardHover: darkMode ? 'hover:bg-gray-750' : 'hover:bg-white/90',
    text: darkMode ? 'text-gray-100' : 'text-gray-900',
    textSecondary: darkMode ? 'text-gray-300' : 'text-gray-600',
    textMuted: darkMode ? 'text-gray-400' : 'text-gray-500',
    border: darkMode ? 'border-gray-700' : 'border-gray-200/50',
    input: darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white/50 border-gray-300',
    button: darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700',
    modal: darkMode ? 'bg-gray-800' : 'bg-white',
    header: darkMode ? 'bg-gray-800/80 backdrop-blur-md border-gray-700' : 'bg-white/80 backdrop-blur-md border-white/20',
    nav: darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white/50 border-gray-200/50',
  };

  const simulateFuture = (cutDining = false) => {
  const monthlyTotals = {};
  expenses.forEach(e => {
    if (e.type === 'expense') {
      const month = new Date(e.date).getMonth();
      monthlyTotals[month] = (monthlyTotals[month] || 0) + e.amount;
    }
  });

  const avgExpense = Object.values(monthlyTotals).reduce((a,b)=>a+b,0) / Object.keys(monthlyTotals).length;
  
  // Scenario A: Keep same spending
  let futureSpending = avgExpense * 3;

  // Scenario B: Cut 20% dining
  if (cutDining) {
    const diningSpent = expenses.filter(e => e.category.toLowerCase() === 'dining')
      .reduce((a,b) => a + b.amount, 0);
    const avgDining = diningSpent / Object.keys(monthlyTotals).length;
    futureSpending -= avgDining * 0.2 * 3; // savings from cutting dining
  }

  return futureSpending;
};


  return (
    <div className={`min-h-screen transition-all duration-300 ${theme.bg}`}>
      {/* Header */}
      <header className={`${theme.header} shadow-lg border-b transition-all duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="relative">
              <Wallet className="h-8 w-8 text-blue-600 mr-3" />
              <Sparkles className="h-4 w-4 text-purple-500 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <h1 className={`text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}>
              Finance Tracker
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg transition-all duration-300 ${theme.card} ${theme.cardHover}`}
            >
              {darkMode ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600" />
              )}
            </button>
            
            <button
              onClick={() => setShowAddModal(true)}
              className={`${theme.button} text-white px-6 py-2 rounded-xl flex items-center gap-2 shadow-lg transform hover:scale-105 transition-all duration-200`}
            >
              <PlusCircle className="h-5 w-5" />
              Add Transaction
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <nav className={`${theme.nav} border-b backdrop-blur-md transition-all duration-300`}>
        <div className="max-w-7xl mx-auto px-4 flex space-x-1">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'charts', label: 'Charts', icon: PieChart },
            { id: 'transactions', label: 'Transactions', icon: CreditCard },
            { id: 'story', label: 'Story Recap', icon: TrendingUp },
            { id: 'future', label: 'Future You', icon: Calendar },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 py-4 px-6 rounded-t-xl font-medium text-sm transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : `${theme.textSecondary} hover:text-blue-600 hover:bg-blue-50 ${darkMode ? 'hover:bg-gray-700' : ''}`
              }`}
            >
              <tab.icon className="h-5 w-5" />
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className={`${theme.card} rounded-2xl p-6 shadow-xl border transform hover:scale-105 transition-all duration-300`}>
                <div className="flex items-center">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-green-400 to-emerald-600">
                    <TrendingUp className="h-8 w-8 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className={`text-sm ${theme.textMuted}`}>Total Income</p>
                    <p className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
                      ${totalIncome.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className={`${theme.card} rounded-2xl p-6 shadow-xl border transform hover:scale-105 transition-all duration-300`}>
                <div className="flex items-center">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-red-400 to-pink-600">
                    <TrendingDown className="h-8 w-8 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className={`text-sm ${theme.textMuted}`}>Total Expenses</p>
                    <p className="text-3xl font-bold bg-gradient-to-r from-red-400 to-pink-600 bg-clip-text text-transparent">
                      ${totalExpenses.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className={`${theme.card} rounded-2xl p-6 shadow-xl border transform hover:scale-105 transition-all duration-300`}>
                <div className="flex items-center">
                  <div className={`p-3 rounded-xl ${netBalance >= 0 ? 'bg-gradient-to-r from-blue-400 to-purple-600' : 'bg-gradient-to-r from-orange-400 to-red-600'}`}>
                    <DollarSign className="h-8 w-8 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className={`text-sm ${theme.textMuted}`}>Net Balance</p>
                    <p className={`text-3xl font-bold ${netBalance >= 0 ? 'bg-gradient-to-r from-blue-400 to-purple-600' : 'bg-gradient-to-r from-orange-400 to-red-600'} bg-clip-text text-transparent`}>
                      ${Math.abs(netBalance).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Overview Chart */}
            <div className={`${theme.card} rounded-2xl p-8 border shadow-xl transition-all duration-300`}>
              <h3 className={`text-xl font-bold ${theme.text} mb-6`}>Monthly Trend</h3>
              <div className="h-80">
                <Line data={lineChartData} options={chartOptions} />
              </div>
            </div>

            {/* Heatmap */}
            <div className={`${theme.card} p-8 rounded-2xl border shadow-xl transition-all duration-300`}>
              <h3 className={`text-xl font-bold ${theme.text} mb-6`}>Daily Spending Heatmap</h3>
              <div className="heatmap-container">
                <CalendarHeatmap
                  startDate={startDate}
                  endDate={endDate}
                  values={heatmapData}
                  classForValue={(value) => {
                    if (!value) return "color-empty";
                    if (value.count < 100) return "color-scale-1";
                    if (value.count < 500) return "color-scale-2";
                    return "color-scale-3";
                  }}
                  tooltipDataAttrs={value => ({
                    "data-tip": value.date ? `${value.date}: $${value.count}` : "No spending"
                  })}
                />
              </div>
            </div>
          </div>
        )}

        {/* Charts Tab */}
        {activeTab === 'charts' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className={`${theme.card} p-8 rounded-2xl border shadow-xl transition-all duration-300`}>
                <h3 className={`text-xl font-bold ${theme.text} mb-6`}>Expenses by Category</h3>
                <div className="h-80">
                  <Bar data={barChartData} options={chartOptions} />
                </div>
              </div>
              
              <div className={`${theme.card} p-8 rounded-2xl border shadow-xl transition-all duration-300`}>
                <h3 className={`text-xl font-bold ${theme.text} mb-6`}>Expense Distribution</h3>
                <div className="h-80">
                  <Pie data={pieChartData} options={chartOptions} />
                </div>
              </div>
            </div>

            {/* Line Chart */}
            <div className={`${theme.card} p-8 rounded-2xl border shadow-xl transition-all duration-300`}>
              <h3 className={`text-xl font-bold ${theme.text} mb-6`}>Income vs Expenses Trend</h3>
              <div className="h-96">
                <Line data={lineChartData} options={chartOptions} />
              </div>
            </div>

            {/* Sankey */}
            <div className={`${theme.card} p-8 rounded-2xl border shadow-xl transition-all duration-300`}>
              <h3 className={`text-xl font-bold ${theme.text} mb-6`}>Income → Expense Flow</h3>
              <div className="h-96">
                <ReactECharts option={sankeyOption} style={{ height: "100%", width: "100%" }} />
              </div>
            </div>
          </div>
        )}

        {/* Transactions Tab */}
        {activeTab === 'transactions' && (
          <div className={`${theme.card} rounded-2xl shadow-xl border transition-all duration-300`}>
            <div className="p-8 border-b border-gray-200 dark:border-gray-700">
              <h3 className={`text-xl font-bold ${theme.text}`}>All Transactions</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
                  <tr>
                    <th className={`px-6 py-4 text-left text-xs font-semibold ${theme.textMuted} uppercase tracking-wider`}>Date</th>
                    <th className={`px-6 py-4 text-left text-xs font-semibold ${theme.textMuted} uppercase tracking-wider`}>Category</th>
                    <th className={`px-6 py-4 text-left text-xs font-semibold ${theme.textMuted} uppercase tracking-wider`}>Description</th>
                    <th className={`px-6 py-4 text-left text-xs font-semibold ${theme.textMuted} uppercase tracking-wider`}>Type</th>
                    <th className={`px-6 py-4 text-left text-xs font-semibold ${theme.textMuted} uppercase tracking-wider`}>Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {expenses.map(transaction => (
                    <tr key={transaction.id} className={`${theme.cardHover} transition-all duration-200`}>
                      <td className={`px-6 py-4 text-sm ${theme.text}`}>{transaction.date}</td>
                      <td className={`px-6 py-4 text-sm ${theme.text}`}>{transaction.category}</td>
                      <td className={`px-6 py-4 text-sm ${theme.textSecondary}`}>{transaction.description}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          transaction.type === 'income' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}>
                          {transaction.type}
                        </span>
                      </td>
                      <td className={`px-6 py-4 text-sm font-bold ${
                        transaction.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                      }`}>
                        {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Story Tab */}
        {activeTab === 'story' && (
          <div className="space-y-6">
            {getMonthlyRecap().map((recap, index) => (
              <div key={index} className={`${theme.card} p-8 rounded-2xl shadow-xl border flex flex-col md:flex-row items-center gap-6 transform hover:scale-105 transition-all duration-300`}>
                <div className="text-6xl">📖</div>
                <div className="flex-1">
                  <h3 className={`text-2xl font-bold ${theme.text} mb-2`}>{recap.month} Recap</h3>
                  <p className={`${theme.textSecondary} text-lg mb-2`}>{recap.message}</p>
                  <p className={`${theme.textMuted} font-medium`}>Total spent: ${recap.spent}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'future' && (
  <div className="space-y-6">
    <h2 className="text-xl font-semibold">🔮 See Future You (3 Months Later)</h2>
    
    {/* Scenario A */}
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border dark:border-gray-700 flex items-center gap-4">
      <div className="text-4xl">😟</div>
      <div>
        <h3 className="text-lg font-semibold">If you keep spending the same…</h3>
        <p className="text-gray-600 dark:text-gray-300">
          Future You will spend about <span className="font-bold text-red-500">Rs. {simulateFuture(false).toLocaleString()}</span> in 3 months.
        </p>
      </div>
    </div>

    {/* Scenario B */}
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border dark:border-gray-700 flex items-center gap-4">
      <div className="text-4xl">😊</div>
      <div>
        <h3 className="text-lg font-semibold">If you cut 20% dining…</h3>
        <p className="text-gray-600 dark:text-gray-300">
          Future You saves <span className="font-bold text-green-500">Rs. {(simulateFuture(false) - simulateFuture(true)).toLocaleString()}</span> 🎉
        </p>
      </div>
    </div>
  </div>
)}

      </main>

      {/* Add Transaction Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className={`${theme.modal} rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300`}>
            <div className={`flex justify-between items-center p-8 border-b ${theme.border}`}>
              <h2 className={`text-2xl font-bold ${theme.text}`}>Add Transaction</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className={`${theme.textMuted} hover:text-red-500 transition-colors duration-200`}
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-8 space-y-6">
              <div>
                <label className={`block text-sm font-semibold ${theme.text} mb-3`}>Amount</label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  className={`w-full px-4 py-3 ${theme.input} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                />
              </div>
              
              <div>
                <label className={`block text-sm font-semibold ${theme.text} mb-3`}>Category</label>
                <input
                  type="text"
                  placeholder="e.g., Food, Rent, Salary"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className={`w-full px-4 py-3 ${theme.input} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                />
              </div>
              
              <div>
                <label className={`block text-sm font-semibold ${theme.text} mb-3`}>Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className={`w-full px-4 py-3 ${theme.input} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                >
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
              </div>
              
              <div>
                <label className={`block text-sm font-semibold ${theme.text} mb-3`}>Description</label>
                <textarea
                  placeholder="Optional description..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className={`w-full px-4 py-3 ${theme.input} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                  rows="3"
                />
              </div>
            </div>
            
            <div className={`flex gap-4 p-8 border-t ${theme.border}`}>
              <button
                onClick={() => setShowAddModal(false)}
                className={`flex-1 px-6 py-3 ${theme.textSecondary} bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 font-semibold`}
              >
                Cancel
              </button>
              <button
                onClick={addTransaction}
                className={`flex-1 px-6 py-3 ${theme.button} text-white rounded-xl transition-all duration-200 font-semibold shadow-lg transform hover:scale-105`}
              >
                Add Transaction
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom styles for heatmap */}
      <style jsx>{`
        .heatmap-container .react-calendar-heatmap .color-empty {
          fill: ${darkMode ? '#374151' : '#f3f4f6'};
        }
        .heatmap-container .react-calendar-heatmap .color-scale-1 {
          fill: #fef3c7;
        }
        .heatmap-container .react-calendar-heatmap .color-scale-2 {
          fill: #fbbf24;
        }
        .heatmap-container .react-calendar-heatmap .color-scale-3 {
          fill: #f59e0b;
        }
        .heatmap-container .react-calendar-heatmap text {
          fill: ${darkMode ? '#e5e7eb' : '#374151'};
          font-size: 12px;
        }
        .heatmap-container .react-calendar-heatmap .react-calendar-heatmap-month-label {
          font-size: 14px;
          font-weight: 600;
        }
        .heatmap-container .react-calendar-heatmap .react-calendar-heatmap-weekday-label {
          font-size: 12px;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
};

export default FinanceTracker;