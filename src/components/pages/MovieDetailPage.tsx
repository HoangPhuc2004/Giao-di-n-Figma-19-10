import { useState } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Calendar, Clock, Star, Play, MapPin, Users, Film } from 'lucide-react';
import { Separator } from '../ui/separator';

interface MovieDetailPageProps {
  movieId: number;
  onNavigate: (page: string, data?: any) => void;
}

const movieData = {
  1: {
    id: 1,
    title: 'Dune: Phần Hai',
    originalTitle: 'Dune: Part Two',
    genre: 'Khoa Học Viễn Tưởng, Phiêu Lưu',
    rating: 8.9,
    duration: '166 phút',
    releaseDate: '01/03/2024',
    director: 'Denis Villeneuve',
    cast: 'Timothée Chalamet, Zendaya, Rebecca Ferguson',
    language: 'Tiếng Anh - Phụ đề Việt',
    ageRating: 'T13 - Phim được phổ biến đến người xem từ đủ 13 tuổi trở lên',
    description: 'Paul Atreides hợp nhất với Chani và Fremen trong khi tìm cách trả thù những kẻ âm mưu phá hủy gia đình mình. Đối mặt với sự lựa chọn giữa tình yêu của cuộc đời và số phận của vũ trụ đã biết, anh phải ngăn chặn một tương lai khủng khiếp mà chỉ anh có thể thấy trước.',
    image: 'https://images.unsplash.com/photo-1485095329183-d0797cdc5676?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHByZW1pZXJlfGVufDF8fHx8MTc2MDE3NDUxMXww&ixlib=rb-4.1.0&q=80&w=1080',
    trailer: 'https://www.youtube.com/watch?v=trailer'
  }
};

const showtimes = [
  { date: '25/03/2024', day: 'Thứ Hai' },
  { date: '26/03/2024', day: 'Thứ Ba' },
  { date: '27/03/2024', day: 'Thứ Tư' },
  { date: '28/03/2024', day: 'Thứ Năm' },
  { date: '29/03/2024', day: 'Thứ Sáu' }
];

const cinemas = [
  {
    id: 1,
    name: 'CGV Vincom Center',
    address: 'Quận 1, TP.HCM',
    times: ['10:00', '13:00', '16:00', '19:00', '22:00'],
    formats: ['2D', 'IMAX']
  },
  {
    id: 2,
    name: 'CGV Landmark 81',
    address: 'Bình Thạnh, TP.HCM',
    times: ['11:00', '14:00', '17:00', '20:00', '23:00'],
    formats: ['2D', '4DX']
  },
  {
    id: 3,
    name: 'CGV Aeon Mall',
    address: 'Tân Phú, TP.HCM',
    times: ['09:00', '12:00', '15:00', '18:00', '21:00'],
    formats: ['2D']
  }
];

