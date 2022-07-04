import { v4 as uuidV4 } from "uuid";
import { hash } from "bcrypt";

import AppDataSource from "..";

const result = async () => {
  const id = uuidV4();
  const password = await hash("admin", 8);
  await AppDataSource.initialize();
  await AppDataSource.query(
    `INSERT INTO USERS(id,name, driver_license, email, password, is_admin, created_at) VALUES('${id}','admin','ABC123','admin@rentx.com.br','${password}','true','${new Date().toUTCString()}')`
  );
};

result();
