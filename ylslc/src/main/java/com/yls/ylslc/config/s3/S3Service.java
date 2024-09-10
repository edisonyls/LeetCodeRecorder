package com.yls.ylslc.config.s3;

import org.springframework.stereotype.Service;
import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;

import java.io.IOException;

@Service
public class S3Service {
    private final S3Client s3;

    public S3Service(S3Client s3) {
        this.s3 = s3;
    }

    public void putObject(String bucketName, String key, byte[] file, String contentType) {
        PutObjectRequest objectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .contentType(contentType)
                .build();
        s3.putObject(objectRequest, RequestBody.fromBytes(file));
    }

    public byte[] getObject(String bucketName, String key) {
        GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .build();
        ResponseInputStream<GetObjectResponse> response = s3.getObject(getObjectRequest);
        try {
            return response.readAllBytes();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public void deleteObject(String bucketName, String key) {
        DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .build();
        s3.deleteObject(deleteObjectRequest);
    }

    public void deleteObjectsInFolder(String bucketName, String folderKey) {
        ListObjectsV2Request listObjects = ListObjectsV2Request.builder()
                .bucket(bucketName)
                .prefix(folderKey)
                .build();

        ListObjectsV2Response listObjectsResponse = s3.listObjectsV2(listObjects);
        for (S3Object object : listObjectsResponse.contents()) {
            DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                    .bucket(bucketName)
                    .key(object.key())
                    .build();
            s3.deleteObject(deleteObjectRequest);
        }
    }

}
