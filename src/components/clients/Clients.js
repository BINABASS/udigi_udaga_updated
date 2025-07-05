import React, { useState, useMemo, useEffect } from 'react';
import AccountForm from '../accounts/AccountForm';
import AccountDetails from '../accounts/AccountDetails';
import './Clients.css';

const Clients = () => {
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  useEffect(() => {
    // Load clients from localStorage
    const savedClients = JSON.parse(localStorage.getItem('clients')) || [
      {
        id: 1,
        name: 'John Smith',
        type: 'individual',
        email: 'john@example.com',
        phone: '+1234567890',
        address: '123 Main St, City, Country',
        company: null,
        totalBookings: 3,
        totalSpent: 15000,
        status: 'active',
        avatar: 'https://via.placeholder.com/150'
      },
      {
        id: 2,
        name: 'Tech Solutions Inc.',
        type: 'company',
        email: 'info@techsolutions.com',
        phone: '+0987654321',
        address: '456 Business Ave, City, Country',
        company: 'Tech Solutions Inc.',
        totalBookings: 8,
        totalSpent: 45000,
        status: 'active',
        avatar: 'https://via.placeholder.com/150'
      }
    ];

    setAccounts(savedClients);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Load accounts from localStorage
    const savedAccounts = JSON.parse(localStorage.getItem('accounts')) || [
      {
        id: 1,
        fullName: 'John Smith',
        type: 'client',
        email: 'john@example.com',
        phone: '+1234567890',
        address: '',
        status: 'active',
        properties: [],
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      },
      {
        id: 2,
        fullName: 'Tech Solutions Inc.',
        type: 'company',
        email: 'info@techsolutions.com',
        phone: '+0987654321',
        address: '',
        status: 'active',
        properties: [],
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      }
    ];

    setAccounts(savedAccounts);
    setIsLoading(false);
  }, []);

  // Calculate statistics
  const statistics = useMemo(() => {
    const filteredAccounts = accounts.filter(account => 
      account.type === 'client' || account.type === 'company'
    );
    return {
      total: filteredAccounts.length,
      active: filteredAccounts.filter(a => a.status === 'active').length,
      inactive: filteredAccounts.filter(a => a.status === 'inactive').length,
      individual: filteredAccounts.filter(a => a.type === 'client').length,
      company: filteredAccounts.filter(a => a.type === 'company').length
    };
  }, [accounts]);

  // Filter accounts based on selected type and search
  const filteredAccounts = useMemo(() => {
    let filtered = accounts.filter(account => 
      account.type === 'client' || account.type === 'company'
    );
    
    if (selectedType !== 'all') {
      filtered = filtered.filter(account => account.type === (selectedType === 'individual' ? 'client' : 'company'));
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(account => 
        account.fullName.toLowerCase().includes(query) ||
        account.email.toLowerCase().includes(query) ||
        account.fullName.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [accounts, selectedType, searchQuery]);

  // Handlers
  const handleAccountAction = (formData, action) => {
    if (action === 'add') {
      const newAccount = {
        ...formData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      };
      setAccounts([...accounts, newAccount]);
      localStorage.setItem('accounts', JSON.stringify([...accounts, newAccount]));
    } else if (action === 'edit') {
      const updatedAccounts = accounts.map(account => 
        account.id === editingAccount.id ? { ...account, ...formData } : account
      );
      setAccounts(updatedAccounts);
      localStorage.setItem('accounts', JSON.stringify(updatedAccounts));
    }
  };

  const handleDeleteAccount = (accountId) => {
    if (window.confirm('Are you sure you want to delete this account?')) {
      const updatedAccounts = accounts.filter(account => account.id !== accountId);
      setAccounts(updatedAccounts);
      localStorage.setItem('accounts', JSON.stringify(updatedAccounts));
    }
  };

  const handleViewDetails = (account) => {
    setSelectedAccount(account);
    setShowDetails(true);
  };

  const handleEditAccount = (account) => {
    setEditingAccount(account);
    setShowForm(true);
  };

  const handleToggleStatus = (accountId) => {
    const updatedAccounts = accounts.map(account => 
      account.id === accountId ? {
        ...account,
        status: account.status === 'active' ? 'inactive' : 'active'
      } : account
    );
    setAccounts(updatedAccounts);
    localStorage.setItem('accounts', JSON.stringify(updatedAccounts));
  };

  return (
    <div className="clients-page">
      <div className="clients-header">
        <h1>Accounts</h1>
        <div className="header-actions">
          <div className="type-filters">
            <h2>Filter by Type:</h2>
            <div className="filters-container">
              <button
                className={`filter-button ${selectedType === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedType('all')}
              >
                ALL
              </button>
              <button
                className={`filter-button ${selectedType === 'individual' ? 'active' : ''}`}
                onClick={() => setSelectedType('individual')}
              >
                INDIVIDUAL
              </button>
              <button
                className={`filter-button ${selectedType === 'company' ? 'active' : ''}`}
                onClick={() => setSelectedType('company')}
              >
                COMPANY
              </button>
            </div>
          </div>
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search by name, email, or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="clients-statistics">
        {Object.entries(statistics).map(([key, value]) => (
          <div key={key} className="stat-card">
            <div className="stat-value">{value}</div>
            <div className="stat-label">{key}</div>
          </div>
        ))}
      </div>

      {isLoading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading accounts...</p>
        </div>
      ) : filteredAccounts.length === 0 ? (
        <div className="empty-state">
          <p>No accounts found</p>
          <button
            className="action-btn add-btn"
            onClick={() => setShowForm(true)}
          >
            <i className="fas fa-plus"></i> Add New Account
          </button>
        </div>
      ) : (
        <div className="clients-grid">
          {filteredAccounts.map((account) => (
            <div key={account.id} className="account-card">
              <div className="account-header">
                <div className="account-info">
                  <h3>{account.fullName}</h3>
                  <span className="account-type-badge">
                    {account.type === 'client' ? 'Individual' : 'Company'}
                  </span>
                </div>
                <div className="account-status">
                  {account.status === 'active' ? (
                    <span className="status-badge active">Active</span>
                  ) : (
                    <span className="status-badge inactive">Inactive</span>
                  )}
                </div>
              </div>
              <div className="account-details">
                <div className="detail-item">
                  <i className="fas fa-envelope"></i>
                  {account.email}
                </div>
                <div className="detail-item">
                  <i className="fas fa-phone"></i>
                  {account.phone}
                </div>
                <div className="detail-item">
                  <i className="fas fa-map-marker-alt"></i>
                  {account.address}
                </div>
              </div>
              <div className="account-actions">
                <button
                  className="action-btn view-btn"
                  onClick={() => handleViewDetails(account)}
                >
                  <i className="fas fa-eye"></i> View
                </button>
                <button
                  className="action-btn edit-btn"
                  onClick={() => handleEditAccount(account)}
                >
                  <i className="fas fa-edit"></i> Edit
                </button>
                <button
                  className="action-btn delete-btn"
                  onClick={() => handleDeleteAccount(account.id)}
                >
                  <i className="fas fa-trash"></i> Delete
                </button>
                <button
                  className="action-btn status-btn"
                  onClick={() => handleToggleStatus(account.id)}
                >
                  <i className="fas fa-toggle-on"></i> {account.status === 'active' ? 'Deactivate' : 'Activate'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <AccountForm
          account={editingAccount}
          onClose={() => {
            setShowForm(false);
            setEditingAccount(null);
          }}
          onSubmit={handleAccountAction}
        />
      )}

      {showDetails && selectedAccount && (
        <AccountDetails
          account={selectedAccount}
          onClose={() => {
            setShowDetails(false);
            setSelectedAccount(null);
          }}
        />
      )}
    </div>
  );
};

export default Clients;
