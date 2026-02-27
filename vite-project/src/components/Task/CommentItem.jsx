import React, { useState } from "react";
import Api from "../../Api";
import { toast } from "react-toastify";
const flattenReplies = (replies = []) => {
  let result = [];
  for (const reply of replies) {
    result.push(reply);
    if (reply.replies?.length) {
      result = result.concat(flattenReplies(reply.replies));
    }
  }
  return result;
};
const CommentItem = ({ comment, fetchComments, currentUser, depth = 0 }) => {
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [showReplies, setShowReplies] = useState(true);
  const isMine = comment.author?.id === currentUser?.id;
  const indent = depth >= 1 ? 16 : 0;
  const flattenedReplies = flattenReplies(comment.replies || []);
  const addReply = async () => {
    if (!replyText.trim()) return;
    try {
      await Api.post(
        `/comment/${comment.id}/reply`,
        { comment: replyText }
        );
      setReplyText("");
      setShowReply(false);
      fetchComments();
    } catch {
      toast.error("Reply failed");
    }
  };
  const deleteComment = async () => {
    try {
      await Api.post(
        `/comment/${comment.id}/delete`);
      fetchComments();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div style={{ marginLeft: `${indent}px` }}>
      <div className="flex gap-2 py-2 px-2 rounded-lg hover:bg-taupe-50 transition">
        <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-linear-to-br from-taupe-400 to-taupe-500 text-white flex items-center justify-center text-xs font-semibold flex-shrink-0 ">
          {comment.author?.name?.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 flex-wrap">
            <span className="font-semibold text-taupe-800 text-xs md:text-sm">
              {comment.author?.name}
            </span>
            {isMine && (
              <span className="text-[10px] md:text-xs bg-taupe-100 text-taupe-600 px-1.5 py-[1px] rounded-full">
                You
              </span>
            )}
          </div>
          <div className="mt-1 w-full bg-gray-100 px-2.5 md:px-3 py-1.5 md:py-2 rounded-lg text-xs md:text-sm text-taupe-800 break-words inline-block max-w-full">
            {comment.comment}
          </div>
          <div className="flex gap-3 text-[11px] md:text-xs mt-1 flex-wrap ">
            <button
              onClick={() => setShowReply(!showReply)}
              className="text-taupe-500 cursor-pointer active:scale-95"
            >
              Reply
            </button>
            {isMine && (
              <button
                onClick={deleteComment}
                className="text-red-500 cursor-pointer active:scale-95"
              >
                Delete
              </button>
            )}
            {flattenedReplies.length > 0 && (
              <button
                onClick={() => setShowReplies((prev) => !prev)}
                className="text-taupe-600 cursor-pointer active:scale-95"
              >
                {showReplies
                  ? "Hide replies"
                  : `View replies (${flattenedReplies.length})`}
              </button>
            )}
          </div>
          {showReply && (
            <div className="flex gap-2 mt-2 w-full">
              <input
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Reply..."
                className="flex-1 min-w-0 border border-taupe-300 rounded-lg px-2 py-1.5 text-xs md:text-sm focus:ring-2 focus:ring-taupe-400 outline-none"
              />
              <button
                onClick={addReply}
                className="flex-shrink-0 cursor-pointer bg-taupe-300 rounded-xl text-taupe-600 font-medium text-xs md:text-sm px-2 active:scale-95 "
              >
                Reply
              </button>
            </div>
          )}
        </div>
      </div>
      {showReplies && depth === 0 && flattenedReplies.length > 0 && (
        <div className="mt-1 space-y-1">
          {flattenedReplies.map((reply) => (
            <div key={reply.id} style={{ marginLeft: "16px" }}>
              <CommentItem
                comment={{
                  ...reply,
                  replies: [],
                }}
                fetchComments={fetchComments}
                currentUser={currentUser}
                depth={1}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
