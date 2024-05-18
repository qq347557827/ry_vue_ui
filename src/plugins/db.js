// src/db.js
import Dexie from 'dexie';

// 创建数据库实例
const db = new Dexie('guoxue');

// 定义数据库模式
db.version(1).stores({
  data: '++id, key,  mingPanText'
});

// 打开数据库
db.open().catch((err) => {
  console.error("Failed to open db: " + (err.stack || err));
});

export default db;
