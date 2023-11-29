#!/bin/sh

set -x

token=$1
repoName=$2
userName=$3
email=$4
targetDir=$5
branch=$6
commitMessage=$7


if [[ -z "$commitMessage" ]];then
 commitMessage="docs: build docs"
fi;

if [[ -z "$branch" ]];then
 branch=docs
fi;

cd $targetDir
git init


git config user.email "$email"
git config user.name "$userName"

git remote remove origin
git remote add origin https://${token}@github.com/${userName}/${repoName}

git add .
git commit -m"$commitMessage"
git checkout -b $branch
git push origin $branch --force
