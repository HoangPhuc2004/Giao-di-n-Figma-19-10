import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useAuth } from './AuthContext';
import { Mail, Lock, User, Phone } from 'lucide-react';

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LoginDialog({ open, onOpenChange }: LoginDialogProps) {
  const { login } = useAuth();
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail && loginPassword) {
      login(loginEmail, loginPassword);
      onOpenChange(false);
      // Reset form
      setLoginEmail('');
      setLoginPassword('');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (registerEmail && registerPassword && registerPassword === registerConfirmPassword) {
      login(registerEmail, registerPassword, registerName);
      onOpenChange(false);
      // Reset form
      setRegisterName('');
      setRegisterEmail('');
      setRegisterPhone('');
      setRegisterPassword('');
      setRegisterConfirmPassword('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl text-gray-900">Chào mừng đến với CGV</DialogTitle>
          <DialogDescription className="text-gray-600">
            Đăng nhập hoặc tạo tài khoản để trải nghiệm đầy đủ các tính năng
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-100">
            <TabsTrigger value="login" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
              Đăng Nhập
            </TabsTrigger>
            <TabsTrigger value="register" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
              Đăng Ký
            </TabsTrigger>
          </TabsList>

          {/* Login Tab */}
          <TabsContent value="login" className="space-y-4 mt-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email" className="text-gray-900">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="email@example.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="pl-10 border-gray-300 focus:border-red-600 focus:ring-red-600"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="login-password" className="text-gray-900">Mật khẩu</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="pl-10 border-gray-300 focus:border-red-600 focus:ring-red-600"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <input type="checkbox" className="rounded border-gray-300" />
                  Ghi nhớ đăng nhập
                </label>
                <a href="#" className="text-sm text-red-600 hover:text-red-700">
                  Quên mật khẩu?
                </a>
              </div>

              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white">
                Đăng Nhập
              </Button>
            </form>
          </TabsContent>

          {/* Register Tab */}
          <TabsContent value="register" className="space-y-4 mt-4">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="register-name" className="text-gray-900">Họ và tên</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    id="register-name"
                    type="text"
                    placeholder="Nguyễn Văn A"
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                    className="pl-10 border-gray-300 focus:border-red-600 focus:ring-red-600"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-email" className="text-gray-900">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="email@example.com"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    className="pl-10 border-gray-300 focus:border-red-600 focus:ring-red-600"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-phone" className="text-gray-900">Số điện thoại</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    id="register-phone"
                    type="tel"
                    placeholder="0912345678"
                    value={registerPhone}
                    onChange={(e) => setRegisterPhone(e.target.value)}
                    className="pl-10 border-gray-300 focus:border-red-600 focus:ring-red-600"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-password" className="text-gray-900">Mật khẩu</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    id="register-password"
                    type="password"
                    placeholder="••••••••"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    className="pl-10 border-gray-300 focus:border-red-600 focus:ring-red-600"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-confirm-password" className="text-gray-900">Xác nhận mật khẩu</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    id="register-confirm-password"
                    type="password"
                    placeholder="••••••••"
                    value={registerConfirmPassword}
                    onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                    className="pl-10 border-gray-300 focus:border-red-600 focus:ring-red-600"
                    required
                  />
                </div>
              </div>

              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1 rounded border-gray-300" required />
                <p className="text-sm text-gray-600">
                  Tôi đồng ý với{' '}
                  <a href="#" className="text-red-600 hover:text-red-700">
                    Điều khoản sử dụng
                  </a>{' '}
                  và{' '}
                  <a href="#" className="text-red-600 hover:text-red-700">
                    Chính sách bảo mật
                  </a>
                </p>
              </div>

              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white">
                Đăng Ký Tài Khoản
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
