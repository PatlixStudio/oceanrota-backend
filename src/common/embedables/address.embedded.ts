import { Column } from "typeorm";

export class Address {
  @Column({ name: 'address_1', nullable: true })
  address_1?: string;

  @Column({ name: 'address_2', nullable: true })
  address_2?: string;

  @Column({ name: 'country', nullable: true })
  country?: string;

  @Column({ name: 'state', nullable: true })
  state?: string;

  @Column({ name: 'city', nullable: true })
  city?: string;

  @Column({ name: 'port', nullable: true })
  port?: string;

  @Column({ name: 'postal_code', nullable: true })
  postal_code?: string;
}
