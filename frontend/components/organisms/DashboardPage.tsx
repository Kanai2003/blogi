"use client"
import React, { useState } from 'react'
import BlogSection from '../molecules/BlogSection'
import { Button } from '../ui/button'
import { PlusIcon } from 'lucide-react'
import { useSelector } from 'react-redux'
import { RootState } from '../molecules/Navbar'
import PostEditorDialog from '../molecules/PostEditorDialog'


function DashboardPage() {
  const [openPostEditor, setOpenPostEditor] = useState<boolean>(false);
  const userData = useSelector((state: RootState) => state);

  const handleCreateNewBlog = () => {
    console.log('Create new blog', userData)
    setOpenPostEditor(true)
  }
  return (
    <>
      <div className='min-h-screen flex flex-col p-6 h-full w-full '>
        <div className='flex justify-between items-center p-6 m-6 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg shadow-lg'>
          <div>
            <h2 className='text-2xl font-bold mb-2'>Write Your Blogs</h2>
            <p className='text-sm'>Share your thoughts and ideas with the world. Start by creating a new blog post.</p>
          </div>
          <Button className='flex items-center bg-white text-purple-500 hover:bg-gray-200' onClick={handleCreateNewBlog}>
            <PlusIcon size={24} className='mr-2' />
            Create a New Blog
          </Button>
        </div>
        <BlogSection editable />
      </div>
      <PostEditorDialog open={openPostEditor} onOpenChange={() => setOpenPostEditor(false)} />
    </>
  )
}

export default DashboardPage