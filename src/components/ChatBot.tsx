import { useState, useRef, useEffect } from 'react';
import { X, MessageCircle, Send } from 'lucide-react';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'initial-1',
      text: "Xin chào! Chào mừng bạn đến với CGV Cinemas. Tôi có thể giúp gì cho bạn hôm nay?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim() === '' || isTyping) return;

    const userInputText = inputValue.trim();
    
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: userInputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: `bot-${Date.now()}`,
        text: getBotResponse(userInputText),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
      
      // Refocus input after bot responds
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }, 1000);
  };

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('phim') || input.includes('chiếu')) {
      return "Chúng tôi đang có nhiều phim hay! Mời bạn xem mục Phim Đang Chiếu để biết thêm chi tiết.";
    } else if (input.includes('vé') || input.includes('đặt vé')) {
      return "Bạn có thể đặt vé trực tiếp trên website. Chỉ cần chọn phim, suất chiếu và ghế ngồi bạn muốn!";
    } else if (input.includes('rạp') || input.includes('địa chỉ') || input.includes('ở đâu')) {
      return "CGV có nhiều cụm rạp trên cả nước. Bạn hãy truy cập trang Các Cụm Rạp để tìm rạp gần nhất nhé.";
    } else if (input.includes('giá') || input.includes('tiền') || input.includes('bao nhiêu')) {
      return "Giá vé có thể khác nhau tùy theo rạp và suất chiếu. Giá vé tiêu chuẩn bắt đầu từ 85.000 VNĐ. Hãy kiểm tra website để biết các chương trình khuyến mãi hiện tại!";
    } else if (input.includes('đồ ăn') || input.includes('bắp nước') || input.includes('bắp rang bơ')) {
      return "Chúng tôi có phục vụ nhiều loại đồ ăn nhẹ như bắp rang bơ, nachos, xúc xích và nước giải khát. Bạn có thể đặt trước trực tuyến để được phục vụ nhanh hơn!";
    } else {
      return "Cảm ơn câu hỏi của bạn! Để biết thêm thông tin chi tiết, vui lòng truy cập mục FAQ hoặc liên hệ đội ngũ chăm sóc khách hàng của chúng tôi.";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage();
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-red-600 hover:bg-red-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 z-50 flex items-center justify-center"
          aria-label="Mở hội thoại"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[380px] h-[600px] bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden z-50 border border-gray-200">
          {/* Header */}
          <div className="bg-red-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white rounded-full p-2">
                <MessageCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold">Hỗ trợ CGV</h3>
                <p className="text-xs text-red-100">Đang hoạt động</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-red-700 rounded-full p-1 transition-colors"
              aria-label="Đóng hội thoại"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <ScrollArea className="flex-1 min-h-0 p-4 bg-gray-50">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[75%] rounded-lg p-3 ${
                      message.sender === 'user'
                        ? 'bg-red-600 text-white'
                        : 'bg-white text-gray-900 border border-gray-200'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.sender === 'user' ? 'text-red-100' : 'text-gray-500'
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString('vi-VN', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white text-gray-900 border border-gray-200 rounded-lg p-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-200 rounded-b-lg">
            <form onSubmit={handleFormSubmit} className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Nhập tin nhắn của bạn..."
                disabled={isTyping}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <Button
                type="submit"
                disabled={isTyping || inputValue.trim() === ''}
                className="bg-red-600 hover:bg-red-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                size="icon"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}