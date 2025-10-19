import { useAuth } from '../AuthContext';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { User, Mail, Phone, Calendar, Ticket, Star, Gift, LogOut, Settings, Heart, Clock } from 'lucide-react';

export function MyAccountPage() {
  const { user, logout } = useAuth();

  if (!user) {
    return null;
  }

  const bookingHistory = [
    {
      id: 1,
      movie: 'Dune: Phần Hai',
      cinema: 'CGV Vincom Center',
      date: '15/03/2024',
      time: '19:00',
      seats: 'H8, H9',
      total: '340.000đ',
      status: 'completed'
    },
    {
      id: 2,
      movie: 'Người Dơi Trở Lại',
      cinema: 'CGV Landmark 81',
      date: '10/03/2024',
      time: '20:30',
      seats: 'F5, F6',
      total: '360.000đ',
      status: 'completed'
    },
    {
      id: 3,
      movie: 'Oppenheimer',
      cinema: 'CGV Aeon Mall',
      date: '25/03/2024',
      time: '21:00',
      seats: 'G10, G11',
      total: '320.000đ',
      status: 'upcoming'
    }
  ];

  const favoriteMovies = [
    { id: 1, title: 'Dune: Phần Hai', genre: 'Khoa Học Viễn Tưởng' },
    { id: 2, title: 'Inception', genre: 'Kinh Dị' },
    { id: 3, title: 'The Dark Knight', genre: 'Hành Động' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-red-50 to-white py-12 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
              <div>
                <h1 className="text-4xl text-gray-900 mb-2">{user.name}</h1>
                <div className="flex items-center gap-4 text-gray-600">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>{user.email}</span>
                  </div>
                  {user.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>{user.phone}</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-2 text-gray-500 text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>Thành viên từ {user.memberSince}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                <Settings className="w-4 h-4 mr-2" />
                Cài Đặt
              </Button>
              <Button
                onClick={logout}
                variant="outline"
                className="border-red-600 text-red-600 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Đăng Xuất
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-red-50 to-white border-red-200">
              <CardContent className="p-6 text-center">
                <Ticket className="w-8 h-8 text-red-600 mx-auto mb-2" />
                <p className="text-3xl text-gray-900 mb-1">12</p>
                <p className="text-sm text-gray-600">Vé Đã Đặt</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-200">
              <CardContent className="p-6 text-center">
                <Star className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-3xl text-gray-900 mb-1">850</p>
                <p className="text-sm text-gray-600">Điểm Tích Lũy</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-50 to-white border-green-200">
              <CardContent className="p-6 text-center">
                <Gift className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-3xl text-gray-900 mb-1">3</p>
                <p className="text-sm text-gray-600">Ưu Đãi Khả Dụng</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-50 to-white border-purple-200">
              <CardContent className="p-6 text-center">
                <Heart className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-3xl text-gray-900 mb-1">5</p>
                <p className="text-sm text-gray-600">Phim Yêu Thích</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Booking History */}
            <div className="lg:col-span-2">
              <Card className="bg-white border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <Clock className="w-5 h-5 text-red-600" />
                    Lịch Sử Đặt Vé
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {bookingHistory.map((booking) => (
                    <div key={booking.id} className="border border-gray-200 rounded-lg p-4 hover:border-red-600 transition-colors">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-gray-900 mb-1">{booking.movie}</h3>
                          <p className="text-sm text-gray-600">{booking.cinema}</p>
                        </div>
                        <Badge className={booking.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}>
                          {booking.status === 'completed' ? 'Đã xem' : 'Sắp tới'}
                        </Badge>
                      </div>
                      <Separator className="my-3 bg-gray-200" />
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Ngày & Giờ</p>
                          <p className="text-gray-900">{booking.date} - {booking.time}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Ghế ngồi</p>
                          <p className="text-gray-900">{booking.seats}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Tổng tiền</p>
                          <p className="text-red-600">{booking.total}</p>
                        </div>
                        <div className="flex justify-end items-end">
                          <Button variant="outline" size="sm" className="border-red-600 text-red-600 hover:bg-red-50">
                            Xem Chi Tiết
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Favorite Movies */}
              <Card className="bg-white border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <Heart className="w-5 h-5 text-red-600" />
                    Phim Yêu Thích
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {favoriteMovies.map((movie) => (
                    <div key={movie.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div>
                        <p className="text-gray-900 text-sm">{movie.title}</p>
                        <p className="text-xs text-gray-500">{movie.genre}</p>
                      </div>
                      <Heart className="w-4 h-4 text-red-600 fill-red-600" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Membership Card */}
              <Card className="bg-gradient-to-br from-red-600 to-red-700 border-0 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-red-100 text-sm">Thẻ Thành Viên</p>
                      <h3 className="text-2xl">CGV Member</h3>
                    </div>
                    <Star className="w-8 h-8 text-yellow-300 fill-yellow-300" />
                  </div>
                  <p className="text-xl mb-4">**** **** **** 1234</p>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-red-100 text-xs">Hạng thành viên</p>
                      <p className="text-lg">Gold</p>
                    </div>
                    <div className="text-right">
                      <p className="text-red-100 text-xs">Điểm</p>
                      <p className="text-lg">850</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-white border-gray-200">
                <CardHeader>
                  <CardTitle className="text-gray-900">Thao Tác Nhanh</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white justify-start">
                    <Ticket className="w-4 h-4 mr-2" />
                    Đặt Vé Ngay
                  </Button>
                  <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 justify-start">
                    <Gift className="w-4 h-4 mr-2" />
                    Xem Ưu Đãi
                  </Button>
                  <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 justify-start">
                    <Star className="w-4 h-4 mr-2" />
                    Đổi Điểm
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
