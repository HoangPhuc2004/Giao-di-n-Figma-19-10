import { useState } from 'react';
import { useAuth } from '../AuthContext';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { User, Mail, Phone, Calendar, Camera, Save } from 'lucide-react';
import { Separator } from '../ui/separator';

export function EditProfilePage() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    birthday: '01/01/1990',
    address: 'TP. Hồ Chí Minh',
    gender: 'male'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Xử lý lưu thông tin
    alert('Thông tin đã được cập nhật!');
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-red-50 to-white py-12 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl text-gray-900 mb-2">Chỉnh Sửa Thông Tin Cá Nhân</h1>
          <p className="text-gray-600">Cập nhật thông tin tài khoản của bạn</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Avatar Section */}
                <div className="lg:col-span-1">
                  <Card className="bg-white border-gray-200">
                    <CardHeader>
                      <CardTitle className="text-gray-900">Ảnh Đại Diện</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center gap-4">
                      <div className="relative">
                        <div className="w-32 h-32 bg-red-600 rounded-full flex items-center justify-center">
                          <User className="w-16 h-16 text-white" />
                        </div>
                        <button
                          type="button"
                          className="absolute bottom-0 right-0 bg-white border-2 border-gray-200 rounded-full p-2 hover:bg-gray-50 transition-colors"
                        >
                          <Camera className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600 mb-2">Tải ảnh mới lên</p>
                        <Button type="button" variant="outline" size="sm" className="border-gray-300 text-gray-700">
                          Chọn Ảnh
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Form Section */}
                <div className="lg:col-span-2">
                  <Card className="bg-white border-gray-200">
                    <CardHeader>
                      <CardTitle className="text-gray-900">Thông Tin Cá Nhân</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Name */}
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-900">Họ và Tên</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            className="pl-10 border-gray-300 focus:border-red-600 focus:ring-red-600"
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-900">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            className="pl-10 border-gray-300 focus:border-red-600 focus:ring-red-600"
                          />
                        </div>
                      </div>

                      {/* Phone */}
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-gray-900">Số Điện Thoại</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleChange('phone', e.target.value)}
                            className="pl-10 border-gray-300 focus:border-red-600 focus:ring-red-600"
                          />
                        </div>
                      </div>

                      {/* Birthday */}
                      <div className="space-y-2">
                        <Label htmlFor="birthday" className="text-gray-900">Ngày Sinh</Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                          <Input
                            id="birthday"
                            type="date"
                            value={formData.birthday}
                            onChange={(e) => handleChange('birthday', e.target.value)}
                            className="pl-10 border-gray-300 focus:border-red-600 focus:ring-red-600"
                          />
                        </div>
                      </div>

                      {/* Gender */}
                      <div className="space-y-2">
                        <Label className="text-gray-900">Giới Tính</Label>
                        <div className="flex gap-4">
                          <label className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="gender"
                              value="male"
                              checked={formData.gender === 'male'}
                              onChange={(e) => handleChange('gender', e.target.value)}
                              className="text-red-600 focus:ring-red-600"
                            />
                            <span className="text-gray-700">Nam</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="gender"
                              value="female"
                              checked={formData.gender === 'female'}
                              onChange={(e) => handleChange('gender', e.target.value)}
                              className="text-red-600 focus:ring-red-600"
                            />
                            <span className="text-gray-700">Nữ</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="gender"
                              value="other"
                              checked={formData.gender === 'other'}
                              onChange={(e) => handleChange('gender', e.target.value)}
                              className="text-red-600 focus:ring-red-600"
                            />
                            <span className="text-gray-700">Khác</span>
                          </label>
                        </div>
                      </div>

                      {/* Address */}
                      <div className="space-y-2">
                        <Label htmlFor="address" className="text-gray-900">Địa Chỉ</Label>
                        <Input
                          id="address"
                          value={formData.address}
                          onChange={(e) => handleChange('address', e.target.value)}
                          className="border-gray-300 focus:border-red-600 focus:ring-red-600"
                        />
                      </div>

                      <Separator className="bg-gray-200" />

                      {/* Action Buttons */}
                      <div className="flex gap-3 justify-end">
                        <Button type="button" variant="outline" className="border-gray-300 text-gray-700">
                          Hủy
                        </Button>
                        <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white">
                          <Save className="w-4 h-4 mr-2" />
                          Lưu Thay Đổi
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
