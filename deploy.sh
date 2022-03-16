#!/usr/bin/env bash
echo "Starting to deploy 'frontend', build..."
yarn build
echo "Package dist"
rm -rf dist.zip
tar zcvf dist.tar.gz dist 
echo "Publish ..." 
scp -i ~/.ssh/baca-ec2-login.pem dist.tar.gz ec2-user@ec2-54-178-107-66.ap-northeast-1.compute.amazonaws.com:/data/web/readon_alpha
echo "#done"