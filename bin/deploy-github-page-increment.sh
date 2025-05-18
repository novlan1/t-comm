#!/bin/sh
# 部署多个项目的 demo 到一个仓库中

set -x

token=$1
repoName=$2
userName=$3
email=$4
targetDir=$5
branch=$6
commitMessage=$7
playgroundDir=$8
targetDirName=$9

if [[ -z "$commitMessage" ]];then
 commitMessage="docs: build docs"
fi;

if [[ -z "$branch" ]];then
 branch=docs
fi;

if [[ -z "$playgroundDir" ]];then
 playgroundDir="./log/deploy-github-pages-increment-playground"
fi;

repoHttpsLink="https://${token}@github.com/${userName}/${repoName}"


rm -rf $playgroundDir
mkdir -p $playgroundDir

git clone $repoHttpsLink $playgroundDir/$repoName

targetDemoDir="$playgroundDir/$repoName/$targetDirName"
mkdir -p $targetDemoDir

cp -r "$targetDir" "$targetDemoDir"

cd "$playgroundDir/$repoName"
pwd

git config user.email "$email"
git config user.name "$userName"

git remote -v
git add .
git commit -m"$commitMessage" --no-verify
git push origin $branch --force
