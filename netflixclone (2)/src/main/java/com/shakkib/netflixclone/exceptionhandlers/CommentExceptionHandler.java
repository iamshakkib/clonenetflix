package com.shakkib.netflixclone.exceptionhandlers;

import com.shakkib.netflixclone.exceptions.CommentDetailsNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class CommentExceptionHandler {

    @ExceptionHandler(value = CommentDetailsNotFoundException.class)
    public ResponseEntity HandleCommentDetailNotFoundException(){
        return new ResponseEntity("Comment does not exist with the passed value", HttpStatus.BAD_REQUEST);
    }
}
