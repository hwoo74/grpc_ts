import { createPool, Pool } from 'mysql2/promise';
// 💡 환경 설정 싱글톤 및 타입 Import (경로는 프로젝트 구조에 맞게 수정 필요)
import { ConfigManager, AppConfig } from '../conf/envConf'; 

// ====================================================================
// 1. Connection Pool 싱글톤 관리 클래스
// ====================================================================

class DbPoolManager {
    private static instance: DbPoolManager;
    private pool: Pool;

    /**
     * 외부에서 인스턴스 생성을 막고, 생성 시점에 Pool을 초기화합니다.
     */
    private constructor() {
        const config: AppConfig = ConfigManager.getConfig();

        // Pool을 생성하고 인스턴스 변수에 저장합니다.
        this.pool = createPool({
            host: config.dbHost,
            port: config.dbPort,
            user: config.dbUser,
            password: config.dbPassword,
            database: config.dbDatabase,
            
            // Pool 설정 (프로덕션 권장 설정)
            waitForConnections: true, // 풀에 연결이 없을 때 대기할지 여부
            connectionLimit: 10,      // 풀이 유지할 최대 연결 수
            queueLimit: 0,            // 대기 큐 크기 (0 = 제한 없음)
        });

        console.log(`[DB] Connection Pool 초기화 완료: ${config.dbHost}:${config.dbPort}, Max: 10`);
        
        // 애플리케이션이 종료될 때 Pool을 깔끔하게 닫도록 이벤트 리스너를 추가합니다.
        process.on('SIGINT', () => {
            this.closePool().then(() => process.exit(0));
        });
        process.on('SIGTERM', () => {
            this.closePool().then(() => process.exit(0));
        });
    }

    /**
     * 인스턴스를 가져오는 정적 메서드 (싱글톤 보장)
     */
    public static getInstance(): DbPoolManager {
        if (!DbPoolManager.instance) {
            DbPoolManager.instance = new DbPoolManager();
        }
        return DbPoolManager.instance;
    }

    /**
     * 외부에서 Pool 인스턴스를 가져오는 Getter 메서드
     */
    public getPool(): Pool {
        return this.pool;
    }

    /**
     * Pool을 닫는 메서드 (애플리케이션 종료 시 사용)
     */
    public async closePool(): Promise<void> {
        console.log('[DB] Connection Pool 종료 중...');
        await this.pool.end();
    }
}

// ====================================================================
// 2. 단일 인스턴스 Export (초기화 지점)
// ====================================================================

/**
 * 이 모듈을 import 하는 순간 DbPoolManager 인스턴스가 생성되고 Pool이 초기화됩니다.
 * PoolManager는 애플리케이션 전체에서 공유되는 유일한 인스턴스입니다.
 */
export const PoolManager = DbPoolManager.getInstance();

/**
 * 💡 Connection Pool 인스턴스를 직접 가져오는 헬퍼 함수
 */
export const getDbPool = (): Pool => {
    return PoolManager.getPool();
};

/*
// example usage in another file:
// src/models/BaseModel.ts

import { Pool, Connection, RowDataPacket, OkPacket, ResultSetHeader, FieldPacket } from 'mysql2/promise';
import { getDbPool } from '../db/pool'; // 💡 Pool 헬퍼 함수 import

class BaseModel {
    private pool: Pool;

    constructor() {
        // 💡 생성자에서 싱글톤 Pool 인스턴스를 가져와 필드에 할당합니다.
        this.pool = getDbPool(); 
    }
    
    // ... query 메서드 구현 ...
    async query<T extends RowDataPacket[] | OkPacket | ResultSetHeader>( ... 이거저거 ... ): Promise<any> {
        let connection: Connection | undefined;
        try {
            // Pool에서 연결을 빌려옴 (연결 생성 아님)
            connection = await this.pool.getConnection(); 
            
            // ... 쿼리 실행 ...

        } catch (error) {
            // ... 에러 처리 ...
        } finally {
            // Pool에 연결을 반납 (연결 종료 아님)
            if (connection) {
                connection.release(); 
            }
        }
    }
}
*/