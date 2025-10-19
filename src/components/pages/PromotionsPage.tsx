import { useState } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { Tag, Calendar, Gift, Percent, Search, Copy, Check, Filter, Clock, AlertCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { toast } from 'sonner@2.0.3';

interface Promotion {
  id: number;
  title: string;
  description: string;
  discount: string;
  validUntil: string;
  category: string;
  image: string;
  code: string;
  terms: string[];
  featured?: boolean;
}

const promotions: Promotion[] = [
  {
    id: 1,
    title: 'Ưu Đãi Sinh Viên - Giảm 20%',
    description: 'Xuất trình thẻ sinh viên và nhận ưu đãi 20% cho tất cả vé xem phim từ Thứ Hai đến Thứ Năm',
    discount: 'GIẢM 20%',
    validUntil: '2024-12-31',
    category: 'Sinh Viên',
    code: 'STUDENT20',
    terms: [
      'Áp dụng cho sinh viên có thẻ hợp lệ',
      'Chỉ áp dụng từ Thứ Hai đến Thứ Năm',
      'Không áp dụng cho suất chiếu đặc biệt',
      'Mỗi thẻ sinh viên chỉ mua được 1 vé'
    ],
    featured: true,
    image: 'https://images.unsplash.com/photo-1581298253744-fb9993613c73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9tb3Rpb25hbCUyMGRpc2NvdW50JTIwc2FsZXxlbnwxfHx8fDE3NjAyMzgyNjB8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 2,
    title: 'Combo Gia Đình',
    description: 'Mua 4 vé và nhận miễn phí 2 bắp rang bơ lớn + 2 nước ngọt!',
    discount: 'COMBO MIỄN PHÍ',
    validUntil: '2024-06-30',
    category: 'Gia Đình',
    code: 'FAMILY4',
    terms: [
      'Mua tối thiểu 4 vé trong 1 giao dịch',
      'Áp dụng cho tất cả suất chiếu',
      'Combo bao gồm 2 bắp lớn và 2 nước ngọt',
      'Không áp dụng đồng thời với ưu đãi khác'
    ],
    featured: true,
    image: 'https://images.unsplash.com/photo-1707061803305-58383ee49415?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHRpY2tldHMlMjBwb3Bjb3JufGVufDF8fHx8MTc2MDIzODI2NXww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 3,
    title: 'Ưu Đãi Cuối Tuần',
    description: 'Đặt vé cho bất kỳ suất chiếu nào vào Thứ Bảy hoặc Chủ Nhật và tiết kiệm 15%',
    discount: 'GIẢM 15%',
    validUntil: '2024-12-31',
    category: 'Cuối Tuần',
    code: 'WEEKEND15',
    terms: [
      'Áp dụng cho tất cả suất chiếu thứ 7 và chủ nhật',
      'Không giới hạn số lượng vé',
      'Áp dụng cho tất cả định dạng phim',
      'Có thể kết hợp với thẻ thành viên'
    ],
    image: 'https://images.unsplash.com/photo-1548867688/231911e4ba3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3Bjb3JuJTIwY2luZW1hfGVufDF8fHx8MTc2MDIzNjk5N3ww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 4,
    title: 'Ưu Đãi Thành Viên',
    description: 'Thành viên CGV tận hưởng giá ưu đãi đặc biệt - Đặt trước 3 ngày',
    discount: 'GIẢM 25%',
    validUntil: '2024-12-31',
    category: 'Thành Viên',
    code: 'MEMBER25',
    terms: [
      'Chỉ dành cho thành viên CGV',
      'Đặt vé trước ít nhất 3 ngày',
      'Áp dụng tối đa 5 vé/giao dịch',
      'Tích điểm thưởng khi sử dụng'
    ],
    featured: true,
    image: 'https://images.unsplash.com/photo-1485700330317-57a99a571ecb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWElMjB0aGVhdGVyJTIwc2VhdHN8ZW58MXx8fHwxNzYwMjM2OTk3fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 5,
    title: 'Ưu Đãi Người Cao Tuổi',
    description: 'Giá đặc biệt cho người cao tuổi từ 60 tuổi trở lên - Áp dụng cả tuần',
    discount: 'GIẢM 30%',
    validUntil: '2024-12-31',
    category: 'Cao Tuổi',
    code: 'SENIOR30',
    terms: [
      'Dành cho khách hàng từ 60 tuổi trở lên',
      'Xuất trình CMND/CCCD khi nhận vé',
      'Áp dụng tất cả các ngày trong tuần',
      'Giảm giá cho cả vé 2D và 3D'
    ],
    image: 'https://images.unsplash.com/photo-1515100235140-6cb3498e8031?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHRoZWF0ZXIlMjBhdWRpdG9yaXVtfGVufDF8fHx8MTc2MDIzODI1OXww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 6,
    title: 'Ưu Đãi Sinh Nhật',
    description: 'Mừng sinh nhật cùng chúng tôi! Vé miễn phí trong ngày đặc biệt của bạn (cần CMND)',
    discount: 'VÉ MIỄN PHÍ',
    validUntil: '2024-12-31',
    category: 'Sinh Nhật',
    code: 'BIRTHDAY',
    terms: [
      'Áp dụng trong tuần sinh nhật của bạn',
      'Xuất trình CMND/CCCD khi đặt vé',
      'Giới hạn 1 vé miễn phí/khách hàng',
      'Áp dụng cho vé 2D tiêu chuẩn'
    ],
    image: 'https://images.unsplash.com/photo-1667858329757-95becd82346e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWxtJTIwcmVlbCUyMGNpbmVtYXxlbnwxfHx8fDE3NjAyMzgyNjB8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 7,
    title: 'Flash Sale Thứ 3',
    description: 'Mỗi thứ 3 hàng tuần - Giảm giá 40% cho suất chiếu sáng (trước 12h)',
    discount: 'GIẢM 40%',
    validUntil: '2024-04-30',
    category: 'Flash Sale',
    code: 'TUESDAY40',
    terms: [
      'Chỉ áp dụng vào thứ 3 hàng tuần',
      'Suất chiếu từ 8:00 - 12:00',
      'Số lượng vé có giới hạn',
      'Không hoàn/đổi vé sau khi đặt'
    ],
    featured: true,
    image: 'https://images.unsplash.com/photo-1688678004647-945d5aaf91c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHRoZWF0ZXIlMjBzY3JlZW58ZW58MXx8fHwxNzYwMTg1NTMzfDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 8,
    title: 'Combo Bạn Thân',
    description: 'Đi 2 người, mua 2 vé được tặng 1 combo bắp nước',
    discount: 'TẶNG COMBO',
    validUntil: '2024-05-15',
    category: 'Combo',
    code: 'COUPLE2024',
    terms: [
      'Mua tối thiểu 2 vé trong 1 giao dịch',
      'Tặng 1 combo bắp + nước',
      'Áp dụng tất cả suất chiếu',
      'Không giới hạn số lần sử dụng'
    ],
    image: 'https://images.unsplash.com/photo-1504050376847-144186a87c66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWElMjBidWlsZGluZyUyMGV4dGVyaW9yfGVufDF8fHx8MTc2MDIzODI1OXww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 9,
    title: 'Giảm Giá IMAX',
    description: 'Trải nghiệm IMAX với giá ưu đãi - Chỉ 150.000đ/vé',
    discount: 'CHỈ 150K',
    validUntil: '2024-04-20',
    category: 'IMAX',
    code: 'IMAX150',
    terms: [
      'Áp dụng cho phòng chiếu IMAX',
      'Giới hạn 2 vé/khách hàng',
      'Không áp dụng ngày lễ, tết',
      'Đặt trước tối thiểu 1 ngày'
    ],
    image: 'https://images.unsplash.com/photo-1485095329183-d0797cdc5676?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHByZW1pZXJlfGVufDF8fHx8MTc2MDE3NDUxMXww&ixlib=rb-4.1.0&q=80&w=1080'
  }
];

const categories = ['Tất Cả', 'Sinh Viên', 'Gia Đình', 'Thành Viên', 'Cuối Tuần', 'Cao Tuổi', 'Flash Sale', 'Combo', 'IMAX'];

export function PromotionsPage() {
  const [selectedCategory, setSelectedCategory] = useState('Tất Cả');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPromo, setSelectedPromo] = useState<Promotion | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('all');

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success('Đã sao chép mã khuyến mãi!');
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const isExpiringSoon = (dateString: string) => {
    const expiryDate = new Date(dateString);
    const today = new Date();
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays > 0;
  };

  const isExpired = (dateString: string) => {
    return new Date(dateString) < new Date();
  };

  const getFilteredPromotions = () => {
    let filtered = promotions;

    // Filter by tab
    if (activeTab === 'active') {
      filtered = filtered.filter(p => !isExpired(p.validUntil));
    } else if (activeTab === 'expiring') {
      filtered = filtered.filter(p => isExpiringSoon(p.validUntil));
    }

    // Filter by category
    if (selectedCategory !== 'Tất Cả') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Filter by search
    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.code.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredPromotions = getFilteredPromotions();
  const featuredPromotions = promotions.filter(p => p.featured && !isExpired(p.validUntil));

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-b from-red-50 to-white">
        <div className="absolute inset-0 opacity-20">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1581298253744-fb9993613c73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9tb3Rpb25hbCUyMGRpc2NvdW50JTIwc2FsZXxlbnwxfHx8fDE3NjAyMzgyNjB8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Khuyến mãi"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl text-gray-900 mb-4">Khuyến Mãi Đặc Biệt</h1>
            <p className="text-xl text-gray-700">
              Tiết kiệm hơn cho phim yêu thích với các ưu đãi và khuyến mãi độc quyền
            </p>
          </div>
        </div>
      </section>

      {/* Featured Promotions */}
      {featuredPromotions.length > 0 && (
        <section className="py-8 bg-gradient-to-b from-red-50 to-white border-b border-gray-200">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 mb-4">
              <Gift className="w-6 h-6 text-red-600" />
              <h2 className="text-2xl text-gray-900">Ưu Đãi Nổi Bật</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {featuredPromotions.map((promo) => (
                <Card key={promo.id} className="bg-gradient-to-br from-red-600 to-red-700 border-0 text-white">
                  <CardContent className="p-6">
                    <Badge className="bg-white text-red-600 mb-3">
                      {promo.category}
                    </Badge>
                    <h3 className="text-xl mb-2">{promo.title}</h3>
                    <p className="text-sm text-red-100 mb-4">{promo.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 px-3 py-2 bg-white/20 rounded-lg">
                        <code className="text-sm">{promo.code}</code>
                        <button
                          onClick={() => handleCopyCode(promo.code)}
                          className="hover:bg-white/20 p-1 rounded transition-colors"
                        >
                          {copiedCode === promo.code ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                      <Button
                        onClick={() => setSelectedPromo(promo)}
                        variant="outline"
                        className="bg-white text-red-600 border-0 hover:bg-red-50"
                      >
                        Chi Tiết
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Search and Filter Section */}
      <section className="py-6 bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Tìm kiếm khuyến mãi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-gray-300"
              />
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
              <TabsList className="bg-gray-100">
                <TabsTrigger value="all">Tất Cả</TabsTrigger>
                <TabsTrigger value="active">Đang Diễn Ra</TabsTrigger>
                <TabsTrigger value="expiring" className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  Sắp Hết Hạn
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-3 mb-2">
            <Filter className="w-5 h-5 text-red-600 flex-shrink-0" />
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg border-2 transition-all whitespace-nowrap ${
                    selectedCategory === category
                      ? 'border-red-600 bg-red-600 text-white'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-red-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Promotions Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <p className="text-gray-600">
              Hiển thị <span className="text-red-600">{filteredPromotions.length}</span> khuyến mãi
            </p>
          </div>

          {filteredPromotions.length === 0 ? (
            <div className="text-center py-16">
              <Tag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Không tìm thấy khuyến mãi phù hợp</p>
              <Button
                onClick={() => {
                  setSelectedCategory('Tất Cả');
                  setSearchQuery('');
                  setActiveTab('all');
                }}
                variant="outline"
                className="mt-4"
              >
                Xóa Bộ Lọc
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPromotions.map((promo) => {
                const expired = isExpired(promo.validUntil);
                const expiringSoon = isExpiringSoon(promo.validUntil);

                return (
                  <Card 
                    key={promo.id} 
                    className={`bg-white border-gray-200 overflow-hidden hover:border-red-600 transition-all group shadow-sm hover:shadow-md ${
                      expired ? 'opacity-60' : ''
                    }`}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <ImageWithFallback
                        src={promo.image}
                        alt={promo.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg">
                        <div className="flex items-center gap-1">
                          <Percent className="w-4 h-4" />
                          <span className="text-sm">{promo.discount}</span>
                        </div>
                      </div>
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-white/90 text-gray-900 border-0">
                          {promo.category}
                        </Badge>
                      </div>
                      {expiringSoon && !expired && (
                        <div className="absolute bottom-4 left-4">
                          <Badge className="bg-yellow-500 text-white border-0 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            Sắp Hết Hạn
                          </Badge>
                        </div>
                      )}
                      {expired && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <Badge className="bg-gray-800 text-white text-lg px-4 py-2">
                            Đã Hết Hạn
                          </Badge>
                        </div>
                      )}
                    </div>
                    <CardHeader>
                      <CardTitle className="text-gray-900">{promo.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-600 text-sm line-clamp-2">{promo.description}</p>
                      
                      {/* Promo Code */}
                      <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                        <code className="flex-1 text-sm text-red-600">{promo.code}</code>
                        <button
                          onClick={() => handleCopyCode(promo.code)}
                          className="p-2 hover:bg-gray-200 rounded transition-colors"
                          disabled={expired}
                        >
                          {copiedCode === promo.code ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4 text-gray-600" />
                          )}
                        </button>
                      </div>

                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <Calendar className="w-4 h-4 text-red-600" />
                        <span>
                          {expired ? 'Đã hết hạn: ' : 'Có hiệu lực đến: '}
                          {new Date(promo.validUntil).toLocaleDateString('vi-VN')}
                        </span>
                      </div>

                      <Button
                        onClick={() => setSelectedPromo(promo)}
                        className="w-full bg-red-600 hover:bg-red-700 text-white"
                        disabled={expired}
                      >
                        <Gift className="w-4 h-4 mr-2" />
                        {expired ? 'Đã Hết Hạn' : 'Xem Chi Tiết'}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <Tag className="w-16 h-16 text-red-600 mx-auto mb-4" />
            <h2 className="text-3xl text-gray-900 mb-4">Muốn Nhận Thêm Ưu Đãi Độc Quyền?</h2>
            <p className="text-gray-600 mb-6">
              Trở thành thành viên CGV ngay hôm nay và nhận quyền truy cập vào các chương trình khuyến mãi độc quyền, vé ưu tiên và giảm giá đặc biệt quanh năm!
            </p>
            <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg">
              Đăng Ký Thành Viên CGV
            </Button>
          </div>
        </div>
      </section>

      {/* Promotion Detail Dialog */}
      <Dialog open={!!selectedPromo} onOpenChange={() => setSelectedPromo(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl text-gray-900">{selectedPromo?.title}</DialogTitle>
            <DialogDescription className="text-gray-600">
              {selectedPromo?.description}
            </DialogDescription>
          </DialogHeader>

          {selectedPromo && (
            <div className="space-y-6">
              {/* Image */}
              <div className="relative h-64 rounded-lg overflow-hidden">
                <ImageWithFallback
                  src={selectedPromo.image}
                  alt={selectedPromo.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Percent className="w-5 h-5" />
                    <span>{selectedPromo.discount}</span>
                  </div>
                </div>
              </div>

              {/* Promo Code */}
              <div className="p-4 bg-red-50 rounded-lg border-2 border-dashed border-red-300">
                <p className="text-sm text-gray-600 mb-2">Mã Khuyến Mãi:</p>
                <div className="flex items-center justify-between">
                  <code className="text-2xl text-red-600">{selectedPromo.code}</code>
                  <Button
                    onClick={() => handleCopyCode(selectedPromo.code)}
                    variant="outline"
                    className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                  >
                    {copiedCode === selectedPromo.code ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Đã Sao Chép
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Sao Chép Mã
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Valid Until */}
              <div className="flex items-center gap-3 text-gray-600">
                <Calendar className="w-5 h-5 text-red-600" />
                <span>
                  Có hiệu lực đến: <span className="text-gray-900">{new Date(selectedPromo.validUntil).toLocaleDateString('vi-VN')}</span>
                </span>
              </div>

              {/* Terms and Conditions */}
              <div>
                <h3 className="text-lg text-gray-900 mb-3">Điều Khoản & Điều Kiện:</h3>
                <ul className="space-y-2">
                  {selectedPromo.terms.map((term, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-600">
                      <span className="text-red-600 mt-1">•</span>
                      <span>{term}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              onClick={() => setSelectedPromo(null)}
              variant="outline"
              className="border-gray-300"
            >
              Đóng
            </Button>
            <Button
              onClick={() => {
                if (selectedPromo) {
                  handleCopyCode(selectedPromo.code);
                }
                setSelectedPromo(null);
              }}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Sao Chép Mã & Đóng
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
