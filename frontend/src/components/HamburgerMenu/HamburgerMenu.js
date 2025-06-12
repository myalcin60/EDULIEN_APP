import React, { useState } from 'react';
import { Menu, X } from 'react'; // ikonlar için (opsiyonel)
import './HamburgerMenu.css'; // isteğe bağlı stil dosyası

const HamburgerMenu = ({ menuItems }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="p-2">
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {open && (
        <div className="absolute right-0 top-10 bg-white shadow-lg rounded p-4 z-50">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <a href={item.href} className="text-gray-800 hover:text-blue-600">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
