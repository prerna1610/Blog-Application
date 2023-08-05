package com.example.loginapi.payload.request;

import lombok.*;

@Getter
@Setter
@Builder
public class SignupRequest {
    private String name;
    private String username;
    private String phone;
    private String address;
    private String state;
    private String zip;
    private String email;
    private String password;
    private String confirmPassword;


    @Override
    public String toString() {
        return "SignupRequest{" +
                "name='" + name + '\'' +
                ", username='" + username + '\'' +
                ", phone='" + phone + '\'' +
                ", address='" + address + '\'' +
                ", state='" + state + '\'' +
                ", zip='" + zip + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", confirmPassword='" + confirmPassword + '\'' +
                '}';
    }
}
