import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Reports.css';
import ReportForm from './ReportForm';
import ReportDetails from './ReportDetails';

const Reports = () => {
  const { reportId } = useParams();
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [loading, setLoading] = useState(false);

  // Sample report types
  const REPORT_TYPES = [
    { id: 1, name: 'Financial Report', description: 'Detailed financial analysis' },
    { id: 2, name: 'Property Performance', description: 'Property performance metrics' },
    { id: 3, name: 'Client Distribution', description: 'Client distribution analysis' }
  ];

  useEffect(() => {
    // Load reports from localStorage
    const savedReports = localStorage.getItem('reports');
    if (savedReports) {
      setReports(JSON.parse(savedReports));
    }
  }, []);

  const handleGenerateReport = (reportData) => {
    setLoading(true);
    
    try {
      // Validate required fields
      if (!reportData.type) {
        throw new Error('Please select a report type');
      }
      if (!reportData.startDate || !reportData.endDate) {
        throw new Error('Please select both start and end dates');
      }

      // Simulate report generation
      setTimeout(() => {
        const newReport = {
          id: Date.now().toString(),
          name: `Report ${reports.length + 1}`,
          type: reportData.type, // Store the type ID instead of name
          startDate: reportData.startDate,
          endDate: reportData.endDate,
          properties: reportData.properties,
          clients: reportData.clients,
          date: new Date().toLocaleDateString(),
          status: 'Generated'
        };
        
        setReports([...reports, newReport]);
        localStorage.setItem('reports', JSON.stringify([...reports, newReport]));
        setLoading(false);
        setShowGenerateModal(false);
      }, 1000);
    } catch (error) {
      setLoading(false);
      alert(error.message);
    }
  };

  const handleDeleteReport = (reportId) => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      const updatedReports = reports.filter(report => report.id !== reportId);
      setReports(updatedReports);
      localStorage.setItem('reports', JSON.stringify(updatedReports));
      setSelectedReport(null);
      window.location.href = '/dashboard/reports'; // Redirect back to reports list
    }
  };

  const handleDownloadReport = (report) => {
    const reportData = {
      name: report.name,
      type: report.type,
      startDate: report.startDate,
      endDate: report.endDate,
      dateGenerated: report.date,
      properties: report.properties,
      clients: report.clients
    };

    // Convert report data to JSON string
    const reportJson = JSON.stringify(reportData, null, 2);
    const blob = new Blob([reportJson], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    
    // Create download link
    const a = document.createElement('a');
    a.href = url;
    a.download = `${report.name}.json`;
    document.body.appendChild(a);
    a.click();
    
    // Cleanup
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const handlePrintReport = (report) => {
    // Create a temporary print window
    const printWindow = window.open('', '_blank');
    
    // Create HTML content for printing
    const printContent = `
      <html>
        <head>
          <title>${report.name}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .report-header { text-align: center; margin-bottom: 20px; }
            .report-info { margin: 20px 0; }
            .report-data { margin-top: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { padding: 8px; border: 1px solid #ddd; }
          </style>
        </head>
        <body>
          <div class="report-header">
            <h1>${report.name}</h1>
            <p>Generated on ${report.date}</p>
          </div>
          
          <div class="report-info">
            <p><strong>Type:</strong> ${report.type}</p>
            <p><strong>Period:</strong> ${report.startDate} - ${report.endDate}</p>
          </div>
          
          <div class="report-data">
            <h2>Properties</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Location</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                ${report.properties.map(prop => `
                  <tr>
                    <td>${prop.name}</td>
                    <td>${prop.location}</td>
                    <td>${prop.status}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </body>
      </html>
    `;

    // Write content to print window
    printWindow.document.write(printContent);
    printWindow.document.close();
    
    // Print after a small delay
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  const handleViewReport = (report) => {
    setSelectedReport(report);
    navigate(`/dashboard/reports/${report.id}`);
  };

  if (reportId) {
    // If we have a reportId in the URL, show the report details
    const selectedReport = reports.find(r => r.id === reportId);
    return (
      <ReportDetails 
        report={selectedReport}
        onDownload={handleDownloadReport}
        onPrint={handlePrintReport}
        onDelete={handleDeleteReport}
      />
    );
  }

  return (
    <div className="reports-container">
      <div className="reports-header">
        <h2 className="reports-title">Reports</h2>
        <p className="reports-subtitle">Generate and manage your reports</p>
        <button 
          className="generate-report-btn" 
          onClick={() => setShowGenerateModal(true)}
        >
          <i className="fas fa-plus"></i>
          Generate Report
        </button>
      </div>

      <div className="reports-grid">
        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
          </div>
        ) : reports.length === 0 ? (
          <div className="empty-state">
            <p>No reports generated yet</p>
            <p>Click the button above to create your first report</p>
            <button className="empty-state-btn" onClick={() => setShowGenerateModal(true)}>
              <i className="fas fa-plus"></i>
              Generate Report
            </button>
          </div>
        ) : (
          reports.map((report) => (
            <div 
              key={report.id} 
              className="report-card" 
              onClick={() => handleViewReport(report)}
            >
              <div className="report-card-header">
                <h3 className="report-card-title">{report.name}</h3>
                <span className={`report-card-status ${report.status.toLowerCase()}`}>
                  {report.status}
                </span>
              </div>
              <p className="report-card-meta">Type: {report.type}</p>
              <p className="report-card-date">Generated: {report.date}</p>
              <div className="report-actions">
                <button className="download-btn">
                  <i className="fas fa-download"></i>
                  View
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Report Form Modal */}
      {showGenerateModal && (
        <div className="report-form-modal">
          <div className="report-form">
            <div className="form-header">
              <h2>Generate New Report</h2>
              <button className="form-close-btn" onClick={() => setShowGenerateModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>

            <ReportForm onGenerate={handleGenerateReport} reportTypes={REPORT_TYPES} />
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {selectedReport && (
        <div className="delete-modal">
          <div className="delete-modal-content">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this report?</p>
            <div className="modal-actions">
              <button 
                className="delete-btn"
                onClick={() => handleDeleteReport(selectedReport.id)}
              >
                Delete
              </button>
              <button 
                className="cancel-btn"
                onClick={() => setSelectedReport(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedReport && (
        <div className="report-details-modal">
          <ReportDetails report={selectedReport} />
          <div className="report-details">
            <div className="report-details-header">
              <h2 className="report-details-title">{selectedReport.name}</h2>
              <button
                className="form-close-btn"
                onClick={() => setSelectedReport(null)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="report-details-content">
              <div className="report-field">
                <div className="field-label">Report Type</div>
                <div className="field-value">{selectedReport.type}</div>
              </div>
              <div className="report-field">
                <div className="field-label">Date</div>
                <div className="field-value">{selectedReport.date}</div>
              </div>
              <div className="report-field">
                <div className="field-label">Status</div>
                <div className="field-value">{selectedReport.status}</div>
              </div>
            </div>

            <div className="report-charts">
              {/* Add chart components here */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
