# Scrips

```bash
# Kakfa
cd kafka
docker-compose down
docker-compose up -d

# Codepix
cd codepix
docker-compose down
docker-compose up -d
docker exec -it codepix_app_1 bash

# Server
cd server
docker-compose down
docker-compose up -d
docker exec -it server_app_1 bash
```