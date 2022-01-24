package com.shakkib.netflixclone.services;

import com.shakkib.netflixclone.entities.Comment;
import com.shakkib.netflixclone.exceptions.CommentDetailsNotFoundException;

public interface CommentService {
    Comment writeComment(Comment comment);
    Boolean deleteComment(String commentId);
    Comment getComment(String commentId) throws CommentDetailsNotFoundException;
    Comment editComment(String commentId, String content) throws CommentDetailsNotFoundException;
}
