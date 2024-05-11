# LeetCode Recorder

> An online tool to keep track of every LeetCode problem you have done.

While enhancing my programming skills through practicing algorithms on LeetCode, I realized the potential benefits of systematically tracking my progress for each problem I solved.
This included recording how long it took me to solve the problem, my approach, and the code I used. Initially, I started documenting these details manually using pen and paper, but soon 
found this method too time-consuming. Recognizing the need for a more efficient solution, I decided to digitize the process. The idea was to store this information in a database to ensure it 
wouldn't be lost and to make it easily revisitable. Having recently graduated with a master's degree, developing this online platform also provided an excellent opportunity to solidify my 
knowledge and learn new skills. This led to the creation of a comprehensive tool that not only helps in preserving my learning progress but also enhances my efficiency in revisiting and learning 
from past challenges.

### Table of Contents
- [Build With](###build-with)
- [Getting Started](###getting-started)
  - [Frontend Setup](####frontend-setup)
  - [Backend Setup](####backend-end-setup)
  - [Github Actions Secrets](####github-actions-secrets)

### Build With

- React, deployed in S3 and CloudFront
- Spring Boot, Java, deployed in EC2
- MySql, deployed in RDS

### Getting Started
#### Frontend Setup
- Make sure you have Node.js and npm installed
- In the client directory, run `npm install` to install all the necessary dependencies
- Confugure your server address in `~/client/src/config/axiosConfig`
#### Backend Setup
- This Spring Boot application runs on Java 17
- Configure your database connection on the `application.yml` file.
#### Github Actions Secret
This project have enable the auto deployment seeting. You can find the corresponding yml files under the `.github/workflows` folder. The deployment process for frontend is the `react-cicd.yml`
  file and for backend is the `spring-boot-cicd.yml` file.
|Secret|Definition|Corresponding File|
|------|----------|------------------|
|S3_BUCKET_NAME|This is the bucket name of your AWS S3 bucket where you host your website.|react-cicd.yml|
|AWS_REGION|This is your AWS region.|react-cicd.yml|
|CLOUDFRONT_DISTRIBUTION_ID|This is your AWS CloudFront distribution ID.|react-cicd.yml|
|AWS_ACCESS_KEY_ID|Your access key to AWS for programmatical access.|react-cicd.yml|
|AWS_SECRET_ACCESS_KEY|Your paired secret for the access key.|react-cicd.yml|
|DOCKER_USERNAME|Your DockerHub username.|spring-boot-cicd.yml|
|DOCKER_PASSWORD|The password to access your DockerHub.|spring-boot-cicd.yml|
|EC2_HOST|The IPv4 address for your EC2 instance.|spring-boot-cicd.yml|
|EC2_USER|The SSH username for your EC2 instance. It's `ubuntu` for my use.|spring-boot-cicd.yml|
|EC2_SSH_KEY|The SSH private key for your EC2 instance access.|spring-boot-cicd.yml|
|DATABASE_USERNAME|User name of your database in RDS.|spring-boot-cicd.yml|
|DATABASE_PASSWORD|Password to access your database.|spring-boot-cicd.yml|
|JWT_KEY|The JWT key token which is used for the JWT authentication for this application.|spring-boot-cicd.yml|

As this application is deployed in Docker, there is a Dockerfile where you also need to assign the `DATABASE_USERNAME`, `DATABASE_PASSWORD` and `DATABASE_PASSWORD` to handle environment variables
.
