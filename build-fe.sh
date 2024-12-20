###
 # @Author: Peihua
 # @Date: 2024-12-20 11:59:55
 # @LastEditors: Peihua
 # @LastEditTime: 2024-12-20 12:27:06
 # @FilePath: \build-fe.sh
 # @Description: 构建前端资源
### 

docker build -t web-builder ./fe
rm -rf ./web
docker run -d --name web-build-container web-builder tail -f /dev/null
docker cp web-build-container:/app/dist ./web
docker stop web-build-container
docker rm web-build-container || true
docker image rm web-builder