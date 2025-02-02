import { useRouter } from 'next/router';
import { MouseEventHandler, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { clearUser } from '@/store/reducers/userSlice';

const useUserDropdown = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleOutsideClick = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  const handleDropdownClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const handleMenuClick: MouseEventHandler<HTMLLIElement> = (e) => {
    e.stopPropagation();
    setIsOpen(false);
  };

  const handleLogoutClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    dispatch(clearUser());
    setIsOpen(false);
    router.push('/');
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  return { isOpen, dropdownRef, handleDropdownClick, handleMenuClick, handleLogoutClick };
};

export default useUserDropdown;
