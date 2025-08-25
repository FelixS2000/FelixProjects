#!/bin/bash

# Resume Website Update Script
# Updates files and invalidates CloudFront cache

set -e

# Configuration
PROFILE_NAME="default"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if deployment info exists
check_deployment_info() {
    if [ ! -f ".bucket-name" ] || [ ! -f ".distribution-id" ]; then
        error "Deployment information not found. Please run deploy-resume.sh first."
        exit 1
    fi
}

# Update files in S3
update_files() {
    BUCKET_NAME=$(cat .bucket-name)
    log "Updating files in S3 bucket: $BUCKET_NAME"
    
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
    
    success "Files updated in S3"
}

# Invalidate CloudFront cache
invalidate_cache() {
    DISTRIBUTION_ID=$(cat .distribution-id)
    log "Invalidating CloudFront cache for distribution: $DISTRIBUTION_ID"
    
    INVALIDATION_ID=$(aws cloudfront create-invalidation \
        --distribution-id $DISTRIBUTION_ID \
        --paths "/*" \
        --profile $PROFILE_NAME \
        --query 'Invalidation.Id' \
        --output text)
    
    success "Cache invalidation created: $INVALIDATION_ID"
    log "Changes will be live in 1-3 minutes"
}

# Main update process
main() {
    log "Starting resume website update"
    
    check_deployment_info
    update_files
    invalidate_cache
    
    success "Update completed successfully!"
    
    DOMAIN_NAME=$(cat .domain-name)
    echo ""
    echo "🌐 Your website: https://$DOMAIN_NAME"
    echo "⏱️  Changes will be live in 1-3 minutes"
}

main "$@"