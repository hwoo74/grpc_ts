1. proto 파일 윈도에서 생성시 안돌아감. 보안에 막히니 뚫던지 docker 를 쓰던지 할것.
 - dockerFiles 쪽 참고해서 docker 띄울것.

2. 기본 환경 구축.
    - yarn init -y
        - 패키지 생성.
        - yarn add @grpc/grpc-js @grpc/proto-loader
        - yarn add -D grpc-tools @types/node typescript
            - 컴파일러 도구.
        - yarn add --dev grpc_tools_node_protoc_ts
            - ts 로 proto 빌드하려면 이것도 설치.
        - yarn add --dev @types/google-protobuf
            - proto 파일안에 protobuf 사용시.. ts 에서는 얘도 add 하는게 좋음.
        - yarn tsc --init
            - type script 쓸꺼니까 초기화 ..
        - 실행 환경 추가할꺼면.
            - yarn add pm2
            - yarn add dotenv
            - yarm add -D cross-env
        - mysql 도 추가할꺼면 ... (걍테스트용...)
            - yarn add mysql2

3. Test
    - http2/0 구조이지만, 웹브라우저로 테스트는 불가.
    - postMan 사용추천.
        - New 에서, gRPC 선택하고,
        - service definition 에 proto 파일을 업로드 ...
        - 이후 서버 URL (서버명:포트) 입력하고, Message 에 json 할당해서 테스트 ~
        - https 풀어서 요청할것 ... (구현 안했으면...)