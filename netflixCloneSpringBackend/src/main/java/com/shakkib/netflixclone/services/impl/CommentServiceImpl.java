package com.shakkib.netflixclone.services.impl;

import com.shakkib.netflixclone.daos.CommentDao;
import com.shakkib.netflixclone.entities.Comment;
import com.shakkib.netflixclone.exceptions.CommentDetailsNotFoundException;
import com.shakkib.netflixclone.services.CommentService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CommentServiceImpl implements CommentService {

    private CommentDao commentDao;

    @Override
    public Comment writeComment(Comment comment) {
        Comment mycomment = commentDao.save(comment);
        return mycomment;
    }

    @Override
    public Boolean deleteComment(String commentId) {
        commentDao.deleteById(commentId);
        return true;
    }

    @Override
    public Comment getComment(String commentId) throws CommentDetailsNotFoundException {
        Comment mycomment = commentDao.findById(commentId).orElseThrow(()-> new CommentDetailsNotFoundException("Comment Details not found"));
        return mycomment;
    }

    @Override
    public Comment editComment(String commentId, String content) throws CommentDetailsNotFoundException {
        Comment comment = getComment(commentId);
        comment.setContent(content);
        Comment updated = commentDao.save(comment);
        return updated;
    }


    public List<Comment> getAllCommentsOfUser(String user_id) throws CommentDetailsNotFoundException {
        List<Comment> comments = commentDao.findAllByUserId(user_id).orElseThrow(()-> new CommentDetailsNotFoundException("Passed User Id is invalid"));
        return comments;
    }
}
