import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";

import { User } from "./User.entity";

enum Role {
  "PUBLIC" = 0,
  "USER" = 1,
  "ADMIN" = 2,
}

@Entity()
class Auth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  password: string;

  @Column({ type: "enum", enum: Role, default: 0 })
  role: string;

  @OneToOne(() => User, (user) => user.auth)
  @JoinColumn()
  user: User;
}

export { Auth };
