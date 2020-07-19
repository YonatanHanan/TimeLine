import TimeSlot from "./TimeSlot";

export default class TimeLine {
  private _timeLine: TimeSlot[] = [];

  Add(ts: TimeSlot) {
    this.timeLine.push(ts);
    this.Sort();
  }

  get timeLine(): TimeSlot[] {
    return this._timeLine;
  }

  private Sort() {
    if (this._timeLine.length == 1) {
      return;
    }

    let sortedTimeData = this._timeLine.sort(this.compareByStartTime);
    let timeStack: TimeSlot[] = [];
    let last: TimeSlot | null = null;

    // for (let i = 0; i < sortedTimeData.length; i++) {
    //   timeStack = (timeStack as TimeSlot[]).concat(
    //     sortedTimeData[i].diff(sortedTimeData[i + 1])
    //   );
    // }

    sortedTimeData.forEach(function (r) {
      if (!last || r.start > last.end) {
        timeStack.push((last = r));
      } else if (r.end > last.end) {
        last.end = r.end;
      }
    });

    this._timeLine = timeStack;
  }

  private compareByStartTime(slotA: TimeSlot, slotB: TimeSlot) {
    if (slotA.start > slotB.start) return 1;
    if (slotB.start > slotA.start) return -1;

    return 0;
  }
}
