// Copyright (c) Microsoft. All rights reserved.

/*global log*/
/*global updateState*/
/*global sleep*/
/*jslint node: true*/

"use strict";

// Default state
var state = {
	online: true,
	temperature: 200.0,
	temperature_unit: "F",
	status: "on"
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

	state.temperature = vary(200, 5, 150, 250);

	// Make this flip every so often
	state.status = flip(state.status);

	return state;
}