export function MovieDetailPage({ movieId, onNavigate }: MovieDetailPageProps) {
  const movie = movieData[movieId as keyof typeof movieData] || movieData[1];
  const [selectedDate, setSelectedDate] = useState(showtimes[0]);
  const [selectedCinema, setSelectedCinema] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);

  const handleBooking = () => {
    if (selectedCinema && selectedTime && selectedFormat) {
      const cinema = cinemas.find(c => c.id === selectedCinema);
      onNavigate('seat-selection', {
        movie,
        date: selectedDate,
        cinema,
        time: selectedTime,
        format: selectedFormat
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[500px] bg-gradient-to-b from-black to-gray-900">
        <div className="absolute inset-0 opacity-40">
          <ImageWithFallback
            src={movie.image}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-end pb-12">
          <div className="flex flex-col md:flex-row gap-8 w-full">
            {/* Poster */}
            <div className="w-64 h-96 flex-shrink-0 rounded-lg overflow-hidden shadow-2xl">
              <ImageWithFallback
                src={movie.image}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex-1 text-white">
              <h1 className="text-5xl text-white mb-2">{movie.title}</h1>
              <p className="text-xl text-gray-300 mb-4">{movie.originalTitle}</p>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <span className="text-xl">{movie.rating}/10</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                  <Clock className="w-5 h-5" />
                  <span>{movie.duration}</span>
                </div>
                <Badge className="bg-red-600 text-white px-4 py-2 text-base">
                  {movie.genre}
                </Badge>
              </div>

              <div className="flex gap-4">
                <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg">
                  <Play className="w-5 h-5 mr-2" />
                  Xem Trailer
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Movie Info */}
              <Card className="bg-white border-gray-200">
                <CardContent className="p-6">
                  <h2 className="text-2xl text-gray-900 mb-4">Thông Tin Phim</h2>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-gray-600 text-sm mb-1">Đạo diễn</p>
                      <p className="text-gray-900">{movie.director}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm mb-1">Diễn viên</p>
                      <p className="text-gray-900">{movie.cast}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm mb-1">Ngôn ngữ</p>
                      <p className="text-gray-900">{movie.language}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm mb-1">Khởi chiếu</p>
                      <p className="text-gray-900">{movie.releaseDate}</p>
                    </div>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-yellow-800 text-sm">{movie.ageRating}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Synopsis */}
              <Card className="bg-white border-gray-200">
                <CardContent className="p-6">
                  <h2 className="text-2xl text-gray-900 mb-4">Nội Dung Phim</h2>
                  <p className="text-gray-700 leading-relaxed">{movie.description}</p>
                </CardContent>
              </Card>
            </div>

            {/* Right Sidebar - Booking */}
            <div className="lg:col-span-1">
              <Card className="bg-white border-gray-200 sticky top-24">
                <CardContent className="p-6">
                  <h2 className="text-2xl text-gray-900 mb-6">Đặt Vé Ngay</h2>

                  {/* Date Selection */}
                  <div className="mb-6">
                    <h3 className="text-gray-900 mb-3">Chọn Ngày</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {showtimes.map((showtime) => (
                        <button
                          key={showtime.date}
                          onClick={() => setSelectedDate(showtime)}
                          className={`p-3 rounded-lg border-2 transition-all text-center ${
                            selectedDate.date === showtime.date
                              ? 'border-red-600 bg-red-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <p className="text-xs text-gray-600">{showtime.day}</p>
                          <p className="text-sm text-gray-900">{showtime.date.split('/')[0]}/{showtime.date.split('/')[1]}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <Separator className="my-6 bg-gray-200" />

                  {/* Cinema Selection */}
                  <div className="mb-6">
                    <h3 className="text-gray-900 mb-3">Chọn Rạp</h3>
                    <div className="space-y-2">
                      {cinemas.map((cinema) => (
                        <button
                          key={cinema.id}
                          onClick={() => {
                            setSelectedCinema(cinema.id);
                            setSelectedTime(null);
                            setSelectedFormat(null);
                          }}
                          className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                            selectedCinema === cinema.id
                              ? 'border-red-600 bg-red-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <p className="text-gray-900">{cinema.name}</p>
                          <p className="text-xs text-gray-600">{cinema.address}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Format & Time Selection */}
                  {selectedCinema && (
                    <>
                      <Separator className="my-6 bg-gray-200" />
                      <div className="mb-6">
                        <h3 className="text-gray-900 mb-3">Định Dạng</h3>
                        <div className="flex gap-2">
                          {cinemas.find(c => c.id === selectedCinema)?.formats.map((format) => (
                            <button
                              key={format}
                              onClick={() => setSelectedFormat(format)}
                              className={`px-4 py-2 rounded-lg border-2 transition-all ${
                                selectedFormat === format
                                  ? 'border-red-600 bg-red-600 text-white'
                                  : 'border-gray-200 text-gray-700 hover:border-gray-300'
                              }`}
                            >
                              {format}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="mb-6">
                        <h3 className="text-gray-900 mb-3">Chọn Suất Chiếu</h3>
                        <div className="grid grid-cols-3 gap-2">
                          {cinemas.find(c => c.id === selectedCinema)?.times.map((time) => (
                            <button
                              key={time}
                              onClick={() => setSelectedTime(time)}
                              className={`py-2 rounded-lg border-2 transition-all ${
                                selectedTime === time
                                  ? 'border-red-600 bg-red-600 text-white'
                                  : 'border-gray-200 text-gray-700 hover:border-gray-300'
                              }`}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  <Button
                    onClick={handleBooking}
                    disabled={!selectedCinema || !selectedTime || !selectedFormat}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Tiếp Tục Chọn Ghế
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
