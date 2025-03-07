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
import { useRouter } from 'next/navigation';


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
  onEdit?: () => void;
}

const BlogCard = ({ title, content, created_at, id, owner, editable = false, onEdit }: BlogCardProps) => {
  const [openPostEditor, setOpenPostEditor] = useState<boolean>(false);
  const router = useRouter();

  const formattedDate = new Date(created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });


  const userData = useSelector((state: RootState) => state.auth.user);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDelete = async (e:any) => {
    e.stopPropagation();
    await deletePost(id, userData?.access_token)
    if(onEdit) onEdit();

  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUpdate = (e:any) => {
    e.stopPropagation();
    setOpenPostEditor(true);
    if(onEdit) onEdit();
  }

  const handleCardClick = () => {
    router.push(`/post/?owner_id=${owner?.id}&post_id=${id}`)
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
          <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <>
      <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 w-full" key={id} onClick={handleCardClick}>
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