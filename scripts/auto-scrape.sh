#!/usr/bin/env bash

# ┏━┓╻ ╻╺┳╸┏━┓   ┏━┓┏━╸┏━┓┏━┓┏━┓┏━╸
# ┣━┫┃ ┃ ┃ ┃ ┃   ┗━┓┃  ┣┳┛┣━┫┣━┛┣╸
# ╹ ╹┗━┛ ╹ ┗━┛   ┗━┛┗━╸╹┗╸╹ ╹╹  ┗━╸

# Exit on error.
set -o errexit

setup_git() {
  git config --global user.email "github@github.com"
  git config --global user.name "GitHub Actions"
}

check_data_changes() {
  npm run scrape

  if [[ $(git status --short | wc -l) -eq 0 ]]; then
    echo "Clean working status after scraping color definitions, exiting..."
    exit 0
  fi
}

commit_changes() {
  echo "Committing to master branch..."

  git add .
  git commit --message "fix(submodules): update snippets (run: $GITHUB_RUN_NUMBER)"
}

push_changes() {
  echo "Pushing to master branch..."
  git push --force --quiet "https://${GH_ADMIN_TOKEN}@github.com/sQVe/colorally.git" master > /dev/null 2>&1
}

setup_git
check_data_changes
commit_changes
push_changes
