#!/usr/bin/env bash

# ┏━┓╻ ╻╺┳╸┏━┓   ┏━┓┏━╸┏━┓┏━┓┏━┓┏━╸
# ┣━┫┃ ┃ ┃ ┃ ┃   ┗━┓┃  ┣┳┛┣━┫┣━┛┣╸
# ╹ ╹┗━┛ ╹ ┗━┛   ┗━┛┗━╸╹┗╸╹ ╹╹  ┗━╸

# Exit on error.
set -o errexit

setup_git() {
  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "Travis CI"
}

check_data_changes() {
  git checkout master

  npm run scrape

  if [[ $(git status --short | wc -l) -eq 0 ]]; then
    echo "Clean working status after scraping color definitions, exiting..."
    exit 0
  fi
}

commit_changes() {
  echo "Committing to master branch..."
  git add .

  if [[ $TRAVIS_EVENT_TYPE == "cron" ]]; then
    git commit --message "fix(definitions): update definitions (cron build: $TRAVIS_BUILD_NUMBER)"
  else
    git commit --message "fix(definitions): update definitions (build: $TRAVIS_BUILD_NUMBER)"
  fi
}

push_changes() {
  echo "Pushing to master branch..."
  git push --force --quiet "https://${GH_TOKEN}@github.com/sQVe/colorally.git" master > /dev/null 2>&1
}

if [[
  $TRAVIS_BRANCH == "master" &&
  $TRAVIS_EVENT_TYPE != "pull_request"
]]; then
  setup_git
  check_data_changes
  commit_changes
  push_changes
fi
