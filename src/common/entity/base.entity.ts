import * as dayjs from 'dayjs';

export abstract class BaseEntity {
  isUsed: boolean = true;
  isDeleted: boolean = false;
  createdAt: dayjs.Dayjs = dayjs();
  updatedAt: dayjs.Dayjs = dayjs();

  constructor(
    isDeleted: boolean = false,
    isUsed: boolean = true,
    createdAt: dayjs.Dayjs = dayjs(),
    updatedAt: dayjs.Dayjs = dayjs(),
  ) {
    this.isDeleted = isDeleted;
    this.isUsed = isUsed;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
