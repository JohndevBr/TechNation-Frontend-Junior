"use client"

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import { NavbarContainer } from './styles';

export default function Navbar() {
  const pathname = usePathname()

  return (
    <NavbarContainer>
      <ul>
        <li className={pathname === '/' ? 'active' : ''}>
          <Link href="/">Dashboard</Link>
        </li>
        <li>
          <Link href="/">Users</Link>
        </li>
        <li>
          <Link href="/">Notes</Link>
        </li>
      </ul>
    </NavbarContainer>
  );
};

