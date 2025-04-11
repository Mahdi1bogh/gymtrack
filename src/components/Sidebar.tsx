import React from "react";

// Placeholder for logo/icons - install react-icons or similar
const KettlebellIcon = () => <span>[K]</span>; // Example placeholder
const HomeIcon = () => <span>[H]</span>;
const ChartIcon = () => <span>[C]</span>;
const TargetIcon = () => <span>[T]</span>;
const DocIcon = () => <span>[D]</span>;
const LogoutIcon = () => <span>[L]</span>;

export const Sidebar = () => {
  const navItems = [
    { icon: HomeIcon, active: true },
    { icon: ChartIcon },
    { icon: TargetIcon },
    { icon: DocIcon },
  ];

  return (
    <aside className="w-20 bg-brand-surface p-4 py-8 flex flex-col items-center justify-between min-h-screen">
      {/* Logo */}
      <div className="text-brand-primary mb-12">
        <KettlebellIcon />
      </div>

      {/* Navigation */}
      <nav className="flex flex-col items-center space-y-8 flex-1">
        {navItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <button
              key={index}
              className={`p-3 rounded-lg ${
                item.active
                  ? "bg-brand-primary text-brand-background"
                  : "text-brand-text-muted hover:text-brand-text-primary"
              }`}
            >
              <IconComponent />
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <button className="p-3 text-brand-text-muted hover:text-brand-text-primary">
        <LogoutIcon />
      </button>
    </aside>
  );
};
