import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Calendar, MapPin, Clock, Film, Filter } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface ShowtimesPageProps {
  onNavigate: (page: string, data?: any) => void;
}

const dates = [
  { date: '25/03/2024', day: 'Thứ Hai', dayShort: 'T2' },
  { date: '26/03/2024', day: 'Thứ Ba', dayShort: 'T3' },
  { date: '27/03/2024', day: 'Thứ Tư', dayShort: 'T4' },
  { date: '28/03/2024', day: 'Thứ Năm', dayShort: 'T5' },
  { date: '29/03/2024', day: 'Thứ Sáu', dayShort: 'T6' },
  { date: '30/03/2024', day: 'Thứ Bảy', dayShort: 'T7' },
  { date: '31/03/2024', day: 'Chủ Nhật', dayShort: 'CN' }
];

const cinemas = [
  // TP. Hồ Chí Minh (6 rạp)
  { id: 1, name: 'CGV Vincom Center', address: 'Quận 1, TP.HCM', city: 'TP. Hồ Chí Minh', screens: 8 },
  { id: 2, name: 'CGV Landmark 81', address: 'Bình Thạnh, TP.HCM', city: 'TP. Hồ Chí Minh', screens: 12 },
  { id: 3, name: 'CGV Aeon Mall', address: 'Tân Phú, TP.HCM', city: 'TP. Hồ Chí Minh', screens: 10 },
  { id: 4, name: 'CGV Crescent Mall', address: 'Quận 7, TP.HCM', city: 'TP. Hồ Chí Minh', screens: 6 },
  { id: 5, name: 'CGV Saigon Center', address: 'Quận 1, TP.HCM', city: 'TP. Hồ Chí Minh', screens: 7 },
  { id: 6, name: 'CGV Parkson Hùng Vương', address: 'Quận 5, TP.HCM', city: 'TP. Hồ Chí Minh', screens: 5 },
  
  // Hà Nội (4 rạp)
  { id: 7, name: 'CGV Vincom Bà Triệu', address: 'Quận Hai Bà Trưng, Hà Nội', city: 'Hà Nội', screens: 9 },
  { id: 8, name: 'CGV Aeon Long Biên', address: 'Quận Long Biên, Hà Nội', city: 'Hà Nội', screens: 8 },
  { id: 9, name: 'CGV Vincom Mega Mall', address: 'Quận Hai Bà Trưng, Hà Nội', city: 'Hà Nội', screens: 10 },
  { id: 10, name: 'CGV Royal City', address: 'Quận Thanh Xuân, Hà Nội', city: 'Hà Nội', screens: 11 },
  
  // Đà Nẵng (2 rạp)
  { id: 11, name: 'CGV Vincom Đà Nẵng', address: 'Quận Sơn Trà, Đà Nẵng', city: 'Đà Nẵng', screens: 7 },
  { id: 12, name: 'CGV Lotte Mart', address: 'Quận Hải Châu, Đà Nẵng', city: 'Đà Nẵng', screens: 6 },
  
  // Cần Thơ (2 rạp)
  { id: 13, name: 'CGV Vincom Xuân Khánh', address: 'Quận Ninh Kiều, Cần Thơ', city: 'Cần Thơ', screens: 6 },
  { id: 14, name: 'CGV Sense City', address: 'Quận Ninh Kiều, Cần Thơ', city: 'Cần Thơ', screens: 5 },
  
  // Hải Phòng (3 rạp)
  { id: 15, name: 'CGV Vincom Plaza', address: 'Quận Hồng Bàng, Hải Phòng', city: 'Hải Phòng', screens: 7 },
  { id: 16, name: 'CGV Aeon Mall Hải Phòng', address: 'Quận Lê Chân, Hải Phòng', city: 'Hải Phòng', screens: 8 },
  { id: 17, name: 'CGV Vincom Hải Phòng', address: 'Quận Ngô Quyền, Hải Phòng', city: 'Hải Phòng', screens: 6 },
  
  // Biên Hòa (2 rạp)
  { id: 18, name: 'CGV Bien Hoa', address: 'Trung Tâm, Biên Hòa', city: 'Biên Hòa', screens: 6 },
  { id: 19, name: 'CGV Vincom Biên Hòa', address: 'Quận Biên Hòa, Biên Hòa', city: 'Biên Hòa', screens: 7 },
  
  // Nha Trang (2 rạp)
  { id: 20, name: 'CGV Nha Trang Center', address: 'Trung Tâm, Nha Trang', city: 'Nha Trang', screens: 5 },
  { id: 21, name: 'CGV Vincom Nha Trang', address: 'Trần Phú, Nha Trang', city: 'Nha Trang', screens: 6 },
  
  // Huế (2 rạp)
  { id: 22, name: 'CGV Vincom Huế', address: 'Lê Duẩn, Huế', city: 'Huế', screens: 5 },
  { id: 23, name: 'CGV Big C Huế', address: 'Trung Tâm, Huế', city: 'Huế', screens: 4 },
  
  // Vũng Tàu (2 rạp)
  { id: 24, name: 'CGV Vũng Tàu', address: 'Trần Hưng Đạo, Vũng Tàu', city: 'Vũng Tàu', screens: 5 },
  { id: 25, name: 'CGV Imperial Plaza', address: 'Trung Tâm, Vũng Tàu', city: 'Vũng Tàu', screens: 6 },
  
  // Thủ Đức (2 rạp)
  { id: 26, name: 'CGV Thủ Đức', address: 'Võ Văn Ngân, Thủ Đức', city: 'Thủ Đức', screens: 6 },
  { id: 27, name: 'CGV Vincom Thủ Đức', address: 'Quốc Lộ 13, Thủ Đức', city: 'Thủ Đức', screens: 7 },
  
  // Quy Nhơn (1 rạp)
  { id: 28, name: 'CGV Quy Nhơn', address: 'Lê Hồng Phong, Quy Nhơn', city: 'Quy Nhơn', screens: 5 },
  
  // Buôn Ma Thuột (1 rạp)
  { id: 29, name: 'CGV Buôn Ma Thuột', address: 'Trung Tâm, Buôn Ma Thuột', city: 'Buôn Ma Thuột', screens: 4 },
  
  // Vinh (2 rạp)
  { id: 30, name: 'CGV Vinh', address: 'Quang Trung, Vinh', city: 'Vinh', screens: 5 },
  { id: 31, name: 'CGV Vincom Vinh', address: 'Lê Lợi, Vinh', city: 'Vinh', screens: 6 },
  
  // Bắc Ninh (1 rạp)
  { id: 32, name: 'CGV Bắc Ninh', address: 'Trung Tâm, Bắc Ninh', city: 'Bắc Ninh', screens: 5 },
  
  // Hạ Long (2 rạp)
  { id: 33, name: 'CGV Hạ Long', address: 'Bãi Cháy, Hạ Long', city: 'Hạ Long', screens: 6 },
  { id: 34, name: 'CGV Vincom Hạ Long', address: 'Trung Tâm, Hạ Long', city: 'Hạ Long', screens: 5 },
  
  // Thái Nguyên (1 rạp)
  { id: 35, name: 'CGV Thái Nguyên', address: 'Quang Trung, Thái Nguyên', city: 'Thái Nguyên', screens: 4 },
  
  // Mỹ Tho (1 rạp)
  { id: 36, name: 'CGV Mỹ Tho', address: 'Trung Tâm, Mỹ Tho', city: 'Mỹ Tho', screens: 4 },
  
  // Rạch Giá (1 rạp)
  { id: 37, name: 'CGV Rạch Giá', address: 'Trung Tâm, Rạch Giá', city: 'Rạch Giá', screens: 4 },
  
  // Cà Mau (1 rạp)
  { id: 38, name: 'CGV Cà Mau', address: 'Trung Tâm, Cà Mau', city: 'Cà Mau', screens: 3 },
  
  // Đồng Hới (1 rạp)
  { id: 39, name: 'CGV Đồng Hới', address: 'Trung Tâm, Đồng Hới', city: 'Đồng Hới', screens: 4 },
  
  // Pleiku (1 rạp)
  { id: 40, name: 'CGV Pleiku', address: 'Trung Tâm, Pleiku', city: 'Pleiku', screens: 4 },
  
  // Phan Thiết (1 rạp)
  { id: 41, name: 'CGV Phan Thiết', address: 'Trần Hưng Đạo, Phan Thiết', city: 'Phan Thiết', screens: 5 },
  
  // Long Xuyên (1 rạp)
  { id: 42, name: 'CGV Long Xuyên', address: 'Trung Tâm, Long Xuyên', city: 'Long Xuyên', screens: 4 },
  
  // Tuy Hòa (1 rạp)
  { id: 43, name: 'CGV Tuy Hòa', address: 'Trung Tâm, Tuy Hòa', city: 'Tuy Hòa', screens: 3 },
  
  // Tam Kỳ (1 rạp)
  { id: 44, name: 'CGV Tam Kỳ', address: 'Trung Tâm, Tam Kỳ', city: 'Tam Kỳ', screens: 3 },
  
  // Bến Tre (1 rạp)
  { id: 45, name: 'CGV Bến Tre', address: 'Trung Tâm, Bến Tre', city: 'Bến Tre', screens: 3 },
  
  // Vĩnh Long (1 rạp)
  { id: 46, name: 'CGV Vĩnh Long', address: 'Trung Tâm, Vĩnh Long', city: 'Vĩnh Long', screens: 3 },
  
  // Sóc Trăng (1 rạp)
  { id: 47, name: 'CGV Sóc Trăng', address: 'Trung Tâm, Sóc Trăng', city: 'Sóc Trăng', screens: 3 },
  
  // Kontum (1 rạp)
  { id: 48, name: 'CGV Kontum', address: 'Trung Tâm, Kontum', city: 'Kontum', screens: 2 },
  
  // Cao Lãnh (1 rạp)
  { id: 49, name: 'CGV Cao Lãnh', address: 'Trung Tâm, Cao Lãnh', city: 'Cao Lãnh', screens: 3 },
  
  // Trà Vinh (1 rạp)
  { id: 50, name: 'CGV Trà Vinh', address: 'Trung Tâm, Trà Vinh', city: 'Trà Vinh', screens: 3 }
];

