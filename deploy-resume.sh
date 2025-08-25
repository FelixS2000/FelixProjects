#!/bin/bash

# Professional Resume Website Deployment Script
# Deploys to AWS S3 + CloudFront with security best practices

set -e  # Exit on any error

# Configuration
BUCKET_NAME="felix-resume-website-$(date +%s)"
REGION="us-east-1"
PROFILE_NAME="default"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging function
log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if AWS CLI is installed
check_aws_cli() {
    if ! command -v aws &> /dev/null; then
        error "AWS CLI is not installed. Please install it first."
        exit 1
    fi
    success "AWS CLI is installed"
}

# Create S3 bucket with security settings
create_s3_bucket() {
    log "Creating S3 bucket: $BUCKET_NAME"
    
    # Create bucket
    aws s3 mb s3://$BUCKET_NAME --region $REGION --profile $PROFILE_NAME
    
    # Block all public access
    aws s3api put-public-access-block \
        --bucket $BUCKET_NAME \
        --public-access-block-configuration \
        "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true" \
        --profile $PROFILE_NAME
    
    success "S3 bucket created with public access blocked"
}

# Upload website files
upload_files() {
    log "Uploading website files to S3"
    
    # Upload HTML file
    aws s3 cp resume.html s3://$BUCKET_NAME/index.html \
        --content-type "text/html" \
        --cache-control "max-age=300" \
        --profile $PROFILE_NAME
    
    # Upload CSS file
    aws s3 cp resume-styles.css s3://$BUCKET_NAME/resume-styles.css \
        --content-type "text/css" \
        --cache-control "max-age=86400" \
        --profile $PROFILE_NAME
    
    # Upload profile image if exists
    if [ -f "felix.png" ]; then
        aws s3 cp felix.png s3://$BUCKET_NAME/felix.png \
            --content-type "image/png" \
            --cache-control "max-age=86400" \
            --profile $PROFILE_NAME
    fi
    
    success "Files uploaded to S3"
}

# Create CloudFront Origin Access Control
create_oac() {
    log "Creating CloudFront Origin Access Control"
    
    OAC_CONFIG='{
        "Name": "resume-website-oac",
        "Description": "OAC for resume website S3 bucket",
        "OriginAccessControlOriginType": "s3",
        "SigningBehavior": "always",
        "SigningProtocol": "sigv4"
    }'
    
    OAC_ID=$(aws cloudfront create-origin-access-control \
        --origin-access-control-config "$OAC_CONFIG" \
        --profile $PROFILE_NAME \
        --query 'OriginAccessControl.Id' \
        --output text)
    
    echo $OAC_ID > .oac-id
    success "Origin Access Control created: $OAC_ID"
}

# Create CloudFront distribution
create_cloudfront() {
    log "Creating CloudFront distribution"
    
    OAC_ID=$(cat .oac-id)
    
    DISTRIBUTION_CONFIG='{
        "CallerReference": "'$(date +%s)'",
        "Comment": "Resume website distribution",
        "DefaultRootObject": "index.html",
        "Origins": {
            "Quantity": 1,
            "Items": [
                {
                    "Id": "S3-'$BUCKET_NAME'",
                    "DomainName": "'$BUCKET_NAME'.s3.'$REGION'.amazonaws.com",
                    "S3OriginConfig": {
                        "OriginAccessIdentity": ""
                    },
                    "OriginAccessControlId": "'$OAC_ID'"
                }
            ]
        },
        "DefaultCacheBehavior": {
            "TargetOriginId": "S3-'$BUCKET_NAME'",
            "ViewerProtocolPolicy": "redirect-to-https",
            "TrustedSigners": {
                "Enabled": false,
                "Quantity": 0
            },
            "ForwardedValues": {
                "QueryString": false,
                "Cookies": {
                    "Forward": "none"
                }
            },
            "MinTTL": 0,
            "DefaultTTL": 86400,
            "MaxTTL": 31536000,
            "Compress": true
        },
        "Enabled": true,
        "PriceClass": "PriceClass_100",
        "HttpVersion": "http2",
        "IsIPV6Enabled": true
    }'
    
    DISTRIBUTION_ID=$(aws cloudfront create-distribution \
        --distribution-config "$DISTRIBUTION_CONFIG" \
        --profile $PROFILE_NAME \
        --query 'Distribution.Id' \
        --output text)
    
    DOMAIN_NAME=$(aws cloudfront get-distribution \
        --id $DISTRIBUTION_ID \
        --profile $PROFILE_NAME \
        --query 'Distribution.DomainName' \
        --output text)
    
    echo $DISTRIBUTION_ID > .distribution-id
    echo $DOMAIN_NAME > .domain-name
    echo $BUCKET_NAME > .bucket-name
    
    success "CloudFront distribution created: $DISTRIBUTION_ID"
    success "Domain name: $DOMAIN_NAME"
}

