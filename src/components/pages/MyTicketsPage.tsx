import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Calendar, Clock, MapPin, Ticket, Download, QrCode, Users } from 'lucide-react';
import { Separator } from '../ui/separator';
import { useState } from 'react';

const tickets = [
  {
    id: 'VE001',
    movie: 'Dune: Phần Hai',
    cinema: 'CGV Vincom Center',
    screen: 'Phòng 3 - IMAX',
    date: '25/03/2024',
    time: '19:00',
    seats: 'H8, H9',
    total: '340.000đ',
    status: 'upcoming',
    bookingDate: '15/03/2024',
    qrCode: 'QR123456789'
  },
  {
    id: 'VE002',
    movie: 'Avatar 3',
    cinema: 'CGV Landmark 81',
    screen: 'Phòng 5 - 4DX',
    date: '28/03/2024',
    time: '21:00',
    seats: 'G10, G11, G12',
    total: '510.000đ',
    status: 'upcoming',
    bookingDate: '18/03/2024',
    qrCode: 'QR987654321'
  },
  {
    id: 'VE003',
    movie: 'Người Dơi Trở Lại',
    cinema: 'CGV Aeon Mall',
    screen: 'Phòng 2 - Premium',
    date: '10/03/2024',
    time: '20:30',
    seats: 'F5, F6',
    total: '360.000đ',
    status: 'used',
    bookingDate: '05/03/2024',
    qrCode: 'QR456789123'
  },
  {
    id: 'VE004',
    movie: 'Oppenheimer',
    cinema: 'CGV Crescent Mall',
    screen: 'Phòng 1 - Dolby Atmos',
    date: '05/03/2024',
    time: '18:00',
    seats: 'D7, D8',
    total: '320.000đ',
    status: 'used',
    bookingDate: '28/02/2024',
    qrCode: 'QR321654987'
  }
];

export function MyTicketsPage() {
  const [selectedTab, setSelectedTab] = useState('upcoming');

  const filteredTickets = tickets.filter(ticket => ticket.status === selectedTab);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-red-50 to-white py-12 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-2">
            <Ticket className="w-8 h-8 text-red-600" />
            <h1 className="text-4xl text-gray-900">Vé Của Tôi</h1>
          </div>
          <p className="text-gray-600">Quản lý và xem tất cả vé đã đặt</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="bg-white border border-gray-200 mb-8">
              <TabsTrigger 
                value="upcoming" 
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
              >
                Sắp Tới ({tickets.filter(t => t.status === 'upcoming').length})
              </TabsTrigger>
              <TabsTrigger 
                value="used"
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
              >
                Đã Sử Dụng ({tickets.filter(t => t.status === 'used').length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value={selectedTab}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredTickets.map((ticket) => (
                  <Card key={ticket.id} className="bg-white border-gray-200 overflow-hidden hover:border-red-600 transition-all shadow-sm hover:shadow-md">
                    <CardContent className="p-0">
                      {/* Header */}
                      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-2xl mb-2">{ticket.movie}</h3>
                            <p className="text-red-100 text-sm">{ticket.cinema}</p>
                          </div>
                          <Badge className={ticket.status === 'upcoming' ? 'bg-green-500' : 'bg-gray-500'}>
                            {ticket.status === 'upcoming' ? 'Sắp chiếu' : 'Đã xem'}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{ticket.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{ticket.time}</span>
                          </div>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="p-6 space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500 mb-1">Phòng chiếu</p>
                            <p className="text-gray-900">{ticket.screen}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 mb-1">Ghế ngồi</p>
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4 text-red-600" />
                              <p className="text-gray-900">{ticket.seats}</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-gray-500 mb-1">Ngày đặt</p>
                            <p className="text-gray-900">{ticket.bookingDate}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 mb-1">Mã vé</p>
                            <p className="text-gray-900">{ticket.id}</p>
                          </div>
                        </div>

                        <Separator className="bg-gray-200" />

                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-gray-500 text-sm mb-1">Tổng tiền</p>
                            <p className="text-2xl text-red-600">{ticket.total}</p>
                          </div>
                          {ticket.status === 'upcoming' && (
                            <div className="bg-gray-100 p-3 rounded-lg">
                              <QrCode className="w-12 h-12 text-gray-600" />
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                          {ticket.status === 'upcoming' ? (
                            <>
                              <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white">
                                <QrCode className="w-4 h-4 mr-2" />
                                Xem Mã QR
                              </Button>
                              <Button variant="outline" className="flex-1 border-gray-300 text-gray-700">
                                <Download className="w-4 h-4 mr-2" />
                                Tải Về
                              </Button>
                            </>
                          ) : (
                            <Button variant="outline" className="w-full border-gray-300 text-gray-700">
                              <Download className="w-4 h-4 mr-2" />
                              Tải Hóa Đơn
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredTickets.length === 0 && (
                <div className="text-center py-16">
                  <Ticket className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl text-gray-900 mb-2">Không có vé nào</h3>
                  <p className="text-gray-600 mb-6">
                    {selectedTab === 'upcoming' 
                      ? 'Bạn chưa có vé sắp chiếu nào'
                      : 'Bạn chưa có vé đã sử dụng nào'}
                  </p>
                  <Button className="bg-red-600 hover:bg-red-700 text-white">
                    Đặt Vé Ngay
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
