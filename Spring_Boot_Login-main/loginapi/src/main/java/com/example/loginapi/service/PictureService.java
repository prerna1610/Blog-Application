package com.example.loginapi.service;

import com.example.loginapi.entity.user.Picture;
import com.example.loginapi.repository.PictureRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class PictureService {
    @Autowired
    PictureRespository pictureRespository;

    public void savePicture(String name, MultipartFile file) throws IOException {
        Picture picture = new Picture(name, file.getBytes());
        pictureRespository.save(picture);
    }

    public Resource loadPicture(String email){
        Picture picture = pictureRespository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Picture not found"));
        byte[] pictureData = picture.getPicture();

        ByteArrayResource resource = new ByteArrayResource(pictureData);
        return resource;
    }
}
