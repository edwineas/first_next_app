"use client";
import React, { useState } from 'react';
import { Sidebar } from './components/sidebar';
import MainContent from './components/MainContent';


const Layout = ({ children }: { children: React.ReactNode }) => {
  const [organizations, setOrganizations] = useState([]);
  const [hasFetched, setHasFetched] = useState(false);

  const fetchOrganizations = async () => {
    const response = await fetch('/api/organizations');

    if (!response.ok) {
      console.error(`Error: ${response.status}`);
      return;
    }

    const data = await response.text();

    if (!data) {
      console.error('No data returned from /api/organizations');
      return;
    }

    try {
      const jsonData = JSON.parse(data);
      setOrganizations(jsonData);
      setHasFetched(true);
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
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
        {children}
      </div>
    </div>
  );
};

export default Layout;