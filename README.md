# 
또개질 serverless api 입니다.

### serverless 
```
serverless offline
serverless deploy
```

### serverless-express 용 tsconfig.json 설정
```
"tsBuildInfoFile": ".tsbuildinfo",
"esModuleInterop": false
```

### 도메인 구입 절차
1. 가비아에서 도메인 구입
2. aws route53 에서 호스팅 영역 생성 및 ns 4개 복사
3. 가비아에서 도메인에 ns 4개 수정
4. acm 에서 인증서 생성

## References
- https://kyungyeon.dev/posts/89