export default class TimeSlot {
  start: Date;
  end: Date;

  constructor(start: Date, end: Date) {
    this.start = start;
    this.end = end;
  }

  getDuration(): number {
    return Math.abs(this.end.getTime() - this.start.getTime());
  }

  isBetween(date: Date): boolean {
    return this.start <= date && date <= this.end;
  }

  isBefore(date: Date): boolean {
    return this.start > date;
  }

  isAfter(date: Date): boolean {
    return this.end < date;
  }

  isContaindIn(ts: TimeSlot): boolean {
    return ts.isBetween(this.start) && ts.isBetween(this.end);
  }

  diff(ts: TimeSlot): TimeSlot[] {
    if (!ts) {
      return [];
    }
    //  0
    if (!this.isBefore(ts.start) && this.isAfter(ts.start)) {
      return [new TimeSlot(this.start, this.end)];
    }
    //  1
    if (this.isBefore(ts.end) && !this.isAfter(ts.end)) {
      return [new TimeSlot(this.start, this.end)];
    }
    //  2
    if (ts.isBetween(this.start) && !this.isAfter(ts.end)) {
      return [new TimeSlot(ts.end, this.end)];
    }
    //  3
    if (!this.isBefore(ts.start) && ts.isBetween(this.end)) {
      return [new TimeSlot(this.start, ts.start)];
    }
    //  4
    if (ts.isBetween(this.start) && ts.isBetween(this.end)) {
      return [];
    }
    if (
      ts.isBefore(this.start) &&
      !ts.isBefore(this.end) &&
      ts.isAfter(this.end) &&
      !ts.isAfter(this.start)
    ) {
      const slots = [];
      slots.push(new TimeSlot(this.start, ts.start));
      slots.push(new TimeSlot(ts.end, this.end));
      return slots;
    }
    return [];
  }
}
