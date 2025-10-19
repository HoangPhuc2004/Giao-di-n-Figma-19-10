import { useState } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Clock, Star, Calendar } from 'lucide-react';

interface MoviesPageProps {
  onNavigate: (page: string, data?: any) => void;
}

const moviesData = [
  {
    id: 1,
    title: 'Dune: Phần Hai',
    genre: 'Khoa Học Viễn Tưởng, Phiêu Lưu',
    rating: 8.9,
    duration: '166 phút',
    releaseDate: '2024-03-01',
    status: 'now-showing',
    image: 'https://images.unsplash.com/photo-1485095329183-d0797cdc5676?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHByZW1pZXJlfGVufDF8fHx8MTc2MDE3NDUxMXww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 2,
    title: 'Người Dơi Trở Lại',
    genre: 'Hành Động, Tội Phạm',
    rating: 8.7,
    duration: '175 phút',
    releaseDate: '2024-02-15',
    status: 'now-showing',
    image: 'https://images.unsplash.com/photo-1688678004647-945d5aaf91c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHRoZWF0ZXIlMjBzY3JlZW58ZW58MXx8fHwxNzYwMTg1NTMzfDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 3,
    title: 'Giấc Mơ Inception',
    genre: 'Kinh Dị, Khoa Học Viễn Tưởng',
    rating: 9.0,
    duration: '148 phút',
    releaseDate: '2024-03-10',
    status: 'now-showing',
    image: 'https://images.unsplash.com/photo-1548867688-231911e4ba3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3Bjb3JuJTIwY2luZW1hfGVufDF8fHx8MTc2MDIzNjk5N3ww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 4,
    title: 'Oppenheimer',
    genre: 'Tiểu Sử, Chính Kịch',
    rating: 8.8,
    duration: '180 phút',
    releaseDate: '2024-02-20',
    status: 'now-showing',
    image: 'https://images.unsplash.com/photo-1485700330317-57a99a571ecb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWElMjB0aGVhdGVyJTIwc2VhdHN8ZW58MXx8fHwxNzYwMjM2OTk3fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 5,
    title: 'Avatar 3',
    genre: 'Khoa Học Viễn Tưởng, Giả Tưởng',
    rating: 0,
    duration: '195 phút',
    releaseDate: '2024-12-20',
    status: 'coming-soon',
    image: 'https://images.unsplash.com/photo-1515100235140-6cb3498e8031?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHRoZWF0ZXIlMjBhdWRpdG9yaXVtfGVufDF8fHx8MTc2MDIzODI1OXww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 6,
    title: 'Nhiệm Vụ Bất Khả Thi 8',
    genre: 'Hành Động, Kinh Dị',
    rating: 0,
    duration: '163 phút',
    releaseDate: '2025-05-23',
    status: 'coming-soon',
    image: 'https://images.unsplash.com/photo-1667858329757-95becd82346e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWxtJTIwcmVlbCUyMGNpbmVtYXxlbnwxfHx8fDE3NjAyMzgyNjB8MA&ixlib=rb-4.1.0&q=80&w=1080'
  }
];

export function MoviesPage({ onNavigate }: MoviesPageProps) {
  const [selectedTab, setSelectedTab] = useState('now-showing');

  const filteredMovies = moviesData.filter(movie => movie.status === selectedTab);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-b from-red-50 to-white">
        <div className="absolute inset-0 opacity-20">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1515100235140-6cb3498e8031?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHRoZWF0ZXIlMjBhdWRpdG9yaXVtfGVufDF8fHx8MTc2MDIzODI1OXww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Rạp chiếu phim"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl text-gray-900 mb-4">Tất Cả Phim</h1>
            <p className="text-xl text-gray-700">
              Khám phá bộ sưu tập phim đầy đủ đang chiếu và sắp ra mắt
            </p>
          </div>
        </div>
      </section>

      {/* Movies Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="bg-white border border-gray-200 mb-8">
              <TabsTrigger 
                value="now-showing" 
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
              >
                Đang Chiếu
              </TabsTrigger>
              <TabsTrigger 
                value="coming-soon"
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
              >
                Sắp Chiếu
              </TabsTrigger>
            </TabsList>

            <TabsContent value={selectedTab}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMovies.map((movie) => (
                  <Card 
                    key={movie.id} 
                    className="bg-white border-gray-200 overflow-hidden hover:border-red-600 transition-all group cursor-pointer shadow-sm hover:shadow-md"
                    onClick={() => onNavigate('movie-detail', { movieId: movie.id })}
                  >
                    <div className="relative h-96 overflow-hidden">
                      <ImageWithFallback
                        src={movie.image}
                        alt={movie.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      {movie.status === 'now-showing' && movie.rating > 0 && (
                        <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-gray-900 text-sm">{movie.rating}</span>
                        </div>
                      )}
                      {movie.status === 'coming-soon' && (
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-red-600 text-white">Sắp Chiếu</Badge>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="text-gray-900 text-xl mb-2">{movie.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{movie.genre}</p>
                      <div className="flex items-center gap-4 text-gray-500 text-sm mb-4">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{movie.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(movie.releaseDate).toLocaleDateString('vi-VN')}</span>
                        </div>
                      </div>
                      <Button 
                        className="w-full bg-red-600 hover:bg-red-700 text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigate('movie-detail', { movieId: movie.id });
                        }}
                      >
                        {movie.status === 'now-showing' ? 'Đặt Vé' : 'Thông Báo Cho Tôi'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
