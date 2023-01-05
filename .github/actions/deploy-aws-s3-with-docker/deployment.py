import os
import boto3
from botocore.config import Config

def run():
    # 1. get the inputs
    aws_access_key_id = os.environ["INPUT_AWS_ACCESS_KEY_ID"]
    aws_region = os.environ["INPUT_AWS_REGION"]
    # ... and so on
    
    

if __name__ == "__main__":
    run()
    