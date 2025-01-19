import { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
// Ensure you have your API key in environment variables
const API_KEY = "AIzaSyAZAm7R1QJNPFFTfqiVD-UDmXvoeu0vzxE";

const ChatApp = () => {
  const {disease} = useParams();
  const [fertilizer, setFertilizer] = useState({});
  const [messages, setMessages] = useState([
    { role: "user", parts: [
      { text:
         `Hello, After this a farmer will talk to you about his crops and live stocks which are animals now if he asks for anything not related to this you should completely reject him and tell him that he can help only in the field. CURRENTLY THE DISEASE IS ${disease}, HELP HIM ACCORDINGLY!`
        }] },
    { role: "model", parts: [{ text: `Hello! I am sorry to hear that your crops are suffering from ${disease.replaceAll('_',' ')}. I will do my best to help you with this issue. Please tell me how can I help you regarding this issue.` }] }
  ]);
  const [newMessage, setNewMessage] = useState('');

  // post to backend to get the recommended fertilizer
  const handleFertilizer = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:3000/ai/best-fertilizer", {
        disease: disease
      });
      console.log('Response:', response.data);
      setFertilizer(response.data);
    } catch (error) {
      console.error('Error fetching AI response:', error);
    }
  };

  useEffect(() => {
    handleFertilizer();
  }, []);
  

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;

    try {
      // Add the new user message to the messages state
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'user', parts: [{ text: newMessage }] }
      ]);

      // Initialize the GoogleGenerativeAI instance with your API key
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Initialize chat with the updated history, ensuring each message has the correct structure
      const chat = model.startChat({
        history: messages.map(msg => ({
          role: msg.role,
          parts: msg.parts
        }))
      });

      // Send the user's message to the AI model
      const result = await chat.sendMessage(newMessage);

      // Add the bot's response to the messages state
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'model', parts: [{ text: result.response.text() }] }
      ]);

      // Clear the input field after sending the message
      setNewMessage('');
    } catch (error) {
      console.error('Error fetching AI response:', error);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Chat Window */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          (index === 0 ) ?
          <></>:
          (
          <>
          <div key={index} className={`mb-4 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs px-4 py-2 rounded-lg ${msg.role === 'user' ? 'bg-purple-500 text-white' : 'bg-gray-300 text-black'}`}>
              {msg.parts[0].text}
            </div>
          </div>

            {index === 1 ?
                        <div className="mb-4 flex justify-start" onClick={
              () => {
                /*redirect to store page*/
                window.location.href = `/store/productview/${fertilizer.id}`;
              }
                        }>
              <div className="max-w-xs px-2 py-1 rounded bg-green-300 text-black">
                Recommended Fertilizer: {fertilizer.fertilizer || 'Loading...'}
              </div>
            </div>
            :<></>
}
          
          </>
          )
        ))}
      </div>

      {/* Message Input */}
      <div className="border-t border-gray-300 p-4">
        <div className="flex items-center">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-purple-500"
          />
          <button
            onClick={handleSendMessage}
            className="ml-4 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;