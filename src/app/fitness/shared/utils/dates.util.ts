import * as firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;


export abstract class DatesUtil {
  public static getDaysStartingTimestamp(timestamp: Timestamp): Timestamp {
    const date = timestamp.toDate();
    const time = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
    return Timestamp.fromMillis(time);
  }

  public static getDaysEndingTimestamp(timestamp: Timestamp): Timestamp {
    const date = timestamp.toDate();
    const time = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1).getTime() - 1;
    return Timestamp.fromMillis(time);
  }

  public static getStartingDayOfTheWeek(timestamp: Timestamp): Timestamp {
    const date = timestamp.toDate();
    const dayOfTheWeek = date.getDay();       //  e.g. Thursday = 4
    const currentDate = date.getDate();       //  e.g. 6th of August = 6
    return Timestamp.fromDate(
      new Date(date.setDate(currentDate - dayOfTheWeek + (!dayOfTheWeek ? -6 : 1)))
    );
  }

  public static getWeekOffset(timestamp: Timestamp, offset: number): Timestamp {
    const date = timestamp.toDate();
    const newDate = new Date(
      date.getFullYear(), date.getMonth(), date.getDate(),
    );
    return Timestamp.fromMillis(newDate.setDate(newDate.getDate() + 7 * offset));
  }

  public static getDayOfTheWeekIndex(timestamp: Timestamp): number {
    return timestamp.toDate().getDay();
  }

  public static now(): Timestamp {
    return Timestamp.now();
  }


  private static getDateWithoutMilliseconds(timestamp: Timestamp): Timestamp {
    const date = timestamp.toDate();
    return Timestamp.fromDate(
      new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
    );
  }
}
