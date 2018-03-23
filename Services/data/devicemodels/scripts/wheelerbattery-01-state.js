// Copyright (c) Microsoft. All rights reserved.

/*global log*/
/*global updateState*/
/*global sleep*/
/*jslint node: true*/

"use strict";

// Default state
var state = {
	online: true,
	status: "on",
	speed: 50.0,
	speed_unit: "KMPH",
	ODO: 112.3,
	ODO_unit: "KM",
	InternalBatteryVoltage: 4.2,
	InternalBatteryVoltage_unit: "V",
	GSMSignalStrength: 17,
	latitude: 28.43380167,
	longitude: 77.08016000
};

/**
 * Restore the global state using data from the previous iteration.
 *
 * @param previousState The output of main() from the previous iteration
 */
function restoreState(previousState) {
	// If the previous state is null, force a default state
	if (previousState !== undefined && previousState !== null) {
		state = previousState;
	} else {
		log("Using default state");
	}
}

/**
 * Simple formula generating a random value around the average
 * in between min and max
 */
function vary(avg, percentage, min, max) {
	var value = avg * (1 + ((percentage / 100) * (2 * Math.random() - 1)));
	value = Math.max(value, min);
	value = Math.min(value, max);
	return value;
}

/**
* Simple formula that sometimes flips the status of the lightbulb
*/
function flip(value) {
	if (Math.random() < 0.2) {
		return (value == "on") ? "off" : "on"
	}
	return value;
}

/**
 * Entry point function called by the simulation engine.
 *
 * @param context        The context contains current time, device model and id
 * @param previousState  The device state since the last iteration
 */
/*jslint unparam: true*/
function main(context, previousState) {

	// Restore the global state before generating the new telemetry, so that
	// the telemetry can apply changes using the previous function state.
	restoreState(previousState);

	state.speed = vary(80, 5, 10, 150);

	log("Vehicle speed: " + state.speed);

	state.InternalBatteryVoltage = vary(3.5, 5, 2, 6);

	log("Vehicle speed: " + state.InternalBatteryVoltage);

	state.ODO += 0.01;
	state.GSMSignalStrength = vary(16, 5, 0, 31);

	state.latitude = vary(28.0000, 0.0001, 28.00000, 28.9999);
	state.longitude = vary(78, 0.00005, 78.00000, 79.00000);

	// Make this flip every so often
	state.status = flip(state.status);

	return state;
}