package com.example.loginapi.controller;

import com.example.loginapi.payload.response.MessageResponse;
import com.example.loginapi.service.PictureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.web.servlet.MultipartAutoConfiguration;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;

@RestController
@RequestMapping("/pic")
public class PictureController {
    @Autowired
    PictureService pictureService;

    @RequestMapping("")
    public ResponseEntity<?> setPicture(@RequestParam MultipartFile picture, Principal principal){
        try{
            System.out.println("tried");
            pictureService.savePicture(principal.getName(), picture);
            return ResponseEntity.ok(new MessageResponse("Picture uploaded"));
        } catch(IOException e){
            System.out.println("caught");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to upload picture.");
        }
    }

    @RequestMapping("/show")
    public ResponseEntity<?> showPicture(Principal principal){
        Resource picture = pictureService.loadPicture(principal.getName());

        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(picture);
    }

}
