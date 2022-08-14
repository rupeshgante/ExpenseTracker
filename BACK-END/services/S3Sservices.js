const AWS=require('aws-sdk');

const uploadToS3=(data,filename)=>{
    const BUCKET_NAME='expensetracker1122';
    const IAM_USER_KEY='AKIA2VV4V47M7S4BWA6J';
    const IAM_USER_SECRET='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';
  
    let s3bucket=new AWS.S3({
      accessKeyId:IAM_USER_KEY,
      secretAccessKey:IAM_USER_SECRET,
    })
  
    var params={
      Bucket:BUCKET_NAME,
      Key:filename,
      Body:data,
      ACL:'public-read'
    }
  
  return new Promise((resolve,reject)=>{
    
    s3bucket.upload(params,(err,response)=>{
      if(err){
        console.log('Error :',err);
        reject(err);
      }
      else{
        console.log('success',response);
       resolve(response.Location);
  
      }
    })
  })
  }

  module.exports={
    uploadToS3
  }