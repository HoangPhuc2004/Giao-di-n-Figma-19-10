import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Clock, MapPin, Star, Ticket } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string, data?: any) => void;
}

const movies = [
  {
    id: 1,
    title: 'Dune: Phần Hai',
    genre: 'Khoa Học Viễn Tưởng, Phiêu Lưu',
    rating: 8.9,
    duration: '166 phút',
    image: 'https://images.unsplash.com/photo-1485095329183-d0797cdc5676?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHByZW1pZXJlfGVufDF8fHx8MTc2MDE3NDUxMXww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 2,
    title: 'Người Dơi Trở Lại',
    genre: 'Hành Động, Tội Phạm',
    rating: 8.7,
    duration: '175 phút',
    image: 'https://images.unsplash.com/photo-1688678004647-945d5aaf91c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHRoZWF0ZXIlMjBzY3JlZW58ZW58MXx8fHwxNzYwMTg1NTMzfDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 3,
    title: 'Giấc Mơ Inception',
    genre: 'Kinh Dị, Khoa Học Viễn Tưởng',
    rating: 9.0,
    duration: '148 phút',
    image: 'https://images.unsplash.com/photo-1548867688/231911e4ba3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3Bjb3JuJTIwY2luZW1hfGVufDF8fHx8MTc2MDIzNjk5N3ww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 4,
    title: 'Oppenheimer',
    genre: 'Tiểu Sử, Chính Kịch',
    rating: 8.8,
    duration: '180 phút',
    image: 'https://images.unsplash.com/photo-1485700330317-57a99a571ecb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWElMjB0aGVhdGVyJTIwc2VhdHN8ZW58MXx8fHwxNzYwMjM2OTk3fDA&ixlib=rb-4.1.0&q=80&w=1080'
  }
];

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-b from-red-50 to-white">
        <div className="absolute inset-0 opacity-20">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1485700330317-57a99a571ecb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWElMjB0aGVhdGVyJTIwc2VhdHN8ZW58MXx8fHwxNzYwMjM2OTk3fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Rạp chiếu phim"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <h2 className="text-5xl text-gray-900 mb-4">
              Trải Nghiệm Điện Ảnh Chưa Từng Có
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Màn hình cao cấp, ghế ngồi sang trọng và những khoảnh khắc khó quên
            </p>
            <div className="flex gap-4">
              <Button 
                onClick={() => onNavigate('movies')}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg"
              >
                Đặt Vé Ngay
              </Button>
              <Button 
                onClick={() => onNavigate('showtimes')}
                variant="outline" 
                className="border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-6 text-lg"
              >
                Xem Lịch Chiếu
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Now Showing */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl text-gray-900">Phim Đang Chiếu</h2>
            <Button variant="ghost" className="text-red-600 hover:text-red-700">
              Xem Tất Cả →
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <Card 
                key={movie.id} 
                className="bg-white border-gray-200 overflow-hidden hover:border-red-600 transition-all group cursor-pointer shadow-sm hover:shadow-md"
                onClick={() => onNavigate('movie-detail', { movieId: movie.id })}
              >
                <div className="relative h-80 overflow-hidden">
                  <ImageWithFallback
                    src={movie.image}
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-gray-900 text-sm">{movie.rating}</span>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-gray-900 mb-2">{movie.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{movie.genre}</p>
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                    <Clock className="w-4 h-4" />
                    <span>{movie.duration}</span>
                  </div>
                  <Button 
                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate('movie-detail', { movieId: movie.id });
                    }}
                  >
                    Đặt Vé
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Ticket className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl text-gray-900 mb-2">Đặt Vé Dễ Dàng</h3>
              <p className="text-gray-600">
                Đặt vé trực tuyến chỉ với vài cú nhấp chuột
              </p>
            </div>
            <div className="text-center">
              <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl text-gray-900 mb-2">Nhiều Địa Điểm</h3>
              <p className="text-gray-600">
                Tìm rạp CGV gần bạn khắp cả nước
              </p>
            </div>
            <div className="text-center">
              <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl text-gray-900 mb-2">Trải Nghiệm Cao Cấp</h3>
              <p className="text-gray-600">
                Ghế sang trọng, 4DX, IMAX và nhiều hơn nữa
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
