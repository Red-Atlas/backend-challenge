import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from "typeorm";

import { Auth } from "./Auth.entity";

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @OneToOne(() => Auth, (auth) => auth.user)
  auth: Auth;
}

export { User };
