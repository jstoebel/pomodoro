function clock () {

	this.work_time = 25.0;		//the user's desired work_time
	this.break_time = 5.0;	//the user's desired break time

	this.mode = "work";			//set to either work or break
	this.timer = null;			//the value of the active timer (in seconds)
	this.countdown = false;		//if the clock is counting down

	this.start_cancel = function() {
		//pre: none
		//post: either starts or pauses countdown
			//depending on the state of this.countdown

		if (this.countdown) {
			//cancel
			this.cancel()
		} else {
			//start
			this.timer_setup()
		}
	}

	this.timer_setup = function () {
		//sets up and bootstraps the count down of the timer
		//pre: none
		//post: timer is set up and recursive function 
		//is boostrapped

		$("#start").text("cancel")
		this.countdown = true

		if (self.timer == null) {
			//load the timer if its null already.
			if (this.mode == "work") {
				this.timer = this.work_time * 60
			} else if (this.mode == "break") {
				this.timer = this.break_time * 60
			}
		}

		this.update_display()

		this.intervalId = setInterval(this.tick.bind(this), 1000)

	},

	this.tick = function() {
		//pre: this.timer is initalized
		//post: timer has reached zero or paused.

		//decrement time
		this.timer -= 1;

		//update display
		this.update_display();

		//kill interval if timer is at 0
		if (this.timer == 0) {
			clearInterval(this.intervalId)
		}

	};

	this.update_display = function() {
		//pre: none
		//post: timer display is updated to reflect
		//	this.timer

		$("#display").text(this.timeReadable.bind(this))

	}

	this.timeReadable = function() {
		//pre: this.timer (in seconds)
		//post: returns human readable time as MM:SS (string)
		//seconds should have a leading zero.
		//if this.timer is null returns null

		if (this.timer){

			var minutes = (Math.floor(this.timer / 60)).toString();
			var seconds = (this.timer % 60).toString();

			//add leading zero to seconds if needed.
			if (seconds < 10) {
				seconds = "0" + seconds
			}

			return minutes + ":" + seconds;
		} else {
			return null
		}
	}

	this.cancel = function() {
		//pre: none
		//post: stops and nulls out the timer. 

		//change the button back to start and clear the display
		$("#start").text("start")
		this.countdown = false
		$("#display").text("")

		clearInterval(this.intervalId)

		if (self.countdown == true) {
			self.countdown = false;
			self.timer = null
		}
	};

	this.pause = function() {
		//pre: none
		//post: pauses the timer leaving the time remaining

		if (self.countdown == true) {
			self.countdown = false;
		}
	};

	this.inc_work_time = function(spam) {

		if (this.work_time < 59){
			this.work_time += 1;
			this.update_times();
		};
	};

	this.dec_work_time = function() {

		if (this.work_time > 1) {
			this.work_time -= 1.0;
			this.update_times();
		};

	};

	this.inc_break_time = function() {

		if (this.break_time < 59) {
			this.break_time += 1.0;
			this.update_times();
		}

	};

	this.dec_break_time = function () {
		if (this.break_time > 1){
			this.break_time -= 1.0;
			this.update_times();		
		}

	};

	this.update_times = function() {
		console.log("update times called")
		//updates work and break times to screen
		$("#work-time").text(this.work_time)
		$("#break-time").text(this.break_time)
	};

};


$(document).ready(function() {
	console.log("document ready")

	pom = new clock()

	//populate work time and break time text fields
	pom.update_times();

	//use .bind(pom) to make sure this is bound to the correct object

	//controls to set work and break time
	$("#work-add").click(pom.inc_work_time.bind(pom))
	$("#work-sub").click(pom.dec_work_time.bind(pom))
	$("#break-add").click(pom.inc_break_time.bind(pom))
	$("#break-sub").click(pom.dec_break_time.bind(pom))

	//start and stop buttons
	$("#start").click(pom.start_cancel.bind(pom))

});


