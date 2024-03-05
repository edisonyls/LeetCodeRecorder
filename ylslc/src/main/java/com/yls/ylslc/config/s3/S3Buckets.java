package com.yls.ylslc.config.s3;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix="aws.s3.buckets")
@Getter
@Setter
public class S3Buckets {
    private String storageLocation;
}
