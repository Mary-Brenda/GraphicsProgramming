/**
 * The Timer class represents a simple countdown timer
 * to help with timing the game. The timer can be started and then
 * checked as to whether it has finished or not.
 */
class Timer {

  //Constructor: accepts the running time of the Timer in seconds.
  constructor(timeAllottedInSeconds) 
  {
    this.totalTimeInMillis = timeAllottedInSeconds * 1000;
  }

  //Begins the Timer countdown
  start()
  {
    this.currentTimeInMillis = millis(); 
    this.isStarted = true;
  }

  //Returns true of the Timer has finished running
  //If the Timer has not been started or has not finished, it will return false
  isFinished() 
  { 
    let ellapsedTimeInMillis = millis() - this.currentTimeInMillis;
    
    //if the timer was running and enough time has passed, return true
    if (this.isStarted && ellapsedTimeInMillis >= this.totalTimeInMillis)
    {
      this.isStarted = false;
      return true;
    }
    return false;
  }

  //Get the remaining time in seconds.
  //Returns Timer duration if the timer has not been started yet.
  getTimeInSeconds()
  {
    if (!this.isStarted) return this.getDurationInSeconds();
    let ellapsedTimeInSeconds = int((millis() - this.currentTimeInMillis) / 1000);
    return this.totalTimeInMillis / 1000 - ellapsedTimeInSeconds;
  }

  //get amount of time Timer will run in seconds
  getDurationInSeconds()
  {
    return this.totalTimeInMillis / 1000;
  }
}