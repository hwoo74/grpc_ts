// src/config.ts

import * as dotenv from 'dotenv';

// interface 선언 
export interface AppConfig {
    nodeEnv: string;
    grpcPort: number;
    dbHost: string;
    dbPort: number;
    dbUser: string;
    dbPassword: string;
    dbDatabase: string;
}

// 싱글톤 클래스 .. 
class AppConfigManager {
    private static instance: AppConfigManager; // 싱글톤 인스턴스 저장
    private config: AppConfig; // 로드된 설정 객체 저장

    private constructor() {
        this.config = this.loadConfig(); // 생성 시점에 설정을 로드합니다.
    }

    private loadConfig(): AppConfig {
        // 1. NODE_ENV를 읽어 분기 처리 경로 결정
        const nodeEnv = process.env.NODE_ENV || 'development';
        const configPath = `.env.${nodeEnv}`;
        
        // 2. dotenv.config()를 통해 환경 변수 로드
        const dotenvResult = dotenv.config({ path: configPath });

        // 3. 로드 실패 시 즉시 프로세스 종료 (FATAL ERROR)
        if (dotenvResult.error) {
            console.error(`env config load error : ${configPath}`);
            console.error(dotenvResult.error);
            throw new Error("환경 변수 로드 실패로 인해 애플리케이션을 시작할 수 없습니다.");
        }

        // 주의: dotenv 로드가 성공하면 해당 값들은 process.env에 이미 추가되어 있습니다.
        const grpcPort = parseInt(process.env.GRPC_PORT || '50051', 10);
        const dbHost = process.env.MYSQL_HOST || 'localhost';
        const dbPort = parseInt(process.env.MYSQL_PORT || '3306', 10);
        const dbUser = process.env.MYSQL_USER || 'root';
        const dbPassword = process.env.MYSQL_PASSWD || '';
        const dbDatabase = process.env.MYSQL_DATABASE || 'test';
        
        if (isNaN(dbPort)) {
             throw new Error("[FATAL] DB_PORT 환경 변수가 숫자가 아닙니다.");
        }
        
        console.log(`[Config] 설정 로드 완료: 환경=${nodeEnv}, DB Host=${dbHost}`);
        
        return { 
            nodeEnv,
            grpcPort, 
            
            dbHost, 
            dbPort, 
            dbUser, 
            dbPassword, 
            dbDatabase
        };
    }

    /**
     * 인스턴스를 가져오는 정적 메서드
     */
    public static getInstance(): AppConfigManager {
        if (!AppConfigManager.instance) {
            AppConfigManager.instance = new AppConfigManager();
        }
        return AppConfigManager.instance;
    }

    /**
     * 외부에서 설정 값에 접근하는 Getter 메서드
     */
    public getConfig(): AppConfig {
        return this.config;
    }
}

export const ConfigManager = AppConfigManager.getInstance();