// Danh sách 30 thành phố
const cities = [
  'TP. Hồ Chí Minh',
  'Hà Nội',
  'Đà Nẵng',
  'Cần Thơ',
  'Hải Phòng',
  'Biên Hòa',
  'Nha Trang',
  'Huế',
  'Vũng Tàu',
  'Thủ Đức',
  'Quy Nhơn',
  'Buôn Ma Thuột',
  'Vinh',
  'Bắc Ninh',
  'Hạ Long',
  'Thái Nguyên',
  'Mỹ Tho',
  'Rạch Giá',
  'Cà Mau',
  'Đồng Hới',
  'Pleiku',
  'Phan Thiết',
  'Long Xuyên',
  'Tuy Hòa',
  'Tam Kỳ',
  'Bến Tre',
  'Vĩnh Long',
  'Sóc Trăng',
  'Kontum',
  'Cao Lãnh',
  'Trà Vinh'
].map(city => ({
  id: city,
  name: city,
  count: cinemas.filter(c => c.city === city).length
}));

const moviesShowtimes = [
  {
    id: 1,
    title: 'Dune: Phần Hai',
    genre: 'Khoa Học Viễn Tưởng',
    duration: '166 phút',
    rating: 8.9,
    ageRating: 'T13',
    image: 'https://images.unsplash.com/photo-1485095329183-d0797cdc5676?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHByZW1pZXJlfGVufDF8fHx8MTc2MDE3NDUxMXww&ixlib=rb-4.1.0&q=80&w=1080',
    showtimes: {
      1: ['10:00', '13:00', '16:00', '19:00', '22:00'],
      2: ['11:00', '14:00', '17:00', '20:00', '23:00'],
      3: ['09:00', '12:00', '15:00', '18:00', '21:00'],
      4: ['10:30', '13:30', '16:30', '19:30', '22:30'],
      5: ['11:30', '14:30', '17:30', '20:30'],
      6: ['10:00', '13:00', '16:00', '19:00'],
      7: ['11:00', '14:00', '17:00', '20:00'],
      8: ['10:30', '13:30', '16:30', '19:30'],
      9: ['09:00', '12:00', '15:00', '18:00'],
      10: ['11:00', '14:00', '17:00', '20:00'],
      11: ['10:00', '13:00', '16:00', '19:00'],
      12: ['11:30', '14:30', '17:30', '20:30'],
      13: ['10:00', '13:00', '16:00', '19:00'],
      14: ['11:00', '14:00', '17:00', '20:00']
    },
    formats: ['2D', 'IMAX']
  },
  {
    id: 2,
    title: 'Người Dơi Trở Lại',
    genre: 'Hành Động',
    duration: '175 phút',
    rating: 8.7,
    ageRating: 'T16',
    image: 'https://images.unsplash.com/photo-1688678004647-945d5aaf91c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHRoZWF0ZXIlMjBzY3JlZW58ZW58MXx8fHwxNzYwMTg1NTMzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    showtimes: {
      1: ['09:30', '12:30', '15:30', '18:30', '21:30'],
      2: ['10:00', '13:00', '16:00', '19:00', '22:00'],
      3: ['10:30', '13:30', '16:30', '19:30', '22:30'],
      4: ['11:00', '14:00', '17:00', '20:00'],
      5: ['09:00', '12:00', '15:00', '18:00', '21:00'],
      6: ['10:30', '13:30', '16:30', '19:30'],
      7: ['09:30', '12:30', '15:30', '18:30'],
      8: ['11:00', '14:00', '17:00', '20:00'],
      9: ['10:00', '13:00', '16:00', '19:00'],
      10: ['09:30', '12:30', '15:30', '18:30'],
      11: ['11:00', '14:00', '17:00', '20:00'],
      12: ['10:00', '13:00', '16:00', '19:00'],
      13: ['09:30', '12:30', '15:30', '18:30'],
      14: ['10:30', '13:30', '16:30', '19:30']
    },
    formats: ['2D', '4DX']
  },
  {
    id: 3,
    title: 'Giấc Mơ Inception',
    genre: 'Kinh Dị',
    duration: '148 phút',
    rating: 9.0,
    ageRating: 'T13',
    image: 'https://images.unsplash.com/photo-1548867688/231911e4ba3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3Bjb3JuJTIwY2luZW1hfGVufDF8fHx8MTc2MDIzNjk5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    showtimes: {
      1: ['11:00', '14:00', '17:00', '20:00'],
      2: ['09:30', '12:30', '15:30', '18:30', '21:30'],
      3: ['11:00', '14:00', '17:00', '20:00', '23:00'],
      4: ['10:00', '13:00', '16:00', '19:00', '22:00'],
      5: ['10:30', '13:30', '16:30', '19:30', '22:30'],
      6: ['11:00', '14:00', '17:00', '20:00'],
      7: ['10:00', '13:00', '16:00', '19:00'],
      8: ['09:30', '12:30', '15:30', '18:30'],
      9: ['11:00', '14:00', '17:00', '20:00'],
      10: ['10:30', '13:30', '16:30', '19:30'],
      11: ['09:00', '12:00', '15:00', '18:00'],
      12: ['11:00', '14:00', '17:00', '20:00'],
      13: ['10:00', '13:00', '16:00', '19:00'],
      14: ['09:30', '12:30', '15:30', '18:30']
    },
    formats: ['2D']
  },
  {
    id: 4,
    title: 'Oppenheimer',
    genre: 'Tiểu Sử',
    duration: '180 phút',
    rating: 8.8,
    ageRating: 'T16',
    image: 'https://images.unsplash.com/photo-1485700330317-57a99a571ecb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWElMjB0aGVhdGVyJTIwc2VhdHN8ZW58MXx8fHwxNzYwMjM2OTk3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    showtimes: {
      1: ['12:00', '15:30', '19:00'],
      2: ['11:30', '15:00', '18:30', '22:00'],
      3: ['12:30', '16:00', '19:30'],
      4: ['13:00', '16:30', '20:00'],
      5: ['12:00', '15:30', '19:00', '22:30'],
      6: ['12:30', '16:00', '19:30'],
      7: ['12:00', '15:30', '19:00'],
      8: ['11:30', '15:00', '18:30'],
      9: ['13:00', '16:30', '20:00'],
      10: ['12:00', '15:30', '19:00'],
      11: ['12:30', '16:00', '19:30'],
      12: ['11:30', '15:00', '18:30'],
      13: ['12:00', '15:30', '19:00'],
      14: ['13:00', '16:30', '20:00'],
      15: ['12:30', '16:00', '19:30'],
      16: ['12:00', '15:30', '19:00'],
      17: ['11:30', '15:00', '18:30'],
      18: ['13:00', '16:30', '20:00'],
      19: ['12:00', '15:30', '19:00'],
      20: ['12:30', '16:00', '19:30'],
      21: ['11:30', '15:00', '18:30'],
      22: ['12:00', '15:30', '19:00'],
      23: ['13:00', '16:30', '20:00'],
      24: ['12:30', '16:00', '19:30'],
      25: ['12:00', '15:30', '19:00'],
      26: ['11:30', '15:00', '18:30'],
      27: ['13:00', '16:30', '20:00'],
      28: ['12:00', '15:30', '19:00'],
      29: ['12:30', '16:00', '19:30'],
      30: ['11:30', '15:00', '18:30'],
      31: ['12:00', '15:30', '19:00'],
      32: ['13:00', '16:30', '20:00'],
      33: ['12:30', '16:00', '19:30'],
      34: ['12:00', '15:30', '19:00'],
      35: ['11:30', '15:00', '18:30'],
      36: ['13:00', '16:30', '20:00'],
      37: ['12:00', '15:30', '19:00'],
      38: ['12:30', '16:00', '19:30'],
      39: ['11:30', '15:00', '18:30'],
      40: ['12:00', '15:30', '19:00'],
      41: ['13:00', '16:30', '20:00'],
      42: ['12:30', '16:00', '19:30'],
      43: ['12:00', '15:30', '19:00'],
      44: ['11:30', '15:00', '18:30'],
      45: ['13:00', '16:30', '20:00'],
      46: ['12:00', '15:30', '19:00'],
      47: ['12:30', '16:00', '19:30'],
      48: ['11:30', '15:00', '18:30'],
      49: ['12:00', '15:30', '19:00'],
      50: ['13:00', '16:30', '20:00']
    },
    formats: ['2D', 'IMAX']
  }
];

