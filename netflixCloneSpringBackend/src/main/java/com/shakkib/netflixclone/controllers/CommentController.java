package com.shakkib.netflixclone.controllers;

import com.shakkib.netflixclone.dtoes.CommentDTO;
import com.shakkib.netflixclone.entities.Comment;
import com.shakkib.netflixclone.exceptions.CommentDetailsNotFoundException;
import com.shakkib.netflixclone.services.impl.CommentServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin
@RequestMapping("/user/v1/comment")
public class CommentController {

    CommentServiceImpl commentServiceImpl;

    @PostMapping("/write")
    public ResponseEntity<CommentDTO> writeComment(@RequestBody CommentDTO commentDTO){
        Comment comment = convertCommentDTOToCommentEntity(commentDTO);
        Comment myComment = commentServiceImpl.writeComment(comment);
        CommentDTO myCommentDTO = convertCommentToCommentDTO(myComment);
        return ResponseEntity.ok(myCommentDTO);
    }

    @GetMapping("/read")
    public ResponseEntity<CommentDTO> readComment(@PathVariable("id") String id) throws CommentDetailsNotFoundException {
        Comment comment =  commentServiceImpl.getComment(id);
        CommentDTO response = convertCommentToCommentDTO(comment);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/all/{id}")
    public ResponseEntity<List<CommentDTO>> readAllCommentsOfUser(@PathVariable("id") String id) throws CommentDetailsNotFoundException {
        List<Comment> comments = commentServiceImpl.getAllCommentsOfUser(id);
        List<CommentDTO> mycomments = new ArrayList<>();
        for(Comment comment:comments){
            mycomments.add(convertCommentToCommentDTO(comment));
        }
        return ResponseEntity.ok(mycomments);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Boolean> deleteComment(@PathVariable("id") String commentId){
        Boolean flag = commentServiceImpl.deleteComment(commentId);
        return ResponseEntity.ok(flag);
    }

    @PutMapping("/edit")
    public ResponseEntity<CommentDTO> editMyComment(String commentId, String content) throws CommentDetailsNotFoundException {
        Comment comment = commentServiceImpl.editComment(commentId,content);
        CommentDTO commentDTO = convertCommentToCommentDTO(comment);
        return ResponseEntity.ok(commentDTO);
    }

    /* i have written my own logic to convert to dto to entity or vice verse, I could have used model mapper
     but sometime its fails.*/

    private Comment convertCommentDTOToCommentEntity(CommentDTO commentDTO){
        return new Comment(commentDTO.getId(), commentDTO.getUserId(), commentDTO.getUserEmail(), commentDTO.getCommentAt(),commentDTO.getContent());
    }

    private CommentDTO convertCommentToCommentDTO(Comment comment){
        return new CommentDTO(comment.getId(), comment.getUserId(), comment.getMovieId(), comment.getUserEmail(),comment.getCommentAt(), comment.getContent());
    }
}
