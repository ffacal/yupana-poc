import { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  LineChart, 
  PieChart, 
  LayoutDashboard, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu,
  HeartHandshake,
  MessageSquare
} from 'lucide-react';
import clsx from 'clsx';

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Inicio', icon: LayoutDashboard },
    { path: '/market-research', label: 'Market Research', icon: PieChart },
    { path: '/company-insights', label: 'Company Insights', icon: LineChart },
    { path: '/executive-report', label: 'Executive Report', icon: BarChart3 },
    { path: '/customer-support', label: 'Customer Support', icon: HeartHandshake },
    { path: '/global-chat-history', label: 'Global Chat History', icon: MessageSquare },
  ];

  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden text-gray-900">
      {/* Sidebar */}
      <aside 
        className={clsx(
          "bg-white border-r border-gray-200 transition-all duration-300 ease-in-out flex flex-col relative z-20",
          collapsed ? "w-20" : "w-64"
        )}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <img src="/yupana-logo.jpeg" alt="Yupana Logo" className="w-8 h-8 rounded-lg object-contain bg-[#1F1F1F]" />
              <span className="font-bold text-xl tracking-tight">Yupana</span>
            </div>
          )}
          {collapsed && (
            <div className="w-full flex justify-center">
              <img src="/yupana-logo.jpeg" alt="Yupana Logo" className="w-8 h-8 rounded-lg object-contain bg-[#1F1F1F]" />
            </div>
          )}
        </div>

        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 bg-white border border-gray-200 rounded-full p-1 shadow-sm hover:bg-gray-50 z-30"
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

        <div className="flex-1 overflow-y-auto py-6 px-3 flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={clsx(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group",
                  isActive 
                    ? "bg-gray-100 text-black font-medium" 
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                )}
                title={collapsed ? item.label : undefined}
              >
                <Icon size={20} className={clsx(isActive ? "text-black" : "text-gray-400 group-hover:text-gray-600")} />
                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            );
          })}

          <div className="mt-auto">
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors group">
              <Settings size={20} className="text-gray-400 group-hover:text-gray-600" />
              {!collapsed && <span>Settings</span>}
            </button>
            <button className="w-full mt-2 flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors group">
              <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" className="w-full h-full" />
              </div>
              {!collapsed && <span className="text-sm">gonzalo@yupana.ai</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-full overflow-hidden flex flex-col relative">
        <header className="h-16 flex items-center justify-between px-8 border-b border-gray-200 bg-white/50 backdrop-blur-sm z-10">
          <div className="flex items-center gap-4">
            <div className="lg:hidden">
              <Menu size={24} className="text-gray-500" />
            </div>
            <h1 className="text-lg font-medium text-gray-800">
              {navItems.find(i => i.path === location.pathname)?.label || 'Dashboard'}
            </h1>
          </div>
          <div className="flex items-center gap-3">
             <div className="px-3 py-1.5 rounded-full bg-green-50 border border-green-100 text-green-700 text-xs font-medium flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Conectado al ERP
             </div>
          </div>
        </header>
        
        <div className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
