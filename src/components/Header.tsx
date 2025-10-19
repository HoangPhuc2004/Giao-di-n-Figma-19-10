import { useState } from 'react';
import { Button } from './ui/button';
import { Ticket, User, ChevronDown, Edit, History, LogOut } from 'lucide-react';
import { useAuth } from './AuthContext';
import { LoginDialog } from './LoginDialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const { isAuthenticated, user, logout } = useAuth();
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Trang Chủ' },
    { id: 'movies', label: 'Phim' },
    { id: 'showtimes', label: 'Lịch Chiếu' },
    { id: 'cinemas', label: 'Rạp' },
    { id: 'promotions', label: 'Khuyến Mãi' },
    { id: 'events', label: 'Sự Kiện' }
  ];

  const handleLogout = () => {
    logout();
    onNavigate('home');
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <button 
                onClick={() => onNavigate('home')}
                className="text-3xl text-red-600 hover:text-red-700 transition-colors"
              >
                CGV
              </button>
              <nav className="hidden md:flex gap-6">
                {navItems.slice(1).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`transition-colors ${
                      currentPage === item.id
                        ? 'text-red-600'
                        : 'text-gray-700 hover:text-red-600'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                  <DropdownMenuTrigger asChild>
                    <div 
                      onMouseEnter={() => setIsDropdownOpen(true)}
                      onMouseLeave={() => setIsDropdownOpen(false)}
                    >
                      <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                        <User className="w-4 h-4 mr-2" />
                        {user?.name}
                        <ChevronDown className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    align="end" 
                    className="w-56 bg-white"
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                  >
                    <DropdownMenuItem
                      onClick={() => {
                        onNavigate('my-account');
                        setIsDropdownOpen(false);
                      }}
                      className="cursor-pointer hover:bg-gray-50"
                    >
                      <User className="w-4 h-4 mr-2" />
                      Trang Của Tôi
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        onNavigate('edit-profile');
                        setIsDropdownOpen(false);
                      }}
                      className="cursor-pointer hover:bg-gray-50"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Chỉnh Sửa Thông Tin
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        onNavigate('my-tickets');
                        setIsDropdownOpen(false);
                      }}
                      className="cursor-pointer hover:bg-gray-50"
                    >
                      <Ticket className="w-4 h-4 mr-2" />
                      Vé Đã Đặt
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        onNavigate('view-history');
                        setIsDropdownOpen(false);
                      }}
                      className="cursor-pointer hover:bg-gray-50"
                    >
                      <History className="w-4 h-4 mr-2" />
                      Lịch Sử Xem
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        handleLogout();
                        setIsDropdownOpen(false);
                      }}
                      className="cursor-pointer hover:bg-gray-50 text-red-600"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Đăng Xuất
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  variant="outline"
                  className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                  onClick={() => setShowLoginDialog(true)}
                >
                  Đăng Nhập
                </Button>
              )}
              <Button className="bg-red-600 hover:bg-red-700 text-white">
                <Ticket className="w-4 h-4 mr-2" />
                Đặt Vé
              </Button>
            </div>
          </div>
        </div>
      </header>

      <LoginDialog open={showLoginDialog} onOpenChange={setShowLoginDialog} />
    </>
  );
}
