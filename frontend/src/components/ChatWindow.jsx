import { useState } from 'react';
import api from '../api'
import { ACCESS_TOKEN } from '../constants';

const ChatWindow = () => {
  const [isOpen, setIsOpen] = useState(false); // State to toggle chat window visibility
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([]);

  const toggleChat = () => setIsOpen(!isOpen); // Toggle the chat window

  const handleSend = async () => {
    if (!message.trim()) return;

    setChatLog([...chatLog, { role: 'user', content: message }]);

    try {
      const token = localStorage.getItem(ACCESS_TOKEN);
      const response = await api.post(
        '/api/chat/',
        { message }, // Payload
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json', // Optional, but ensures JSON encoding
          },
        }
      );

      setChatLog([...chatLog,
        { role: 'user', content: message },
        { role: 'assistant', content: response.data.response }
      ]);

      setMessage('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-end">
      {/* Chat Toggle Button */}
      <button
        onClick={toggleChat}
        className="p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 focus:outline-none"
      >
        💬
      </button>

      {/* Chat Window (only visible when isOpen is true) */}
      {isOpen && (
        <div className="mt-2 w-80 h-[400px] bg-white border rounded-lg shadow-lg flex flex-col">
          <div className="p-4 bg-blue-500 text-white font-bold rounded-t-lg">
            Chat with Us
          </div>
          <div className="flex-1 p-4 overflow-y-auto bg-gray-100">
            {chatLog.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 p-2 rounded-lg ${
                  msg.role === 'user'
                    ? 'bg-blue-500 text-white self-end'
                    : 'bg-gray-300 text-black self-start'
                }`}
              >
                {msg.content}
              </div>
            ))}
          </div>
          <div className="flex items-center p-2 border-t bg-white">
            <input
              type="text"
              className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              onClick={handleSend}
              className="ml-2 p-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
