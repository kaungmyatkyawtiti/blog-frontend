import { Trash2, User } from 'lucide-react'; // Assuming you use lucide-react or similar icons

// Mock Data Structure
const messages = [
  { id: 1, text: "Hello, World!", sender: "Alice", isCurrentUser: false, time: "2 mins ago" },
  { id: 2, text: "React is fun.", sender: "Bob", isCurrentUser: false, time: "1 min ago" },
  { id: 3, text: "I agree! Tailwind makes it even better.", sender: "You", isCurrentUser: true, time: "Just now" },
  { id: 4, text: "Yay, interesting.", sender: "Chris", isCurrentUser: false, time: "Just now" },
];

export default function ChatList() {
  return (
    <div className="flex-1 overflow-y-auto bg-gray-900 p-4 space-y-6">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`group flex w-full ${msg.isCurrentUser ? 'justify-end' : 'justify-start'}`}
        >
          <div className={`flex max-w-[80%] md:max-w-[60%] gap-3 ${msg.isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}>

            {/* Avatar */}
            <div className="shrink-0 w-8 h-8 rounded-full bg-linear-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white shadow-sm">
              {msg.sender[0]}
            </div>

            {/* Bubble Container */}
            <div className={`relative flex flex-col ${msg.isCurrentUser ? 'items-end' : 'items-start'}`}>

              {/* Sender Name (Only for others) */}
              {!msg.isCurrentUser && (
                <span className="text-xs text-gray-400 mb-1 ml-1">{msg.sender}</span>
              )}

              {/* Message Bubble */}
              <div
                className={`px-4 py-2 shadow-md text-sm leading-relaxed text-white relative
                  ${msg.isCurrentUser
                    ? 'bg-indigo-600 rounded-2xl rounded-tr-sm'
                    : 'bg-gray-700 rounded-2xl rounded-tl-sm'
                  }`}
              >
                {msg.text}
              </div>

              {/* Timestamp & Actions */}
              <div className="flex items-center gap-2 mt-1 mx-1">
                <span className="text-[10px] text-gray-500">{msg.time}</span>

                {/* Delete Button (Visible on Hover) */}
                <button className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-500 hover:text-red-400">
                  <Trash2 size={12} />
                </button>
              </div>

            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
