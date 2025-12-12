import { PoolConnection } from 'mysql2/promise';
import BaseModel from './baseModel'; // DB 연결 객체 타입 임포트

// Pool을 직접 가져오는 대신, 인터셉터가 확보한 PoolConnection을 받습니다.
class UserModel extends BaseModel {
    // 생성자에서 인터셉터가 확보한 PoolConnection 인스턴스를 받습니다.
    constructor(conn: PoolConnection) {
        // Pool이 아닌, 이 요청에 할당된 단일 Connection을 저장합니다.
        super(conn)
    }

    getAllUsers = async (): Promise<string[]> => {
        const sql = 'SELECT num, datas as name FROM testdata';
        const rows = await this.executeQuery(sql);
        return rows.map((row: any) => row.name);
    }
}

export default UserModel;