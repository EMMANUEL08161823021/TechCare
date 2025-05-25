import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import ChatView from './components/ChatView/ChatView';
import History from './components/History/History';
import Profile from './components/Profile/Profile';
import { Home, ClipboardList, User } from 'lucide-react';

function App() {
const [activeTab, setActiveTab] = useState('chats');  
  return (
    <div className=''>
      <div className=''>
        
      <Navbar/>
      </div>
      <div style={{height: '100px'}}></div>

      <div className="block lg:hidden mx-2 flex flex-col h-screen bg-gray-100">
        {/* Main Content */}
        <div className="flex-grow">
          {activeTab === 'chats' && (
            <ChatView/>
          )}
          {activeTab === 'diagnosis' && (
            <History/>
          )}
          {activeTab === 'profile' && (
            <Profile/>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="w-full fixed bottom-0 left-0 bg-white shadow-md flex justify-around border-t">
          <button
            onClick={() => setActiveTab('chats')}
            className={`flex flex-col items-center p-2 rounded-t-md ${
              activeTab === 'chats' ? 'text-blue-600 font-bold bg-blue-100' : 'text-gray-500'
            }`}
          >
            <Home size={24} />
            <span className="text-xs">Chats</span>
          </button>

          <button
            onClick={() => setActiveTab('diagnosis')}
            className={`flex flex-col items-center p-2 rounded-t-md ${
              activeTab === 'diagnosis' ? 'text-blue-600 font-bold bg-blue-100' : 'text-gray-500'
            }`}
          >
            <ClipboardList size={24} />
            <span className="text-xs">Diagnosis</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center p-2 rounded-t-md ${
              activeTab === 'profile' ? 'text-blue-600 font-bold bg-blue-100' : 'text-gray-500'
            }`}
          >
            <User size={24} />
            <span className="text-xs">Profile</span>
          </button>
        </div>

      </div>
      <div className='hidden lg:block mt-4'>
        <div className='flex justify-between w-[100%]'>
          <div className='p-3 bg-white w-[20%]'>
          <ChatView/>
          </div>
          <div className='w-[55%]'>
          <History/>
          </div>
          <div className='w-[23%]'>
          <Profile/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
