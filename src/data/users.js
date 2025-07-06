// Mock user database
export const users = {
  // Admin credentials
  'admin@udigi.com': {
    email: 'admin@udigi.com',
    password: 'admin999',
    role: 'admin',
    name: 'System Administrator'
  },

  // Seller credentials
  'seller1@udigi.com': {
    email: 'seller1@udigi.com',
    password: 'seller123',
    role: 'seller',
    name: 'John Doe'
  },

  'seller2@udigi.com': {
    email: 'seller2@udigi.com',
    password: 'seller123',
    role: 'seller',
    name: 'Jane Smith'
  },

  // Buyer credentials
  'buyer1@udigi.com': {
    email: 'buyer1@udigi.com',
    password: 'buyer123',
    role: 'buyer',
    name: 'Michael Johnson'
  },
  'buyer2@udigi.com': {
    email: 'buyer2@udigi.com',
    password: 'buyer123',
    role: 'buyer',
    name: 'Sarah Wilson'
  },

  'binos@udigi.com': {
    email: 'binos@udigi.com',
    password: 'binos123',
    role: 'seller',
    name: 'Binos'
  }
};

// Function to validate login credentials
export const validateCredentials = (email, password) => {
  const user = users[email];
  return user && user.password === password ? user : null;
};
