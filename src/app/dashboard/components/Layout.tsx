// src/app/dashboard/components/Layout.tsx
import React, { useState } from 'react';
import { Sidebar } from './sidebar';
import MainContent from './MainContent';

const Layout: React.FC = () => {
  const [organizations, setOrganizations] = useState([]);
  const [hasFetched, setHasFetched] = useState(false);

  const fetchOrganizations = async () => {
    console.log('fetching organizations');
    const response = await fetch('/api/organizations');
    const data = await response.json();
    setOrganizations(data);
    setHasFetched(true);
  };

  return (
    <div className="flex h-screen">
      <Sidebar onOrganizationClick={fetchOrganizations} />
      <div className="flex-grow p-4">
        {hasFetched ? (
          <MainContent organizations={organizations} />
        ) : (
          <h1 className="text-5xl font-semibold">Hey, Welcome Back</h1>
        )}
      </div>
    </div>
  );
};

export default Layout;