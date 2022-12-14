# sam-test
test for aws-sam

## how to set up

- `sam init`
- `DOCKER_HOST=unix:///Users/osaguild/.docker/run/docker.sock sam build`
- `DOCKER_HOST=unix:///Users/osaguild/.docker/run/docker.sock sam local start-api`
- `DOCKER_HOST=unix:///Users/osaguild/.docker/run/docker.sock sam local start-lambda`
- `DOCKER_HOST=unix:///Users/osaguild/.docker/run/docker.sock sam local invoke "HelloWorldFunction" -e events/event.json`

