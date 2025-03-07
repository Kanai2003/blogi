"use client"
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EllipsisVertical } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from './Navbar';
import { deletePost } from '@/services/post';
import PostEditorDialog from './PostEditorDialog';
import parse from 'html-react-parser'


export interface BlogCardProps {
  id: number;
  title: string;
  content: string;
  updated_at: string;
  created_at: string;
  owner?: {
    id: number;
    username: string;
    name: string;
  }
  editable?: boolean
}

const BlogCard = ({ title, content, created_at, id, owner, editable = false }: BlogCardProps) => {
  const [openPostEditor, setOpenPostEditor] = useState<boolean>(false);

  const formattedDate = new Date(created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });


  const userData = useSelector((state: RootState) => state.auth.user);

  const handleDelete = async (postId: number) => {
    await deletePost(postId, userData?.access_token)

  }

  const handleUpdate = () => {
    setOpenPostEditor(true);
  }

  const optionsDialog = () => {

    if (!editable) return null;
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <EllipsisVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleUpdate}>Update</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleDelete(id)}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <>
      <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 w-full" key={id}>
        <CardHeader className="relative">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{formattedDate} |  {owner?.name}</CardDescription>
          <div className="absolute top-0 right-3">

            {optionsDialog()}
          </div>
        </CardHeader>
        <CardContent>
          {/* <div className="w-full ">
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div> */}
          {parse(content)}
        </CardContent>
      </Card>
      <PostEditorDialog open={openPostEditor} onOpenChange={() => setOpenPostEditor(false)} title={title} content={content} update postId={id} />
    </>
  );
};

export default BlogCard;