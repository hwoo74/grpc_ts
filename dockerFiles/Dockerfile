# 사용할 기본 리눅스 이미지
FROM debian:bookworm-slim

# NVM 설치에 필요한 패키지 설치
RUN apt-get update && apt-get install -y \
    curl \
    git \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# NVM 환경 변수 설정
ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 20.10.0

# ----------------------------------------------------
# 💡 핵심 수정: NVM 설치 전에 NVM_DIR 디렉토리를 생성합니다.
RUN mkdir -p $NVM_DIR
# ----------------------------------------------------

# NVM 설치
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# NVM 환경 변수 설정 스크립트를 .bashrc에 추가
# 이 부분은 변경 없음
RUN echo "export NVM_DIR=\"$NVM_DIR\"" >> ~/.bashrc \
    && echo "[ -s \"$NVM_DIR/nvm.sh\" ] && \. \"$NVM_DIR/nvm.sh\"  # This loads nvm" >> ~/.bashrc \
    && echo "nvm install \$NODE_VERSION" >> ~/.bashrc \
    && echo "nvm use \$NODE_VERSION" >> ~/.bashrc

# 작업 디렉토리 설정 및 볼륨 마운트 지점
WORKDIR /usr/src/app

# 컨테이너를 계속 실행 상태로 유지
CMD ["tail", "-f", "/dev/null"]