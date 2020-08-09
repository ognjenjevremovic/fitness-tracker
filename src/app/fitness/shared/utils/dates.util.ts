import * as firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;


export abstract class DatesUtil {
  public static getStartOfTheDay(timestamp: Timestamp): Timestamp {
    const date = timestamp.toDate();
    const time = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
    return Timestamp.fromMillis(time);
  }

  public static getEndOfTheDay(timestamp: Timestamp): Timestamp {
    const date = timestamp.toDate();
    const time = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 1,
    ).getTime() - 1;
    return Timestamp.fromMillis(time);
  }

  public static getDayOffset(timestamp: Timestamp, offset: number = 1): Timestamp {
    const date = timestamp.toDate();
    const time = new Date(date.getFullYear(), date.getMonth(), date.getDate() + offset).getTime();
    return Timestamp.fromMillis(time);
  }

  public static getWeekOffset(timestamp: Timestamp, offset: number = 1): Timestamp {
    const date = timestamp.toDate();
    const newDate = new Date(
      date.getFullYear(), date.getMonth(), date.getDate(),
    );
    return Timestamp.fromMillis(newDate.setDate(newDate.getDate() + 7 * offset));
  }

  public static getFirstDayOfTheWeek(timestamp: Timestamp): Timestamp {
    const date = timestamp.toDate();
    const dayOfTheWeek = date.getDay();       //  e.g. Sunday = 0
    const currentDate = date.getDate();       //  e.g. 9th of August = 9
    return Timestamp.fromDate(
      new Date(
        date.setDate(
          currentDate                     //  5
          - dayOfTheWeek                  //  3
          + (!dayOfTheWeek ? -6 : 1)
        )
      )
    );
  }

  public static getIndexOfTheDay(timestamp: Timestamp): number {
    return timestamp.toDate().getDay();
  }
}
