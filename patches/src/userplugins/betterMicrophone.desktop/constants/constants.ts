// Importing required modules and constants
import { Devs } from "@utils/constants"; // Importing developer information from the constants module
import { types } from "../../philsPluginLibrary"; // Importing types from the plugin library

// Define and export the PluginInfo object with relevant plugin information
export const PluginInfo = {
    // Name of the plugin
    PLUGIN_NAME: "BetterMicrophone",
    
    // Description of what the plugin does
    DESCRIPTION: "This plugin allows you to further customize your microphone.",
    
    // Information about the author
    AUTHOR: {
        // Spread operator to include details from the philhk developer object
        ...Devs.philhk,
        // GitHub link for the author
        github: "https://github.com/philhk"
    },
    
    // Contributors to the plugin (currently empty)
    CONTRIBUTORS: {}
} as const satisfies types.PluginInfo; // Type assertion to ensure PluginInfo adheres to the PluginInfo type
