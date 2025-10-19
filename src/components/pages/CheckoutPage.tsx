import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Separator } from '../ui/separator';
import { Calendar, Clock, MapPin, Film, CreditCard, Wallet, QrCode, CheckCircle } from 'lucide-react';
import { useAuth } from '../AuthContext';

interface CheckoutPageProps {
  bookingData: any;
  onNavigate: (page: string) => void;
}

export function CheckoutPage({ bookingData, onNavigate }: CheckoutPageProps) {
  const { user } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [promoCode, setPromoCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      
      // Redirect to success page after 2 seconds
      setTimeout(() => {
        onNavigate('my-tickets');
      }, 2000);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="bg-white border-gray-200 max-w-md w-full mx-4">
          <CardContent className="p-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-2xl text-gray-900 mb-3">Thanh Toán Thành Công!</h2>
            <p className="text-gray-600 mb-6">
              Vé của bạn đã được đặt thành công. Vui lòng kiểm tra email để nhận mã QR.
            </p>
            <Button
              onClick={() => onNavigate('my-tickets')}
              className="bg-red-600 hover:bg-red-700 text-white w-full"
            >
              Xem Vé Của Tôi
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-200 py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl text-gray-900 mb-2">Thanh Toán</h1>
          <p className="text-gray-600">Hoàn tất đặt vé của bạn</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left - Payment Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Info */}
              <Card className="bg-white border-gray-200">
                <CardHeader>
                  <CardTitle className="text-gray-900">Thông Tin Liên Hệ</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-900">Họ và Tên</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className="border-gray-300 focus:border-red-600 focus:ring-red-600"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-900">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className="border-gray-300 focus:border-red-600 focus:ring-red-600"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-gray-900">Số Điện Thoại</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        className="border-gray-300 focus:border-red-600 focus:ring-red-600"
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card className="bg-white border-gray-200">
                <CardHeader>
                  <CardTitle className="text-gray-900">Phương Thức Thanh Toán</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="space-y-3">
                      <div className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        paymentMethod === 'card' ? 'border-red-600 bg-red-50' : 'border-gray-200'
                      }`}>
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex items-center gap-3 cursor-pointer flex-1">
                          <CreditCard className="w-5 h-5 text-red-600" />
                          <div>
                            <p className="text-gray-900">Thẻ Tín Dụng / Ghi Nợ</p>
                            <p className="text-xs text-gray-600">Visa, Mastercard, JCB</p>
                          </div>
                        </Label>
                      </div>

                      <div className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        paymentMethod === 'momo' ? 'border-red-600 bg-red-50' : 'border-gray-200'
                      }`}>
                        <RadioGroupItem value="momo" id="momo" />
                        <Label htmlFor="momo" className="flex items-center gap-3 cursor-pointer flex-1">
                          <Wallet className="w-5 h-5 text-pink-600" />
                          <div>
                            <p className="text-gray-900">Ví MoMo</p>
                            <p className="text-xs text-gray-600">Thanh toán qua ví điện tử</p>
                          </div>
                        </Label>
                      </div>

                      <div className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        paymentMethod === 'banking' ? 'border-red-600 bg-red-50' : 'border-gray-200'
                      }`}>
                        <RadioGroupItem value="banking" id="banking" />
                        <Label htmlFor="banking" className="flex items-center gap-3 cursor-pointer flex-1">
                          <QrCode className="w-5 h-5 text-blue-600" />
                          <div>
                            <p className="text-gray-900">Chuyển Khoản Ngân Hàng</p>
                            <p className="text-xs text-gray-600">VietQR, Internet Banking</p>
                          </div>
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>

                  {paymentMethod === 'card' && (
                    <div className="mt-6 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber" className="text-gray-900">Số Thẻ</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          className="border-gray-300 focus:border-red-600 focus:ring-red-600"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry" className="text-gray-900">Ngày Hết Hạn</Label>
                          <Input
                            id="expiry"
                            placeholder="MM/YY"
                            className="border-gray-300 focus:border-red-600 focus:ring-red-600"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv" className="text-gray-900">CVV</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            className="border-gray-300 focus:border-red-600 focus:ring-red-600"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Promo Code */}
              <Card className="bg-white border-gray-200">
                <CardHeader>
                  <CardTitle className="text-gray-900">Mã Khuyến Mãi</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-3">
                    <Input
                      placeholder="Nhập mã khuyến mãi"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="border-gray-300 focus:border-red-600 focus:ring-red-600"
                    />
                    <Button variant="outline" className="border-gray-300 text-gray-700 px-6">
                      Áp Dụng
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right - Order Summary */}
            <div className="lg:col-span-1">
              <Card className="bg-white border-gray-200 sticky top-24">
                <CardHeader>
                  <CardTitle className="text-gray-900">Tóm Tắt Đơn Hàng</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Movie Info */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <Film className="w-4 h-4 text-red-600 mt-1" />
                      <div>
                        <p className="text-sm text-gray-600">Phim</p>
                        <p className="text-gray-900">{bookingData.movie.title}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-red-600 mt-1" />
                      <div>
                        <p className="text-sm text-gray-600">Rạp</p>
                        <p className="text-gray-900">{bookingData.cinema.name}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-start gap-2">
                        <Calendar className="w-4 h-4 text-red-600 mt-1" />
                        <div>
                          <p className="text-sm text-gray-600">Ngày</p>
                          <p className="text-gray-900">{bookingData.date.date}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Clock className="w-4 h-4 text-red-600 mt-1" />
                        <div>
                          <p className="text-sm text-gray-600">Suất</p>
                          <p className="text-gray-900">{bookingData.time}</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Ghế</p>
                      <div className="flex flex-wrap gap-1">
                        {bookingData.seats.map((seat: string) => (
                          <Badge key={seat} className="bg-red-100 text-red-700">
                            {seat}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-gray-200" />

                  {/* Price Breakdown */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-gray-600">
                      <span>Tổng vé ({bookingData.seats.length})</span>
                      <span>{bookingData.totalPrice.toLocaleString('vi-VN')}đ</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Phí dịch vụ</span>
                      <span>10.000đ</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>Giảm giá</span>
                      <span>-0đ</span>
                    </div>
                  </div>

                  <Separator className="bg-gray-200" />

                  <div className="flex justify-between text-xl text-gray-900">
                    <span>Tổng cộng</span>
                    <span className="text-red-600">
                      {(bookingData.totalPrice + 10000).toLocaleString('vi-VN')}đ
                    </span>
                  </div>

                  <Button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-lg disabled:opacity-50"
                  >
                    {isProcessing ? 'Đang xử lý...' : 'Thanh Toán Ngay'}
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    Bằng việc nhấn "Thanh Toán", bạn đồng ý với{' '}
                    <a href="#" className="text-red-600">Điều khoản sử dụng</a> của CGV
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
