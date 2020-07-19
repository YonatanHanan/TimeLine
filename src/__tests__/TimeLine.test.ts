import TimeSlot from "../TimeSlot";
import TimeLine from "../TimeLine";
import moment from "moment";

test("insert - one", () => {
  const start = moment().subtract(3, "day").toDate();
  const end = moment(start).subtract(2, "day").toDate();

  const ts = new TimeSlot(start, end);

  let tl = new TimeLine();

  tl.Add(ts);

  expect(tl.timeLine[0]).toEqual(ts);
});

test("insert - two - no overlap", () => {
  const start1 = moment().subtract(3, "day").toDate();
  const end1 = moment(start1).subtract(2, "day").toDate();
  const ts1 = new TimeSlot(start1, end1);

  const start2 = moment().subtract(1, "day").toDate();
  const end2 = moment(start2).subtract(0, "day").toDate();
  const ts2 = new TimeSlot(start2, end2);

  let tl = new TimeLine();

  tl.Add(ts1);
  tl.Add(ts2);

  expect(tl.timeLine[0]).toEqual(ts1);
  expect(tl.timeLine[1]).toEqual(ts2);
});

test("insert - start overlap", () => {
  const start1 = moment().subtract(3, "day").toDate();
  const end1 = moment(start1).add(2, "day").toDate();
  const ts1 = new TimeSlot(start1, end1);

  const start2 = moment(start1).add(1, "day").toDate();
  const end2 = moment(start2).add(2, "day").toDate();
  const ts2 = new TimeSlot(start2, end2);

  let tl = new TimeLine();

  tl.Add(ts1);
  tl.Add(ts2);

  expect(tl.timeLine[0]).toEqual(new TimeSlot(ts1.start, ts2.end));
});
