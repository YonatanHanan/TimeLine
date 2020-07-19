import TimeSlot from "../TimeSlot";
import moment from "moment";

const start = moment().subtract(1, "day").toDate();
const end = moment(start).add(1, "day").toDate();

const ts = new TimeSlot(start, end);

test("duration", () => {
  const ONE_DAY_MILLISECONDS = 86400000;
  expect(ts.getDuration()).toEqual(ONE_DAY_MILLISECONDS);
});

describe("isBetween", () => {
  test("true", () => {
    const testDate1 = moment().subtract(0.5, "day").toDate();
    const testDate2 = moment().subtract(1, "day").toDate();

    expect(ts.isBetween(testDate1)).toBe(true);
    expect(ts.isBetween(testDate2)).toBe(true);
  });

  test("false", () => {
    const testDate1 = moment().subtract(2, "day").toDate();
    const testDate2 = moment().add(2, "day").toDate();

    expect(ts.isBetween(testDate1)).toBe(false);
    expect(ts.isBetween(testDate2)).toBe(false);
  });
});

describe("isBefore", () => {
  test("true", () => {
    const testDate = moment().subtract(2, "day").toDate();

    expect(ts.isBefore(testDate)).toBe(true);
  });

  test("false", () => {
    const testDate = moment().subtract(1, "day").toDate();

    expect(ts.isBefore(testDate)).toBe(false);
  });
});

describe("isAfter", () => {
  test("true", () => {
    const testDate = moment().add(1, "day").toDate();

    expect(ts.isAfter(testDate)).toBe(true);
  });

  test("false", () => {
    const testDate = moment().subtract(1, "day").toDate();

    expect(ts.isAfter(testDate)).toBe(false);
  });
});

describe("isContaindIn", () => {
  test("true", () => {
    const start = moment().subtract(0.5, "day").toDate();
    const end = moment(start).add(0.1, "day").toDate();

    const testTs = new TimeSlot(start, end);

    expect(testTs.isContaindIn(ts)).toBe(true);
  });

  test("false", () => {
    const start = moment().subtract(1, "day").toDate();
    const end = moment(start).add(1.5, "day").toDate();

    const testTs = new TimeSlot(start, end);

    expect(ts.isContaindIn(testTs)).toBe(false);
  });

  test("false", () => {
    const start = moment().subtract(2, "day").toDate();
    const end = moment(start).add(1, "day").toDate();

    const testTs = new TimeSlot(start, end);

    expect(ts.isContaindIn(testTs)).toBe(false);
  });

  test("false", () => {
    const start = moment().add(2, "day").toDate();
    const end = moment(start).add(1, "day").toDate();

    const testTs = new TimeSlot(start, end);

    expect(ts.isContaindIn(testTs)).toBe(false);
  });
});

describe("getIntersection", () => {
  test("no intersection - before", () => {
    const start = moment().subtract(3, "day").toDate();
    const end = moment(start).subtract(2, "day").toDate();

    const testTs = new TimeSlot(start, end);

    expect(testTs.diff(ts)[0]).toEqual(testTs);
  });

  test("no intersection - after", () => {
    const start = moment().add(1, "day").toDate();
    const end = moment(start).add(2, "day").toDate();

    const testTs = new TimeSlot(start, end);

    expect(testTs.diff(ts)[0]).toEqual(testTs);
  });

  test("intersection - after", () => {
    const start = moment().subtract(0.5, "day").toDate();
    const end = moment(start).add(1, "day").toDate();

    const testTs = new TimeSlot(start, end);

    expect(testTs.diff(ts)[0]).toEqual(new TimeSlot(ts.end, testTs.end));
  });

  test("intersection - before", () => {
    const start = moment().subtract(1.5, "day").toDate();
    const end = moment(start).add(1, "day").toDate();

    const testTs = new TimeSlot(start, end);

    expect(testTs.diff(ts)[0]).toEqual(new TimeSlot(testTs.start, ts.start));
  });

  test("full intersection - inside", () => {
    const start = moment().subtract(0.5, "day").toDate();
    const end = moment(start).add(0.1, "day").toDate();

    const testTs = new TimeSlot(start, end);

    expect(testTs.diff(ts)).toEqual([]);
  });

  test("double intersection", () => {
    const start = moment().subtract(2, "day").toDate();
    const end = moment(start).add(3, "day").toDate();

    const testTs = new TimeSlot(start, end);

    expect(testTs.diff(ts)![0]).toEqual(new TimeSlot(testTs.start, ts.start));
    expect(testTs.diff(ts)![1]).toEqual(new TimeSlot(ts.end, testTs.end));
  });
});
