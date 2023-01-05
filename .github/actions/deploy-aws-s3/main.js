const core = require("@actions/core");
const github = require("@actions/github");
const exec = require("@actions/exec");

function run() {
  // 1. Get the inputs
  const awsAccessKeyId = core.getInput("aws-access-key-id");
  const awsSecretAccessKey = core.getInput("aws-secret-access-key");
  const awsRegion = core.getInput("aws-region");
  const awsBucket = core.getInput("aws-bucket");
  const awsFolder = core.getInput("aws-folder");
  const awsCloudfrontDistributionId = core.getInput("aws-cloudfront-distribution-id");
  const awsCloudfrontInvalidationPath = core.getInput("aws-cloudfront-invalidation-path");

  // 2. Set the AWS credentials
  core.exportVariable("AWS_ACCESS_KEY_ID", awsAccessKeyId);
  core.exportVariable("AWS_SECRET_ACCESS_KEY", awsSecretAccessKey);
  core.exportVariable("AWS_DEFAULT_REGION", awsRegion);

  // 3. Install the AWS CLI
  exec.exec("pip install awscli");

  // 4. Sync the files to S3
  exec.exec(`aws s3 sync . s3://${awsBucket}/${awsFolder} --delete`);

  // 5. Invalidate the CloudFront cache
  if (awsCloudfrontDistributionId && awsCloudfrontInvalidationPath) {
    exec.exec(
      `aws cloudfront create-invalidation --distribution-id ${awsCloudfrontDistributionId} --paths ${awsCloudfrontInvalidationPath}`
    );
  }

  // 6. Set the output
  core.setOutput("aws-bucket", awsBucket);
  core.setOutput("aws-folder", awsFolder);

  // 7. Set the status
  core.info("Deployment to AWS S3 completed successfully");
}

run();
