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

@Entity()
export class Tasks {
  @ObjectIdColumn()
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

  @Column({ default: null })
  assigned_to: string | null;

  @Column({ default: null })
  created_by: string | null;

  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
