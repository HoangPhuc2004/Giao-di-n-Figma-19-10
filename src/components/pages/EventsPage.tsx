import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Calendar, Clock, MapPin, Users, Ticket } from 'lucide-react';

const events = [
  {
    id: 1,
    title: 'Dune: Phần Hai - Hỏi & Đáp Cùng Đạo Diễn',
    description: 'Tham gia buổi hỏi đáp độc quyền với đạo diễn sau đó là buổi chiếu đặc biệt',
    date: '2024-03-25',
    time: '19:00',
    location: 'CGV Vincom Center',
    category: 'Chiếu Đặc Biệt',
    capacity: '200 chỗ ngồi',
    price: '600.000đ',
    status: 'upcoming',
    image: 'https://images.unsplash.com/photo-1485095329183-d0797cdc5676?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHByZW1pZXJlfGVufDF8fHx8MTc2MDE3NDUxMXww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 2,
    title: 'Đêm Phim Kinh Điển - Bố Già',
    description: 'Trải nghiệm kiệt tác bất hủ này trên màn ảnh lớn với âm thanh được nâng cao',
    date: '2024-04-05',
    time: '20:30',
    location: 'CGV Landmark 81',
    category: 'Kinh Điển',
    capacity: '150 chỗ ngồi',
    price: '300.000đ',
    status: 'upcoming',
    image: 'https://images.unsplash.com/photo-1515100235140-6cb3498e8031?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHRoZWF0ZXIlMjBhdWRpdG9yaXVtfGVufDF8fHx8MTc2MDIzODI1OXww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 3,
    title: 'Liên Hoan Phim Anime',
    description: 'Một cuối tuần dành riêng cho những bộ phim anime hay nhất từ Nhật Bản và nhiều nơi khác',
    date: '2024-04-12',
    time: '10:00',
    location: 'CGV Aeon Mall',
    category: 'Liên Hoan',
    capacity: '300 chỗ ngồi',
    price: '850.000đ (Vé Cuối Tuần)',
    status: 'upcoming',
    image: 'https://images.unsplash.com/photo-1706419202046-e4982f00b082?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwZXZlbnQlMjBjcm93ZHxlbnwxfHx8fDE3NjAyMzgyNjN8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 4,
    title: 'Marathon Phim Kinh Dị',
    description: 'Chiếu liên tục các bộ phim kinh dị đáng sợ nhất. Bạn có đủ can đảm không?',
    date: '2024-10-31',
    time: '18:00',
    location: 'CGV Crescent Mall',
    category: 'Marathon',
    capacity: '180 chỗ ngồi',
    price: '750.000đ',
    status: 'upcoming',
    image: 'https://images.unsplash.com/photo-1688678004647-945d5aaf91c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHRoZWF0ZXIlMjBzY3JlZW58ZW58MXx8fHwxNzYwMTg1NTMzfDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 5,
    title: 'Câu Lạc Bộ Phim Thiếu Nhi',
    description: 'Chiếu phim thân thiện với gia đình mỗi sáng Thứ Bảy với các hoạt động đặc biệt',
    date: '2024-03-30',
    time: '10:00',
    location: 'Tất Cả Rạp CGV',
    category: 'Thiếu Nhi',
    capacity: 'Thay đổi theo địa điểm',
    price: '200.000đ',
    status: 'recurring',
    image: 'https://images.unsplash.com/photo-1548867688/231911e4ba3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3Bjb3JuJTIwY2luZW1hfGVufDF8fHx8MTc2MDIzNjk5N3ww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 6,
    title: 'Workshop Nhiếp Ảnh Phim',
    description: 'Học nghệ thuật quay phim từ các chuyên gia trong ngành',
    date: '2024-05-15',
    time: '14:00',
    location: 'CGV Saigon Center',
    category: 'Workshop',
    capacity: '50 chỗ ngồi',
    price: '1.100.000đ',
    status: 'upcoming',
    image: 'https://images.unsplash.com/photo-1667858329757-95becd82346e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWxtJTIwcmVlbCUyMGNpbmVtYXxlbnwxfHx8fDE3NjAyMzgyNjB8MA&ixlib=rb-4.1.0&q=80&w=1080'
  }
];

export function EventsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-b from-red-50 to-white">
        <div className="absolute inset-0 opacity-20">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1706419202046-e4982f00b082?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwZXZlbnQlMjBjcm93ZHxlbnwxfHx8fDE3NjAyMzgyNjN8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Sự kiện"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl text-gray-900 mb-4">Sự Kiện Đặc Biệt</h1>
            <p className="text-xl text-gray-700">
              Trải nghiệm điện ảnh vượt ra ngoài màn ảnh với các sự kiện độc quyền và buổi chiếu đặc biệt
            </p>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <Card key={event.id} className="bg-white border-gray-200 overflow-hidden hover:border-red-600 transition-all group shadow-sm hover:shadow-md">
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-red-600 text-white border-0">
                      {event.category}
                    </Badge>
                  </div>
                  {event.status === 'recurring' && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white/90 text-gray-900 border-0">
                        Định Kỳ
                      </Badge>
                    </div>
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="text-gray-900">{event.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-gray-600 text-sm">{event.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <Calendar className="w-4 h-4 text-red-600" />
                      <span>{new Date(event.date).toLocaleDateString('vi-VN', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <Clock className="w-4 h-4 text-red-600" />
                      <span>{event.time}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <MapPin className="w-4 h-4 text-red-600" />
                      <span>{event.location}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <Users className="w-4 h-4 text-red-600" />
                      <span>{event.capacity}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-gray-600 text-sm">Giá Vé</span>
                      <span className="text-gray-900">{event.price}</span>
                    </div>
                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                      <Ticket className="w-4 h-4 mr-2" />
                      Đặt Vé Sự Kiện
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl text-gray-900 mb-4">Cập Nhật Sự Kiện Sắp Tới</h2>
            <p className="text-gray-600 mb-6">
              Đăng ký nhận bản tin của chúng tôi và là người đầu tiên biết về các buổi chiếu đặc biệt, sự kiện độc quyền và ưu đãi có hạn.
            </p>
            <div className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Nhập email của bạn"
                className="flex-1 px-4 py-3 rounded-md bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
              />
              <Button className="bg-red-600 hover:bg-red-700 text-white px-6">
                Đăng Ký
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
