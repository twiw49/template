# React with..

* Serverless
* Server Side Rendering
* Progressive Web App
* Styled-components
* Webpack
* Redux

---

## aws & serverless

```
yarn add -g aws serverless
```

---

## IAM role

`AdministratorAccess` will be enough.

* You get
  * AWS Access Key ID
  * AWS Secret Access Key

---

## AWS configuration

* In terminal,

```
aws configure
```

---

## Install App

* Project name you want => `[*****NAME*****]`
* In terminal,

```
serverless install --name [*****NAME*****] --url https://github.com/twiw49/template/
```

---

```
cd [*****NAME*****]
git init
yarn
```

---

## Local Development mode

**Progressive Web App is working only in `production` mode, not `development` mode.**

* In terminal,

```
yarn build:dev
yarn start
```

---

## Production mode

**Serverless gives us endpoint URL. But the root path of that URL isn't `/`. In this project, the root path is `/dev`.**

* If you go to the endpoint URL, it doesn't work well. You should have other domain of which root path is `/`.
* You can register your own domain in `aws.amazon.com => API Gateway => Custom Domain Name`.
* https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-edge-optimized-custom-domain-name.html

---

## AWS S3

* Create S3 Bucket
* `Permissions - Bucket Policy`

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::[*****Your Bucket Name*****]/*"
        }
    ]
}
```

* `Permissions - CORS configurations`

```
<?xml version="1.0" encoding="UTF-8"?>
<CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
<CORSRule>
    <AllowedOrigin>*</AllowedOrigin>
    <AllowedMethod>GET</AllowedMethod>
    <AllowedMethod>PUT</AllowedMethod>
    <AllowedMethod>POST</AllowedMethod>
    <AllowedMethod>DELETE</AllowedMethod>
    <ExposeHeader>ETag</ExposeHeader>
    <AllowedHeader>*</AllowedHeader>
</CORSRule>
</CORSConfiguration>
```

---

## S3 BUCKET URL & S3 BUCEKT NAME

* If you created a S3 Bucket, you get your S3 BUCKET URL and S3 BUCKET NAME.
* For example,

```
https://s3.ap-northeast-2.amazonaws.com/my-bucket-sample/
```

* S3_BUKCET_URL=https://s3.ap-northeast-2.amazonaws.com/my-bucket-sample/
* S3_BUCEKT_NAME=my-bucket-sample
**Create Your Own S3 Bucket in AWS**

---

## Create `.env` file in the root.

* In `.env` file,
* See, `.env-sample` file. (Sample)

```
S3_BUCKET_URL=[*****YOUR S3_BUCKET_URL*****]
```

---

## Put your S3_BUCKET_NAME at package.json:12

```
"s3-sync": "aws s3 sync ./dist/public/ s3://[*****YOUR S3_BUCKET_NAME*****] --delete",
```

---

* In terminal,

```
yarn deploy
```
