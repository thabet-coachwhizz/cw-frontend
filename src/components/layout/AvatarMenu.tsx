'use client';

import { usePathname } from 'next/navigation';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { User as UserIcon, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Link from '@/components/ui/Link';

export default function AvatarMenu() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const initial = (user?.name || user?.email || '?')[0]?.toUpperCase();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="h-8 w-8 rounded-full bg-[#08B1C7] text-white flex items-center justify-center uppercase">
          {initial}
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="mt-2 min-w-[140px] rounded-md bg-[#2A2D37] text-white shadow-lg py-1">
        <DropdownMenu.Item asChild>
          <Link
            href="/profile"
            className={`w-full px-4 py-2 text-sm  hover:bg-[#08B1C7] hover:text-white ${pathname === '/profile' ? 'text-[#08B1C7]' : 'text-white'}`}
          >
            <div className="flex items-center">
              <UserIcon className="mr-2 h-4 w-4 " /> Profile
            </div>
          </Link>
        </DropdownMenu.Item>
        <DropdownMenu.Item
          onSelect={(e) => {
            e.preventDefault();
            logout();
          }}
          className="flex items-center px-4 py-2 text-sm hover:bg-[#08B1C7] hover:text-white cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
