#!/bin/bash

# Setup Validation Script
# Checks if everything is ready for deployment

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

success() {
    echo -e "${GREEN}✅${NC} $1"
}

error() {
    echo -e "${RED}❌${NC} $1"
}

warning() {
    echo -e "${YELLOW}⚠️${NC} $1"
}

info() {
    echo -e "${BLUE}ℹ️${NC} $1"
}

echo "🔍 Validating Resume Website Setup"
echo "=================================="
echo ""

# Check required files
echo "📁 Checking Required Files:"
if [ -f "resume.html" ]; then
    success "resume.html exists"
else
    error "resume.html missing"
fi

if [ -f "resume-styles.css" ]; then
    success "resume-styles.css exists"
else
    error "resume-styles.css missing"
fi

if [ -f "felix.png" ]; then
    success "felix.png (profile image) exists"
else
    warning "felix.png missing - add your profile photo"
fi

if [ -f "deploy-resume.sh" ] && [ -x "deploy-resume.sh" ]; then
    success "deploy-resume.sh exists and is executable"
else
    error "deploy-resume.sh missing or not executable"
fi

if [ -f "update-resume.sh" ] && [ -x "update-resume.sh" ]; then
    success "update-resume.sh exists and is executable"
else
    error "update-resume.sh missing or not executable"
fi

echo ""

# Check AWS CLI
echo "☁️ Checking AWS Setup:"
if command -v aws &> /dev/null; then
    success "AWS CLI is installed"
    
    # Check AWS credentials
    if aws sts get-caller-identity &> /dev/null; then
        success "AWS credentials configured"
        ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
        info "AWS Account: $ACCOUNT_ID"
    else
        error "AWS credentials not configured - run 'aws configure'"
    fi
else
    error "AWS CLI not installed"
fi

echo ""

# Check directory structure
echo "📂 Checking Directory Structure:"
if [ -d "resume" ]; then
    success "resume/ directory exists"
else
    warning "resume/ directory missing"
fi

if [ -d "images" ]; then
    success "images/ directory exists"
else
    warning "images/ directory missing"
fi

if [ -d "images/certifications" ]; then
    success "images/certifications/ directory exists"
else
    warning "images/certifications/ directory missing"
fi

echo ""

# Check HTML validity (basic)
echo "🔍 Basic HTML Validation:"
if grep -q "<!DOCTYPE html>" resume.html; then
    success "HTML5 DOCTYPE found"
else
    warning "HTML5 DOCTYPE missing"
fi

if grep -q "<title>" resume.html; then
    success "Title tag found"
else
    error "Title tag missing"
fi

if grep -q "viewport" resume.html; then
    success "Viewport meta tag found"
else
    warning "Viewport meta tag missing"
fi

echo ""

# Check CSS
echo "🎨 CSS Validation:"
if grep -q ":root" resume-styles.css; then
    success "CSS custom properties found"
else
    warning "CSS custom properties missing"
fi

if grep -q "@media" resume-styles.css; then
    success "Responsive media queries found"
else
    error "Responsive media queries missing"
fi

echo ""

# Summary
echo "📋 Summary:"
echo "==========="

if [ -f "resume.html" ] && [ -f "resume-styles.css" ] && command -v aws &> /dev/null; then
    success "Core files ready for deployment"
    echo ""
    info "Next steps:"
    echo "  1. Add your profile photo as felix.png"
    echo "  2. Customize resume content in resume.html"
    echo "  3. Test locally: ./serve-local.sh"
    echo "  4. Deploy to AWS: ./deploy-resume.sh"
else
    error "Setup incomplete - fix issues above before deploying"
fi

echo ""