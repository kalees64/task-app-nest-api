import {
  BeforeInsert,
  Column,
  Entity,
  ObjectId,
  ObjectIdColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { v4 as uuid } from 'uuid';
import { PRIORITY, STATUS } from './dto/create-task.dto';
import { Users } from 'src/users/users.entity';
import { Exclude, Transform } from 'class-transformer';

@Entity()
export class Tasks {
  @ObjectIdColumn()
  @Exclude()
  _id: ObjectId;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: null })
  description: string | null;

  @Column({ default: STATUS.PENDING })
  status: STATUS;

  @Column({ default: null })
  priority: PRIORITY | null;

  @Column({ default: null })
  image: string | null;

  @Column()
  created_at: string;

  @Column()
  modified_at: string;

  @Column({ default: null })
  assigned_date: string | null;

  @Column({ default: null })
  completed_date: string | null;

  @Column({ default: null })
  due_date: string | null;

  @Column(() => Users)
  assigned_to: Users | null;

  @Column(() => Users)
  created_by: Users | null;

  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
