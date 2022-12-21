# memo

## set up
```
sam init
aws configure list
export AWS_PROFILE=soroban-stg
DOCKER_HOST=unix:///Users/osaguild/.docker/run/docker.sock sam build
sam deploy --guided
curl -i "https://6hnbvwe8q8.execute-api.ap-northeast-1.amazonaws.com/Prod/hello/"
```