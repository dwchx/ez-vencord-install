// Importing the Logger class from the @utils/Logger module
import { Logger } from "@utils/Logger";

// Importing the PluginInfo object from the constants module located in the parent directory
import { PluginInfo } from "../constants";

// Creating a new instance of the Logger class and passing the plugin name from PluginInfo as an argument
// This logger instance can be used throughout the application for logging purposes
export const logger = new Logger(PluginInfo.PLUGIN_NAME);
