import { PoolConnection } from 'mysql2/promise'; // DB 연결 객체 타입 임포트

// Pool을 직접 가져오는 대신, 인터셉터가 확보한 PoolConnection을 받습니다.
class BaseModel {
    // 필드 타입을 Pool이 아닌 단일 PoolConnection으로 변경합니다.
    private conn: PoolConnection; 

    // 생성자에서 인터셉터가 확보한 PoolConnection 인스턴스를 받습니다.
    constructor(conn: PoolConnection) {
        // Pool이 아닌, 이 요청에 할당된 단일 Connection을 저장합니다.
        this.conn = conn; 
    }

    // 예시: 저장된 Connection을 사용하여 쿼리 실행
    protected async executeQuery(sql: string, params?: any[]): Promise<any> {
        // this.conn 객체를 통해 쿼리를 실행합니다.
        const [rows] = await this.conn.query(sql, params);
        return rows;
    }
}

export default BaseModel;