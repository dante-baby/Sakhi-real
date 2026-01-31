import React, { useState } from 'react';
import { MOCK_FORUM_POSTS } from '../constants';
import { MessageSquare, Heart, Plus, Flag, Filter } from 'lucide-react';
import { ForumPost } from '../types';

const Forum: React.FC = () => {
  const [posts, setPosts] = useState<ForumPost[]>(MOCK_FORUM_POSTS);

  const handleLike = (id: string) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  return (
    <div className="space-y-8 animate-in fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Community</h1>
          <p className="text-slate-500 font-medium mt-1">Share stories, ask for advice, find support.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white text-slate-600 px-5 py-3 rounded-xl font-bold shadow-sm border border-slate-200 hover:bg-slate-50 flex items-center gap-2">
            <Filter size={18} />
            <span>Filter</span>
          </button>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-indigo-200 flex items-center gap-2 transition-transform active:scale-95">
            <Plus size={20} />
            <span>New Post</span>
          </button>
        </div>
      </div>

      {/* Guidelines Notice */}
      <div className="bg-indigo-50 border border-indigo-100 p-5 rounded-2xl flex gap-4 text-indigo-900 shadow-sm">
        <div className="bg-indigo-100 p-2 rounded-lg h-fit">
           <Flag className="text-indigo-600" size={20} />
        </div>
        <div>
          <span className="font-bold block mb-1">Community Guidelines</span> 
          <span className="text-sm opacity-90">Please be kind and respectful. Do not share real names, addresses, or phone numbers. This is a safe space for everyone.</span>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="grid grid-cols-1 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-6 md:p-8 rounded-[1.5rem] shadow-sm border border-slate-100 hover:shadow-md transition-all">
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-12 h-12 rounded-2xl ${post.avatarColor} flex items-center justify-center text-white font-bold text-lg shadow-sm`}>
                {post.authorAlias.charAt(0)}
              </div>
              <div>
                <div className="font-bold text-slate-800 text-lg">{post.authorAlias}</div>
                <div className="text-xs font-medium text-slate-400">{post.timestamp}</div>
              </div>
            </div>

            <h3 className="text-xl font-bold text-slate-800 mb-3">{post.title}</h3>
            <p className="text-slate-600 leading-relaxed mb-6">{post.content}</p>

            <div className="flex gap-2 mb-6 flex-wrap">
              {post.tags.map(tag => (
                <span key={tag} className="bg-slate-50 text-slate-500 text-xs px-3 py-1.5 rounded-lg font-bold uppercase tracking-wide border border-slate-100">#{tag}</span>
              ))}
            </div>

            <div className="flex items-center gap-6 pt-6 border-t border-slate-50">
              <button 
                onClick={() => handleLike(post.id)}
                className="flex items-center gap-2 text-slate-400 hover:text-rose-500 transition-colors group"
              >
                <div className="p-2 rounded-full group-hover:bg-rose-50 transition-colors">
                  <Heart size={20} className="group-hover:fill-rose-500" />
                </div>
                <span className="text-sm font-bold">{post.likes}</span>
              </button>
              
              <button className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-colors group">
                <div className="p-2 rounded-full group-hover:bg-indigo-50 transition-colors">
                   <MessageSquare size={20} />
                </div>
                <span className="text-sm font-bold">{post.replies} Replies</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forum;