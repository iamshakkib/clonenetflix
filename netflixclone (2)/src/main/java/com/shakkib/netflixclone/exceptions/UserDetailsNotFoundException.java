package com.shakkib.netflixclone.exceptions;

import java.util.function.Supplier;

public class UserDetailsNotFoundException extends Exception{
    public UserDetailsNotFoundException(String s){
        super(s);
    }
}