# Update S3 bucket policy for CloudFront access
update_bucket_policy() {
    log "Updating S3 bucket policy for CloudFront access"
    
    DISTRIBUTION_ID=$(cat .distribution-id)
    
    BUCKET_POLICY='{
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "AllowCloudFrontServicePrincipal",
                "Effect": "Allow",
                "Principal": {
                    "Service": "cloudfront.amazonaws.com"
                },
                "Action": "s3:GetObject",
                "Resource": "arn:aws:s3:::'$BUCKET_NAME'/*",
                "Condition": {
                    "StringEquals": {
                        "AWS:SourceArn": "arn:aws:cloudfront::'$(aws sts get-caller-identity --profile $PROFILE_NAME --query Account --output text)':distribution/'$DISTRIBUTION_ID'"
                    }
                }
            }
        ]
    }'
    
    echo "$BUCKET_POLICY" > bucket-policy.json
    
    aws s3api put-bucket-policy \
        --bucket $BUCKET_NAME \
        --policy file://bucket-policy.json \
        --profile $PROFILE_NAME
    
    rm bucket-policy.json
    success "S3 bucket policy updated"
}

# Wait for CloudFront deployment
wait_for_deployment() {
    log "Waiting for CloudFront deployment to complete..."
    DISTRIBUTION_ID=$(cat .distribution-id)
    
    aws cloudfront wait distribution-deployed \
        --id $DISTRIBUTION_ID \
        --profile $PROFILE_NAME
    
    success "CloudFront deployment completed"
}

# Display final information
display_results() {
    DOMAIN_NAME=$(cat .domain-name)
    DISTRIBUTION_ID=$(cat .distribution-id)
    
    echo ""
    echo "=========================================="
    echo "🎉 DEPLOYMENT SUCCESSFUL!"
    echo "=========================================="
    echo ""
    echo "📍 Website URL: https://$DOMAIN_NAME"
    echo "🪣 S3 Bucket: $BUCKET_NAME"
    echo "🌐 CloudFront Distribution: $DISTRIBUTION_ID"
    echo ""
    echo "💰 Estimated monthly cost: < $0.25"
    echo ""
    echo "🔒 Security Features Enabled:"
    echo "  ✅ Private S3 bucket (no public access)"
    echo "  ✅ Origin Access Control (OAC)"
    echo "  ✅ HTTPS enforcement"
    echo "  ✅ Restricted bucket policies"
    echo ""
    echo "⏱️  Note: It may take 5-15 minutes for the"
    echo "    website to be fully available globally."
    echo ""
}

# Cleanup function
cleanup() {
    rm -f .oac-id
}

# Main deployment process
main() {
    log "Starting resume website deployment"
    
    check_aws_cli
    create_s3_bucket
    upload_files
    create_oac
    create_cloudfront
    update_bucket_policy
    wait_for_deployment
    display_results
    cleanup
    
    success "Deployment completed successfully!"
}

# Run main function
main "$@"