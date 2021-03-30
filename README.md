# annotation-platform

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run dev
```

### Compiles and minifies for test

```
npm run build-sit
```

### Compiles and minifies for production

```
npm run build-prod
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### 测试环境构建到测试环境

[测试环境地址](http://cdss.svc.aws.wenjingtech.com:7090/)

```
npm run build-sit
cd docker/ui
zip -q -r index.zip ./index
scp index.zip dev@cdss.svc.aws.wenjingtech.com:/home/dev/deploy/metabolize-room

ssh dev@cdss.svc.aws.wenjingtech.com
cd ~/deploy/metabolize-room
rm -rvf index
jar -xvf index.zip
```
