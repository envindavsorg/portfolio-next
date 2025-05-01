#!/usr/bin/env bash
git checkout main            # ou autre branche cible

start=2025-05-01
end=2025-07-01
current="$start"

while [[ "$current" != "$end" ]]; do
  commits=$(( RANDOM % 31 + 20 ))
  for (( i=1; i<=commits; i++ )); do
    GIT_AUTHOR_DATE="${current}T12:00:00" \
    GIT_COMMITTER_DATE="${current}T12:00:00" \
      git commit --allow-empty -m "Dummy commit ${current} #${i}"
  done
  current=$(date -I -d "$current + 1 day")
done

git push origin main
