package com.shakkib.netflixclone.daos;

import com.shakkib.netflixclone.entities.Comment;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import java.util.Optional;

public interface CommentDao extends MongoRepository<Comment,String> {
    Optional<List<Comment>> findAllByUserId(String user_id);
}
