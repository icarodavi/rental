import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("users")
class User {
  @PrimaryColumn()
  id?: string;
  @Column()
  name: string;
  @Column()
  password: string;
  @Column()
  email: string;
  @Column()
  driver_license: string;
  @Column()
  avatar: string;
  @Column()
  is_admin: boolean;
  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
      this.is_admin = false;
    }
  }
}

export { User };
