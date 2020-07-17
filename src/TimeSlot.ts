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
    return date < this.start;
  }

  isAfter(date: Date): boolean {
    return this.end < date;
  }

  isContaindIn(ts: TimeSlot): boolean {
    return ts.isBetween(this.start) && ts.isBetween(this.end);
  }

  getIntersection(ts: TimeSlot): TimeSlot | TimeSlot[] | null | void {
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
    if (ts.isBefore(this.start) && ts.isBefore(this.end)) {
      return new TimeSlot(this.start, this.end);
    }
    if (!ts.isBefore(this.start) && !ts.isAfter(this.end)) {
      return null;
    }
    if (ts.isAfter(this.start) && ts.isAfter(this.end)) {
      return new TimeSlot(this.start, this.end);
    }
    if (!ts.isAfter(this.start) && !this.isAfter(ts.end)) {
      return new TimeSlot(ts.end, this.end);
    }
    if (ts.isBefore(this.start) && !ts.isBefore(this.end)) {
      return new TimeSlot(this.start, ts.start);
    }
  }
}
