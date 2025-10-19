import { useState } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { MapPin, Phone, Clock, Navigation, Filter, Film } from 'lucide-react';

const cinemas = [
  // TP. Hồ Chí Minh (6 rạp)
  { id: 1, name: 'CGV Vincom Center', address: '72 Lê Thánh Tôn, Quận 1', city: 'TP. Hồ Chí Minh', phone: '(028) 3827 1717', screens: 8, features: ['IMAX', '4DX', 'Premium'], hours: '8:00 - 24:00', image: 'https://images.unsplash.com/photo-1504050376847-144186a87c66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWElMjBidWlsZGluZyUyMGV4dGVyaW9yfGVufDF8fHx8MTc2MDIzODI1OXww&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 2, name: 'CGV Landmark 81', address: '720A Điện Biên Phủ, Bình Thạnh', city: 'TP. Hồ Chí Minh', phone: '(028) 6272 1515', screens: 12, features: ['IMAX', '4DX', 'ScreenX'], hours: '8:00 - 24:00', image: 'https://images.unsplash.com/photo-1515100235140-6cb3498e8031?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHRoZWF0ZXIlMjBhdWRpdG9yaXVtfGVufDF8fHx8MTc2MDIzODI1OXww&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 3, name: 'CGV Aeon Mall', address: '30 Bờ Bao Tân Thắng, Tân Phú', city: 'TP. Hồ Chí Minh', phone: '(028) 3815 6290', screens: 10, features: ['4DX', 'Dolby Atmos'], hours: '9:00 - 23:30', image: 'https://images.unsplash.com/photo-1485700330317-57a99a571ecb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWElMjB0aGVhdGVyJTIwc2VhdHN8ZW58MXx8fHwxNzYwMjM2OTk3fDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 4, name: 'CGV Crescent Mall', address: '101 Tôn Dật Tiên, Quận 7', city: 'TP. Hồ Chí Minh', phone: '(028) 5411 7788', screens: 6, features: ['Premium', 'Dolby Atmos'], hours: '8:30 - 23:00', image: 'https://images.unsplash.com/photo-1667858329757-95becd82346e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWxtJTIwcmVlbCUyMGNpbmVtYXxlbnwxfHx8fDE3NjAyMzgyNjB8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 5, name: 'CGV Saigon Center', address: '65 Lê Lợi, Quận 1', city: 'TP. Hồ Chí Minh', phone: '(028) 3822 4440', screens: 7, features: ['Premium', 'Dolby Atmos'], hours: '9:00 - 23:30', image: 'https://images.unsplash.com/photo-1688678004647-945d5aaf91c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHRoZWF0ZXIlMjBzY3JlZW58ZW58MXx8fHwxNzYwMTg1NTMzfDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 6, name: 'CGV Parkson Hùng Vương', address: '126 Hồng Bàng, Quận 5', city: 'TP. Hồ Chí Minh', phone: '(028) 3835 7274', screens: 5, features: ['Tiêu Chuẩn', 'Premium'], hours: '8:30 - 23:00', image: 'https://images.unsplash.com/photo-1548867688/231911e4ba3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3Bjb3JuJTIwY2luZW1hfGVufDF8fHx8MTc2MDIzNjk5N3ww&ixlib=rb-4.1.0&q=80&w=1080' },
  
  // Hà Nội (4 rạp)
  { id: 7, name: 'CGV Vincom Bà Triệu', address: '191 Bà Triệu, Hai Bà Trưng', city: 'Hà Nội', phone: '(024) 3974 3333', screens: 9, features: ['IMAX', 'Premium', 'Dolby Atmos'], hours: '8:00 - 24:00', image: 'https://images.unsplash.com/photo-1504050376847-144186a87c66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWElMjBidWlsZGluZyUyMGV4dGVyaW9yfGVufDF8fHx8MTc2MDIzODI1OXww&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 8, name: 'CGV Aeon Long Biên', address: '27 Cổ Linh, Long Biên', city: 'Hà Nội', phone: '(024) 3877 7200', screens: 8, features: ['4DX', 'Premium'], hours: '9:00 - 23:30', image: 'https://images.unsplash.com/photo-1515100235140-6cb3498e8031?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHRoZWF0ZXIlMjBhdWRpdG9yaXVtfGVufDF8fHx8MTc2MDIzODI1OXww&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 9, name: 'CGV Vincom Mega Mall', address: '458 Minh Khai, Hai Bà Trưng', city: 'Hà Nội', phone: '(024) 3974 3344', screens: 10, features: ['IMAX', '4DX', 'Premium'], hours: '8:00 - 24:00', image: 'https://images.unsplash.com/photo-1485700330317-57a99a571ecb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWElMjB0aGVhdGVyJTIwc2VhdHN8ZW58MXx8fHwxNzYwMjM2OTk3fDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 10, name: 'CGV Royal City', address: '72A Nguyễn Trãi, Thanh Xuân', city: 'Hà Nội', phone: '(024) 3974 3888', screens: 11, features: ['IMAX', 'Premium', 'Dolby Atmos'], hours: '8:00 - 23:30', image: 'https://images.unsplash.com/photo-1667858329757-95becd82346e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWxtJTIwcmVlbCUyMGNpbmVtYXxlbnwxfHx8fDE3NjAyMzgyNjB8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  
  // Đà Nẵng (2 rạp)
  { id: 11, name: 'CGV Vincom Đà Nẵng', address: '910A Ngô Quyền, Sơn Trà', city: 'Đà Nẵng', phone: '(0236) 3788 999', screens: 7, features: ['Premium', 'Dolby Atmos'], hours: '9:00 - 23:30', image: 'https://images.unsplash.com/photo-1688678004647-945d5aaf91c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHRoZWF0ZXIlMjBzY3JlZW58ZW58MXx8fHwxNzYwMTg1NTMzfDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 12, name: 'CGV Lotte Mart', address: '6 Nại Nam, Hải Châu', city: 'Đà Nẵng', phone: '(0236) 3566 777', screens: 6, features: ['4DX', 'Premium'], hours: '8:30 - 23:00', image: 'https://images.unsplash.com/photo-1548867688/231911e4ba3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3Bjb3JuJTIwY2luZW1hfGVufDF8fHx8MTc2MDIzNjk5N3ww&ixlib=rb-4.1.0&q=80&w=1080' },
  
  // Cần Thơ (2 rạp)
  { id: 13, name: 'CGV Vincom Xuân Khánh', address: '209 Đường 30/4, Ninh Kiều', city: 'Cần Thơ', phone: '(0292) 3766 888', screens: 6, features: ['Premium', 'Dolby Atmos'], hours: '9:00 - 23:00', image: 'https://images.unsplash.com/photo-1504050376847-144186a87c66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWElMjBidWlsZGluZyUyMGV4dGVyaW9yfGVufDF8fHx8MTc2MDIzODI1OXww&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 14, name: 'CGV Sense City', address: '01 Ngô Quyền, Ninh Kiều', city: 'Cần Thơ', phone: '(0292) 3822 333', screens: 5, features: ['Premium'], hours: '8:30 - 22:30', image: 'https://images.unsplash.com/photo-1515100235140-6cb3498e8031?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHRoZWF0ZXIlMjBhdWRpdG9yaXVtfGVufDF8fHx8MTc2MDIzODI1OXww&ixlib=rb-4.1.0&q=80&w=1080' },

  // Hải Phòng (3 rạp)
  { id: 15, name: 'CGV Vincom Plaza', address: 'Lê Thánh Tông, Hồng Bàng', city: 'Hải Phòng', phone: '(0225) 3123 456', screens: 7, features: ['Premium', 'Dolby Atmos'], hours: '9:00 - 23:30', image: 'https://images.unsplash.com/photo-1485700330317-57a99a571ecb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWElMjB0aGVhdGVyJTIwc2VhdHN8ZW58MXx8fHwxNzYwMjM2OTk3fDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 16, name: 'CGV Aeon Mall Hải Phòng', address: 'Số 10, Lê Chân', city: 'Hải Phòng', phone: '(0225) 3234 567', screens: 8, features: ['4DX', 'Premium'], hours: '8:30 - 23:00', image: 'https://images.unsplash.com/photo-1667858329757-95becd82346e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWxtJTIwcmVlbCUyMGNpbmVtYXxlbnwxfHx8fDE3NjAyMzgyNjB8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 17, name: 'CGV Vincom Hải Phòng', address: 'Trần Phú, Ngô Quyền', city: 'Hải Phòng', phone: '(0225) 3345 678', screens: 6, features: ['Premium'], hours: '9:00 - 23:00', image: 'https://images.unsplash.com/photo-1688678004647-945d5aaf91c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHRoZWF0ZXIlMjBzY3JlZW58ZW58MXx8fHwxNzYwMTg1NTMzfDA&ixlib=rb-4.1.0&q=80&w=1080' },

  // Biên Hòa (2 rạp)
  { id: 18, name: 'CGV Bien Hoa', address: 'Trung Tâm, Biên Hòa', city: 'Biên Hòa', phone: '(0251) 3888 999', screens: 6, features: ['Premium', 'Dolby Atmos'], hours: '9:00 - 23:00', image: 'https://images.unsplash.com/photo-1548867688/231911e4ba3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3Bjb3JuJTIwY2luZW1hfGVufDF8fHx8MTc2MDIzNjk5N3ww&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 19, name: 'CGV Vincom Biên Hòa', address: 'Quốc Lộ 1K, Biên Hòa', city: 'Biên Hòa', phone: '(0251) 3777 888', screens: 7, features: ['4DX', 'Premium'], hours: '8:30 - 23:00', image: 'https://images.unsplash.com/photo-1504050376847-144186a87c66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWElMjBidWlsZGluZyUyMGV4dGVyaW9yfGVufDF8fHx8MTc2MDIzODI1OXww&ixlib=rb-4.1.0&q=80&w=1080' },

  // Nha Trang (2 rạp)
  { id: 20, name: 'CGV Nha Trang Center', address: 'Trung Tâm, Nha Trang', city: 'Nha Trang', phone: '(0258) 3888 777', screens: 5, features: ['Premium'], hours: '9:00 - 23:00', image: 'https://images.unsplash.com/photo-1515100235140-6cb3498e8031?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHRoZWF0ZXIlMjBhdWRpdG9yaXVtfGVufDF8fHx8MTc2MDIzODI1OXww&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 21, name: 'CGV Vincom Nha Trang', address: 'Trần Phú, Nha Trang', city: 'Nha Trang', phone: '(0258) 3777 666', screens: 6, features: ['Premium', 'Dolby Atmos'], hours: '8:30 - 23:00', image: 'https://images.unsplash.com/photo-1485700330317-57a99a571ecb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWElMjB0aGVhdGVyJTIwc2VhdHN8ZW58MXx8fHwxNzYwMjM2OTk3fDA&ixlib=rb-4.1.0&q=80&w=1080' },

  // Huế (2 rạp)
  { id: 22, name: 'CGV Vincom Huế', address: 'Lê Duẩn, Huế', city: 'Huế', phone: '(0234) 3888 555', screens: 5, features: ['Premium'], hours: '9:00 - 23:00', image: 'https://images.unsplash.com/photo-1667858329757-95becd82346e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWxtJTIwcmVlbCUyMGNpbmVtYXxlbnwxfHx8fDE3NjAyMzgyNjB8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 23, name: 'CGV Big C Huế', address: 'Trung Tâm, Huế', city: 'Huế', phone: '(0234) 3777 444', screens: 4, features: ['Tiêu Chuẩn'], hours: '8:30 - 22:30', image: 'https://images.unsplash.com/photo-1688678004647-945d5aaf91c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHRoZWF0ZXIlMjBzY3JlZW58ZW58MXx8fHwxNzYwMTg1NTMzfDA&ixlib=rb-4.1.0&q=80&w=1080' },

  // Vũng Tàu (2 rạp)
  { id: 24, name: 'CGV Vũng Tàu', address: 'Trần Hưng Đạo, Vũng Tàu', city: 'Vũng Tàu', phone: '(0254) 3888 333', screens: 5, features: ['Premium'], hours: '9:00 - 23:00', image: 'https://images.unsplash.com/photo-1548867688/231911e4ba3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3Bjb3JuJTIwY2luZW1hfGVufDF8fHx8MTc2MDIzNjk5N3ww&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 25, name: 'CGV Imperial Plaza', address: 'Trung Tâm, Vũng Tàu', city: 'Vũng Tàu', phone: '(0254) 3777 222', screens: 6, features: ['Premium', 'Dolby Atmos'], hours: '8:30 - 23:00', image: 'https://images.unsplash.com/photo-1504050376847-144186a87c66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWElMjBidWlsZGluZyUyMGV4dGVyaW9yfGVufDF8fHx8MTc2MDIzODI1OXww&ixlib=rb-4.1.0&q=80&w=1080' },

  // Thủ Đức (2 rạp)
  { id: 26, name: 'CGV Thủ Đức', address: 'Võ Văn Ngân, Thủ Đức', city: 'Thủ Đức', phone: '(028) 3888 111', screens: 6, features: ['Premium'], hours: '9:00 - 23:00', image: 'https://images.unsplash.com/photo-1515100235140-6cb3498e8031?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHRoZWF0ZXIlMjBhdWRpdG9yaXVtfGVufDF8fHx8MTc2MDIzODI1OXww&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 27, name: 'CGV Vincom Thủ Đức', address: 'Quốc Lộ 13, Thủ Đức', city: 'Thủ Đức', phone: '(028) 3777 000', screens: 7, features: ['4DX', 'Premium'], hours: '8:30 - 23:00', image: 'https://images.unsplash.com/photo-1485700330317-57a99a571ecb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWElMjB0aGVhdGVyJTIwc2VhdHN8ZW58MXx8fHwxNzYwMjM2OTk3fDA&ixlib=rb-4.1.0&q=80&w=1080' },

  // Quy Nhơn (1 rạp)
  { id: 28, name: 'CGV Quy Nhơn', address: 'Lê Hồng Phong, Quy Nhơn', city: 'Quy Nhơn', phone: '(0256) 3888 999', screens: 5, features: ['Premium'], hours: '9:00 - 23:00', image: 'https://images.unsplash.com/photo-1667858329757-95becd82346e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWxtJTIwcmVlbCUyMGNpbmVtYXxlbnwxfHx8fDE3NjAyMzgyNjB8MA&ixlib=rb-4.1.0&q=80&w=1080' },

  // Buôn Ma Thuột (1 rạp)
  { id: 29, name: 'CGV Buôn Ma Thuột', address: 'Trung Tâm, Buôn Ma Thuột', city: 'Buôn Ma Thuột', phone: '(0262) 3888 888', screens: 4, features: ['Premium'], hours: '9:00 - 22:30', image: 'https://images.unsplash.com/photo-1688678004647-945d5aaf91c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHRoZWF0ZXIlMjBzY3JlZW58ZW58MXx8fHwxNzYwMTg1NTMzfDA&ixlib=rb-4.1.0&q=80&w=1080' },

  // Vinh (2 rạp)
  { id: 30, name: 'CGV Vinh', address: 'Quang Trung, Vinh', city: 'Vinh', phone: '(0238) 3888 777', screens: 5, features: ['Premium'], hours: '9:00 - 23:00', image: 'https://images.unsplash.com/photo-1548867688/231911e4ba3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3Bjb3JuJTIwY2luZW1hfGVufDF8fHx8MTc2MDIzNjk5N3ww&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 31, name: 'CGV Vincom Vinh', address: 'Lê Lợi, Vinh', city: 'Vinh', phone: '(0238) 3777 666', screens: 6, features: ['Premium', 'Dolby Atmos'], hours: '8:30 - 23:00', image: 'https://images.unsplash.com/photo-1504050376847-144186a87c66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWElMjBidWlsZGluZyUyMGV4dGVyaW9yfGVufDF8fHx8MTc2MDIzODI1OXww&ixlib=rb-4.1.0&q=80&w=1080' },

  // Bắc Ninh (1 rạp)
  { id: 32, name: 'CGV Bắc Ninh', address: 'Trung Tâm, Bắc Ninh', city: 'Bắc Ninh', phone: '(0222) 3888 555', screens: 5, features: ['Premium'], hours: '9:00 - 23:00', image: 'https://images.unsplash.com/photo-1515100235140-6cb3498e8031?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHRoZWF0ZXIlMjBhdWRpdG9yaXVtfGVufDF8fHx8MTc2MDIzODI1OXww&ixlib=rb-4.1.0&q=80&w=1080' },

  // Hạ Long (2 rạp)
  { id: 33, name: 'CGV Hạ Long', address: 'Bãi Cháy, Hạ Long', city: 'Hạ Long', phone: '(0203) 3888 444', screens: 6, features: ['Premium', 'Dolby Atmos'], hours: '9:00 - 23:00', image: 'https://images.unsplash.com/photo-1485700330317-57a99a571ecb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWElMjB0aGVhdGVyJTIwc2VhdHN8ZW58MXx8fHwxNzYwMjM2OTk3fDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 34, name: 'CGV Vincom Hạ Long', address: 'Trung Tâm, Hạ Long', city: 'Hạ Long', phone: '(0203) 3777 333', screens: 5, features: ['Premium'], hours: '8:30 - 22:30', image: 'https://images.unsplash.com/photo-1667858329757-95becd82346e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWxtJTIwcmVlbCUyMGNpbmVtYXxlbnwxfHx8fDE3NjAyMzgyNjB8MA&ixlib=rb-4.1.0&q=80&w=1080' },

  // Thái Nguyên (1 rạp)
  { id: 35, name: 'CGV Thái Nguyên', address: 'Quang Trung, Thái Nguyên', city: 'Thái Nguyên', phone: '(0208) 3888 222', screens: 4, features: ['Premium'], hours: '9:00 - 22:30', image: 'https://images.unsplash.com/photo-1688678004647-945d5aaf91c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHRoZWF0ZXIlMjBzY3JlZW58ZW58MXx8fHwxNzYwMTg1NTMzfDA&ixlib=rb-4.1.0&q=80&w=1080' },

  // Mỹ Tho (1 rạp)
  { id: 36, name: 'CGV Mỹ Tho', address: 'Trung Tâm, Mỹ Tho', city: 'Mỹ Tho', phone: '(0273) 3888 111', screens: 4, features: ['Tiêu Chuẩn'], hours: '9:00 - 22:30', image: 'https://images.unsplash.com/photo-1548867688/231911e4ba3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3Bjb3JuJTIwY2luZW1hfGVufDF8fHx8MTc2MDIzNjk5N3ww&ixlib=rb-4.1.0&q=80&w=1080' },

  // Rạch Giá (1 rạp)
  { id: 37, name: 'CGV Rạch Giá', address: 'Trung Tâm, Rạch Giá', city: 'Rạch Giá', phone: '(0297) 3888 000', screens: 4, features: ['Premium'], hours: '9:00 - 22:30', image: 'https://images.unsplash.com/photo-1504050376847-144186a87c66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWElMjBidWlsZGluZyUyMGV4dGVyaW9yfGVufDF8fHx8MTc2MDIzODI1OXww&ixlib=rb-4.1.0&q=80&w=1080' },

  // Cà Mau (1 rạp)
  { id: 38, name: 'CGV Cà Mau', address: 'Trung Tâm, Cà Mau', city: 'Cà Mau', phone: '(0290) 3888 999', screens: 3, features: ['Tiêu Chuẩn'], hours: '9:00 - 22:00', image: 'https://images.unsplash.com/photo-1515100235140-6cb3498e8031?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHRoZWF0ZXIlMjBhdWRpdG9yaXVtfGVufDF8fHx8MTc2MDIzODI1OXww&ixlib=rb-4.1.0&q=80&w=1080' },

  // Đồng Hới (1 rạp)
  { id: 39, name: 'CGV Đồng Hới', address: 'Trung Tâm, Đồng Hới', city: 'Đồng Hới', phone: '(0232) 3888 888', screens: 4, features: ['Premium'], hours: '9:00 - 22:30', image: 'https://images.unsplash.com/photo-1485700330317-57a99a571ecb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWElMjB0aGVhdGVyJTIwc2VhdHN8ZW58MXx8fHwxNzYwMjM2OTk3fDA&ixlib=rb-4.1.0&q=80&w=1080' },

  // Pleiku (1 rạp)
  { id: 40, name: 'CGV Pleiku', address: 'Trung Tâm, Pleiku', city: 'Pleiku', phone: '(0269) 3888 777', screens: 4, features: ['Premium'], hours: '9:00 - 22:30', image: 'https://images.unsplash.com/photo-1667858329757-95becd82346e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWxtJTIwcmVlbCUyMGNpbmVtYXxlbnwxfHx8fDE3NjAyMzgyNjB8MA&ixlib=rb-4.1.0&q=80&w=1080' },

  // Phan Thiết (1 rạp)
  { id: 41, name: 'CGV Phan Thiết', address: 'Trần Hưng Đạo, Phan Thiết', city: 'Phan Thiết', phone: '(0252) 3888 666', screens: 5, features: ['Premium'], hours: '9:00 - 23:00', image: 'https://images.unsplash.com/photo-1688678004647-945d5aaf91c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHRoZWF0ZXIlMjBzY3JlZW58ZW58MXx8fHwxNzYwMTg1NTMzfDA&ixlib=rb-4.1.0&q=80&w=1080' },

  // Long Xuyên (1 rạp)
  { id: 42, name: 'CGV Long Xuyên', address: 'Trung Tâm, Long Xuyên', city: 'Long Xuyên', phone: '(0296) 3888 555', screens: 4, features: ['Tiêu Chuẩn'], hours: '9:00 - 22:30', image: 'https://images.unsplash.com/photo-1548867688/231911e4ba3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3Bjb3JuJTIwY2luZW1hfGVufDF8fHx8MTc2MDIzNjk5N3ww&ixlib=rb-4.1.0&q=80&w=1080' },

  // Tuy Hòa (1 rạp)
  { id: 43, name: 'CGV Tuy Hòa', address: 'Trung Tâm, Tuy Hòa', city: 'Tuy Hòa', phone: '(0257) 3888 444', screens: 3, features: ['Tiêu Chuẩn'], hours: '9:00 - 22:00', image: 'https://images.unsplash.com/photo-1504050376847-144186a87c66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWElMjBidWlsZGluZyUyMGV4dGVyaW9yfGVufDF8fHx8MTc2MDIzODI1OXww&ixlib=rb-4.1.0&q=80&w=1080' },

  // Tam Kỳ (1 rạp)
  { id: 44, name: 'CGV Tam Kỳ', address: 'Trung Tâm, Tam Kỳ', city: 'Tam Kỳ', phone: '(0235) 3888 333', screens: 3, features: ['Tiêu Chuẩn'], hours: '9:00 - 22:00', image: 'https://images.unsplash.com/photo-1515100235140-6cb3498e8031?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHRoZWF0ZXIlMjBhdWRpdG9yaXVtfGVufDF8fHx8MTc2MDIzODI1OXww&ixlib=rb-4.1.0&q=80&w=1080' },

  // Bến Tre (1 rạp)
  { id: 45, name: 'CGV Bến Tre', address: 'Trung Tâm, Bến Tre', city: 'Bến Tre', phone: '(0275) 3888 222', screens: 3, features: ['Tiêu Chuẩn'], hours: '9:00 - 22:00', image: 'https://images.unsplash.com/photo-1485700330317-57a99a571ecb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWElMjB0aGVhdGVyJTIwc2VhdHN8ZW58MXx8fHwxNzYwMjM2OTk3fDA&ixlib=rb-4.1.0&q=80&w=1080' },

  // Vĩnh Long (1 rạp)
  { id: 46, name: 'CGV Vĩnh Long', address: 'Trung Tâm, Vĩnh Long', city: 'Vĩnh Long', phone: '(0270) 3888 111', screens: 3, features: ['Tiêu Chuẩn'], hours: '9:00 - 22:00', image: 'https://images.unsplash.com/photo-1667858329757-95becd82346e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWxtJTIwcmVlbCUyMGNpbmVtYXxlbnwxfHx8fDE3NjAyMzgyNjB8MA&ixlib=rb-4.1.0&q=80&w=1080' },

  // Sóc Trăng (1 rạp)
  { id: 47, name: 'CGV Sóc Trăng', address: 'Trung Tâm, Sóc Trăng', city: 'Sóc Trăng', phone: '(0299) 3888 000', screens: 3, features: ['Tiêu Chuẩn'], hours: '9:00 - 22:00', image: 'https://images.unsplash.com/photo-1688678004647-945d5aaf91c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHRoZWF0ZXIlMjBzY3JlZW58ZW58MXx8fHwxNzYwMTg1NTMzfDA&ixlib=rb-4.1.0&q=80&w=1080' },

  // Kontum (1 rạp)
  { id: 48, name: 'CGV Kontum', address: 'Trung Tâm, Kontum', city: 'Kontum', phone: '(0260) 3888 999', screens: 2, features: ['Tiêu Chuẩn'], hours: '9:00 - 22:00', image: 'https://images.unsplash.com/photo-1548867688/231911e4ba3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3Bjb3JuJTIwY2luZW1hfGVufDF8fHx8MTc2MDIzNjk5N3ww&ixlib=rb-4.1.0&q=80&w=1080' },

  // Cao Lãnh (1 rạp)
  { id: 49, name: 'CGV Cao Lãnh', address: 'Trung Tâm, Cao Lãnh', city: 'Cao Lãnh', phone: '(0277) 3888 888', screens: 3, features: ['Tiêu Chuẩn'], hours: '9:00 - 22:00', image: 'https://images.unsplash.com/photo-1504050376847-144186a87c66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWElMjBidWlsZGluZyUyMGV4dGVyaW9yfGVufDF8fHx8MTc2MDIzODI1OXww&ixlib=rb-4.1.0&q=80&w=1080' },

  // Trà Vinh (1 rạp)
  { id: 50, name: 'CGV Trà Vinh', address: 'Trung Tâm, Trà Vinh', city: 'Trà Vinh', phone: '(0294) 3888 777', screens: 3, features: ['Tiêu Chuẩn'], hours: '9:00 - 22:00', image: 'https://images.unsplash.com/photo-1515100235140-6cb3498e8031?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHRoZWF0ZXIlMjBhdWRpdG9yaXVtfGVufDF8fHx8MTc2MDIzODI1OXww&ixlib=rb-4.1.0&q=80&w=1080' }
];

// Danh sách 30 thành phố với số lượng rạp
const cities = [
  { id: 'TP. Hồ Chí Minh', name: 'TP. Hồ Chí Minh', count: 6 },
  { id: 'Hà Nội', name: 'Hà Nội', count: 4 },
  { id: 'Đà Nẵng', name: 'Đà Nẵng', count: 2 },
  { id: 'Cần Thơ', name: 'Cần Thơ', count: 2 },
  { id: 'Hải Phòng', name: 'Hải Phòng', count: 3 },
  { id: 'Biên Hòa', name: 'Biên Hòa', count: 2 },
  { id: 'Nha Trang', name: 'Nha Trang', count: 2 },
  { id: 'Huế', name: 'Huế', count: 2 },
  { id: 'Vũng Tàu', name: 'Vũng Tàu', count: 2 },
  { id: 'Thủ Đức', name: 'Thủ Đức', count: 2 },
  { id: 'Quy Nhơn', name: 'Quy Nhơn', count: 1 },
  { id: 'Buôn Ma Thuột', name: 'Buôn Ma Thuột', count: 1 },
  { id: 'Vinh', name: 'Vinh', count: 2 },
  { id: 'Bắc Ninh', name: 'Bắc Ninh', count: 1 },
  { id: 'Hạ Long', name: 'Hạ Long', count: 2 },
  { id: 'Thái Nguyên', name: 'Thái Nguyên', count: 1 },
  { id: 'Mỹ Tho', name: 'Mỹ Tho', count: 1 },
  { id: 'Rạch Giá', name: 'Rạch Giá', count: 1 },
  { id: 'Cà Mau', name: 'Cà Mau', count: 1 },
  { id: 'Đồng Hới', name: 'Đồng Hới', count: 1 },
  { id: 'Pleiku', name: 'Pleiku', count: 1 },
  { id: 'Phan Thiết', name: 'Phan Thiết', count: 1 },
  { id: 'Long Xuyên', name: 'Long Xuyên', count: 1 },
  { id: 'Tuy Hòa', name: 'Tuy Hòa', count: 1 },
  { id: 'Tam Kỳ', name: 'Tam Kỳ', count: 1 },
  { id: 'Bến Tre', name: 'Bến Tre', count: 1 },
  { id: 'Vĩnh Long', name: 'Vĩnh Long', count: 1 },
  { id: 'Sóc Trăng', name: 'Sóc Trăng', count: 1 },
  { id: 'Kontum', name: 'Kontum', count: 1 },
  { id: 'Cao Lãnh', name: 'Cao Lãnh', count: 1 },
  { id: 'Trà Vinh', name: 'Trà Vinh', count: 1 }
];

export function CinemasPage() {
  const [selectedCity, setSelectedCity] = useState('all');

  const filteredCinemas = selectedCity === 'all' 
    ? cinemas 
    : cinemas.filter(cinema => cinema.city === selectedCity);

  const handleCitySelect = (cityId: string) => {
    setSelectedCity(cityId);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-b from-red-50 to-white">
        <div className="absolute inset-0 opacity-20">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1504050376847-144186a87c66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWElMjBidWlsZGluZyUyMGV4dGVyaW9yfGVufDF8fHx8MTc2MDIzODI1OXww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Rạp chiếu phim"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl text-gray-900 mb-4">Hệ Thống Rạp</h1>
            <p className="text-xl text-gray-700">
              Tìm rạp CGV gần bạn nhất và tận hưởng trải nghiệm điện ảnh tuyệt vời
            </p>
          </div>
        </div>
      </section>

      {/* City Filter Section */}
      <section className="py-8 bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
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

      {/* Cinemas List */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <p className="text-gray-600">
              Hiển thị <span className="text-red-600">{filteredCinemas.length}</span> rạp
              {selectedCity !== 'all' && (
                <span> tại <span className="text-red-600">{selectedCity}</span></span>
              )}
            </p>
          </div>
          
          {filteredCinemas.length === 0 ? (
            <div className="text-center py-16">
              <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Không tìm thấy rạp nào</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCinemas.map((cinema) => (
                <Card key={cinema.id} className="bg-white border-gray-200 overflow-hidden hover:border-red-600 transition-all group shadow-sm hover:shadow-md">
                  <div className="relative h-48 overflow-hidden">
                    <ImageWithFallback
                      src={cinema.image}
                      alt={cinema.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm">
                      {cinema.screens} Phòng Chiếu
                    </div>
                    <div className="absolute top-4 left-4 bg-white text-gray-900 px-3 py-1 rounded-full text-sm">
                      {cinema.city}
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-gray-900">{cinema.name}</CardTitle>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {cinema.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="border-red-600 text-red-600">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start gap-2 text-gray-600 text-sm">
                      <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-600" />
                      <span>{cinema.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <Phone className="w-4 h-4 text-red-600" />
                      <span>{cinema.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <Clock className="w-4 h-4 text-red-600" />
                      <span>{cinema.hours}</span>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white">
                        Xem Lịch Chiếu
                      </Button>
                      <Button variant="outline" size="icon" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
                        <Navigation className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl text-gray-900 mb-6 text-center">Tại Sao Chọn CGV?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gray-50 border-gray-200 text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-gray-900 mb-2">Hệ Thống Rộng Khắp</h3>
                  <p className="text-sm text-gray-600">
                    {cinemas.length} rạp trên toàn quốc, luôn có rạp gần bạn
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gray-50 border-gray-200 text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Film className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-gray-900 mb-2">Công Nghệ Hiện Đại</h3>
                  <p className="text-sm text-gray-600">
                    IMAX, 4DX, ScreenX và nhiều công nghệ tiên tiến
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gray-50 border-gray-200 text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-gray-900 mb-2">Lịch Chiếu Đa Dạng</h3>
                  <p className="text-sm text-gray-600">
                    Suất chiếu linh hoạt từ sáng đến đêm
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
