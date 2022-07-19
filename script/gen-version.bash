#################################################
# Basic log function.
# 基本日志，输出时间戳
# 30:黑
# 31:红
# 32:绿
# 33:黄
# 34:蓝色
# 35:紫色
# 36:天蓝
# 37:白色
#################################################
function echo_log() {
    now=$(date +"[%Y/%m/%d %H:%M:%S]")
    echo -e "\033[1;$1m${now}$2\033[0m"
}

#################################################
# Debug log message.
# 调试日志，黑色
#################################################
function msg_debug() {
    echo_log 30 "[Debug] $*"
}

#################################################
# Error log message.
# 异常日志，红色
#################################################
function msg_error() {
    echo_log 31 "[Error] $*"
}

#################################################
# Success log message.
# 成功日志，绿色
#################################################
function msg_success() {
    echo_log 32 "[Success] $*"
}

#################################################
# Warning log message.
# 警告日志，黄色
#################################################
function msg_warn() {
    echo_log 33 "[Warning] $*"
}

#################################################
# Information log message.
# 一般消息日志，蓝色
#################################################
function msg_info() {
    echo_log 34 "[Info] $*"
}

#################################################

function getLastTag() {
  # tag=$(git tag | head -1)
  tag=$(git describe --abbrev=0)
  echo $tag
}

function getCommitsBeforeTag() {
  commits=$(git log $1...HEAD --no-merges --oneline | wc -l)
  return $commits
}

function getTagTime() {
  tagTime=$(git log -1 --format=%ai $1 | cat)
  echo $tagTime
}

# 将时间转为时间戳
function getTimeStampFromDate() {
  tagTime=$1
  uname=$(uname)

  if [[ $uname = "Darwin" ]];then
    tagTimeStamp=$(date -j -f "%Y-%m-%d %H:%M:%S" "$tagTime" +%s)
  else
    tagTimeStamp=$(date -d "$tagTime" +%s)
  fi;

  echo $tagTimeStamp
}

# 判断是否小于1天，0 小于，1 不小于
function isLessOneDay() {
  tagTime=$(getTagTime "$1")
  msg_info "The tagTime is $tagTime"

  tagTimeStamp=$(getTimeStampFromDate "$tagTime")
  msg_info "The tagTimeStamp is $tagTimeStamp"

  nowStamp=$(date +%s)

  if [[ $((nowStamp-tagTimeStamp)) -lt $((24*60*60)) ]];then
    msg_error "The time after last tag is less than 1 day"
    return 0
  fi

  return 1
}


function main() {
  needPush=$1
  tag=$(getLastTag)
  msg_info "The last tag is $tag"

  if [[ -z "$tag" ]]; then
    msg_info "There is no last tag."
    doStandardVerison 1 $needPush
    return
  fi;

  getCommitsBeforeTag $tag
  commits=$?
  msg_info "The number of commits is $commits"

  if [[ "$commits" -eq 0 ]];then
    msg_error "There is no commits from last tag. Bye~"
    return
  fi

  isLessOneDay $tag
  lessOneDay=$?
  msg_info "Ths isLessOneDay func returns $lessOneDay"

  if [[ $lessOneDay -eq 0  ]]; then
    msg_error "Less One Day. Bye~"
    return
  fi;

  doStandardVerison 0 $needPush
}


# 第一个参数为是否强制使用 first-release，1 使用，0 不使用
# 第二个参数为是否推送，1 推送，0 不推送
function doStandardVerison() {
  needPush=$2
  msg_info "The first param is: $1"
  msg_info "The second param is: $2"

  if [[ ! -f "CHANGELOG.md" || $1 -eq 1 ]]; then
    msg_info "Do first-release..."
    npx standard-version --first-release
  else
    msg_info "Do release-as patch..."
    npx standard-version --release-as patch
  fi

  if [[ $needPush -eq 1 ]]; then
    msg_info "pushing..."
    git push --follow-tags origin
  fi;

  msg_success "GEN VERSION SUCCESS"
}

main $1