export function ShowtimesPage({ onNavigate }: ShowtimesPageProps) {
  const [selectedDate, setSelectedDate] = useState(dates[0]);
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [selectedCinema, setSelectedCinema] = useState<any>(null);

  // Filter cinemas by selected city
  const filteredCinemas = selectedCity === 'all'
    ? cinemas
    : cinemas.filter(cinema => cinema.city === selectedCity);

  const handleCitySelect = (cityId: string) => {
    setSelectedCity(cityId);
    // Auto-select first cinema when city changes
    const cinemasInCity = cityId === 'all' 
      ? cinemas 
      : cinemas.filter(c => c.city === cityId);
    if (cinemasInCity.length > 0) {
      setSelectedCinema(cinemasInCity[0]);
    }
  };

  const handleBooking = (movieId: number, time: string) => {
    onNavigate('movie-detail', { movieId });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-red-50 to-white py-12 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-8 h-8 text-red-600" />
            <h1 className="text-4xl text-gray-900">Lịch Chiếu Phim</h1>
          </div>
          <p className="text-gray-600">Xem lịch chiếu tất cả phim theo rạp và ngày</p>
        </div>
      </section>

      {/* City Selection */}
      <section className="py-8 bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <Filter className="w-5 h-5 text-red-600" />
            <h2 className="text-xl text-gray-900">Lọc Theo Thành Phố</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {/* All Cities Button */}
            <button
              onClick={() => handleCitySelect('all')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg border-2 transition-all ${
                selectedCity === 'all'
                  ? 'border-red-600 bg-red-600 text-white'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-red-300 hover:bg-red-50'
              }`}
            >
              <span>Tất Cả Thành Phố</span>
              <Badge 
                className={`${
                  selectedCity === 'all' 
                    ? 'bg-white text-red-600' 
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {cinemas.length}
              </Badge>
            </button>

            {/* Top 3 Cities as Buttons */}
            {cities.slice(0, 3).map((city) => (
              <button
                key={city.id}
                onClick={() => handleCitySelect(city.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg border-2 transition-all ${
                  selectedCity === city.id
                    ? 'border-red-600 bg-red-600 text-white'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-red-300 hover:bg-red-50'
                }`}
              >
                <span>{city.name}</span>
                <Badge 
                  className={`${
                    selectedCity === city.id 
                      ? 'bg-white text-red-600' 
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {city.count}
                </Badge>
              </button>
            ))}

            {/* Dropdown for Other Cities */}
            <Select value={selectedCity} onValueChange={handleCitySelect}>
              <SelectTrigger className={`w-auto min-w-[200px] h-auto px-6 py-3 border-2 transition-all ${
                selectedCity !== 'all' && !['TP. Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng'].includes(selectedCity)
                  ? 'border-red-600 bg-red-600'
                  : 'border-gray-200 hover:border-red-300 hover:bg-red-50'
              }`}>
                <div className="flex items-center gap-2">
                  <span className={
                    selectedCity !== 'all' && !['TP. Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng'].includes(selectedCity)
                      ? 'text-white'
                      : 'text-gray-700'
                  }>
                    {selectedCity !== 'all' && !['TP. Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng'].includes(selectedCity)
                      ? cities.find(c => c.id === selectedCity)?.name || 'Thành phố khác'
                      : 'Thành phố khác'}
                  </span>
                  <MapPin className={`w-4 h-4 ${
                    selectedCity !== 'all' && !['TP. Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng'].includes(selectedCity)
                      ? 'text-white'
                      : ''
                  }`} />
                </div>
              </SelectTrigger>
              <SelectContent className="max-h-[400px]">
                {cities.slice(3).map((city) => (
                  <SelectItem key={city.id} value={city.id}>
                    <div className="flex items-center justify-between w-full gap-4 min-w-[200px]">
                      <span className="flex-1">{city.name}</span>
                      <Badge variant="outline" className="border-red-600 text-red-600 ml-auto">
                        {city.count}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Date Selection */}
      <section className="py-6 bg-white border-b border-gray-200">
            <div className="container mx-auto px-4">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-5 h-5 text-red-600" />
                <h2 className="text-xl text-gray-900">Chọn Ngày</h2>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {dates.map((date) => (
                  <button
                    key={date.date}
                    onClick={() => setSelectedDate(date)}
                    className={`flex-shrink-0 px-6 py-3 rounded-lg border-2 transition-all ${
                      selectedDate.date === date.date
                        ? 'border-red-600 bg-red-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <p className="text-sm text-gray-600">{date.dayShort}</p>
                    <p className="text-gray-900">{date.date.split('/')[0]}/{date.date.split('/')[1]}</p>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Cinema Tabs */}
          <section className="py-8">
            <div className="container mx-auto px-4">
              <div className="mb-6">
                <p className="text-gray-600">
                  Hiển thị <span className="text-red-600">{filteredCinemas.length}</span> rạp{' '}
                  {selectedCity !== 'all' && (
                    <>
                      tại <span className="text-red-600">{selectedCity}</span>
                    </>
                  )}
                </p>
              </div>

              <Tabs 
                value={selectedCinema?.id.toString()} 
                onValueChange={(value) => {
                  const cinema = filteredCinemas.find(c => c.id.toString() === value);
                  if (cinema) setSelectedCinema(cinema);
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-red-600" />
                  <h2 className="text-xl text-gray-900">Chọn Rạp</h2>
                </div>
                <TabsList className="bg-white border border-gray-200 mb-8 flex-wrap h-auto">
                  {filteredCinemas.map((cinema) => (
                    <TabsTrigger
                      key={cinema.id}
                      value={cinema.id.toString()}
                      className="data-[state=active]:bg-red-600 data-[state=active]:text-white whitespace-nowrap"
                    >
                      <div className="text-left">
                        <p>{cinema.name}</p>
                        <p className="text-xs opacity-70">{cinema.address}</p>
                      </div>
                    </TabsTrigger>
                  ))}
                </TabsList>

                {filteredCinemas.map((cinema) => (
                  <TabsContent key={cinema.id} value={cinema.id.toString()}>
                    <div className="space-y-6">
                      {moviesShowtimes.map((movie) => (
                        <Card key={movie.id} className="bg-white border-gray-200 overflow-hidden hover:border-red-600 transition-all shadow-sm">
                          <CardContent className="p-0">
                            <div className="flex flex-col md:flex-row">
                              {/* Movie Poster */}
                              <div className="md:w-48 h-64 md:h-auto flex-shrink-0">
                                <ImageWithFallback
                                  src={movie.image}
                                  alt={movie.title}
                                  className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                                  onClick={() => onNavigate('movie-detail', { movieId: movie.id })}
                                />
                              </div>

                              {/* Movie Info & Showtimes */}
                              <div className="flex-1 p-6">
                                <div className="flex items-start justify-between mb-4">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                      <h3 
                                        className="text-2xl text-gray-900 cursor-pointer hover:text-red-600 transition-colors"
                                        onClick={() => onNavigate('movie-detail', { movieId: movie.id })}
                                      >
                                        {movie.title}
                                      </h3>
                                      <Badge className="bg-yellow-100 text-yellow-800">
                                        {movie.ageRating}
                                      </Badge>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                      <span className="flex items-center gap-1">
                                        <Film className="w-4 h-4" />
                                        {movie.genre}
                                      </span>
                                      <span className="flex items-center gap-1">
                                        <Clock className="w-4 h-4" />
                                        {movie.duration}
                                      </span>
                                      <div className="flex items-center gap-1">
                                        <span className="text-yellow-500">★</span>
                                        <span>{movie.rating}/10</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Formats */}
                                <div className="mb-4">
                                  <p className="text-sm text-gray-600 mb-2">Định dạng:</p>
                                  <div className="flex gap-2">
                                    {movie.formats.map((format) => (
                                      <Badge key={format} variant="outline" className="border-blue-600 text-blue-600">
                                        {format}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>

                                {/* Showtimes */}
                                <div>
                                  <p className="text-sm text-gray-600 mb-3">Suất chiếu:</p>
                                  {movie.showtimes[cinema.id as keyof typeof movie.showtimes] ? (
                                    <div className="flex flex-wrap gap-2">
                                      {movie.showtimes[cinema.id as keyof typeof movie.showtimes].map((time) => (
                                        <Button
                                          key={time}
                                          onClick={() => handleBooking(movie.id, time)}
                                          variant="outline"
                                          className="border-2 border-gray-300 hover:border-red-600 hover:bg-red-50 hover:text-red-600"
                                        >
                                          {time}
                                        </Button>
                                      ))}
                                    </div>
                                  ) : (
                                    <p className="text-gray-500 text-sm">Không có suất chiếu</p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </section>

      {/* Info Section */}
      <section className="py-12 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl text-gray-900 mb-6">Hướng Dẫn Đặt Vé</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gray-50 border-gray-200">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl text-red-600">1</span>
                  </div>
                  <h3 className="text-gray-900 mb-2">Chọn Thành Phố & Rạp</h3>
                  <p className="text-sm text-gray-600">
                    Chọn thành phố và rạp bạn muốn xem phim
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gray-50 border-gray-200">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl text-red-600">2</span>
                  </div>
                  <h3 className="text-gray-900 mb-2">Chọn Ngày & Suất Chiếu</h3>
                  <p className="text-sm text-gray-600">
                    Click vào suất chiếu phù hợp với lịch của bạn
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gray-50 border-gray-200">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl text-red-600">3</span>
                  </div>
                  <h3 className="text-gray-900 mb-2">Chọn Ghế & Thanh Toán</h3>
                  <p className="text-sm text-gray-600">
                    Chọn ghế ngồi và hoàn tất thanh toán
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
