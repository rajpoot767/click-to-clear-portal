
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

interface Comment {
  id: string;
  author: string;
  content: string;
  date: string;
  avatar?: string;
}

interface CommentSectionProps {
  articleId: string;
}

const CommentSection = ({ articleId }: CommentSectionProps) => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      author: "John Doe",
      content: "This is a great article! Thanks for sharing these insights.",
      date: "2 hours ago",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    {
      id: "2",
      author: "Jane Smith",
      content: "I disagree with some points. The market analysis could be more in-depth.",
      date: "5 hours ago",
      avatar: "https://i.pravatar.cc/150?img=2"
    }
  ]);
  
  const [newComment, setNewComment] = useState("");
  const { toast } = useToast();
  
  const handleSubmitComment = () => {
    if (!newComment.trim()) return;
    
    const comment: Comment = {
      id: Date.now().toString(),
      author: "You", // In a real app, this would be the logged-in user
      content: newComment,
      date: "Just now",
      avatar: "https://i.pravatar.cc/150?img=3"
    };
    
    setComments([comment, ...comments]);
    setNewComment("");
    
    toast({
      title: "Comment posted",
      description: "Your comment has been added successfully"
    });
  };

  return (
    <div className="mt-8 border-t border-gray-200 pt-6">
      <h3 className="text-xl font-bold mb-4">Comments ({comments.length})</h3>
      
      <div className="mb-6">
        <Textarea
          placeholder="Join the discussion..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="min-h-[100px] mb-2"
        />
        <Button onClick={handleSubmitComment}>Post Comment</Button>
      </div>
      
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-3">
            <Avatar className="h-10 w-10">
              <img src={comment.avatar || "https://i.pravatar.cc/150"} alt={comment.author} />
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">{comment.author}</span>
                <span className="text-xs text-gray-500">{comment.date}</span>
              </div>
              <p className="mt-1 text-gray-700">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
