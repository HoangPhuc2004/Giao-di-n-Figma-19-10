import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Calendar, Star, Clock, MapPin, History, Search, Filter } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Separator } from '../ui/separator';

const viewHistory = [
  {
    id: 1,
    movie: 'Người Dơi Trở Lại',
    genre: 'Hành Động, Tội Phạm',
    cinema: 'CGV Aeon Mall',
    date: '10/03/2024',
    time: '20:30',
    rating: 8.7,
    userRating: 5,
    image: 'https://images.unsplash.com/photo-1688678004647-945d5aaf91c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHRoZWF0ZXIlMjBzY3JlZW58ZW58MXx8fHwxNzYwMTg1NTMzfDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 2,
    movie: 'Oppenheimer',
    genre: 'Tiểu Sử, Chính Kịch',
    cinema: 'CGV Crescent Mall',
    date: '05/03/2024',
    time: '18:00',
    rating: 8.8,
    userRating: 5,
    image: 'https://images.unsplash.com/photo-1485700330317-57a99a571ecb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWElMjB0aGVhdGVyJTIwc2VhdHN8ZW58MXx8fHwxNzYwMjM2OTk3fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 3,
    movie: 'Giấc Mơ Inception',
    genre: 'Kinh Dị, Khoa Học Viễn Tưởng',
    cinema: 'CGV Vincom Center',
    date: '28/02/2024',
    time: '21:00',
    rating: 9.0,
    userRating: 4,
    image: 'https://images.unsplash.com/photo-1548867688/231911e4ba3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3Bjb3JuJTIwY2luZW1hfGVufDF8fHx8MTc2MDIzNjk5N3ww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 4,
    movie: 'Dune: Phần Hai',
    genre: 'Khoa Học Viễn Tưởng, Phiêu Lưu',
    cinema: 'CGV Landmark 81',
    date: '20/02/2024',
    time: '19:30',
    rating: 8.9,
    userRating: 5,
    image: 'https://images.unsplash.com/photo-1485095329183-d0797cdc5676?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHByZW1pZXJlfGVufDF8fHx8MTc2MDE3NDUxMXww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 5,
    movie: 'Avatar 3',
    genre: 'Khoa Học Viễn Tưởng, Giả Tưởng',
    cinema: 'CGV Saigon Center',
    date: '15/02/2024',
    time: '20:00',
    rating: 8.5,
    userRating: 4,
    image: 'https://images.unsplash.com/photo-1515100235140-6cb3498e8031?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHRoZWF0ZXIlMjBhdWRpdG9yaXVtfGVufDF8fHx8MTc2MDIzODI1OXww&ixlib=rb-4.1.0&q=80&w=1080'
  }
];

export function ViewHistoryPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredHistory = viewHistory.filter(item =>
    item.movie.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? 'text-yellow-500 fill-yellow-500'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-red-50 to-white py-12 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-2">
            <History className="w-8 h-8 text-red-600" />
            <h1 className="text-4xl text-gray-900">Lịch Sử Xem Phim</h1>
          </div>
          <p className="text-gray-600">Tất cả phim bạn đã xem tại CGV</p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 max-w-4xl">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Tìm kiếm phim..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-gray-300 focus:border-red-600 focus:ring-red-600"
              />
            </div>
            <Button variant="outline" className="border-gray-300 text-gray-700">
              <Filter className="w-4 h-4 mr-2" />
              Lọc
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl">
            <Card className="bg-gradient-to-br from-red-50 to-white border-red-200">
              <CardContent className="p-4 text-center">
                <p className="text-3xl text-gray-900 mb-1">{viewHistory.length}</p>
                <p className="text-sm text-gray-600">Phim Đã Xem</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-200">
              <CardContent className="p-4 text-center">
                <p className="text-3xl text-gray-900 mb-1">
                  {(viewHistory.reduce((sum, item) => sum + item.userRating, 0) / viewHistory.length).toFixed(1)}
                </p>
                <p className="text-sm text-gray-600">Đánh Giá TB</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-50 to-white border-green-200">
              <CardContent className="p-4 text-center">
                <p className="text-3xl text-gray-900 mb-1">3</p>
                <p className="text-sm text-gray-600">Rạp Yêu Thích</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-50 to-white border-purple-200">
              <CardContent className="p-4 text-center">
                <p className="text-3xl text-gray-900 mb-1">
                  {new Date().getFullYear() - 2023}
                </p>
                <p className="text-sm text-gray-600">Năm Thành Viên</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* History List */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl space-y-4">
            {filteredHistory.map((item) => (
              <Card key={item.id} className="bg-white border-gray-200 overflow-hidden hover:border-red-600 transition-all shadow-sm hover:shadow-md">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    {/* Image */}
                    <div className="md:w-48 h-48 md:h-auto flex-shrink-0">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.movie}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-xl text-gray-900 mb-1">{item.movie}</h3>
                          <p className="text-sm text-gray-600">{item.genre}</p>
                        </div>
                        <Badge variant="outline" className="border-green-600 text-green-600">
                          Đã xem
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4 text-red-600" />
                          <span>{item.cinema}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4 text-red-600" />
                          <span>{item.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4 text-red-600" />
                          <span>{item.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span>{item.rating}</span>
                        </div>
                      </div>

                      <Separator className="my-4 bg-gray-200" />

                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                          <p className="text-sm text-gray-600 mb-2">Đánh giá của bạn</p>
                          {renderStars(item.userRating)}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="border-gray-300 text-gray-700">
                            Xem Lại
                          </Button>
                          <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                            Đánh Giá Lại
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredHistory.length === 0 && (
              <div className="text-center py-16">
                <History className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl text-gray-900 mb-2">Không tìm thấy kết quả</h3>
                <p className="text-gray-600">Thử tìm kiếm với từ khóa khác</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
