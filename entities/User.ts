import {
  PrimaryKey,
  Entity,
  Property,
  types,
} from "@mikro-orm/core";
import { randomUUID } from "node:crypto"

@Entity()
export class User {
  @PrimaryKey({ type: types.string })
  id = randomUUID();

  @Property({ type: types.json })
  field!: { value: string }
}
