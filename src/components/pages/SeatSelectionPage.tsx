import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Calendar, Clock, MapPin, Film, Users, X } from 'lucide-react';
import { Separator } from '../ui/separator';

interface SeatSelectionPageProps {
  bookingData: any;
  onNavigate: (page: string, data?: any) => void;
}

const ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const SEATS_PER_ROW = 12;

const TICKET_PRICES = {
  standard: 85000,
  vip: 120000,
  couple: 200000
};

export function SeatSelectionPage({ bookingData, onNavigate }: SeatSelectionPageProps) {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  
  // Mock occupied seats
  const occupiedSeats = ['D5', 'D6', 'E5', 'E6', 'F7', 'G8', 'G9'];

  const getSeatType = (row: string, seatNum: number) => {
    if (['A', 'B'].includes(row)) return 'standard';
    if (['H', 'I', 'J'].includes(row)) return 'vip';
    if (seatNum === 5 || seatNum === 6) return 'couple';
    return 'standard';
  };

  const getSeatPrice = (seatId: string) => {
    const row = seatId[0];
    const seatNum = parseInt(seatId.substring(1));
    const type = getSeatType(row, seatNum);
    return TICKET_PRICES[type as keyof typeof TICKET_PRICES];
  };

  const handleSeatClick = (seatId: string) => {
    if (occupiedSeats.includes(seatId)) return;

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatId));
    } else {
      if (selectedSeats.length < 8) {
        setSelectedSeats([...selectedSeats, seatId]);
      }
    }
  };

  const getTotalPrice = () => {
    return selectedSeats.reduce((total, seatId) => {
      return total + getSeatPrice(seatId);
    }, 0);
  };

  const handleContinue = () => {
    onNavigate('checkout', {
      ...bookingData,
      seats: selectedSeats,
      totalPrice: getTotalPrice()
    });
  };

  const getSeatClass = (seatId: string, row: string, seatNum: number) => {
    const isOccupied = occupiedSeats.includes(seatId);
    const isSelected = selectedSeats.includes(seatId);
    const type = getSeatType(row, seatNum);

    if (isOccupied) return 'bg-gray-300 cursor-not-allowed';
    if (isSelected) return 'bg-red-600 text-white cursor-pointer hover:bg-red-700';
    
    if (type === 'vip') return 'bg-purple-100 text-purple-700 cursor-pointer hover:bg-purple-200 border-2 border-purple-300';
    if (type === 'couple') return 'bg-pink-100 text-pink-700 cursor-pointer hover:bg-pink-200 border-2 border-pink-300';
    return 'bg-gray-100 text-gray-700 cursor-pointer hover:bg-gray-200 border-2 border-gray-300';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-200 py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl text-gray-900 mb-2">Chọn Ghế Ngồi</h1>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Film className="w-4 h-4 text-red-600" />
                  <span>{bookingData.movie.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-600" />
                  <span>{bookingData.cinema.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-red-600" />
                  <span>{bookingData.date.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-red-600" />
                  <span>{bookingData.time}</span>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => onNavigate('movie-detail', { movieId: bookingData.movie.id })}
              className="border-gray-300 text-gray-700"
            >
              <X className="w-4 h-4 mr-2" />
              Hủy
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Seat Map */}
            <div className="lg:col-span-2">
              <Card className="bg-white border-gray-200">
                <CardContent className="p-8">
                  {/* Screen */}
                  <div className="mb-8">
                    <div className="bg-gradient-to-b from-gray-800 to-gray-600 text-white text-center py-3 rounded-lg mb-2">
                      <p>MÀN HÌNH</p>
                    </div>
                    <div className="h-2 bg-gradient-to-b from-gray-300 to-transparent rounded-b-3xl"></div>
                  </div>

                  {/* Legend */}
                  <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gray-100 border-2 border-gray-300 rounded"></div>
                      <span className="text-gray-700">Thường (85k)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-purple-100 border-2 border-purple-300 rounded"></div>
                      <span className="text-gray-700">VIP (120k)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-pink-100 border-2 border-pink-300 rounded"></div>
                      <span className="text-gray-700">Đôi (200k)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gray-300 rounded"></div>
                      <span className="text-gray-700">Đã đặt</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-red-600 rounded"></div>
                      <span className="text-gray-700">Đang chọn</span>
                    </div>
                  </div>

                  {/* Seats */}
                  <div className="overflow-x-auto">
                    <div className="inline-block min-w-full">
                      {ROWS.map((row) => (
                        <div key={row} className="flex items-center justify-center gap-2 mb-2">
                          <div className="w-8 text-center text-gray-600">{row}</div>
                          <div className="flex gap-2">
                            {Array.from({ length: SEATS_PER_ROW }, (_, i) => i + 1).map((seatNum) => {
                              const seatId = `${row}${seatNum}`;
                              return (
                                <button
                                  key={seatId}
                                  onClick={() => handleSeatClick(seatId)}
                                  disabled={occupiedSeats.includes(seatId)}
                                  className={`w-8 h-8 rounded text-xs transition-all ${getSeatClass(seatId, row, seatNum)}`}
                                >
                                  {seatNum}
                                </button>
                              );
                            })}
                          </div>
                          <div className="w-8 text-center text-gray-600">{row}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <p className="text-center text-sm text-gray-600 mt-8">
                    * Bạn có thể chọn tối đa 8 ghế
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Booking Summary */}
            <div className="lg:col-span-1">
              <Card className="bg-white border-gray-200 sticky top-24">
                <CardContent className="p-6">
                  <h2 className="text-xl text-gray-900 mb-4">Thông Tin Đặt Vé</h2>

                  <div className="space-y-3 mb-6">
                    <div>
                      <p className="text-sm text-gray-600">Phim</p>
                      <p className="text-gray-900">{bookingData.movie.title}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Rạp</p>
                      <p className="text-gray-900">{bookingData.cinema.name}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-sm text-gray-600">Ngày</p>
                        <p className="text-gray-900">{bookingData.date.date}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Suất</p>
                        <p className="text-gray-900">{bookingData.time}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Định dạng</p>
                      <Badge className="bg-blue-100 text-blue-700">
                        {bookingData.format}
                      </Badge>
                    </div>
                  </div>

                  <Separator className="my-6 bg-gray-200" />

                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-gray-900">Ghế đã chọn</h3>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Users className="w-4 h-4" />
                        <span className="text-sm">{selectedSeats.length}/8</span>
                      </div>
                    </div>
                    {selectedSeats.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {selectedSeats.map((seat) => (
                          <Badge
                            key={seat}
                            className="bg-red-100 text-red-700 px-3 py-1 cursor-pointer hover:bg-red-200"
                            onClick={() => handleSeatClick(seat)}
                          >
                            {seat}
                            <X className="w-3 h-3 ml-1" />
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">Chưa chọn ghế nào</p>
                    )}
                  </div>

                  <Separator className="my-6 bg-gray-200" />

                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-gray-600">
                      <span>Số lượng vé</span>
                      <span>{selectedSeats.length}</span>
                    </div>
                    <div className="flex justify-between text-xl text-gray-900">
                      <span>Tổng cộng</span>
                      <span className="text-red-600">
                        {getTotalPrice().toLocaleString('vi-VN')}đ
                      </span>
                    </div>
                  </div>

                  <Button
                    onClick={handleContinue}
                    disabled={selectedSeats.length === 0}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Tiếp Tục Thanh Toán
                  </Button>

                  <p className="text-xs text-gray-500 text-center mt-4">
                    Vui lòng kiểm tra kỹ thông tin trước khi thanh toán
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
