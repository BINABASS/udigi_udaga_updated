import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';
import './Reports.css';

// Report types
const REPORT_TYPES = [
  { id: 1, name: 'Financial Report', description: 'Detailed financial analysis' },
  { id: 2, name: 'Property Performance', description: 'Property performance metrics' },
  { id: 3, name: 'Client Distribution', description: 'Client distribution analysis' }
];

const ReportDetails = ({ report }) => {
  // Sample chart data - will be replaced with actual data from the report
  const chartData = {
    revenue: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Revenue',
        data: [12000, 19000, 15000, 17000, 18000, 21000],
        backgroundColor: 'rgba(79, 70, 229, 0.2)',
        borderColor: 'rgba(79, 70, 229, 1)',
        borderWidth: 2
      }]
    },
    property: {
      labels: ['Property A', 'Property B', 'Property C', 'Property D'],
      datasets: [{
        data: [30, 20, 45, 5],
        backgroundColor: [
          'rgba(79, 70, 229, 0.7)',
          'rgba(220, 38, 38, 0.7)',
          'rgba(34, 197, 94, 0.7)',
          'rgba(245, 158, 11, 0.7)'
        ]
      }]
    }
  };

  useEffect(() => {
    // Initialize charts when report data changes
    const ctx1 = document.getElementById('revenueChart');
    const ctx2 = document.getElementById('propertyChart');
    const ctx3 = document.getElementById('clientChart');

    if (ctx1) {
      new Chart(ctx1, {
        type: 'line',
        data: chartData.revenue,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }

    if (ctx2) {
      new Chart(ctx2, {
        type: 'bar',
        data: chartData.property,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }

    // Clean up
    return () => {
      if (ctx1?.chart) ctx1.chart.destroy();
      if (ctx2?.chart) ctx2.chart.destroy();
      if (ctx3?.chart) ctx3.chart.destroy();
    };
  }, [report, chartData.revenue, chartData.property]);

  // Get report type name
  const reportType = REPORT_TYPES.find(type => type.id === report?.type);

  return (
    <div className="report-details">
      <div className="report-details-header">
        <h2 className="report-details-title">{report.name}</h2>
        <div className="report-details-meta">
          <span className="report-date">{report.date}</span>
          <span className="report-type">{reportType?.name || 'Unknown'}</span>
        </div>
      </div>

      <div className="report-details-content">
        <div className="report-charts">
          <div className="chart-container">
            <canvas id="revenueChart"></canvas>
            <h3>Revenue Trend</h3>
          </div>
          <div className="chart-container">
            <canvas id="propertyChart"></canvas>
            <h3>Property Performance</h3>
          </div>
          <div className="chart-container">
            <canvas id="clientChart"></canvas>
            <h3>Client Distribution</h3>
          </div>
        </div>

        <div className="report-actions">
          <button className="download-btn">Download Report</button>
          <button className="print-btn">Print Report</button>
        </div>
      </div>
    </div>
  );
};

export default ReportDetails;
